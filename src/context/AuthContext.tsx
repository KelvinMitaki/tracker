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
export interface ClearErrorAction {
  type: "clearError";
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
  | Error<"loginError">
  | ClearErrorAction;

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
    case "clearError":
      return { ...state, loginError: "", registerError: "" };
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
  const { email, password, navigation, setLoading } = data!;
  try {
    setLoading(true);
    const res = await axios.post(`/signup`, { email, password });
    const token = res.data.token;
    await AsyncStorage.setItem("token", token);
    dispatch({ type: "signup", payload: token });
    setLoading(false);
    navigation.navigate("mainFlow");
  } catch (error) {
    setLoading(false);
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
  const { email, password, navigation, setLoading } = data!;
  try {
    setLoading(true);
    const res = await axios.post(`/signin`, { email, password });
    const token = res.data.token;
    await AsyncStorage.setItem("token", token);
    dispatch({ type: "signin", payload: token });
    setLoading(false);
    navigation.navigate("mainFlow");
  } catch (error) {
    setLoading(false);
    dispatch({ type: "loginError", payload: error.response.data.message });
  }
};
const signout = (dispatch: React.Dispatch<SignoutAction>) => () => {};
const clearError = (dispatch: React.Dispatch<ClearErrorAction>) => () => {
  dispatch({ type: "clearError" });
};
const tryLocalSignin = (dispatch: React.Dispatch<SigninAction>) => async (
  navigation: StackNavigationProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >
) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigation.navigate("mainFlow");
  } else {
    navigation.navigate("loginFlow");
  }
};

export const { Context, Provider } = createDataContext<AuthState>(
  reducer,
  { signup, signin, signout, clearError, tryLocalSignin },
  { token: null, registerError: "", loginError: "" }
);
