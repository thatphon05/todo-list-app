import { Badge, Button, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";

const TodoItem = ({ todo, onToggleCompleteTodo, onDeleteTodo}) => {

  const { id, subject, isComplete, createdAt } = todo

  return (
    <ListGroup.Item as="li" action
                    className={`py-3 d-flex justify-content-between align-items-start ${isComplete ? "text-success" : ""} `}>
      <div className={`ms-2 me-auto text-start ${isComplete ? "text-decoration-line-through" : ""}`}>
        <div className="text-bold">{ `${id}. ${subject}` }</div>
        Status: { isComplete ? 'Complete' : 'Incomplete' }
        <p>Created date: { new Date(createdAt).toLocaleDateString() }</p>
      </div>
      <div className="ms-2 me-auto">
        {
          todo?.tags.map((tag) =>
            <Badge className="me-1" key={tag.id} bg="primary">{ tag.name }</Badge>
          )
        }
      </div>
      <Button variant="success" size="sm" disabled={isComplete} className="mt-2 me-2"
              onClick={onToggleCompleteTodo}>
        { isComplete ? (
          <>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
          </svg> Completed
          </>) 
          : "Mark as completed"
        }
      </Button>
      <Button variant="danger" size="sm" className="mt-2" onClick={onDeleteTodo}>
        Delete
      </Button>
    </ListGroup.Item>
  )

}

TodoItem.propTypes = {
  todo: PropTypes.object,
  onToggleCompleteTodo: PropTypes.func,
  onDeleteTodo: PropTypes.func
}

export { TodoItem }