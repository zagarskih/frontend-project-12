import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Login = () => {
  const navigate = useNavigate();
  console.log(localStorage.token)

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setSubmitting(true);
      const response = await axios.post('/api/v1/login', values);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      setStatus({ error: 'Неверный логин или пароль' });
    } finally {
      setSubmitting(false);
      // setSubmitted(true);
    }
  }

  const validationSchema = yup.object({
    username: yup.string()
      .required('Заполните это поле'),
    password: yup.string()
      .required('Заполните это поле'),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  return (
    <div className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">Hexlet Chat</a>
              </div>
            </nav>
            <div className="container-fluid h-100">
              <div className="row justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                  <div className="card shadow-sm">
                    <div className="card-body row p-5">
                      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                        <img src="/login.webp" className="img-fluid" alt="Войти"/>
                      </div>
                      <div className="col-12 col-md-6 mt-3 mt-mb-0">
                        <Formik
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          onSubmit={handleSubmit}>
                            {({ isSubmitting, errors, touched, status }) => (
                            <Form>
                              <h1 className="text-center mb-4">Войти</h1>
                              <div className="form-floating mb-3">
                                <Field
                                  type="text"
                                  name="username"
                                  className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                                  placeholder="Username" />
                                <label htmlFor="username">Ваш ник</label>
                              </div>
                              <div className="form-floating mb-4">
                                <Field
                                  type="password"
                                  name="password"
                                  className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                                  placeholder="Password" />
                                <label htmlFor="password">Пароль</label>
                                {status && status.error && <div className="alert alert-danger mt-2">{status.error}</div>}
                                {/* {(errors.username || errors.password) && (<div className="alert alert-danger">Пожалуйста, введите логин и пароль</div>)} */}
                              </div>
                              <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={isSubmitting || Object.keys(errors).length > 0}>
                                Войти
                              </button>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                    <div className="card-footer p-4">
                      <div className="text-center">
                        <span>Нет аккаунта? </span>
                        <a href="/signup">Регистрация</a>
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
  )
}

export default Login;