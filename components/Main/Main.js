import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { logInOutAction } from "../../store/actions";

export const Main = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    // добавить разлогин через Redux

    Alert.alert("Выход из аккаунта", "Вы уверены?", [
      {
        text: "ОК",
        onPress: () => dispatch(logInOutAction(false)),
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
    <View>
      <Text>Контент</Text>
      <Button title="Выйти из аккаунта" onPress={logOut} />
    </View>
  );
};
