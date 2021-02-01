import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Spacer from "./Spacer";

const TrackForm = () => {
  return (
    <View>
      <Input style={{ marginTop: 30 }} placeholder="Track Name" />
      <Spacer>
        <Button title="Start Recording" />
      </Spacer>
    </View>
  );
};

export default TrackForm;

const styles = StyleSheet.create({});
