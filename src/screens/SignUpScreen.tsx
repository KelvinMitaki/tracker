import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import {
  NavigationParams,
  NavigationRoute,
  NavigationScreenProp
} from "react-navigation";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import AuthForm from "../components/AuthForm";
import Spacer from "../components/Spacer";
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
  signout: () => Promise<void>;
  state: AuthState;
}

const SignUpScreen: NavigationStackScreenComponent = () => {
  const {
    signup,
    state: { registerError }
  } = useContext(AuthContext) as AuthCtx;

  return (
    <AuthForm
      btnTitle="Sign Up"
      redirectBtnTitle="Already have an account? Go to sign in"
      redirectRoute="Signin"
      heading="Sing Up For A Tracker"
      errorMessage={registerError}
      login={signup}
    />
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
