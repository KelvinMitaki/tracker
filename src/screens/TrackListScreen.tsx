import React, { useContext, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Context as TrackContext } from "../context/TrackContext";
import { TrackCtx } from "./TrackCreateScreen";

const TrackListScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const {
    fetchTracks,
    state: { tracks }
  } = useContext(TrackContext) as TrackCtx;
  useEffect(() => {
    fetchTracks();
  }, []);
  if (!tracks) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        {Platform.OS === "android" ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    );
  }
  return (
    <View>
      <Text>TrackListScreen TrackListScreen</Text>
      <Button
        onPress={() => navigation.navigate("TrackDetail")}
        title="Go to track detail"
      />
    </View>
  );
};

export default TrackListScreen;

const styles = StyleSheet.create({});
