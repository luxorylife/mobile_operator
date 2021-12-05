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
import {
  getCustomer,
  createCustomer,
  updateCustomer,
} from "../../../requests/requests";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setCustomer } from "../../../store/actions";

// nav
import { useIsFocused } from "@react-navigation/native";

export const PassportInput = ({ navigation }) => {
  const user = useSelector((state) => state.user);

  const [isBtnAlive, setIsBtnAlive] = useState(true);

  const [isComplete, setIsComplete] = useState(false);
  const [pS, setPs] = useState("");
  const [pN, setPn] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [customer, setCustomerState] = useState({});

  const focus = useIsFocused();

  const dispatch = useDispatch();

  useEffect(() => {
    setPs("");
    setPn("");
    setName("");
    setAddress("");
    setIsComplete(false);
  }, [focus]);

  useEffect(async () => {
    setIsComplete(false);
    if (pS.length === 4 && pN.length === 6 && Number(pN) && Number(pS)) {
      setIsBtnAlive(false);
      const response = await getCustomer(user.login, user.password, pS, pN);

      if (response.length > 0) {
        setCustomerState(response[0]);
        setName(response[0].name);
        setAddress(response[0].address);
      } else {
        setName("");
        setAddress("");
        setCustomerState({});
      }
      setIsComplete(true);
      setIsBtnAlive(true);
    }
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
      if (
        name !== customer.name ||
        address !== customer.address ||
        pS !== customer.passport_series ||
        pN !== customer.passport_number
      ) {
        Alert.alert(
          "Предупреждение",
          "Введенные данные отличаются от уже существующих. Продолжить?",
          [
            {
              text: "ОК",
              onPress: async () => {
                const response = await updateCustomer(
                  user.login,
                  user.password,
                  customer.id,
                  {
                    name: name,
                    address: address,
                    passport_series: pS,
                    passport_number: pN,
                  }
                );
                console.log(response);
                if (response)
                  if (response < 300) {
                    dispatch(
                      setCustomer({
                        id: customer.id,
                        name: name,
                        address: address,
                        passport_series: pS,
                        passport_number: pN,
                      })
                    );
                    navigation.navigate("Sims");
                  } else {
                    Alert.alert(
                      "Ошибка",
                      "Целостность данных нарушена! Возможно, вы указали неуникальные данные"
                    );
                  }
              },
              style: "ok",
            },
            {
              text: "Отмена",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ]
        );
      } else {
        dispatch(setCustomer(customer));
        navigation.navigate("Sims");
      }
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

    // console.log(1);

    if (response[0]) {
      // console.log(response);
      // console.log(2);

      dispatch(setCustomer(response[0]));
      navigation.navigate("Sims");
      return;
    } else {
      Alert.alert(
        "Ошибка",
        "Целостность данных нарушена! Возможно, вы указали неуникальные данные"
      );
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
            clearButtonMode="always"
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
      <TouchableOpacity
        style={styles.button}
        onPress={btnHandler}
        disable={isBtnAlive}
      >
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
