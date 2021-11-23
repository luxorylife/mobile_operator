import * as React from "react";
import { Button, StyleSheet, View, TextInput, Alert } from "react-native";

// components
import { Main } from "../Main/Main";

// redux
import { useSelector, useDispatch } from "react-redux";
import { logInOutAction, setUser } from "../../store/actions";

// const
import { ROLE_BOSS, ROLE_CONSULT, ROLE_SUPP } from "../../const/roles";

// nav
import { NavigationContainer } from "@react-navigation/native";

export default function Login() {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);

  const logIn = () => {
    // проверка заполненности значений
    // if (!login.length || !password.length){
    //   Alert.alert('Значения пусты!');
    //   return;
    // }

    //добавить запрос авторизации на сервер и получение токена
    const authToken = "123";
    const role = login;

    if (role !== ROLE_BOSS && role !== ROLE_CONSULT && role !== ROLE_SUPP) {
      Alert.alert("Отказано в доступе");
      return;
    }

    dispatch(
      setUser({
        token: authToken,
        role: role,
      })
    );
    dispatch(logInOutAction(true));
  };

  return (
    <NavigationContainer>
      {!isLogin && (
        <View style={styles.container}>
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
        </View>
      )}
      {isLogin && <Main />}
    </NavigationContainer>
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
