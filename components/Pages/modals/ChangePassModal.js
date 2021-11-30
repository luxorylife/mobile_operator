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

export const ChangePassModal = ({ openModal, closeModal }) => {
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

    if (oldPass !== user.password) {
      Alert.alert(
        "Старый пароль неправильный!!",
        "Пожалуйста, убедитесь, чтобы введенные пароли совпадали"
      );
      return;
    }

    if (!(oldPass && pass && confirmPass)) return;

    if (oldPass === pass) {
      showToast();
      onClose();
      return;
    }

    const response = await changePassword(user.login, user.password, pass);

    if (response && response === 204) {
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
    setOldPass("");
    setPass("");
    setConfirmPass("");
  };

  return (
    <>
      <Modal isOpen={openModal} onClose={onClose} avoidKeyboard={true}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Изменение пароля</Modal.Header>
          <Modal.Body>
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
