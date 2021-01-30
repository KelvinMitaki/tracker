import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationParams, NavigationRoute } from "react-navigation";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import axios from "../axios/axios";
import createDataContext from "./createDataContext";

export interface AuthState {
  registerError: string;
  loginError: string;
  token: string | null;
}

interface DefaultAction {
  type: "";
  payload?: any;
}
export interface SignupAction {
  type: "signup";
  payload: string;
}
export interface SigninAction {
  type: "signin";
  payload: string;
}
export interface SignoutAction {
  type: "signout";
}

export interface Error<T> {
  type: T;
  payload: string;
}

type Action =
  | DefaultAction
  | SignupAction
  | SigninAction
  | Error<"registerError">
  | Error<"loginError">;

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "signup":
      return {
        ...state,
        token: action.payload as string,
        registerError: "",
        loginError: ""
      };
    case "signin":
      return {
        ...state,
        token: action.payload,
        loginError: "",
        registerError: ""
      };
    case "registerError":
      return { ...state, registerError: action.payload };
    case "loginError":
      return { ...state, loginError: action.payload };
    default:
      return state;
  }
};

const signup = (
  dispatch: React.Dispatch<SignupAction | Error<"registerError">>
) => async (data: {
  email: string;
  password: string;
  navigation: StackNavigationProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >;
  setLoading: (value: React.SetStateAction<boolean>) => void;
}) => {
  try {
    const { email, password, navigation, setLoading } = data!;
    const res = await axios.post(`/signup`, { email, password });
    const token = res.data.token;
    await AsyncStorage.setItem("token", token);
    dispatch({ type: "signup", payload: token });
    setLoading(false);
    navigation.navigate("mainFlow");
  } catch (error) {
    dispatch({ type: "registerError", payload: error.response.data.message });
  }
};
const signin = (
  dispatch: React.Dispatch<SigninAction | Error<"loginError">>
) => async (data: {
  email: string;
  password: string;
  navigation: StackNavigationProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >;
  setLoading: (value: React.SetStateAction<boolean>) => void;
}) => {
  try {
    const { email, password, navigation, setLoading } = data!;
    const res = await axios.post(`/signin`, { email, password });
    const token = res.data.token;
    setLoading(true);
    await AsyncStorage.setItem("token", token);
    dispatch({ type: "signin", payload: token });
    setLoading(false);
    navigation.navigate("mainFlow");
  } catch (error) {
    dispatch({ type: "loginError", payload: error.response.data.message });
  }
};
const signout = (dispatch: React.Dispatch<SignoutAction>) => () => {};

export const { Context, Provider } = createDataContext<AuthState>(
  reducer,
  { signup, signin, signout },
  { token: null, registerError: "", loginError: "" }
);
