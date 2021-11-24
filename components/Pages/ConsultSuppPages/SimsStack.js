import React from "react";
import { View, Text, StyleSheet } from "react-native";

// css
import { mainStyle } from "../../../MainStyle";

export const SimsStack = () => {
  return (
    <View style={styles.container}>
      <Text>Sim-карты</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBEEC1",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
