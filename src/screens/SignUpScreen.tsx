import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import Spacer from "../components/Spacer";
import {
  Context as AuthContext,
  SigninAction,
  SignupAction,
  AuthState
} from "../context/AuthContext";

interface Ctx {
  signup: (values: { email: string; password: string }) => Promise<void>;
  signin: (values: { email: string; password: string }) => Promise<void>;
  signout: () => Promise<void>;
  state: AuthState;
}

const SignUpScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const {
    signup,
    state: { registerError }
  } = useContext(AuthContext) as Ctx;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
        errorMessage={registerError}
        errorStyle={{ fontSize: 17 }}
      />
      <Spacer>
        <Button
          title="Sign Up"
          onPress={async () => {
            if (email.trim().length !== 0 && password.trim().length !== 0) {
              setLoading(true);
              await signup({ email, password });
              setLoading(false);
            }
            //  navigation.navigate("mainFlow")
          }}
          loading={loading}
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
