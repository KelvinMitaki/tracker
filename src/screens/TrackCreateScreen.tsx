import { LocationObject } from "expo-location";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import Map from "../components/Map";
import TrackForm from "../components/TrackForm";
import {
  Context as LocationContext,
  LocationState
} from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import "../_mocLocation";

export interface LocationCtx {
  state: LocationState;
  record: (record: boolean) => void;
  addLocation: (location: LocationObject, recording: boolean) => void;
}

const TrackCreateScreen = () => {
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
        onWillBlur={() => subscriber && subscriber.remove()}
        onDidFocus={() => startWatching()}
      />
      {err && <Text>Please enable location services</Text>}
      <TrackForm />
    </SafeAreaView>
  );
};

export default TrackCreateScreen;

const styles = StyleSheet.create({});
