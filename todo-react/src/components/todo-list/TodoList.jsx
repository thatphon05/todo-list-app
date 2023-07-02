import InfiniteScroll from "react-infinite-scroll-component";
import { ListGroup, Spinner } from "react-bootstrap";
import { TodoItem } from "../todo-item/TodoItem.jsx";
import PropTypes from "prop-types";

const LoadingItemSpinner = () => (
    <div style={{textAlign: 'center'}} className="mt-3">
      <Spinner animation="grow" />
    </div>
)

const TodoList = ({ todos, onToggleCompleteTodo, onDeleteTodo, onSetSize }) => {

  if (!todos) return <LoadingItemSpinner/>

  const isEmpty = todos?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (todos && todos[todos.length - 1]?.length < 5);

  return (
    <ListGroup as="ol" className="mt-3">
      <InfiniteScroll
        dataLength={todos?.length}
        next={() => { setTimeout(() => onSetSize(size => size + 1), 800) }}
        hasMore={!isReachingEnd}
        loader={<LoadingItemSpinner/>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {todos?.map((todosList) => (
          todosList?.map((todo) => (
            <TodoItem key={todo?.id}
                      todo={todo}
                      onToggleCompleteTodo={() => onToggleCompleteTodo(todo?.id)}
                      onDeleteTodo={() => onDeleteTodo(todo?.id)} />
          ))
        ))}
      </InfiniteScroll>
    </ListGroup>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onToggleCompleteTodo: PropTypes.func,
  onDeleteTodo: PropTypes.func,
  onSetSize: PropTypes.func,
};

export { TodoList }