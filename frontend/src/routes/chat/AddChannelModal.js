import { Modal, Button } from "react-bootstrap";
import React from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { addChannel } from "../../api";

const AddChannelModal = ({ show, handleClose, setActiveChannel }) => {
  const initialValues = {
    inputField: "",
  };

  const channels = useSelector((state) => state.chat.channels);
  const allChannelsNames = channels.map((channel) => channel.name);

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

  const handleSubmit = async (values, actions) => {
    console.log(values);

    const token = localStorage.getItem("token");
    const newChannel = { name: values.inputField };

    try {
      const createdChannel = await addChannel(token, newChannel);
      setActiveChannel(createdChannel.id);
      actions.resetForm();
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }

    actions.setSubmitting(false);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                type="text"
                id="inputField"
                name="inputField"
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

export default AddChannelModal;
