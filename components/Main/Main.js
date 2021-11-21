import React from "react";
import { View, Text, Button, Alert } from "react-native";

export const Main = () => {
  const logOut = () => {
    // добавить разлогин через Redux

    Alert.alert("Выход из аккаунта", "Вы уверены?", [
      {
        text: "ОК",
        onPress: () => console.log("OK Pressed"),
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
