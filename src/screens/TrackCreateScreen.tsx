import {
  Accuracy,
  getCurrentPositionAsync,
  requestPermissionsAsync,
  watchPositionAsync
} from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import Map from "../components/Map";
// import "../_mocLocation";

const TrackCreateScreen = () => {
  const [err, setError] = useState<{ [key: string]: string } | string | null>(
    null
  );
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
            console.log({ location });
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
