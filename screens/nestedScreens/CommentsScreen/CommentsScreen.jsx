import { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { db } from "../../../firebase/config";
import { styles } from "./CommentsScreen.styled";

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { postId } = route.params;

  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  const addComment = async () => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, login });
  };

  const getAllComments = async () => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot(data => setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              {/* <Text>{item.login}</Text> */}
              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={setComment}
          placeholder="Your comment..."
          placeholderTextColor="#bdbdbd"
        />

        <TouchableOpacity style={styles.button} onPress={addComment}>
          <MaterialIcons name="arrow-upward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
