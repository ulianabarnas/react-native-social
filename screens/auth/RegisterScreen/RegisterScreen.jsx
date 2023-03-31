import { useState, useEffect } from "react";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from "react-native";

import { authSignUpUser } from "../../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import { styles } from "./RegisterScreen.styled";
import { AntDesign } from "@expo/vector-icons";

const initialState = {
  login: "",
  email: "",
  password: "",
  avatar: "",
};

export default function RegisterScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isFocused, setIsFocused] = useState({
    login: false,
    email: false,
    password: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
      setIsFocused({
        login: false,
        email: false,
        password: false,
      });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    setIsFocused(false);
    setIsFocused({
      login: false,
      email: false,
      password: false,
    });
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    if (!state.login || !state.email || !state.password) {
      return Alert.alert(
        "Fill in all the fields, please.",
        "Login, email and password is required.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    }
    dispatch(authSignUpUser(state));
    setIsFocused({
      login: false,
      email: false,
      password: false,
    });
    setState(initialState);
  };

  const handleFocus = (input) => {
    setIsShowKeyboard(true);
    setIsFocused({
      [input]: true,
    });
  };

  const onShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const pickAvatar = async () => {
    const resultAvatar = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultAvatar.canceled) {
      const photo = resultAvatar.assets[0].uri;

      setState((prevState) => ({
        ...prevState,
        avatar: photo,
      }));
    }
  };

  const deleteAvatar = () => {
    setState((prevState) => ({
      ...prevState,
      avatar: "",
    }));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          <View
            style={{
              ...styles.form,
              // ...Platform.select({
              //   ios: { top: isShowKeyboard ? -20 : 78 },
              //   android: {
              //     top: isShowKeyboard ? 0 : 90,
              //   },
              // }),
              paddingBottom: isShowKeyboard ? 0 : 44,
            }}
          >
            <View style={styles.avatarContainer}>
              {state.avatar && (
                <Image source={{ uri: state.avatar }} style={styles.avatar} />
              )}
              <TouchableOpacity
                style={styles.addButton}
                onPress={state.avatar ? deleteAvatar : pickAvatar}
              >
                <AntDesign
                  name="close"
                  size={13}
                  color="#FF6C00"
                  style={!state.avatar ? styles.plusIcon : ""}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Registration</Text>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                onFocus={() => handleFocus("login")}
                style={[styles.input, isFocused.login ? styles.inputFocus : ""]}
                selectionColor={"#ff6c00"}
                placeholder={"Login"}
                value={state.login}
                placeholderTextColor={"#bdbdbd"}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                onFocus={() => handleFocus("email")}
                style={[styles.input, isFocused.email ? styles.inputFocus : ""]}
                selectionColor={"#ff6c00"}
                placeholder={"Email"}
                placeholderTextColor={"#bdbdbd"}
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
            </View>
            <View style={{ marginBottom: isShowKeyboard ? 32 : 44 }}>
              <TextInput
                onFocus={() => handleFocus("password")}
                style={[
                  styles.input,
                  isFocused.password ? styles.inputFocus : "",
                ]}
                selectionColor={"#ff6c00"}
                placeholder={"Password"}
                placeholderTextColor={"#bdbdbd"}
                secureTextEntry={isShowPassword}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              {state.password && (
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                  }}
                  activeOpacity={0.8}
                  onPress={onShowPassword}
                >
                  <Text style={styles.link}>
                    {isShowPassword ? "Show" : "Hide"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {!isShowKeyboard && (
              <>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.8}
                  onPress={onSubmit}
                >
                  <Text style={styles.btnTitle}>SIGN UP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Log in")}
                >
                  <Text style={styles.link}>
                    Have an account?{" "}
                    <Text style={{ fontFamily: "Roboto-Bold" }}>Sign in.</Text>
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
