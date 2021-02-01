import { LocationObject } from "expo-location";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import Map from "../components/Map";
import {
  Context as LocationContext,
  LocationState
} from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import "../_mocLocation";

export interface LocationCtx {
  state: LocationState;
  record: (record: boolean) => void;
  addLocation: (location: LocationObject) => void;
}

const TrackCreateScreen = () => {
  const { addLocation } = useContext(LocationContext) as LocationCtx;
  const [err, subscriber, startWatching] = useLocation(addLocation);
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
    </SafeAreaView>
  );
};

export default TrackCreateScreen;

const styles = StyleSheet.create({});
