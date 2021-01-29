import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import Spacer from "../components/Spacer";

const SignUpScreen: NavigationStackScreenComponent = ({ navigation }) => {
  return (
    <View>
      <Spacer>
        <Text h4>Sign Up For A Tracker</Text>
      </Spacer>
      <Input label="Email" />
      <Input label="Password" />
      <Spacer>
        <Button
          title="Sign Up"
          //    onPress={() => navigation.navigate("mainFlow")}
        />
      </Spacer>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
