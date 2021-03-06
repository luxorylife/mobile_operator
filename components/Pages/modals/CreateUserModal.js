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
import { createUser } from "../../../requests/requests";

// redux
import { useSelector } from "react-redux";

// roles
import { ROLE_BOSS, ROLE_CONSULT, ROLE_SUPP } from "../../../const/roles";

// toast
import Toast from "react-native-toast-message";

export const CreateUserModal = ({ openModal, closeModal }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [role, setRole] = useState("");

  const user = useSelector((state) => state.user);

  const btnSaveHandler = async () => {
    if (pass !== confirmPass) {
      Alert.alert(
        "Пароли не совдапают!",
        "Пожалуйста, убедитесь, чтобы введенные пароли совпадали"
      );
      return;
    }

    if (!(name && pass && confirmPass)) return;

    const newUser = {
      name: name,
      password: pass,
      role: role,
    };

    const response = await createUser(user.login, user.password, newUser);

    if (response && response === 201) {
      console.log(response);
      showToast();
    }

    onClose();
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Успех",
      text2: "Пользователь добавлен!",
    });
  };

  const onClose = () => {
    closeModal();
    setName("");
    setPass("");
    setConfirmPass("");
    setRole("");
  };

  return (
    <>
      <Modal isOpen={openModal} onClose={onClose} avoidKeyboard={true}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Создание пользователя</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Имя</FormControl.Label>
              <Input value={name} onChangeText={(text) => setName(text)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Роль</FormControl.Label>
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
            <FormControl>
              <FormControl.Label>Пароль</FormControl.Label>
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
              <Button onPress={btnSaveHandler}>Создать</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

// export const CreateUserModal = ({ openModal, closeModal }) => {
//   return (
//     <NativeBaseProvider>
//       <Center flex={1} px="3">
//         <Example openModal={openModal} closeModal={closeModal} />
//       </Center>
//     </NativeBaseProvider>
//   );
// };
