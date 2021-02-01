import React, { useContext, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Platform,
  StyleSheet,
  View
} from "react-native";
import { ListItem, Text } from "react-native-elements";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
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
    <SafeAreaView>
      <FlatList
        data={tracks}
        keyExtractor={item => item._id!}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TrackDetail", { _id: item._id })
            }
          >
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

TrackListScreen.navigationOptions = {
  title: "Tracks",
  headerTitleAlign: "center"
};

export default TrackListScreen;

const styles = StyleSheet.create({});
