import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  form: {
    top: 0,
    position: "relative",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 8,
    height: 50,
    width: "100%",
    backgroundColor: "#f6f6f6",
    color: "#212121",
    paddingHorizontal: 16,
  },
  inputFocus: {
    borderColor: "#ff6c00",
  },
  btn: {
    backgroundColor: "#ff6c00",
    height: 50,
    borderRadius: 30,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  link: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textAlign: "center",
  },
});