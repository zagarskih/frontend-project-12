import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteChannelApi, deleteMessagesByChannel } from "../../../api";
import { deleteChannel } from "../chatSlice";
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
      await deleteChannelApi(token, channelId);
      await deleteMessagesByChannel(token, channelId, messages);
      setActiveChannel("1");
      dispatch(deleteChannel({ channelId }));
    } catch (error) {
      console.error("Ошибка при удалении канала:", error);
    }
  };

  const combinedClickHandler = () => {
    handleDelete();
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Уверены?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отменить
        </Button>
        <Button
          className="btn-danger"
          variant="primary"
          onClick={combinedClickHandler}
        >
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;
