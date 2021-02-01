import { DefaultAction } from "./AuthContext";
import createDataContext from "./createDataContext";

export interface TrackState {}

type Action = DefaultAction;

const reducer = (state: TrackState, action: Action): TrackState => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Provider, Context } = createDataContext<TrackState>(
  reducer,
  {},
  {}
);
