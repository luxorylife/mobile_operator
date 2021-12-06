import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

// api
import { getCustomersReport } from "../../../../requests/requests";

// nav
import { useIsFocused } from "@react-navigation/native";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setReport } from "../../../../store/actions";

export const ReportCustomers = () => {
  const user = useSelector((state) => state.user);

  const [customers, setCustomers] = useState([]);

  const focus = useIsFocused();

  const dispatch = useDispatch();

  useEffect(async () => {
    const response = await getCustomersReport(user.login, user.password);

    console.log(response);

    if (response[0]) {
      setCustomers(response);
      const report = response.map((el) => {
        return {
          ФИО: el.name,
          Адрес: el.address,
          Телефон: el.phone_number,
          "Дата подключения": el.date,
          Тариф: el.tariff_name,
        };
      });
      dispatch(setReport(report));
    }
  }, [focus]);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={customers}
        renderItem={({ item }) => <ListItem customer={item} />}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
};

const ListItem = (props) => (
  <View style={styles.card}>
    <View style={{ width: "80%" }}>
      <Text style={styles.header}>{props.customer.name}</Text>
    </View>
    <Text>{`Адрес: ${props.customer.address}`}</Text>
    <Text>{`Телефон: ${props.customer.phone_number}`}</Text>
    <Text>{`Дата подключения: ${props.customer.date}`}</Text>
    <Text>{`Тариф: ${props.customer.tariff_name}`}</Text>
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
