import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [message, setMessage] = useState(null);
  const [storage, setStorage] = useLocalStorage("token", "");
  const [logged, setLogged] = useState(false);

  if (storage) {
    setTimeout(() => {
      setLogged(true);
    }, 2000);
  }

  return (
    <div className="container App">
      {logged ? (
        <Navigate to="/" />
      ) : storage ? (
        <h1 className="form-login rounded mt-2">Successfully Logged</h1>
      ) : (
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            let errors = {};
            if (!values.email) {
              errors.email = "porfavor ingresar nombre";
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                values.email
              )
            ) {
              errors.email = "ingrese un email válido";
            }
            if (!values.password) {
              errors.password = "porfavor ingresar contraseña";
            }
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            resetForm();
            axios
              .post("http://challenge-react.alkemy.org", {
                email: values.email,
                password: values.password,
              })
              .then((response) => {
                setStorage(response.data.token);
              })
              .catch((error) => {
                setMessage({ msg: error.response.data.error, type: "danger" });
              });
          }}
        >
          {({
            handleSubmit,
            touched,
            errors,
            values,
            handleChange,
            handleBlur,
          }) => (
            <Form onSubmit={handleSubmit} className="m-4 form-login rounded">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <div>
                    <span className="mt-1 error">{errors.email}</span>
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password && (
                  <div>
                    <span className="mt-1 error">{errors.password}</span>
                  </div>
                )}
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
              {message && <Message msg={message.msg} type={message.type} />}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Login;
