import { ImageBackground } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import RegisterScreen from "./screens/auth/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/auth/LoginScreen/LoginScreen";
import PostsScreen from "./screens/mainScreen/PostsScreen/PostsScreen";
import ProfileScreen from "./screens/mainScreen/ProfileScreen/ProfileScreen";
import CreatePostsScreen from "./screens/mainScreen/CreatePostsScreen/CreatePostsScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <ImageBackground
        style={{
          flex: 1,
          resizeMode: "center",
        }}
        source={require("./assets/images/bg-big.jpg")}
      >
        <AuthStack.Navigator initialRouteName="Log in">
          <AuthStack.Screen
            options={{
              headerShown: false,
              gestureEnabled: true,
              ...TransitionPresets.SlideFromRightIOS,
              presentation: "transparentModal",
            }}
            name="Registration"
            component={RegisterScreen}
          />
          <AuthStack.Screen
            options={{
              headerShown: false,
              gestureEnabled: true,
              ...TransitionPresets.SlideFromRightIOS,
              presentation: "transparentModal",
            }}
            name="Log in"
            component={LoginScreen}
          />
        </AuthStack.Navigator>
      </ImageBackground>
    );
  }

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        tabBarActiveBackgroundColor: "#ff6c00",
        tabBarInactiveTintColor: "#212121cc",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          paddingVertical: 8,
          paddingHorizontal: 60,
          elevation: 0,
          borderTopColor: "#e5e5e5",
          borderTopWidth: 1,
          display: "flex",
        },
        tabBarItemStyle: {
          borderRadius: 20,
          height: 40,
        },
        headerTitleAlign: "center",
        headerTintColor: "#212121",
        headerStyle: {
          backgroundColor: "#ffffff",
          borderBottomWidth: 1,
          borderBottomColor: "#e5e5e5",
          elevation: 0,
        },
        headerShadowVisible: true,
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="appstore-o" size={24} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        options={{
          headerTitle: "Create post",
          // headerLeft: () => (
          //   <HeaderBackButton
          //     style={{ height: 100, width: 100 }}
          //     onPress={() => navigation.goBack(null)}
          //   />
          // ),
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="plus" size={20} color={color} />
          ),
          tabBarItemStyle: {
            marginHorizontal: 14,
            height: 40,
            borderRadius: 20,
          },
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
