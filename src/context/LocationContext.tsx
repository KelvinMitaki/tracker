import React from "react";
import { LocationObject } from "expo-location";
import { DefaultAction } from "./AuthContext";
import createDataContext from "./createDataContext";

export interface LocationState {
  currentLocation: LocationObject | null;
  locations: LocationObject[];
  recording: boolean;
}

interface RecordAction {
  type: "record";
  payload: boolean;
}

interface LocationAction {
  type: "addLocation";
  payload: LocationObject;
}

interface ResetLocationAction {
  type: "resetLocations";
}
interface CurrentLocationAction {
  type: "addCurrentLocation";
  payload: LocationObject;
}

type Action =
  | DefaultAction
  | RecordAction
  | LocationAction
  | CurrentLocationAction
  | ResetLocationAction;

const reducer = (state: LocationState, action: Action): LocationState => {
  switch (action.type) {
    case "record":
      return { ...state, recording: action.payload };
    case "addLocation":
      return {
        ...state,
        locations: [...state.locations, action.payload]
      };
    case "addCurrentLocation":
      return { ...state, currentLocation: action.payload };
    case "resetLocations":
      return { ...state, locations: [] };
    default:
      return state;
  }
};

const record = (dispatch: React.Dispatch<RecordAction>) => (
  record: boolean
) => {
  dispatch({ type: "record", payload: record });
};
const addLocation = (
  dispatch: React.Dispatch<LocationAction | CurrentLocationAction>
) => (location: LocationObject, recording: boolean) => {
  dispatch({ type: "addCurrentLocation", payload: location });
  if (recording) {
    dispatch({ type: "addLocation", payload: location });
  }
};
const resetLocations = (
  dispatch: React.Dispatch<ResetLocationAction>
) => () => {
  dispatch({ type: "resetLocations" });
};

export const { Context, Provider } = createDataContext<LocationState>(
  reducer,
  { record, addLocation, resetLocations },
  { currentLocation: null, locations: [], recording: false }
);
