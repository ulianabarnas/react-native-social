import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/config";
import { authSignOutUser } from "../../../redux/auth/authOperations";

import { Feather } from "@expo/vector-icons";

import { styles } from "./ProfileScreen.styled";

export default function ProfileScreen() {
  const [userPosts, setUserPosts] = useState([]);

  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
        resizeMode: "center",
      }}
      source={require("../../../assets/images/bg-big.jpg")}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={signOut}>
          <Feather name="log-out" size={24} color="#bdbdbd" />
        </TouchableOpacity>

        <FlatList
          data={userPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.photoURL }} style={styles.image} />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}
