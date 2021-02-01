import { useContext } from "react";
import {
  NavigationParams,
  NavigationRoute,
  NavigationScreenProp
} from "react-navigation";
import { Context as LocationContext } from "../context/LocationContext";
import { Context as TrackContext } from "../context/TrackContext";
import { LocationCtx, TrackCtx } from "../screens/TrackCreateScreen";

export default () => {
  const {
    state: { locations }
  } = useContext(LocationContext) as LocationCtx;
  const { createTrack } = useContext(TrackContext) as TrackCtx;
  const saveTrack = async (
    name: string,
    navigation: NavigationScreenProp<
      NavigationRoute<NavigationParams>,
      NavigationParams
    >
  ) => {
    if (name && locations.length) {
      await createTrack(locations, name);
    }
  };
  return [saveTrack];
};
