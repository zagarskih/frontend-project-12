import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteChannelApi, deleteMessagesByChannel } from "../../../api";
import { deleteChannel } from "../chatSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const DeleteChannelModal = ({
  show,
  handleClose,
  setActiveChannel,
  channelId,
  messages,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    console.log(channelId);

    try {
      setSubmitting(true);
      await deleteChannelApi(token, channelId);
      await deleteMessagesByChannel(token, channelId, messages);
      setActiveChannel("1");
      dispatch(deleteChannel({ channelId }));
    } catch (error) {
      console.error("Ошибка при удалении канала:", error);
    } finally {
      setSubmitting(false);
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
        <Modal.Title>{t("interface.deleteTitle")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t("interface.deleteBody")}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("interface.cancel")}
        </Button>
        <Button
          className="btn-danger"
          variant="primary"
          disabled={submitting}
          onClick={combinedClickHandler}
        >
          {t("interface.delete")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;
