import createDataContext from "./createDataContext";

interface State {}

interface DefaultAction {
  type: "";
  payload?: any;
}
interface SignupAction {
  type: "signup";
  payload: { email: string; password: string };
}
interface SigninAction {
  type: "signin";
  payload: { email: string; password: string };
}
interface SignoutAction {
  type: "signout";
}

type Action = DefaultAction | SignupAction;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = (dispatch: React.Dispatch<SignupAction>) => (
  data: SignupAction["payload"]
) => {};
const signin = (dispatch: React.Dispatch<SigninAction>) => (
  data: SigninAction["payload"]
) => {};
const signout = (dispatch: React.Dispatch<SignoutAction>) => () => {};

export const { Context, Provider } = createDataContext(
  reducer,
  { signup, signin, signout },
  { isSignedIn: false }
);
