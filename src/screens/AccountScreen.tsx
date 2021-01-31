import React, { useContext } from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { NavigationBottomTabScreenComponent } from "react-navigation-tabs";
import { Context as AuthContext } from "../context/AuthContext";
import { AuthCtx } from "./SignUpScreen";

const AccountScreen: NavigationBottomTabScreenComponent = ({ navigation }) => {
  const { signout } = useContext(AuthContext) as AuthCtx;
  LogBox.ignoreLogs([
    "Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants)."
  ]);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Button title="Log Out" onPress={() => signout(navigation)} />
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
