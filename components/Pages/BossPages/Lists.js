import React from "react";
import { View, Text, StyleSheet } from "react-native";

// css
import { mainStyle } from "../../../MainStyle";

export const Lists = () => {
  return (
    <View style={styles.container}>
      <Text>Списки</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8EE4AF",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
