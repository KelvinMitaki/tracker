import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import Spacer from "../components/Spacer";

const SignUpScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <View style={styles.view}>
      <Spacer>
        <Text h4 style={styles.heading}>
          Sign Up For A Tracker
        </Text>
      </Spacer>
      <Input
        label="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Password"
        onChangeText={setPassword}
        value={password}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <Spacer>
        <Button
          title="Sign Up"
          //    onPress={() => navigation.navigate("mainFlow")}
        />
      </Spacer>
    </View>
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