import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import Spacer from "../components/Spacer";
import {
  Context as AuthContext,
  SigninAction,
  SignupAction
} from "../context/AuthContext";

interface Ctx {
  signup: (values: SignupAction["payload"]) => void;
  signin: (values: SigninAction["payload"]) => void;
  signout: () => void;
  state: {};
}

const SignUpScreen: NavigationStackScreenComponent = ({ navigation }) => {
  // useEffect(() => {
  //   const test = async () => {
  //     try {
  //       const {
  //         data
  //       } = await axios.post("https://www.way4biz.com/api/products", {
  //         itemsToSkip: 0
  //       });
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   test();
  // }, []);
  const { signup } = useContext(AuthContext) as Ctx;
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
          onPress={() => {
            if (email.trim().length !== 0 && password.trim().length !== 0) {
              signup({ email, password });
            }
            //  navigation.navigate("mainFlow")
          }}
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
