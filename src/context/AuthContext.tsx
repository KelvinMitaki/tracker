import axios from "../axios/axios";
import createDataContext from "./createDataContext";

export interface AuthState {
  registerError: string;
}

interface DefaultAction {
  type: "";
  payload?: any;
}
export interface SignupAction {
  type: "signup";
  payload?: { email: string; password: string };
}
export interface SigninAction {
  type: "signin";
  payload?: { email: string; password: string };
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
    case "registerError":
      return { ...state, registerError: action.payload };
    default:
      return state;
  }
};

const signup = (
  dispatch: React.Dispatch<SignupAction | Error<"registerError">>
) => async (data: SignupAction["payload"]) => {
  try {
    const { email, password } = data!;
    const res = await axios.post(`/signup`, { email, password });
    console.log(res);
  } catch (error) {
    dispatch({ type: "registerError", payload: error.response.data.message });
  }
};
const signin = (dispatch: React.Dispatch<SigninAction>) => (
  data: SigninAction["payload"]
) => {};
const signout = (dispatch: React.Dispatch<SignoutAction>) => () => {};

export const { Context, Provider } = createDataContext(
  reducer,
  { signup, signin, signout },
  { isSignedIn: false, registerError: "" }
);
