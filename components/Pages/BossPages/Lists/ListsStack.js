import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

// stack nav
import { createStackNavigator } from "@react-navigation/stack";

// components
import { Lists } from "./Lists";
import { TariffsList, TariffItem } from "../../Tariffs";
import { ServicesList, ServiceItem } from "../../Services";

export const ListsStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Lists"
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
        // headerStatusBarHeight: 50,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="Lists"
        component={Lists}
        options={{ title: "Списки" }}
      />
      <Stack.Screen
        name="TariffsList"
        component={TariffsList}
        options={({ navigation }) => ({
          title: "Список тарифов",
          headerRight: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("TariffItem", { isNew: true })}
            >
              <Text style={styles.text}>Добавить</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="TariffItem"
        component={TariffItem}
        options={({ route }) => ({
          title: route.params.isNew ? "Новый тариф" : "Тариф",
        })}
      />
      <Stack.Screen
        name="ServicesList"
        component={ServicesList}
        options={({ navigation }) => ({
          title: "Список услуг",
          headerRight: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("ServiceItem", { isNew: true })
              }
            >
              <Text style={styles.text}>Добавить</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ServiceItem"
        component={ServiceItem}
        options={{ title: "Услуга" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
    backgroundColor: "#8EE4AF",
    padding: 8,
    borderRadius: 96,
  },
  text: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
});
