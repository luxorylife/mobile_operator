import React from "react";

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
        headerStatusBarHeight: 50,
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
        options={{ title: "Список тарифов" }}
      />
      <Stack.Screen
        name="TariffItem"
        component={TariffItem}
        options={{ title: "Тариф" }}
      />
      <Stack.Screen
        name="ServicesList"
        component={ServicesList}
        options={{ title: "Список услуг" }}
      />
      <Stack.Screen
        name="ServiceItem"
        component={ServiceItem}
        options={{ title: "Услуга" }}
      />
    </Stack.Navigator>
  );
};
