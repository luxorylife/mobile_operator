import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";

// redux
import { useDispatch } from "react-redux";
import { logInOutAction, setUser } from "../../store/actions";

// css
import { mainStyle } from "../../MainStyle";

export const Profile = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    // добавить разлогин через Redux

    Alert.alert("Выход из аккаунта", "Вы уверены?", [
      {
        text: "ОК",
        onPress: () => {
          dispatch(logInOutAction(false));
          dispatch(setUser({}));
        },
        style: "ok",
      },
      {
        text: "Отмена",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text>Профиль</Text>
      <Button title="Выйти из аккаунта" onPress={logOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E7717D",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
