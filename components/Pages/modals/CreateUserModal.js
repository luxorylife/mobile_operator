import React from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  NativeBaseProvider,
} from "native-base";

export const Example = ({ openModal, closeModal }) => {
  return (
    <>
      <Modal isOpen={openModal} onClose={closeModal}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group>
              <Button>Cancel</Button>
              <Button onPress={closeModal}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export const CreateUserModal = ({ openModal, closeModal }) => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example openModal={openModal} closeModal={closeModal} />
      </Center>
    </NativeBaseProvider>
  );
};
