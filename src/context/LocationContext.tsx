import React from "react";
import { LocationObject } from "expo-location";
import { DefaultAction } from "./AuthContext";
import createDataContext from "./createDataContext";

export interface LocationState {
  currentLocation: LocationObject | null;
  locations: LocationObject[];
  recording: boolean;
}

export interface RecordAction {
  type: "record";
  payload: boolean;
}

export interface LocationAction {
  type: "addLocation";
  payload: LocationObject;
}

type Action = DefaultAction | RecordAction | LocationAction;

const reducer = (state: LocationState, action: Action): LocationState => {
  switch (action.type) {
    case "record":
      return { ...state, recording: action.payload };
    default:
      return state;
  }
};

const record = (dispatch: React.Dispatch<RecordAction>) => (
  record: boolean
) => {
  dispatch({ type: "record", payload: record });
};
const addLocation = (dispatch: React.Dispatch<LocationAction>) => (
  location: LocationObject
) => {
  dispatch({ type: "addLocation", payload: location });
};

export const { Context, Provider } = createDataContext<LocationState>(
  reducer,
  { record, addLocation },
  { currentLocation: null, locations: [], recording: false }
);
