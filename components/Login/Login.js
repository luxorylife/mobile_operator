import * as React from "react";
import { Button, StyleSheet, View, TextInput } from "react-native";
import { Main } from "../Main/Main";
import { useSelector, useDispatch } from "react-redux";
import { logInOutAction } from "../../store/actions";

export default function Login() {
  //переместить в redux
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);

  const logIn = () => {
    //добавить запрос авторизации на сервер

    // проверка заполненности значений
    // if (!login.length || !password.length){
    //   Alert.alert('Значения пусты!');
    //   return;
    // }

    dispatch(logInOutAction(true));
  };

  return (
    <View style={styles.container}>
      {!isLogin && (
        <View>
          <TextInput
            placeholder="Логин"
            value={login}
            onChangeText={(value) => setLogin(value)}
          />
          <TextInput
            placeholder="Пароль"
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Button title="Войти" onPress={logIn} />
        </View>
      )}
      {isLogin && <Main />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
