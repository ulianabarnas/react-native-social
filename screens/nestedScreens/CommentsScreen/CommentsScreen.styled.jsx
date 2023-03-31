import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    },
    commentContainer: {
        backgroundColor: "#00000008",
        borderRadius: 6,
        padding: 16,
        marginBottom:24,
    },
    comment: {
        fontSize: 13,
lineHeight:18
    },
    inputWrapper: {
         position: "relative",
    },
    input: {
        fontSize: 16,
        lineHeight: 19,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingVertical: 16,
    paddingLeft: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  button: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FF6C00",
    borderRadius: 30,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {},
});
