import React, { useState } from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Radio,
  Center,
  NativeBaseProvider,
} from "native-base";
import { Alert } from "react-native";

// api
import { changeRole } from "../../../requests/requests";

// redux
import { useSelector, useDispatch } from "react-redux";

// roles
import { ROLE_BOSS, ROLE_CONSULT, ROLE_SUPP } from "../../../const/roles";

// toast
import Toast from "react-native-toast-message";

export const ChangeRoleModal = ({ openModal, closeModal }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const btnSaveHandler = async () => {
    if (!(name && role)) return;

    const response = await changeRole(user.login, user.password, name, role);

    if (response && response === 204) {
      if (name === user.login && role !== user.role) {
        dispatch(logInOutAction(false));
        dispatch(setUser({}));
      }
      console.log(response);

      showToast();
    }

    onClose();
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Успех",
      text2: "Роль изменена!",
    });
  };

  const onClose = () => {
    closeModal();
    setName("");
    setRole("");
  };

  return (
    <>
      <Modal isOpen={openModal} onClose={onClose} avoidKeyboard={true}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Изменение роли</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Имя пользователя</FormControl.Label>
              <Input value={name} onChangeText={(text) => setName(text)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Новая роль</FormControl.Label>
              <Radio.Group
                justifyContent="space-around"
                value={role}
                onChange={(nextValue) => {
                  setRole(nextValue);
                }}
              >
                <Radio colorScheme="emerald" value={ROLE_BOSS} my={1}>
                  Босс
                </Radio>
                <Radio colorScheme="secondary" value={ROLE_CONSULT} my={1}>
                  Консультант
                </Radio>
                <Radio colorScheme="warning" value={ROLE_SUPP} my={1}>
                  Тех. поддержка
                </Radio>
              </Radio.Group>
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
