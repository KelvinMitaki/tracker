import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Context as AuthContext } from "../context/AuthContext";
import { AuthCtx } from "./SignUpScreen";

const AccountScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { signout } = useContext(AuthContext) as AuthCtx;
  return (
    <View style={{ justifyContent: "center", flex: 1, marginBottom: 300 }}>
      <Button title="Log Out" onPress={() => signout(navigation)} />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
