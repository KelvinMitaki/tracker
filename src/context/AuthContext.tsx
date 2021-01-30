import axios from "../axios/axios";
import createDataContext from "./createDataContext";

interface State {}

interface DefaultAction {
  type: "";
  payload?: any;
}
export interface SignupAction {
  type: "signup";
  payload: { email: string; password: string };
}
export interface SigninAction {
  type: "signin";
  payload: { email: string; password: string };
}
export interface SignoutAction {
  type: "signout";
}

type Action = DefaultAction | SignupAction;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = (dispatch: React.Dispatch<SignupAction>) => async (
  data: SignupAction["payload"]
) => {
  try {
    const { email, password } = data;
    const res = await axios.post(`/signup`, { email, password });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
const signin = (dispatch: React.Dispatch<SigninAction>) => (
  data: SigninAction["payload"]
) => {};
const signout = (dispatch: React.Dispatch<SignoutAction>) => () => {};

export const { Context, Provider } = createDataContext(
  reducer,
  { signup, signin, signout },
  { isSignedIn: false }
);
