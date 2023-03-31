import { useEffect, useState } from "react";
import { View, FlatList, Image, Button, Text } from "react-native";
import { db } from "../../../firebase/config";

import { styles } from "./DefaultScreenPosts.styled";

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  console.log("route.params: ", route.params);

  const getAllPosts = async () => {
    await db
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  console.log("posts: ", posts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.photoURL }} style={styles.image} />
            <Text>{item.photoTitle}</Text>
            <View>
              <Button
                title="to map"
                onPress={() => navigation.navigate("Map", {location: item.location})}
              />
              <Button
                title="to comments"
                onPress={() => navigation.navigate("Comments", {postId: item.id})}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}
