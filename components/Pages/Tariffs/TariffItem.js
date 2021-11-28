import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

// api
import { setTariff, deleteTariff } from "../../../requests/requests";

// redux
import { useSelector } from "react-redux";

export const TariffItem = ({ route, navigation }) => {
  if (route.params.isNew) return <NewTariff nav={navigation} />;
  else {
    return <FillTariff tariff={route.params.item} nav={navigation} />;
  }
};

const FillTariff = ({ tariff, nav }) => {
  const user = useSelector((state) => state.user);

  const btnHandler = async () => {
    // удаление тарифа

    Alert.alert("Удаление тарифа", "Вы уверены?", [
      {
        text: "ОК",
        onPress: async () => {
          const result = await deleteTariff(
            user.login,
            user.password,
            tariff.id
          );

          if (result) {
            if (result == 204) nav.navigate("TariffsList");
          }
        },
      },
      {
        text: "Отмена",
        onPress: () => console.log("Cancel Pressed"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <View style={styles.fieldFill}>
          <Text style={styles.text}>Наименование: </Text>
          <Text style={styles.textNamed}>{tariff.name}</Text>
        </View>
        <View style={styles.fieldFill}>
          <Text style={styles.text}>Стоимсть в месяц: </Text>
          <Text style={styles.textNamed}>{tariff.monthly_price} руб.</Text>
        </View>
        <View style={styles.fieldFill}>
          <Text style={styles.text}>Количество минут: </Text>
          <Text style={styles.textNamed}>{tariff.minutes_count} руб.</Text>
        </View>
        <View style={styles.fieldFill}>
          <Text style={styles.text}>Количество СМС: </Text>
          <Text style={styles.textNamed}>{tariff.sms_count} руб.</Text>
        </View>
        <View style={styles.fieldFill}>
          <Text style={styles.text}>Количество трафика: </Text>
          <Text style={styles.textNamed}>{tariff.data_amount} руб.</Text>
        </View>
        <View style={styles.fieldFill}>
          <Text style={styles.text}>Стоимость доп. минут: </Text>
          <Text style={styles.textNamed}>
            {tariff.additional_minute_price} руб.
          </Text>
        </View>
        <View style={styles.fieldFill}>
          <Text style={styles.text}>Стоимость доп. СМС: </Text>
          <Text style={styles.textNamed}>
            {tariff.additional_sms_price} руб.
          </Text>
        </View>
        <View style={styles.fieldFill}>
          <Text style={styles.text}>Стоимость доп. трафика: </Text>
          <Text style={styles.textNamed}>
            {tariff.additional_data_price} руб.
          </Text>
        </View>
      </View>
      <View style={styles.btn_view}>
        <TouchableOpacity style={styles.buttonDel} onPress={() => btnHandler()}>
          <Text style={styles.btn_del_text}>Удалить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NewTariff = ({ nav }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [minutes, setMinutes] = useState("");
  const [sms, setSms] = useState("");
  const [data, setData] = useState("");
  const [addMinutes, setAddMinutes] = useState("");
  const [addSms, setAddSms] = useState("");
  const [addData, setAddData] = useState("");

  const user = useSelector((state) => state.user);

  const btnHandler = async () => {
    if (
      !(
        name &&
        price &&
        minutes &&
        sms &&
        data &&
        addMinutes &&
        addSms &&
        addData
      )
    )
      return;

    // добавление тарифа

    const tariff = {
      name: name,
      monthly_price: price,
      minutes_count: minutes,
      sms_count: sms,
      data_amount: data,
      additional_minute_price: addMinutes,
      additional_sms_price: addSms,
      additional_data_price: addData,
    };

    const result = await setTariff(user.login, user.password, tariff);

    if (result) {
      if (result == 201) nav.navigate("TariffsList");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <View style={styles.field}>
          <Text style={styles.text}>Наиманование: </Text>
          <TextInput
            style={styles.inp}
            value={name}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Стоимсть в месяц: </Text>
          <TextInput
            style={styles.inp}
            value={price}
            onChangeText={(value) => setPrice(value)}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Количество минут: </Text>
          <TextInput
            style={styles.inp}
            value={minutes}
            onChangeText={(value) => setMinutes(value)}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Количество СМС: </Text>
          <TextInput
            style={styles.inp}
            value={sms}
            onChangeText={(value) => setSms(value)}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Количество трафика: </Text>
          <TextInput
            style={styles.inp}
            value={data}
            onChangeText={(value) => setData(value)}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Стоимость доп. минут: </Text>
          <TextInput
            style={styles.inp}
            value={addMinutes}
            onChangeText={(value) => setAddMinutes(value)}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Стоимость доп. СМС: </Text>
          <TextInput
            style={styles.inp}
            value={addSms}
            onChangeText={(value) => setAddSms(value)}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Стоимость доп. трафика: </Text>
          <TextInput
            style={styles.inp}
            value={addData}
            onChangeText={(value) => setAddData(value)}
          />
        </View>
      </View>
      <View style={styles.btn_view}>
        <TouchableOpacity style={styles.button} onPress={() => btnHandler()}>
          <Text style={styles.btn_text}>Добавить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8EE4AF",
    flex: 1,
    padding: 5,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  fieldFill: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  inp: {
    borderBottomWidth: 1,
    borderColor: "black",
    fontSize: 15,
    width: "50%",
  },
  text: {
    fontWeight: "bold",
  },
  textNamed: {
    fontWeight: "normal",
  },
  inputs: {
    backgroundColor: "#FBEEC1",
    marginTop: 10,
    borderWidth: 1,
  },
  button: {
    backgroundColor: "white",
    padding: 8,
  },
  btn_text: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  buttonDel: {
    backgroundColor: "black",
    padding: 8,
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
