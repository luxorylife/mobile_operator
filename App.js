import * as React from "react";
import { Provider } from "react-redux"; // redux
import { store } from "./store/store"; // redux
import Login from "./components/Login/Login";

import { SSRProvider } from "@react-aria/ssr"; // bootstrap?
import { NativeBaseProvider } from "native-base"; // modal windows

import Toast from "react-native-toast-message"; // toasts

export default function App() {
  return (
    <SSRProvider>
      <NativeBaseProvider>
        <Provider store={store}>
          <Login />
          <Toast />
        </Provider>
      </NativeBaseProvider>
    </SSRProvider>
  );
}
