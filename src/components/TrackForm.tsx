import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { Context as LocationContext } from "../context/LocationContext";
import { LocationCtx } from "../screens/TrackCreateScreen";
import Spacer from "./Spacer";

const TrackForm = () => {
  const [name, setName] = useState<string>("");
  const {
    state: { recording, locations },
    record
  } = useContext(LocationContext) as LocationCtx;
  console.log(locations.length);
  return (
    <View>
      <Input
        style={{ marginTop: 30 }}
        placeholder="Track Name"
        onChangeText={setName}
        value={name}
      />
      <Spacer>
        {!recording ? (
          <Button
            title="Start Recording"
            disabled={name.trim().length === 0}
            onPress={() => record(true)}
          />
        ) : (
          <Button title="Recording..." onPress={() => record(false)} />
        )}
      </Spacer>
    </View>
  );
};

export default TrackForm;

const styles = StyleSheet.create({});
