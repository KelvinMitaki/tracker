import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTracks from "../hooks/useSaveTracks";
import { LocationCtx } from "../screens/TrackCreateScreen";
import Spacer from "./Spacer";

const TrackForm = () => {
  const [name, setName] = useState<string>("");
  const {
    state: { recording, locations },
    record
  } = useContext(LocationContext) as LocationCtx;
  const [saveTrack] = useSaveTracks();
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
      <Spacer>
        {!recording && locations.length && name.trim().length && (
          <Button
            title="Save"
            buttonStyle={{ marginTop: 20 }}
            onPress={() => saveTrack(name)}
          />
        )}
      </Spacer>
    </View>
  );
};

export default TrackForm;

const styles = StyleSheet.create({});
