import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { auth } from "firebase";

import { styles } from "./CreatePostsScreen.styled";
import { db, storage } from "../../../firebase/config";

export default function CreatePostsScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  // const cameraRef = useRef();
  const [photo, setPhoto] = useState(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoLocation, setPhotoLocation] = useState("");
  const [location, setLocation] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isFocused, setIsFocused] = useState(true);

  const { userId, login } = useSelector((state) => state.auth);

  // console.log("hasPermission: ", hasPermission);
  // console.log("cameraType: ", cameraType);
  // console.log("isPreview: ", isPreview);
  // console.log("isCameraReady: ", isCameraReady);
  // // console.log("cameraRef: ", cameraRef);
  console.log("photo: ", photo);
  // console.log("photoTitle: ", photoTitle);
  // console.log("photoLocation: ", photoLocation);
  // console.log("location: ", location);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log("status: ", status);
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      setIsFocused(true);
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {
      setIsFocused(false);
      setIsPreview(false);
      // setPhoto(null);
      setPhotoTitle("");
      setPhotoLocation("");
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    console.log("click");
    // console.log("cameraRef.current: ", cameraRef.current);
    if (cameraRef) {
      // const sizes = await cameraRef.current.getAvailablePictureSizesAsync(
      //   "4:3"
      // );
      // console.log("sizes: ", sizes);
      // const pictureSize = sizes[sizes.length - 3];
      // const cameraConfig = {
      //   pictureSize,
      // };

      // console.log("cameraRef.current: ", cameraRef.current);
      // await cameraRef.current.updateCameraProps(cameraConfig);

      // setIsCameraReady(true);

      const options = { quality: 0.5, base64: true, skipProcessing: true };

      const data = await cameraRef.takePictureAsync(options);
      const source = data.uri;

      // const location = await Location.getCurrentPositionAsync();
      // console.log("latitude: ", location.coords.latitude);
      // console.log("longitude: ", location.coords.longitude);

      if (source) {
        await cameraRef.pausePreview();
        setIsPreview(true);
        setPhoto(source);
        // console.log("picture", source);
      }
    }
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const cancelPreview = async () => {
    await cameraRef.resumePreview();
    setIsPreview(false);
    setPhoto(null);
  };

  const renderCancelPreviewButton = () => (
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      <MaterialIcons name="close" size={24} color="white" />
    </TouchableOpacity>
  );

  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity
        disabled={!isCameraReady}
        onPress={switchCamera}
        style={styles.captureWrapper}
      >
        <View style={styles.capture} />
        <MaterialIcons
          name="flip-camera-android"
          size={24}
          color="white"
          style={styles.captureIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.15}
        disabled={!isCameraReady}
        onPress={takePicture}
        style={styles.captureWrapper}
      >
        <View style={styles.capture} />
        <MaterialIcons
          name="photo-camera"
          size={24}
          color="white"
          style={styles.captureIcon}
        />
      </TouchableOpacity>
    </View>
  );

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const sendPhoto = async () => {
    if (
      !photo ||
      !photoTitle
      //  || !photoLocation
    ) {
      console.log("Add photo, title and location");
      return;
    }
    uploadPostToServer();
    navigation.navigate("DefaultScreen");
  };

  const uploadPostToServer = async () => {
    const photoURL = await uploadPhotoToServer();
    const createPost = await db
      .collection("posts")
      .add({ photoURL, photoTitle, location, userId, login });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const data = await storage.ref(`postImage/${uniquePostId}`).put(file);
    // console.log("data:", data);

    const processedPhoto = await storage
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    return processedPhoto;
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          {!isShowKeyboard && (
            <>
              <View style={styles.cameraWrapper}>
                {isFocused && (
                  <Camera
                    ref={(ref) => setCameraRef(ref)}
                    style={styles.camera}
                    type={cameraType}
                    onCameraReady={onCameraReady}
                    onMountError={(error) => {
                      console.log("camera error", error);
                    }}
                    //ratio="1:1" // задайте потрібне вам співвідношення сторін (4:3, 16:9 тощо)
                    // pictureSize="1280x960" // задайте розмір зображення, що зберігається
                  />
                )}
                {isPreview && renderCancelPreviewButton()}
                {!isPreview && renderCaptureControl()}
              </View>
              <TouchableOpacity
                style={{ marginBottom: 32 }}
                activeOpacity={0.8}
                // onPress={pickImage}
              >
                <Text style={{ ...styles.text, color: "#BDBDBD" }}>
                  {photo ? "Edit photo" : "Upload photo"}
                </Text>
              </TouchableOpacity>
            </>
          )}
          <View style={{ ...styles.inputWrapper, marginBottom: 16 }}>
            <TextInput
              style={[
                styles.input,
                styles.text,
                {
                  fontFamily:
                    photoTitle !== "" ? "Roboto-Medium" : "Roboto-Regular",
                },
              ]}
              value={photoTitle}
              onChangeText={setPhotoTitle}
              placeholder={"Title..."}
              placeholderTextColor="#BDBDBD"
            />
          </View>
          <View style={{ ...styles.inputWrapper, marginBottom: 32 }}>
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={styles.iconLocation}
            />
            <TextInput
              style={{ ...styles.text, ...styles.input }}
              value={photoLocation}
              onChangeText={setPhotoLocation}
              placeholder={"Location..."}
              placeholderTextColor="#BDBDBD"
            />
          </View>
          {!isShowKeyboard && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                ...styles.sendButton,
                backgroundColor:
                  !photo || !photoTitle || !photoLocation
                    ? "#F6F6F6"
                    : "#FF6C00",
              }}
              onPress={sendPhoto}
            >
              <Text
                style={{
                  ...styles.text,
                  color:
                    !photo || !photoTitle || !photoLocation
                      ? "#BDBDBD"
                      : "#FFFFFF",
                }}
              >
                Publish
              </Text>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.sendButton,
              backgroundColor:
                !photoTitle || !photoLocation ? "#F6F6F6" : "#FF6C00",
            }}
            onPress={sendPhoto}
          >
            <Text
              style={{
                ...styles.text,
                color: !photoTitle || !photoLocation ? "#BDBDBD" : "#FFFFFF",
              }}
            >
              Publish
            </Text>
          </TouchableOpacity> */}
          {/* {isShowKeyboard && (
            //
          )} */}
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
