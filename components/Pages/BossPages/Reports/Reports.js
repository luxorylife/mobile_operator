import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// icons
import { AntDesign } from "@expo/vector-icons";

export const Reports = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Item title='Отчет "Даты"' nav={() => navigation.navigate("Dates")} />
      <Item
        title='Отчет "Абоненты"'
        nav={() => navigation.navigate("Customers")}
      />
      <Item
        title='Отчет "Услуги"'
        nav={() => navigation.navigate("Services")}
      />
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
    backgroundColor: "#FBEEC1",
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#8EE4AF",
    borderWidth: 1,
    flexDirection: "row",
    height: 80,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
