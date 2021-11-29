import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./components/Login/Login";

import { SSRProvider } from "@react-aria/ssr";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <SSRProvider>
      <NativeBaseProvider>
        <Provider store={store}>
          <Login />
        </Provider>
      </NativeBaseProvider>
    </SSRProvider>
  );
}
