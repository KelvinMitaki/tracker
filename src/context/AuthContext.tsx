import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../axios/axios";
import createDataContext from "./createDataContext";

export interface AuthState {
  registerError: string;
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

type Action = DefaultAction | SignupAction | Error<"registerError">;

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "signup":
      return { ...state, token: action.payload as string, registerError: "" };
    case "registerError":
      return { ...state, registerError: action.payload };
    default:
      return state;
  }
};

const signup = (
  dispatch: React.Dispatch<SignupAction | Error<"registerError">>
) => async (data: { email: string; password: string }) => {
  try {
    const { email, password } = data!;
    const res = await axios.post(`/signup`, { email, password });
    const token = res.data.token;
    await AsyncStorage.setItem("token", token);
    dispatch({ type: "signup", payload: token });
  } catch (error) {
    dispatch({ type: "registerError", payload: error.response.data.message });
  }
};
const signin = (dispatch: React.Dispatch<SigninAction>) => (data: {
  email: string;
  password: string;
}) => {};
const signout = (dispatch: React.Dispatch<SignoutAction>) => () => {};

export const { Context, Provider } = createDataContext<AuthState>(
  reducer,
  { signup, signin, signout },
  { token: null, registerError: "" }
);
