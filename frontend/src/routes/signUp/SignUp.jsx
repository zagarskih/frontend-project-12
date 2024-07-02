import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Header from "../Header";
import * as yup from "yup";
import { sighUpApi } from "../../api";
import { useTranslation } from "react-i18next";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setSubmitting(true);
      const username = values.username;
      const password = values.password;
      const response = await sighUpApi(username, password);
      const token = response.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      if (error.response.status === 409) {
        setStatus({ error: "Такой пользователь уже существует" });
      } else {
        setStatus({ error: "Не удалось зарегистрировать нового пользователя" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = yup.object({
    username: yup
      .string()
      .required(t("validation.notFilled"))
      .min(3, t("validation.wrongLength"))
      .max(20, t("validation.wrongLength")),
    password: yup
      .string()
      .required(t("validation.notFilled"))
      .min(6, t("validation.passwordLength")),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], t("validation.notSamePassword")),
  });

  const initialValues = {
    username: "",
    password: "",
    repeatPassword: "",
  };

  return (
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <Header />
            <div className="container-fluid h-100">
              <div className="row justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                  <div className="card shadow-sm">
                    <div className="card-body row p-5">
                      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                        <img
                          src="/login.webp"
                          className="img-fluid"
                          alt="Войти"
                        />
                      </div>
                      <div className="col-12 col-md-6 mt-3 mt-mb-0">
                        <Formik
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          validateOnBlur={false}
                          onSubmit={handleSubmit}
                        >
                          {({ isSubmitting, errors, touched, status }) => (
                            <Form>
                              <h1 className="text-center mb-4">
                                {t("interface.signUp")}
                              </h1>
                              <div className="form-floating mb-3">
                                <Field
                                  type="text"
                                  name="username"
                                  className={`form-control ${
                                    errors.username && touched.username
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Username"
                                  autoFocus
                                />
                                <label htmlFor="username">
                                  {t("interface.newUser")}
                                </label>
                                <div
                                  placement="right"
                                  className="invalid-tooltip"
                                >
                                  {errors.username}
                                </div>
                              </div>
                              <div className="form-floating mb-3">
                                <Field
                                  type="password"
                                  name="password"
                                  className={`form-control ${
                                    errors.password && touched.password
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Password"
                                />
                                <label htmlFor="password">
                                  {t("interface.password")}
                                </label>
                                <div
                                  placement="right"
                                  className="invalid-tooltip"
                                >
                                  {errors.password}
                                </div>
                              </div>
                              <div className="form-floating mb-4">
                                <Field
                                  type="password"
                                  name="repeatPassword"
                                  className={`form-control ${
                                    errors.repeatPassword &&
                                    touched.repeatPassword
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Password"
                                />
                                <label htmlFor="password">
                                  {t("interface.repeatPassword")}
                                </label>
                                <div
                                  placement="right"
                                  className="invalid-tooltip"
                                >
                                  {errors.repeatPassword}
                                </div>
                                {status && status.error && (
                                  <div className="alert alert-danger mt-2">
                                    {status.error}
                                  </div>
                                )}
                              </div>
                              <button
                                type="submit"
                                className="w-100 mb-3 btn btn-outline-primary"
                                disabled={
                                  isSubmitting || Object.keys(errors).length > 0
                                }
                              >
                                {t("interface.signUpButton")}
                              </button>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Toastify"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
