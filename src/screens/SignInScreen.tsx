import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import AuthForm from "../components/AuthForm";
import { Context as AuthContext } from "../context/AuthContext";
import { AuthCtx } from "./SignUpScreen";

const SignInScreen: NavigationStackScreenComponent = () => {
  const {
    signin,
    state: { loginError },
    clearError
  } = useContext(AuthContext) as AuthCtx;

  return (
    <>
      <NavigationEvents onWillBlur={() => clearError()} />
      <AuthForm
        btnTitle="Sign In"
        redirectBtnTitle="Don't have an account? Go to sign up"
        redirectRoute="Signup"
        heading="Sign In"
        errorMessage={loginError}
        login={signin}
      />
    </>
  );
};

SignInScreen.navigationOptions = { header: () => null };

export default SignInScreen;

const styles = StyleSheet.create({});
