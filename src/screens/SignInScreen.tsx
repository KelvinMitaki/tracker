import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthForm from "../components/AuthForm";
import { Context as AuthContext } from "../context/AuthContext";
import { AuthCtx } from "./SignUpScreen";

const SignInScreen = () => {
  const {
    signin,
    state: { loginError }
  } = useContext(AuthContext) as AuthCtx;

  return (
    <AuthForm
      btnTitle="Sign In"
      redirectBtnTitle="Don't have an account? Go to sign up"
      redirectRoute="Signup"
      heading="Sing In"
      errorMessage={loginError}
      login={signin}
    />
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
