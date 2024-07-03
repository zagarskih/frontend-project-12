import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteChannelApi, deleteMessagesByChannel } from "../../../api";
import { deleteChannel } from "../chatSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

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
      await deleteChannelApi(token, channelId, t);
      await deleteMessagesByChannel(token, channelId, messages, t);
      toast.success(t('toast.deleteChannel'));
      setActiveChannel("1");
      dispatch(deleteChannel({ channelId }));
    } catch (error) {
      console.error(t('errors.deleting'), error);
      toast.error(t('networkError'));
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
