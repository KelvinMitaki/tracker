import { requestPermissionsAsync } from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import Map from "../components/Map";

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
        setError(null);
      }
      console.log(response);
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
