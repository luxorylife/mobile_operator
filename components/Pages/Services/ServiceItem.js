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
import {
  setService,
  deleteService,
  changeService,
} from "../../../requests/requests";

// redux
import { useSelector } from "react-redux";

// role
import { ROLE_BOSS } from "../../../const/roles";

export const ServiceItem = ({ route, navigation }) => {
  if (route.params.isNew) return <NewService nav={navigation} />;
  else {
    return (
      <FillService service={route.params.item} nav={navigation} route={route} />
    );
  }
};

const FillService = ({ service, nav, route }) => {
  const user = useSelector((state) => state.user);
  const sim = useSelector((state) => state.sim);

  const btnHandler = async () => {
    // удаление услуги

    Alert.alert("Удаление услуги", "Вы уверены?", [
      {
        text: "ОК",
        onPress: async () => {
          const result = await deleteService(
            user.login,
            user.password,
            service.id
          );

          if (result) {
            if (result == 204) nav.navigate("ServicesList");
          }
        },
      },
      {
        text: "Отмена",
        onPress: () => console.log("Cancel Pressed"),
      },
    ]);
  };

  const btnHandlerShop = async () => {
    if (route.params.active) {
      console.log("delete");
      const data = {
        active: false,
        sim_id: sim.sim_id,
        service_id: service.id,
      };
      const response = await changeService(user.login, user.password, data);
      console.log(response);
      nav.navigate("ServicesList");
    } else {
      console.log("add");
      const data = {
        active: true,
        sim_id: sim.sim_id,
        service_id: service.id,
      };
      const response = await changeService(user.login, user.password, data);
      console.log(response);
      nav.navigate("ServicesList");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <View style={styles.fieldFill}>
          <Text style={styles.text}>Наименование: </Text>
          <Text style={styles.textNamed}>{service.name}</Text>
        </View>
        <View style={styles.fieldFill}>
          <Text style={styles.text}>Описание: </Text>
          <Text style={styles.textNamed}>{service.description}</Text>
        </View>
        <View style={styles.fieldFill}>
          <Text style={styles.text}>Стоимость в день: </Text>
          <Text style={styles.textNamed}>{service.daily_price} руб.</Text>
        </View>
        <View style={styles.fieldFill}>
          <Text style={styles.text}>Стоимость подключения: </Text>
          <Text style={styles.textNamed}>{service.activation_fee} руб.</Text>
        </View>
      </View>
      <View style={styles.btn_view}>
        {ROLE_BOSS === user.role ? (
          <TouchableOpacity
            style={styles.buttonDel}
            onPress={() => btnHandler()}
          >
            <Text style={styles.btn_del_text}>Удалить</Text>
          </TouchableOpacity>
        ) : route.params.active ? (
          <TouchableOpacity
            style={styles.buttonDel}
            onPress={() => btnHandlerShop()}
          >
            <Text style={styles.btn_del_text}>Отключить</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonDel}
            onPress={() => btnHandlerShop()}
          >
            <Text style={styles.btn_del_text}>Подключить</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const NewService = ({ nav }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [activationFee, setActivationFee] = useState("");

  const user = useSelector((state) => state.user);

  const btnHandler = async () => {
    if (!(name && description && dailyPrice && activationFee)) return;

    // добавление тарифа

    const service = {
      name: name,
      description: description,
      daily_price: dailyPrice,
      activation_fee: activationFee,
    };

    const result = await setService(user.login, user.password, service);

    console.log(result);

    if (result) {
      if (result == 201) nav.navigate("ServicesList");
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
          <Text style={styles.text}>Описание: </Text>
          <TextInput
            style={styles.inp}
            value={description}
            onChangeText={(value) => setDescription(value)}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Цена в день: </Text>
          <TextInput
            style={styles.inp}
            value={dailyPrice}
            onChangeText={(value) => setDailyPrice(value)}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.text}>Цена подключения: </Text>
          <TextInput
            style={styles.inp}
            value={activationFee}
            onChangeText={(value) => setActivationFee(value)}
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
    width: "80%",
  },
  inputs: {
    backgroundColor: "#FBEEC1",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 96,
  },
  btn_text: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
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
