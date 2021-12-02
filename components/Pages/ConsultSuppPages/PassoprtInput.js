import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

// api
import { getCustomer, createCustomer } from "../../../requests/requests";

// redux
import { useSelector } from "react-redux";

// nav
import { useIsFocused } from "@react-navigation/native";

export const PassportInput = ({ navigation }) => {
  const user = useSelector((state) => state.user);

  const [isComplete, setIsComplete] = useState(false);
  const [pS, setPs] = useState("");
  const [pN, setPn] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [customer, setCustomer] = useState({});

  const focus = useIsFocused();

  useEffect(() => {
    setPs("");
    setPn("");
    setName("");
    setAddress("");
    setIsComplete(false);
    setCustomer({});
  }, [focus]);

  useEffect(async () => {
    setIsComplete(false);
    if (pS.length === 4 && pN.length === 6 && Number(pN) && Number(pS)) {
      const response = await getCustomer(user.login, user.password, pS, pN);

      if (response.length > 0) {
        setCustomer(response[0]);
        setName(response[0].name);
        setAddress(response[0].address);
      } else {
        setCustomer({});
        setName("");
        setAddress("");
      }
      setIsComplete(true);
    } else setCustomer({});
  }, [pS, pN]);

  const btnHandler = async () => {
    if (
      !(
        name.length &&
        address.length &&
        pS.length === 4 &&
        pN.length === 6 &&
        Number(pN) &&
        Number(pS)
      )
    ) {
      Alert.alert("Предупреждение", "Пожалуйста, заполните поля!");
      return;
    }

    if (customer.name) {
      console.log(customer);
      navigation.navigate("Sims", { customer: customer });
      return;
    }

    // добавление custmer'а и переход на новую страницу
    const newCustomer = {
      name: name,
      address: address,
      passport_series: pS,
      passport_number: pN,
    };

    const response = await createCustomer(
      user.login,
      user.password,
      newCustomer
    );

    if (response[0]) {
      console.log(response);
      navigation.navigate("Sims", { customer: response[0] });
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inp_wrapper}>
        <View style={styles.row}>
          <Text style={{ fontSize: 16 }}>Серия паспорта</Text>
          <TextInput
            style={styles.inp}
            keyboardType="decimal-pad"
            maxLength={4}
            value={pS}
            onChangeText={(text) => setPs(text)}
          />
        </View>
        <View style={styles.row}>
          <Text style={{ fontSize: 16 }}>Номер паспорта</Text>
          <TextInput
            style={styles.inp}
            keyboardType="decimal-pad"
            maxLength={6}
            value={pN}
            onChangeText={(text) => setPn(text)}
          />
        </View>
        {isComplete && (
          <>
            <View style={styles.row}>
              <Text style={{ fontSize: 16 }}>ФИО</Text>
              <TextInput
                style={styles.inp}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={styles.row}>
              <Text style={{ fontSize: 16 }}>Домашний адрес</Text>
              <TextInput
                style={styles.inp}
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
            </View>
          </>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={btnHandler}>
        <Text>Получить данные</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBEEC1",
  },
  inp_wrapper: {
    borderWidth: 1,
    padding: 18,
    backgroundColor: "aqua",
    alignItems: "center",
    width: "80%",
    marginBottom: 24,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  inp: {
    borderBottomWidth: 1,
    padding: 5,
    width: "50%",
    fontSize: 16,
  },
  button: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "yellow",
  },
});
