import React, { useContext, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import AuthContext from '../../tokenContext';
import { logInApi } from '../../api';
import ChatHeader from '../elements/HeaderChat';

const Login = () => {
  const { t } = useTranslation();
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const usernameId = useId();
  const passwordId = useId();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setSubmitting(true);
      const { username, password } = values;
      const response = await logInApi(username, password, t);
      logIn(response);
      const { token } = response;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      if (error.response.status === 401) {
        setStatus({ error: t('errors.wrongLoginPassword') });
      } else if (!error.isAxiosError) {
        toast.error(t('unknownError'));
        return;
      } else {
        toast.error(t('networkError'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = yup.object({
    username: yup.string().required(t('validation.notFilled')),
    password: yup.string().required(t('validation.notFilled')),
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
            <ChatHeader />
            <div className="container-fluid h-100">
              <div className="row justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                  <div className="card shadow-sm">
                    <div className="card-body row p-5">
                      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                        <img
                          src="/login.png"
                          className="img-fluid"
                          alt="Войти"
                        />
                      </div>
                      <div className="col-12 col-md-6 mt-3 mt-mb-0">
                        <Formik
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          onSubmit={handleSubmit}
                          validateOnChange={false}
                          validateOnBlur={false}
                        >
                          {({
                            isSubmitting,
                            errors,
                            touched,
                            status,
                          }) => (
                            <Form>
                              <h1 className="text-center mb-4">
                                {t('interface.signIn')}
                              </h1>
                              <div className="form-floating mb-3">
                                <Field
                                  type="text"
                                  name="username"
                                  id={usernameId}
                                  className={`form-control ${
                                    errors.username && touched.username
                                      ? 'is-invalid'
                                      : ''
                                  }`}
                                  placeholder="Username"
                                  autoFocus
                                />
                                <label htmlFor={usernameId}>
                                  {t('interface.nickname')}
                                </label>
                              </div>
                              <div className="form-floating mb-4">
                                <Field
                                  type="password"
                                  name="password"
                                  id={passwordId}
                                  className={`form-control ${
                                    errors.password && touched.password
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Password"
                                />
                                <label htmlFor={passwordId}>
                                  {t('interface.password')}
                                </label>
                                {status && status.error && (
                                  <div className="alert alert-danger mt-2">
                                    {status.error}
                                  </div>
                                )}
                              </div>
                              <button
                                type="submit"
                                className="w-100 mb-3 btn btn-outline-primary"
                                disabled={isSubmitting}
                              >
                                {t('interface.signIn')}
                              </button>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                    <div className="card-footer p-4">
                      <div className="text-center">
                        <span>
                          {t('interface.noAcc')}
                          </span>
                        <a href="/signup">{t('interface.signUp')}</a>
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

export default Login;
