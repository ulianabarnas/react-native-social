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
} from "react-native";

import { useDispatch } from "react-redux";
import {authSignInUser} from '../../../redux/auth/authOperations'

import { styles } from "./LoginScreen.styled";

const initialState = {
  email: "",
  password: "",
};



export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isFocused, setIsFocused] = useState({
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
    setIsFocused({
      email: false,
      password: false,
    });
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    dispatch(authSignInUser(state));

    setIsFocused({
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

  // console.log(Platform.OS);
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
            <Text style={styles.title}>Sign in</Text>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                onFocus={() => {
                  handleFocus("email");
                }}
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
                onFocus={() => {
                  handleFocus("password");
                }}
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
                  <Text style={styles.btnTitle}>SIGN IN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.link}>
                    Have not an account?{" "}
                    <Text style={{ fontFamily: "Roboto-Bold" }}>Sign up.</Text>
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