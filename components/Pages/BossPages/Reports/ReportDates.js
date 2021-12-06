import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

// api
import { getDatesReport } from "../../../../requests/requests";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setReport } from "../../../../store/actions";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ReportDates = () => {
  const user = useSelector((state) => state.user);

  const [dates, setDates] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const changeDate = async (event, value) => {
    setShow(false);
    setDate(value);

    const response = await getDatesReport(
      user.login,
      user.password,
      `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
    );

    if (response) {
      setDates(response);

      const report = response.map((el) => {
        return {
          ФИО: el.name,
          Адрес: el.address,
          Телефон: el.phone_number,
        };
      });

      dispatch(setReport(report));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{ padding: 8, borderWidth: 1, marginTop: 8 }}
      >
        <Text>Ввести дату</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={changeDate}
          style={{ width: 320, backgroundColor: "white" }}
        />
      )}
      <FlatList
        style={{ width: "100%" }}
        data={dates}
        renderItem={({ item }) => <ListItem date={item} />}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
};

const ListItem = (props) => (
  <View style={styles.card}>
    <View style={{ width: "80%" }}>
      <Text style={styles.header}>{props.date.name}</Text>
    </View>
    <Text>{`Адрес: ${props.date.address}`}</Text>
    <Text>{`Телефон: ${props.date.phone_number}`}</Text>
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
