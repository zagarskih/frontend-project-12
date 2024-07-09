import { Modal, Button } from "react-bootstrap";
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { editChannelApi } from "../../../api";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import filter from "leo-profanity";

const socket = io();

const EditChannelModal = ({ show, handleClose, channelId }) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.chat.channels);
  const allChannelsNames = channels.map((channel) => channel.name);

  const currentChannel = channels.find((channel) => channel.id === channelId);
  const currentChannelName = currentChannel ? currentChannel.name : "";

  const initialValues = {
    inputField: currentChannelName,
  };

  const validationSchema = yup.object({
    inputField: yup
      .string()
      .required(t("validation.notFilled"))
      .min(3, t("validation.wrongLength"))
      .max(20, t("validation.wrongLength"))
      .test(
        "unique-name",
        t("validation.notUnique"),
        (value) => !allChannelsNames.includes(value)
      ),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const newName = filter.clean(values.inputField);
    const token = localStorage.getItem("token");

    try {
      setSubmitting(true);
      await editChannelApi(token, newName, channelId, t);

      const valuesForSocket = { id: channelId, name: newName };
      socket.emit("renameChannel", valuesForSocket);

      toast.success(t("toast.editChannel"));
      resetForm(); //?
      handleClose();
    } catch (error) {
      console.error(t("errors.editing"), error);
      toast.error(t("networkError"));
    } finally {
      setSubmitting(false);
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t("interface.editTitle")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Field
                type="text"
                id="inputField"
                name="inputField"
                innerRef={inputRef}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.inputField}
                autoFocus
                className={`form-control ${
                  errors.inputField ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="inputField"
                component="div"
                className="invalid-feedback"
              />
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  className="mt-3"
                >
                  {t("interface.cancel")}
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-3 ms-2"
                >
                  {t("interface.edit")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditChannelModal;
