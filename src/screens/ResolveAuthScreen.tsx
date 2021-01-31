import React, { useContext, useEffect } from "react";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Context as AuthContext } from "../context/AuthContext";
import { AuthCtx } from "./SignUpScreen";

const ResolveAuthScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { tryLocalSignin } = useContext(AuthContext) as AuthCtx;
  useEffect(() => {
    tryLocalSignin(navigation);
  }, []);
  return null;
};

export default ResolveAuthScreen;
