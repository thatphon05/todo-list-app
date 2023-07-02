import { Button, Col, Row  } from 'react-bootstrap'
import { Helmet } from "react-helmet-async";
import { TodoForm } from "../../components/todo-form/TodoForm.jsx";
import { useTodo } from "./useTodo.js";
import { TodoList } from "../../components/todo-list/TodoList.jsx";

const Todo = () => {

  const { todos, addTodo, deleteTodo, toggleCompleteTodo, reloadTodo, setSize } = useTodo();

  return (
    <>
      <Helmet>
        <title>TodoList App</title>
      </Helmet>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="mt-5">

          <TodoForm onAddTodo={addTodo} />
            
          <div className="my-3 text-end">

            <Button variant="secondary" onClick={() => reloadTodo()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
            </Button>
          </div>

          <TodoList todos={todos}
                    onDeleteTodo={deleteTodo}
                    onToggleCompleteTodo={toggleCompleteTodo}
                    onSetSize={setSize}
          />

          

        </Col>
      </Row>
    </>
  )
}

export { Todo }