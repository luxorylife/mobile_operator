import React from "react";
import { View, Text, Button, Alert } from "react-native";

// redux
import { useDispatch } from "react-redux";
import { logInOutAction, setUser } from "../../store/actions";

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
    <View>
      <Text>Профиль</Text>
      <Button title="Выйти из аккаунта" onPress={logOut} />
    </View>
  );
};
