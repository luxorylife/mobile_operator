import React from "react";

// nav stack
import { createStackNavigator } from "@react-navigation/stack";

// components
import { Reports } from "./Reports";
import { ReportCustomers } from "./ReportCustomers";
import { ReportServices } from "./ReportServices";
import { ReportDates } from "./ReportDates";

export const ReportsStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Reports"
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
        // headerStatusBarHeight: 50,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="Reports"
        component={Reports}
        options={{ title: "Отчеты" }}
      />
      <Stack.Screen
        name="Dates"
        component={ReportDates}
        options={{ title: 'Отчет "Даты"' }}
      />
      <Stack.Screen
        name="Customers"
        component={ReportCustomers}
        options={{ title: 'Отчет "Абоненты"' }}
      />
      <Stack.Screen
        name="Services"
        component={ReportServices}
        options={{ title: 'Отчет "Услуги"' }}
      />
    </Stack.Navigator>
  );
};
