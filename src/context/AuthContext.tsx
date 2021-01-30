import createDataContext from "./createDataContext";

interface State {}

interface DefaultAction {
  type: "";
  payload?: any;
}

type Action = DefaultAction;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(
  reducer,
  {},
  { isSignedIn: false }
);
