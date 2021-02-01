import { useContext } from "react";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as TrackContext } from "../context/TrackContext";
import { LocationCtx, TrackCtx } from "../screens/TrackCreateScreen";

export default () => {
  const {
    state: { locations }
  } = useContext(LocationContext) as LocationCtx;
  const { createTrack } = useContext(TrackContext) as TrackCtx;
  const saveTrack = (name: string) => {
    if (name && locations.length) {
      createTrack(locations, name);
    }
  };
  return [saveTrack];
};