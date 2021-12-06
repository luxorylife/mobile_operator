import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setSim } from "../../../store/actions";

// nav
import { useIsFocused } from "@react-navigation/native";

// api
import {
  getSimTariff,
  getTariff,
  blockSim,
  unblockSim,
} from "../../../requests/requests";

export const Sim = ({ navigation }) => {
  const simId = useSelector((state) => state.sim);
  const user = useSelector((state) => state.user);

  const [sim, setSimState] = useState({});

  const focus = useIsFocused();

  const dispatch = useDispatch();

  useEffect(async () => {
    const response = await getSimTariff(
      user.login,
      user.password,
      simId.sim_id
    );
    setSimState({
      tariff: response.tariffs.name,
      active: response.sims.active,
      number: simId.phone_number,
      pin1: response.sims.pin1,
      pin2: response.sims.pin2,
      puk1: response.sims.puk1,
      puk2: response.sims.puk2,
    });
    console.log(simId);
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

  const btnHandler = async () => {
    const response = await blockSim(user.login, user.password, simId.sim_id);

    console.log(response);

    if (response && response < 300) {
      dispatch(
        setSim({
          ...sim,
          active: false,
        })
      );
      navigation.navigate("Sims");
    }
  };

  const btnHandlerUnblock = async () => {
    const response = await unblockSim(user.login, user.password, simId.sim_id);

    console.log(response);

    if (response && response < 300) {
      dispatch(
        setSim({
          ...sim,
          active: true,
        })
      );
      navigation.navigate("Sims");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={styles.title}
        >{`Номер телефона: ${simId.phone_number}`}</Text>
        <Text>{`Статус: ${sim.active ? " Активна" : " Неактивна"}`}</Text>
        <TouchableOpacity style={styles.card} onPress={tariffNandler}>
          <Text style={styles.title}>{`Тариф: ${sim.tariff}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={serviceHandler}>
          <Text style={styles.title}>{`Услуги`}</Text>
        </TouchableOpacity>
      </View>
      <Text>{`ПИН-1: ${sim.pin1}`}</Text>
      <Text>{`ПИН-2: ${sim.pin2}`}</Text>
      <Text>{`ПУК-1: ${sim.puk1}`}</Text>
      <Text>{`ПУК-2: ${sim.puk2}`}</Text>
      {sim.active ? (
        <View style={styles.btn_view}>
          <TouchableOpacity
            style={styles.buttonDel}
            onPress={() => btnHandler()}
          >
            <Text style={styles.btn_del_text}>Заблокировать</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.btn_view}>
          <TouchableOpacity
            style={styles.buttonDel}
            onPress={() => btnHandlerUnblock()}
          >
            <Text style={styles.btn_del_text}>Активировать</Text>
          </TouchableOpacity>
        </View>
      )}
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
  buttonDel: {
    backgroundColor: "black",
    padding: 8,
    borderRadius: 96,
  },
  btn_del_text: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  btn_view: {
    marginTop: 10,
    alignItems: "flex-end",
    marginRight: 5,
  },
});
