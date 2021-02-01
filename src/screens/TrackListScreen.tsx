import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

const TrackListScreen: NavigationStackScreenComponent = ({ navigation }) => {
  useEffect(() => {
    console.log("mounted");
  }, []);
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
