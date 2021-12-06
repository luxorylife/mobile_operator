import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setSim } from "../../../store/actions";

// nav
import { useIsFocused } from "@react-navigation/native";

// api
import { getSims } from "../../../requests/requests";

export const Sims = ({ navigation }) => {
  const customer = useSelector((state) => state.customer);
  const user = useSelector((state) => state.user);
  const sim = useSelector((state) => state.sim);

  const [sims, setSims] = useState([]);

  const focus = useIsFocused();

  useEffect(async () => {
    const response = await getSims(user.login, user.password, customer.id);

    if (response) setSims(response);
  }, [focus, sim]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Здравствуйте, ${
        customer["name"].split(" ").length > 1
          ? customer["name"].split(" ")[1]
          : customer["name"]
      }!`}</Text>
      <FlatList
        style={{ width: "100%" }}
        data={sims}
        renderItem={({ item, index }) => (
          <ListItem
            sim={item}
            nav={() => navigation.navigate("Sim", { isNew: false })}
            i={index}
          />
        )}
        keyExtractor={(item) => String(item.sim_id)}
      />
    </View>
  );
};

const ListItem = ({ sim, i, nav }) => {
  const dispatch = useDispatch();

  const btnhandler = () => {
    // redux
    dispatch(
      setSim({
        sim_id: sim.sim_id,
        phone_number: sim.phone_number,
      })
    );

    // nav
    nav();
  };

  return (
    <TouchableOpacity onPress={btnhandler} style={styles.card}>
      <Text>{`Sim №${i + 1}`}</Text>
      <Text>{sim.phone_number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    margin: 8,
    padding: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
