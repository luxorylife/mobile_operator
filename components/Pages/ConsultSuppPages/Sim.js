import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

// redux
import { useSelector } from "react-redux";

// nav
import { useIsFocused } from "@react-navigation/native";

// api
import { getSimTariff, getTariff } from "../../../requests/requests";

export const Sim = ({ navigation }) => {
  const simId = useSelector((state) => state.sim);
  const user = useSelector((state) => state.user);

  const [sim, setSim] = useState({});

  const focus = useIsFocused();

  useEffect(async () => {
    const response = await getSimTariff(
      user.login,
      user.password,
      simId.sim_id
    );
    setSim({
      tariff: response.tariffs.name,
      number: simId.phone_number,
    });
  }, [focus]);

  const tariffNandler = async () => {
    const response = await getTariff(user.login, user.password, sim.tariff);

    navigation.navigate("TariffItem", {
      isNew: false,
      item: response,
      change: false,
    });
  };

  const serviceHandler = () => {
    navigation.navigate("ServicesList");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={styles.title}
        >{`Номер телефона: ${simId.phone_number}`}</Text>
        <TouchableOpacity style={styles.card} onPress={tariffNandler}>
          <Text style={styles.title}>{`Тариф: ${sim.tariff}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={serviceHandler}>
          <Text style={styles.title}>{`Услуги`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
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
