import { Accuracy, getCurrentPositionAsync } from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";
import { LocationCtx } from "../screens/TrackCreateScreen";

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
  const {
    state: { currentLocation }
  } = useContext(LocationContext) as LocationCtx;
  //   console.log(currentLocation);
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
        ...(currentLocation?.coords || { latitude, longitude }),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
      <Circle
        center={{ ...(currentLocation?.coords || { latitude, longitude }) }}
        radius={30}
        strokeColor="rgba(158,158,255,1)"
        fillColor="rgba(158,158,255,.3)"
      />
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});
