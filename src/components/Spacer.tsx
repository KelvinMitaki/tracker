import React from "react";
import { StyleSheet, View } from "react-native";

const Spacer: React.FC = ({ children }) => {
  return <View style={styles.view}>{children}</View>;
};

export default Spacer;

const styles = StyleSheet.create({
  view: {
    marginHorizontal: 10
  }
});
