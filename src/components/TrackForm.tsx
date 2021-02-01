import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Spacer from "./Spacer";

const TrackForm = () => {
  return (
    <View>
      <Input placeholder="Track Name" />
      <Spacer>
        <Button title="Record" />
      </Spacer>
    </View>
  );
};

export default TrackForm;

const styles = StyleSheet.create({});
