import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// icons
import { AntDesign } from "@expo/vector-icons";

export const Lists = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Item title="Тарифы" nav={() => navigation.navigate("TariffsList")} />
      <Item title="Услуги" nav={() => navigation.navigate("ServicesList")} />
    </View>
  );
};

const Item = (props) => {
  return (
    <TouchableOpacity
      onPress={props.nav}
      style={styles.button}
      activeOpacity={0.7}
    >
      <Text style={styles.header}>{props.title}</Text>
      <AntDesign name="rightcircle" size={32} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8EE4AF",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#FBEEC1",
    borderWidth: 1,
    flexDirection: "row",
    height: 80,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
