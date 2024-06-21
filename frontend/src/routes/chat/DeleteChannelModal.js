import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteChannel, deleteMessagesByChannel } from "../../api";
import { useDispatch } from "react-redux";

const DeleteChannelModal = ({
  show,
  handleClose,
  setActiveChannel,
  channelId,
  messages,
}) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    console.log(channelId);

    try {
      await deleteChannel(token, channelId);
      await deleteMessagesByChannel(token, channelId, messages);
      setActiveChannel("1");
      dispatch(deleteChannel({ id: channelId }));
    } catch (error) {
      console.error("Ошибка при удалении канала:", error);
    }
  };

  const combinedClickHandler = () => {
    handleDelete();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Уверены?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="primary" onClick={combinedClickHandler}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;
