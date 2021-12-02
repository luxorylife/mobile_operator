import React from "react";

// stack nav
import { createStackNavigator } from "@react-navigation/stack";

// components

import { Sims, Sim, PassportInput } from "./";
import { TariffsList, TariffItem } from "../Tariffs/";
import { ServicesList, ServiceItem } from "../Services";

export const SimsStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="PassportInput"
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
        // headerStatusBarHeight: 50,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="PassportInput"
        component={PassportInput}
        options={{ title: "Получение данных" }}
      />
      <Stack.Screen
        name="Sims"
        component={Sims}
        options={{
          title: "Sim-карты",
        }}
      />
      <Stack.Screen
        name="Sim"
        component={Sim}
        options={{
          title: "Sim-карта",
        }}
      />
      <Stack.Screen
        name="TariffsList"
        component={TariffsList}
        options={{
          title: "Доступные тарифы",
        }}
      />
      <Stack.Screen
        name="TariffItem"
        component={TariffItem}
        options={{
          title: "Подключенный тариф",
        }}
      />
      <Stack.Screen
        name="ServicesList"
        component={ServicesList}
        options={{
          title: "Подключенные услуги",
        }}
      />
      <Stack.Screen
        name="ServiceItem"
        component={ServiceItem}
        options={{
          title: "Услуга",
        }}
      />
    </Stack.Navigator>
  );
};
