import React from "react";
import { View, Text } from "react-native";

export const Sims = ({ navigation, route }) => {
  return (
    <View>
      <Text>{route.params.customer.name}</Text>
    </View>
  );
};
