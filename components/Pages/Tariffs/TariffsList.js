import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

// nav
import { useIsFocused } from "@react-navigation/native";

// api
import { getTariffs } from "../../../requests/requests";

// redux
import { useSelector } from "react-redux";

// icons
import { AntDesign } from "@expo/vector-icons";

export const TariffsList = ({ navigation, route }) => {
  const [tariffs, setTariffs] = useState([]);

  const user = useSelector((state) => state.user);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) loadData();
  }, [isFocused]);

  const loadData = async () => {
    const response = await getTariffs(user.login, user.password);
    setTariffs(response);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={tariffs}
        renderItem={({ item }) => (
          <ListItem
            tariff={item}
            nav={() =>
              navigation.navigate("TariffItem", { item: item, isNew: false })
            }
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const ListItem = (props) => (
  <TouchableOpacity
    style={styles.button}
    activeOpacity={0.7}
    onPress={props.nav}
  >
    <Text style={styles.header}>{props.tariff.name}</Text>
    <Text>{`${props.tariff.monthly_price} руб./месяц`}</Text>
    <AntDesign name="rightcircle" size={32} color="black" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FBEEC1",
    borderWidth: 1,
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    width: "50%",
  },
  container: {
    backgroundColor: "#8EE4AF",
    flex: 1,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  price: {
    marginRight: 50,
  },
});
