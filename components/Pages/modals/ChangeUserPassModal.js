import React, { useState } from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  NativeBaseProvider,
} from "native-base";
import { Alert } from "react-native";

// api
import { changePassword } from "../../../requests/requests";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setUser, logInOutAction } from "../../../store/actions";

// toast
import Toast from "react-native-toast-message";

export const ChangeUserPassModal = ({ openModal, closeModal }) => {
  const [name, setName] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const btnSaveHandler = async () => {
    if (pass !== confirmPass) {
      Alert.alert(
        "Новые пароли не совдапают!",
        "Пожалуйста, убедитесь, чтобы введенные пароли совпадали"
      );
      return;
    }

    if (!(name && oldPass && pass && confirmPass)) return;

    const response = await changePassword(name, oldPass, pass);

    if (!response) {
      Alert.alert(
        "Ошибка доступа",
        "Возможно, вы ввели неверные имя или пароль пользователя"
      );
      return;
    }

    if (response && response === 204) {
      if (name === user.name && oldPass === user.password)
        dispatch(
          setUser({
            role: user.role,
            login: user.login,
            password: pass,
          })
        );
      console.log(response);

      showToast();
    }

    onClose();
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Успех",
      text2: "Пароль изменен!",
    });
  };

  const onClose = () => {
    closeModal();
    setName("");
    setOldPass("");
    setPass("");
    setConfirmPass("");
  };

  return (
    <>
      <Modal isOpen={openModal} onClose={onClose} avoidKeyboard={true}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Изменение пароля пользователя</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Имя</FormControl.Label>
              <Input value={name} onChangeText={(text) => setName(text)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Старый пароль</FormControl.Label>
              <Input
                type="password"
                value={oldPass}
                onChangeText={(text) => setOldPass(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Новый пароль</FormControl.Label>
              <Input
                type="password"
                value={pass}
                onChangeText={(text) => setPass(text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Подтверждение пароля</FormControl.Label>
              <Input
                type="password"
                value={confirmPass}
                onChangeText={(text) => setConfirmPass(text)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group>
              <Button onPress={onClose} variant="ghost" colorScheme="blueGray">
                Отмена
              </Button>
              <Button onPress={btnSaveHandler}>Изменить</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
