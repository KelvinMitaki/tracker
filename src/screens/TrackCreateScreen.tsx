import { LocationObject } from "expo-location";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import {
  NavigationEvents,
  NavigationParams,
  NavigationRoute,
  NavigationScreenProp,
  SafeAreaView
} from "react-navigation";
import { NavigationBottomTabScreenComponent } from "react-navigation-tabs";
import Map from "../components/Map";
import TrackForm from "../components/TrackForm";
import {
  Context as LocationContext,
  LocationState
} from "../context/LocationContext";
import { TrackState } from "../context/TrackContext";
import useLocation from "../hooks/useLocation";
import { Ionicons } from "@expo/vector-icons";
import "../_mocLocation";

export interface LocationCtx {
  state: LocationState;
  record: (record: boolean) => void;
  addLocation: (location: LocationObject, recording: boolean) => void;
  resetLocations: () => void;
}

export interface TrackCtx {
  state: TrackState;
  createTrack: (
    track: LocationObject[],
    name: string,
    navigation: NavigationScreenProp<
      NavigationRoute<NavigationParams>,
      NavigationParams
    >
  ) => Promise<void>;
  fetchTracks: () => Promise<void>;
}

const TrackCreateScreen: NavigationBottomTabScreenComponent = () => {
  const {
    addLocation,
    state: { recording }
  } = useContext(LocationContext) as LocationCtx;
  const [err, subscriber, startWatching] = useLocation(
    location => addLocation(location, recording),
    recording
  );
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2 style={{ alignSelf: "center" }}>
        Create A Track
      </Text>
      <Map />
      <NavigationEvents
        onWillBlur={() => !recording && subscriber && subscriber.remove()}
        onDidFocus={() => startWatching()}
      />
      {err && <Text>Please enable location services</Text>}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: () => <Ionicons name="add" size={30} />
};

export default TrackCreateScreen;

const styles = StyleSheet.create({});
