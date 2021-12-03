import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

// redux
import { useSelector } from "react-redux";

// nav
import { useIsFocused } from "@react-navigation/native";

// api
import { getSims } from "../../../requests/requests";

export const Sims = ({ navigation }) => {
  const customer = useSelector((state) => state.customer);
  const user = useSelector((state) => state.user);

  const [sims, setSims] = useState([]);

  const focus = useIsFocused();

  useEffect(async () => {
    const response = await getSims(user.login, user.password, customer.id);

    if (response) setSims(response);
  }, [focus]);

  return (
    <View>
      <Text>{`Здравствуйте, ${customer["name"]}!`}</Text>
      <FlatList
        style={{ width: "100%" }}
        data={sims}
        renderItem={({ item, index }) => (
          <ListItem
            sim={item}
            nav={() => navigation.navigate("Sim")}
            i={index}
          />
        )}
        keyExtractor={(item) => String(item.sim_id)}
      />
    </View>
  );
};

const ListItem = ({ sim, i, nav }) => {
  const btnhandler = () => {
    // redux
  };

  return (
    <TouchableOpacity onPress={btnhandler}>
      <Text>{`Sim №${i + 1}`}</Text>
      <Text>{sim.phone_number}</Text>
    </TouchableOpacity>
  );
};
