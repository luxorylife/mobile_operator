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
import { getServices } from "../../../requests/requests";
import { getSimServices } from "../../../requests/requests";

// redux
import { useSelector } from "react-redux";

// icons
import { AntDesign } from "@expo/vector-icons";

// role
import { ROLE_BOSS } from "../../../const/roles";

export const ServicesList = ({ navigation, route }) => {
  const [services, setServices] = useState([]);

  const user = useSelector((state) => state.user);
  const sim = useSelector((state) => state.sim);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) loadData();
  }, [isFocused]);

  const loadData = async () => {
    if (user.role === ROLE_BOSS) {
      const response = await getServices(user.login, user.password);
      setServices(response);
    } else {
      const response = await getSimServices(
        user.login,
        user.password,
        sim.sim_id
      );
      setServices(response);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={
          user.role === ROLE_BOSS
            ? services
            : services.sort((a, b) => {
                if (a.sim_services[0]) return -1;
                return 1;
              })
        }
        renderItem={({ item }) => (
          <ListItem
            service={item}
            nav={
              item.sim_services
                ? item.sim_services[0]
                  ? () => {
                      navigation.navigate("ServiceItem", {
                        item: item,
                        isNew: false,
                        active: true,
                      });
                    }
                  : () => {
                      navigation.navigate("ServiceItem", {
                        item: item,
                        isNew: false,
                        active: false,
                      });
                    }
                : () =>
                    navigation.navigate("ServiceItem", {
                      item: item,
                      isNew: false,
                    })
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
    style={[styles.button]}
    activeOpacity={0.7}
    onPress={props.nav}
  >
    <View style={{ width: "50%" }}>
      <Text style={styles.header}>{props.service.name}</Text>
      {props.service.sim_services ? (
        props.service.sim_services.length &&
        props.service.sim_services[0].active ? (
          <Text style={{ color: "green" }}>Статус: Активна</Text>
        ) : (
          <Text style={{ color: "red" }}>Статус: Неактивна</Text>
        )
      ) : (
        <></>
      )}
    </View>
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
    backgroundColor: "#8EE4AF",
    flex: 1,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  price: {
    marginRight: 50,
  },
});
