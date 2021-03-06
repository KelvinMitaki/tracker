import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import {
  NavigationEvents,
  NavigationParams,
  NavigationRoute,
  NavigationScreenProp
} from "react-navigation";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { NavigationTabProp } from "react-navigation-tabs";
import AuthForm from "../components/AuthForm";
import { Context as AuthContext, AuthState } from "../context/AuthContext";

export interface AuthCtx {
  signup: (values: {
    email: string;
    password: string;
    navigation: NavigationScreenProp<
      NavigationRoute<NavigationParams>,
      NavigationParams
    >;
  }) => Promise<void>;
  signin: (values: {
    email: string;
    password: string;
    navigation: NavigationScreenProp<
      NavigationRoute<NavigationParams>,
      NavigationParams
    >;
    setLoading: (value: React.SetStateAction<boolean>) => void;
  }) => Promise<void>;
  signout: (
    navigation: NavigationTabProp<
      NavigationRoute<NavigationParams>,
      NavigationParams
    >
  ) => Promise<void>;
  clearError: () => void;
  tryLocalSignin: (
    navigation: NavigationScreenProp<
      NavigationRoute<NavigationParams>,
      NavigationParams
    >
  ) => void;
  state: AuthState;
}

const SignUpScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const {
    signup,
    state: { registerError },
    clearError,
    tryLocalSignin
  } = useContext(AuthContext) as AuthCtx;

  return (
    <>
      <NavigationEvents onWillBlur={() => clearError()} />
      <AuthForm
        btnTitle="Sign Up"
        redirectBtnTitle="Already have an account? Go to sign in"
        redirectRoute="Signin"
        heading="Sign Up For A Tracker"
        errorMessage={registerError}
        login={signup}
      />
    </>
  );
};

SignUpScreen.navigationOptions = { header: () => null };

export default SignUpScreen;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 150
  },
  heading: {
    marginBottom: 30,
    alignSelf: "center"
  }
});
