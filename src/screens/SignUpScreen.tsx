import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

const SignUpScreen: NavigationStackScreenComponent = ({ navigation }) => {
  return (
    <View>
      <Text>SignUpScreen SignUpScreen</Text>
      <Button
        title="Go to Sign in"
        onPress={() => navigation.navigate("Signin")}
      />
      <Button
        title="Go to main flow"
        onPress={() => navigation.navigate("mainFlow")}
      />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
