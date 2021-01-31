import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

const Map = () => {
  return <MapView style={styles.map} />;
};

export default Map;

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});
