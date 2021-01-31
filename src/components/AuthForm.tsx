import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import {
  NavigationInjectedProps,
  NavigationParams,
  NavigationRoute,
  NavigationScreenProp,
  withNavigation
} from "react-navigation";
import Spacer from "./Spacer";

interface Props {
  errorMessage: string;
  login: (values: {
    email: string;
    password: string;
    navigation: NavigationScreenProp<
      NavigationRoute<NavigationParams>,
      NavigationParams
    >;
    setLoading: (value: React.SetStateAction<boolean>) => void;
  }) => Promise<void>;
  redirectRoute: string;
  redirectBtnTitle: string;
  btnTitle: string;
  heading: string;
}

const AuthForm: React.FC<Props & NavigationInjectedProps> = props => {
  const {
    navigation,
    errorMessage,
    login,
    redirectRoute,
    redirectBtnTitle,
    btnTitle,
    heading
  } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <View style={styles.view}>
      <Spacer>
        <Text h4 style={styles.heading}>
          {heading}
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
        errorMessage={errorMessage}
        errorStyle={{ fontSize: 17, textTransform: "capitalize" }}
      />
      <Spacer>
        <Button
          title={btnTitle}
          onPress={async () => {
            if (email.trim().length !== 0 && password.trim().length !== 0) {
              await login({ email, password, navigation, setLoading });
            }
          }}
          loading={loading}
          disabled={loading}
        />
      </Spacer>
      <Spacer>
        <Button
          type="clear"
          title={redirectBtnTitle}
          onPress={() => navigation.navigate(redirectRoute)}
        />
      </Spacer>
    </View>
  );
};

export default withNavigation(AuthForm);

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
