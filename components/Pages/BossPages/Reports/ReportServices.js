import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

// api
import { getServices } from "../../../../requests/requests";

// nav
import { useIsFocused } from "@react-navigation/native";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setReport } from "../../../../store/actions";

export const ReportServices = () => {
  const user = useSelector((state) => state.user);

  const [services, setServices] = useState([]);

  const focus = useIsFocused();

  const dispatch = useDispatch();

  useEffect(async () => {
    const response = await getServices(user.login, user.password);

    if (response[0]) {
      setServices(response);
      const report = response.map((el) => {
        return {
          Наименование: el.name,
          Описание: el.description,
          "Цена в день": el.daily_price,
          "Цена подключения": el.activation_fee,
        };
      });
      dispatch(setReport(report));
    }
  }, [focus]);

  return (
    <View style={styles.container}>
      <Text
        style={styles.header}
      >{`Общее количество: ${services.length}`}</Text>
      <FlatList
        style={{ width: "100%" }}
        data={services}
        renderItem={({ item }) => <ListItem service={item} />}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
};

const ListItem = (props) => (
  <View style={styles.card}>
    <View style={{ width: "80%" }}>
      <Text style={styles.header}>{props.service.name}</Text>
    </View>
    <Text>{`Описание: ${props.service.description}`}</Text>
    <Text>{`Стоимость: ${props.service.daily_price} руб./день`}</Text>
    <Text>{`Цена подключения: ${props.service.activation_fee} руб.`}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#8EE4AF",
    borderWidth: 1,
    justifyContent: "space-between",
    padding: 8,
    marginTop: 8,
    borderRadius: 8,
  },
  btnRed: {
    borderColor: "red",
  },
  btnGreen: {
    borderColor: "green",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
  },
  container: {
    backgroundColor: "#FBEEC1",
    flex: 1,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  price: {
    marginRight: 50,
  },
});
