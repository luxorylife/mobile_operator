import React from "react";

// nav
import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// nav components
import { Profile } from "../Pages/Profile";
import { ListsStack, ReportsStack } from "../Pages/BossPages";
import { SimsStack } from "../Pages/ConsultSuppPages";

// redux
import { useSelector } from "react-redux";

// const
import { ROLE_BOSS } from "../../const/roles";

const Tab = createBottomTabNavigator();

export const Main = () => {
  const isBoss = useSelector((state) => state.user.role === ROLE_BOSS);

  if (isBoss) return bossNav();
  else return consultNav();
};

const bossNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="ReportsStack"
        component={ReportsStack}
        options={{
          tabBarLabel: "Отчеты",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clipboard-list" size={size} color={color} />
          ),
          headerShown: false,
          tabBarActiveBackgroundColor: "#FBEEC1",
        }}
      />

      <Tab.Screen
        name="ListsStack"
        component={ListsStack}
        options={{
          tabBarLabel: "Списки",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="tasks" size={size} color={color} />
          ),
          headerShown: false,
          tabBarActiveBackgroundColor: "#8EE4AF",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Профиль",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
          headerShown: false,
          tabBarActiveBackgroundColor: "#E7717D",
        }}
      />
    </Tab.Navigator>
  );
};

const consultNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="Sim"
        component={SimsStack}
        options={{
          tabBarLabel: "Sim-карты",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="microchip" size={size} color={color} />
          ),
          headerShown: false,
          tabBarActiveBackgroundColor: "#FBEEC1",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Профиль",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
          headerShown: false,
          tabBarActiveBackgroundColor: "#E7717D",
        }}
      />
    </Tab.Navigator>
  );
};
