import {Button, Form, Alert, Card, Spinner} from 'react-bootstrap'
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";

const Login = () => {

  const { login } = useContext(AuthContext)

  const [ errorMessages, setErrorMessages ] = useState([]);

  async function loginHandler(formData, setSubmitting) {

    setErrorMessages([])

    const payload = {
      "username": formData.username,
      "password": formData.password
    }

    try {

      await login(payload)

    } catch (err) {
      if (err.response.data.message === 'Bad credentials') {
        setErrorMessages((errorMessages) =>
        [...errorMessages, 'Incorrect username or password.']
      );
      console.log('Bad credentials')
      }
    } finally {
      setSubmitting(false)
    }

  }

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Must be 3 characters or more')
      .max(20, 'Must be 20 characters or less')
      .required('Please input username'),
    password: Yup.string()
      .required('Please input password'),
  });

  return (
    <>
    <Helmet><title>Login</title></Helmet>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="mt-5">
          <Card>
            <Card.Body>
              <h1 className='mb-3'>Login page</h1>

              {errorMessages.length > 0 && (
                <Alert variant="danger">
                  <ul>
                  {errorMessages.map(err => (
                    <li key={err}>{ err }</li>
                  ))}
                  </ul>
                </Alert>
              )}

              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => loginHandler(values, setSubmitting), 200)
                }}
              >{(formik) => (
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username"
                      {...formik.getFieldProps('username')}
                      isInvalid={formik.touched.username && formik.errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                      {...formik.getFieldProps('password')}
                      isInvalid={formik.touched.password && formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    /> : 'Login'}
                  </Button>
                  <Button as={Link} to="/register" variant="link">Register</Button>
                </Form>
              )}
              </Formik>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export { Login }