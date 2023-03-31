import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  cameraWrapper: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  camera: {
    height: 240,
  },
  closeButton: {
    position: "absolute",
    top: 6,
    left: 6,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  control: {
    position: "absolute",
    top: 90,
    alignSelf: "center",
    flexDirection: "row",
    width: 130,
    justifyContent: "space-between",
  },
  captureWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  capture: {
    backgroundColor: "#ffffff",
    borderRadius: 50,
    height: 60,
    width: 60,
    opacity: 0.3,
  },
  captureIcon: {
    position: "absolute",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  input: {
    color: "#212121",
    padding: 0,
    width: "100%",
  },
  iconLocation: {
    marginRight: 4,
  },
  sendButton: {
    height: 50,
    borderRadius: 30,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});