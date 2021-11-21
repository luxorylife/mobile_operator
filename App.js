import * as React from "react";
import { Alert, Button, StyleSheet, View, TextInput } from "react-native";
import { Main } from "./components/Main/Main";

export default function App() {
  //переместить в redux
  const [isLogin, setIsLogin] = React.useState(false);
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const logIn = () => {
    //добавить запрос авторизации на сервер

    // проверка заполненности значений
    // if (!login.length || !password.length){
    //   Alert.alert('Значения пусты!');
    //   return;
    // }

    setIsLogin(true);
  };

  return (
    <View style={styles.container}>
      {!isLogin && (
        <View>
          <TextInput
            placeholder="login"
            value={login}
            onChangeText={(value) => setLogin(value)}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Button title="Log in" onPress={logIn} />
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
