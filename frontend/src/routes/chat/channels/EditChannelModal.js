import { Modal, Button } from "react-bootstrap";
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { editChannelApi } from "../../../api";
import { editChannel } from "../chatSlice";

const EditChannelModal = ({ show, handleClose, channelId }) => {
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
      .required("Обязательное поле")
      .min(3, "Минимальная длина 3 символа")
      .max(20, "Максимальная длина 20 символов")
      .test(
        "unique-name",
        "Имя уже существует",
        (value) => !allChannelsNames.includes(value)
      ),
  });

  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    const newName = values.inputField;
    console.log(`Новое название`, newName);

    const token = localStorage.getItem("token");

    try {
      await editChannelApi(token, newName, channelId);
      dispatch(editChannel({ channelId, newName }));
      actions.resetForm(); //?
      handleClose();
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }

    actions.setSubmitting(false);
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
          Переименовать канал
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
                  Отменить
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-3 ms-2"
                >
                  Добавить
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
