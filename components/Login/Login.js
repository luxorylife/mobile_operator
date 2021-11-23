import * as React from "react";

// components
import { Main } from "../Main/Main";
import { LoginWindow } from "./LoginWindow";

// redux
import { useSelector } from "react-redux";

// nav
import { NavigationContainer } from "@react-navigation/native";

export default function Login() {
  const isLogin = useSelector((state) => state.isLogin);

  return (
    <NavigationContainer>
      {!isLogin && <LoginWindow />}
      {isLogin && <Main />}
    </NavigationContainer>
  );
}
