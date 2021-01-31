import { Accuracy, getCurrentPositionAsync } from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

const Map = () => {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number }>(
    { latitude: 0, longitude: 0 }
  );
  useEffect(() => {
    const getLocation = async () => {
      const location = await getCurrentPositionAsync({
        accuracy: Accuracy.BestForNavigation
      });
      const {
        coords: { latitude, longitude }
      } = location;
      setCoords({ latitude, longitude });
    };
    getLocation();
  }, []);
  const { latitude, longitude } = coords;
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
      region={{
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    />
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});
