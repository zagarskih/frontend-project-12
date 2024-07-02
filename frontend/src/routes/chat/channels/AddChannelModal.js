import { Modal, Button } from "react-bootstrap";
import React from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { addChannelApi } from "../../../api";
import { useTranslation } from "react-i18next";

const AddChannelModal = ({ show, handleClose, setActiveChannel }) => {
  const { t } = useTranslation();
  const initialValues = {
    inputField: "",
  };

  const channels = useSelector((state) => state.chat.channels);
  const allChannelsNames = channels.map((channel) => channel.name);

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
    console.log(values);

    const token = localStorage.getItem("token");
    const newChannel = { name: values.inputField };

    try {
      setSubmitting(true);
      const createdChannel = await addChannelApi(token, newChannel);
      setActiveChannel(createdChannel.id);
      resetForm();
      handleClose();
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    } finally {
      setSubmitting(false);
    }
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
          {t("interface.addTitle")}
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
                  {t("interface.add")}
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
