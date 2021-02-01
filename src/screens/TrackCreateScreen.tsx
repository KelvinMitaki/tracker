import {
  Accuracy,
  LocationObject,
  requestPermissionsAsync,
  watchPositionAsync
} from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
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
  const [err] = useLocation({ addLocation });
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2 style={{ alignSelf: "center" }}>
        Create A Track
      </Text>
      <Map />
      {err && <Text>Please enable location services</Text>}
    </SafeAreaView>
  );
};

export default TrackCreateScreen;

const styles = StyleSheet.create({});
