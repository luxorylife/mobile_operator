import * as React from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

// css
import { mainStyle } from "../../MainStyle";

// redux
import { useDispatch } from "react-redux";
import { logInOutAction, setUser } from "../../store/actions";

// const
import { ROLE_BOSS, ROLE_CONSULT, ROLE_SUPP } from "../../const/roles";

export const LoginWindow = () => {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();

  const logIn = () => {
    // проверка заполненности значений
    // if (!login.length || !password.length){
    //   Alert.alert('Значения пусты!');
    //   return;
    // }

    //добавить запрос авторизации на сервер (роль получаем исходя от ответа сервера)
    const role = login;

    if (role !== ROLE_BOSS && role !== ROLE_CONSULT && role !== ROLE_SUPP) {
      Alert.alert("Отказано в доступе");
      return;
    }

    dispatch(
      setUser({
        role: role,
        login: login,
        password: password,
      })
    );
    dispatch(logInOutAction(true));
  };

  return (
    <View style={mainStyle.container}>
      <View style={windowStyle.window}>
        <TextInput
          placeholder="Логин"
          value={login}
          onChangeText={(value) => setLogin(value)}
          style={windowStyle.inp}
        />
        <TextInput
          placeholder="Пароль"
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => setPassword(value)}
          style={windowStyle.inp}
        />
        <TouchableOpacity onPress={logIn}>
          <Text style={windowStyle.button}>Войти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowStyle = StyleSheet.create({
  window: {
    backgroundColor: "#E8A87C",
    width: "80%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  inp: {
    width: "50%",
    marginBottom: 10,
    fontSize: 15,
    paddingLeft: 5,
    borderBottomWidth: 1,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#FBEEC1",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 20,
  },
});
