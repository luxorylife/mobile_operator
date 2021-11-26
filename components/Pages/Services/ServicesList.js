import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

// api
import { getServices } from "../../../requests/requests";

// redux
import { useSelector } from "react-redux";

// icons
import { AntDesign } from "@expo/vector-icons";

export const ServicesList = ({ navigation }) => {
  const [services, setServices] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await getServices(user.login, user.password);
    setServices(response);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={services}
        renderItem={({ item }) => (
          <ListItem
            service={item}
            nav={() => navigation.navigate("ServiceItem", item)}
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
    <Text style={styles.header}>{props.service.name}</Text>
    <Text>{`${props.service.daily_price} руб./день`}</Text>
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
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    width: "50%",
  },
  container: {
    backgroundColor: "#8EE4AF",
    flex: 1,

    alignItems: "center",
  },
  price: {
    marginRight: 50,
  },
});
