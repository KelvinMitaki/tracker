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
import "../_mocLocation";

export interface LocationCtx {
  state: LocationState;
  record: (record: boolean) => void;
  addLocation: (location: LocationObject) => void;
}

const TrackCreateScreen = () => {
  const [err, setError] = useState<{ [key: string]: string } | string | null>(
    null
  );
  const { addLocation } = useContext(LocationContext) as LocationCtx;
  useEffect(() => {
    startWatching();
  }, []);
  const startWatching = async () => {
    try {
      const response = await requestPermissionsAsync();
      if (!response.granted) {
        setError("denined");
      } else {
        err && setError(null);
        await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          location => {
            addLocation(location);
          }
        );
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Create A Track</Text>
      <Map />
      {err && <Text>Please enable location services</Text>}
    </SafeAreaView>
  );
};

export default TrackCreateScreen;

const styles = StyleSheet.create({});
