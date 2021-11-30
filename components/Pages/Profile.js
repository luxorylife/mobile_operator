import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";

// redux
import { useDispatch, useSelector } from "react-redux";
import { logInOutAction, setUser } from "../../store/actions";

// user
import { ROLE_BOSS } from "../../const/roles";

// modals
import {
  CreateUserModal,
  ChangePassModal,
  ChangeUserPassModal,
  ChangeRoleModal,
} from "./modals/";

export const Profile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [modalCreate, setModalCreate] = useState(false);
  const [modalChangePassword, setModalChangePassword] = useState(false);
  const [modalChangeRole, setModalChangeRole] = useState(false);
  const [modalChangeUserPassword, setModalChangeUserPassword] = useState(false);

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
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.line}>
          <Text style={styles.descr}>Вы вошли под именем: </Text>
          <Text style={styles.value}>{user.login}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.descr}>Ваша роль: </Text>
          <Text style={styles.value}>{user.role}</Text>
        </View>
      </View>
      {user.role === ROLE_BOSS && (
        <BossMenu
          create={() => setModalCreate(true)}
          changePass={() => {
            setModalChangePassword(true);
          }}
          changeRole={() => setModalChangeRole(true)}
          changeUserPass={() => {
            setModalChangeUserPassword(true);
          }}
        />
      )}
      {user.role !== ROLE_BOSS && (
        <UserMenu
          changePass={() => {
            setModalChangePassword(true);
          }}
        />
      )}
      {/* <Button title="Выйти из аккаунта" onPress={logOut} /> */}

      <TouchableOpacity
        onPress={logOut}
        style={{ padding: 10, backgroundColor: "black", borderRadius: 100 }}
      >
        <Text style={{ fontWeight: "normal", color: "white" }}>
          Выйти из аккаунта
        </Text>
      </TouchableOpacity>

      <CreateUserModal
        openModal={modalCreate}
        closeModal={() => setModalCreate(false)}
      />
      <ChangePassModal
        openModal={modalChangePassword}
        closeModal={() => setModalChangePassword(false)}
      />
      <ChangeRoleModal
        openModal={modalChangeRole}
        closeModal={() => setModalChangeRole(false)}
      />
      <ChangeUserPassModal
        openModal={modalChangeUserPassword}
        closeModal={() => setModalChangeUserPassword(false)}
      />
    </View>
  );
};

const BossMenu = ({ create, changePass, changeRole, changeUserPass }) => (
  <View style={styles.menu}>
    <TouchableOpacity style={styles.button} onPress={create}>
      <Text style={{ fontWeight: "bold" }}>Добавить пользователя</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={changePass}>
      <Text style={{ fontWeight: "bold" }}>Изменить пароль</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={changeRole}>
      <Text style={{ fontWeight: "bold" }}>Изменить роль пользователя</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={changeUserPass}>
      <Text style={{ fontWeight: "bold" }}>Изменить пароль пользователя</Text>
    </TouchableOpacity>
  </View>
);

const UserMenu = ({ changePass }) => (
  <View style={styles.menu}>
    <TouchableOpacity style={styles.button} onPress={changePass}>
      <Text style={{ fontWeight: "bold" }}>Изменить пароль</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7395AE",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  info: {
    backgroundColor: "#C2B9B0",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
  },
  descr: {
    fontSize: 18,
  },
  value: {
    fontWeight: "bold",
    fontSize: 24,
  },
  menu: {
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#C2B9B0",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    borderRadius: 100,
    padding: 8,
    backgroundColor: "#7395AE",
    marginVertical: 10,
  },
});
