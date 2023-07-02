import {Button, Card, FloatingLabel, Form, Spinner} from "react-bootstrap";
import { TagCheckbox } from "../TagCheckbox.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const TodoForm = ({ onAddTodo }) => {

  const formik = useFormik({
    initialValues: {
      subject: '',
    },
    validationSchema: Yup.object({
      subject: Yup.string()
        .required('Please input your subject'),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setTimeout(() => {
          onAddTodo(values, setSubmitting, selectedTags);
          resetForm(values) }
        , 300)
    },
  });

  let selectedTags = [];

  const handleChangeTag = (checkedTag) => {
    selectedTags = checkedTag;
  }

  return (
    <Card>
    <Card.Header>Add todo</Card.Header>
      <Card.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <FloatingLabel label="Input your note">
              <Form.Control
                as="textarea"
                placeholder="Leave a note here"
                style={{ height: '100px' }}
                {...formik.getFieldProps('subject')}
                isInvalid={formik.touched.subject && formik.errors.subject}
                disabled={formik.isSubmitting}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.subject}
              </Form.Control.Feedback>
            </FloatingLabel>
          
            <div className="mt-2">
              <TagCheckbox onChangeTag={handleChangeTag} />
            </div>
            <Button variant="success" className="mt-2" type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> : 'Add!'}
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}

TodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};

export { TodoForm }