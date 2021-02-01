import React, { useContext } from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { NavigationBottomTabScreenComponent } from "react-navigation-tabs";
import { Context as AuthContext } from "../context/AuthContext";
import { AuthCtx } from "./SignUpScreen";
import { Octicons } from "@expo/vector-icons";

const AccountScreen: NavigationBottomTabScreenComponent = ({ navigation }) => {
  const { signout } = useContext(AuthContext) as AuthCtx;

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Button
        title="Log Out"
        onPress={() => signout(navigation)}
        buttonStyle={{ marginTop: 200 }}
      />
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  tabBarIcon: () => <Octicons name="gear" size={25} />
};

export default AccountScreen;

const styles = StyleSheet.create({});
