import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./components/Login/Login";

export default function App() {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
}
