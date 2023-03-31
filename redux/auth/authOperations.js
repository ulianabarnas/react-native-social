import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);

      const user = await auth.currentUser;
      console.log("userInOperation:", user);
      await user.updateProfile({
        displayName: login,
      });

      const { uid, displayName } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      console.log("user: ", user);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
