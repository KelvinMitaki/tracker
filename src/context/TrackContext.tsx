import React from "react";
import { LocationObject } from "expo-location";
import { DefaultAction } from "./AuthContext";
import createDataContext from "./createDataContext";
import axios from "../axios/axios";

export interface TrackState {
  tracks: Track[] | null;
}

interface FetchTracks {
  type: "fetchTracks";
  payload: Track[];
}

export interface Track {
  locations: LocationObject[];
  name: string;
}

interface CreateTrack {
  type: "createTrack";
  payload: Track;
}

type Action = DefaultAction | FetchTracks | CreateTrack;

const reducer = (state: TrackState, action: Action): TrackState => {
  switch (action.type) {
    case "fetchTracks":
      return { ...state, tracks: action.payload };
    case "createTrack":
      return { ...state, tracks: [...(state.tracks || []), action.payload] };
    default:
      return state;
  }
};

const fetchTracks = (dispatch: React.Dispatch<FetchTracks>) => async () => {
  try {
    const { data } = await axios.get("/tracks");
    dispatch({ type: "fetchTracks", payload: data });
  } catch (error) {
    console.log(error);
  }
};
const createTrack = (dispatch: React.Dispatch<CreateTrack>) => async (
  track: LocationObject[],
  name: string
) => {
  try {
    const { data } = await axios.post("/tracks", { locations: track, name });
    dispatch({ type: "createTrack", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext<TrackState>(
  reducer,
  { fetchTracks, createTrack },
  { tracks: null }
);
