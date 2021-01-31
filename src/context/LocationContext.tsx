import { LocationObject } from "expo-location";
import { DefaultAction } from "./AuthContext";
import createDataContext from "./createDataContext";

export interface LocationState {
  currentLocation: LocationObject | null;
  locations: LocationObject[];
  recording: boolean;
}

type Action = DefaultAction;

const reducer = (state: LocationState, action: Action): LocationState => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext<LocationState>(
  reducer,
  {},
  { currentLocation: null, locations: [], recording: false }
);
