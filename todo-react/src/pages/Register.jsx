import {Button, Form, Alert, Modal, Card, Spinner} from 'react-bootstrap'
import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const AlertModal = ({ onShow = false, onHandleClose }) => {
  return (
      <Modal show={onShow} onHide={onHandleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>User registered successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHandleClose}>
            Close
          </Button>
          <Button variant="success" as={Link} to="/login">
            Goto login
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

AlertModal.propTypes = {
  onShow: PropTypes.bool,
  onHandleClose: PropTypes.func,
}

const Register = () => {

  const [ errorMessages, setErrorMessages ] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      name: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
          .min(3, 'Must be 3 characters or more')
        .max(20, 'Must be 20 characters or less')
        .required('Please input username'),
      password: Yup.string()
          .min(6, 'Must be 6 characters or more')
          .max(40, 'Must be 40 characters or less')
        .required('Please input password'),
      email: Yup.string()
          .email()
          .required('Please input email')
          .max(50, 'Must be 50 characters or less'),
      name: Yup.string()
          .min(3, 'Must be 3 characters or more')
          .max(20, 'Must be 20 characters or less')
          .required('Please input name'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => register(values, setSubmitting), 200)
    },
  });

  const register = async (formData, setSubmitting) => {

    setErrorMessages([])

    const payload = {
      "username": formData.username,
      "password": formData.password,
      "email": formData.email,
      "name": formData.name,
    }

    try {

      const { status } = await axios.post("http://localhost:8080/auth/signup", payload, {
        withCredentials: true,
      });

      if (status === 200) {
        handleShow();
      }

    } catch (err) {
      console.log(err.response.data);
      if (err.response.status === 400) {
        setErrorMessages((errorMessages) =>
            [...errorMessages, ...err.response.data]
        )
      }
    } finally {
      setSubmitting(false)
    }

  }

  return (
    <>
    <Helmet><title>Register</title></Helmet>
    <AlertModal onShow={show} onHandleClose={() => handleClose()} />
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="mt-5">
          <Card>
            <Card.Body>
              <h1 className='mb-3'>Register page</h1>

              {errorMessages.length > 0 && (
                <Alert variant="danger">
                  <ul>
                  {errorMessages.map((err, index) => (
                    <li key={index}>{ err.message }</li>
                  ))}
                  </ul>
                </Alert>
              )}

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


                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" placeholder="Email"
                                {...formik.getFieldProps('email')}
                                isInvalid={formik.touched.email && formik.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Name"
                                {...formik.getFieldProps('name')}
                                isInvalid={formik.touched.name && formik.errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="primary" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                  /> : 'Register'}
                </Button>
                <Button as={Link} to="/login" variant="link">Login</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export { Register }