import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

// stack nav
import { createStackNavigator } from "@react-navigation/stack";

// components
import { Sims, Sim, PassportInput } from "./";
import { TariffsList, TariffItem } from "../Tariffs/";
import { ServicesList, ServiceItem } from "../Services";

// role
import { ROLE_CONSULT, ROLE_SUPPORT } from "../../../const/roles";

// redux
import { useSelector, useDispatch } from "react-redux";

// api
import { addSim } from "../../../requests/requests";
import { setSim } from "../../../store/actions";

export const SimsStack = () => {
  const Stack = createStackNavigator();

  const user = useSelector((state) => state.user);
  const customer = useSelector((state) => state.customer);

  const dispatch = useDispatch();

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
        options={({ navigation }) => ({
          title: "Список sim-карт",
          headerRight: () =>
            user.role === ROLE_CONSULT && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  addSim(user.login, user.password, customer.id, 1);
                  dispatch(setSim({}));
                }}
              >
                <Text style={styles.text}>Добавить</Text>
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="Sim"
        component={Sim}
        options={({ route }) => ({
          title: route.params.isNew ? "Новая sim-карта" : "Sim-карта",
        })}
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
        options={({ route }) => ({
          title: route.params.change ? "Нвоый тариф" : "Подключенный тариф",
        })}
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
