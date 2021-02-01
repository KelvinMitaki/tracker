import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import MapView, { Polyline } from "react-native-maps";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Context as TrackContext } from "../context/TrackContext";
import { TrackCtx } from "./TrackCreateScreen";

const TrackDetailScreen: NavigationStackScreenComponent<{ _id?: string }> = ({
  navigation
}) => {
  const {
    state: { tracks }
  } = useContext(TrackContext) as TrackCtx;
  const track = tracks?.find(trck => trck._id === navigation.getParam("_id"));
  return (
    <View>
      <Text h4 style={{ marginVertical: 10, alignSelf: "center" }}>
        {track?.name}
      </Text>
      <MapView
        style={{ height: 300 }}
        initialRegion={{
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          ...{ ...track!.locations[0].coords }
        }}
      >
        <Polyline coordinates={track!.locations.map(l => l.coords)} />
      </MapView>
    </View>
  );
};

export default TrackDetailScreen;

const styles = StyleSheet.create({});
