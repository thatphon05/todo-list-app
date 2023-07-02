package com.example.thatpon.todo;

import com.example.thatpon.todo.entity.Todo;
import com.example.thatpon.todo.entity.User;
import com.example.thatpon.todo.exception.NotFoundException;
import com.example.thatpon.todo.repository.TodoRepository;
import com.example.thatpon.todo.repository.UserRepository;
import com.example.thatpon.todo.service.TodoService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@Log4j2
//@MockitoSettings(strictness = Strictness.LENIENT)
public class TodoServiceTest {

    @InjectMocks
    private TodoService todoService;

    @Mock
    private TodoRepository todoRepository;

    @Mock
    private UserRepository userRepository;

    private Todo todo1;

    private User user1;

    private User user2;

    private List<Todo> todoList;

    @BeforeEach
    public void setUp() {

        user1 = new User();
        user1.setId(1L);
        user1.setEmail("test@example.com");
        user1.setUsername("test");
        user1.setPassword("");
        user1.setName("test");
        userRepository.save(user1);

        user2 = new User();
        user2.setId(2L);
        user2.setEmail("test2@example.com");
        user2.setUsername("test2");
        user2.setPassword("");
        user2.setName("test2");
        userRepository.save(user2);

        todoList = new ArrayList<>();
        todo1 = new Todo();
        todo1.setId(1L);
        todo1.setSubject("Test");
        todo1.setIsComplete(0);
        todo1.setUser(user1);

        Todo todo2 = new Todo();
        todo2.setId(2L);
        todo2.setSubject("Test2");
        todo2.setIsComplete(1);
        todo2.setUser(user1);
        todoList.add(todo2);
    }

    @DisplayName("Test get all todos")
    @Test
    public void GivenAllTodos() {

        // stubbing mock to return specific data
        when(todoRepository.findAll(Sort.by("id").descending())).thenReturn(todoList);

        List<Todo> getAllTodos = todoService.getAllTodos();

        assertEquals(todoList, getAllTodos);
        assertEquals(todoList.size(), getAllTodos.size());

        verify(todoRepository, times(1)).findAll(Sort.by("id").descending());
    }

    @DisplayName("Test get all todos by userId")
    @Test
    public void GivenAllTodosByUserId() {
        Pageable paging = PageRequest.of(0, 5, Sort.by("id").descending());
        // stubbing mock to return specific data
        when(todoRepository.findTodosByUserId(1L, paging)).thenReturn(todoList);

        List<Todo> getAllTodos = todoService.getAllTodosByUserId(1L, 0);

        assertEquals(todoList, getAllTodos);
        assertEquals(todoList.size(), getAllTodos.size());

        verify(todoRepository, times(1)).findTodosByUserId(1L, paging);
    }

    @DisplayName("Test get todo by id")
    @Test
    public void GivenTodosById() {

        // stubbing mock to return specific data
        when(todoRepository.findById(1L)).thenReturn(Optional.of(todo1));

        Todo todoList1 = todoService.getTodoById(1L);

        assertEquals(todo1, todoList1);

        verify(todoRepository, times(1)).findById(1L);
    }

    @DisplayName("Test create todo by id")
    @Test
    public void testCreateTodo() {

        Todo todoToInsert = new Todo();
        todoToInsert.setId(1L);
        todoToInsert.setSubject("Test Todo");
        todoToInsert.setIsComplete(0);
        todoToInsert.setUser(user1);
        todoToInsert.setTags(List.of());

        when(todoRepository.save(todoToInsert)).thenReturn(todoToInsert);

        Todo savedTodo = todoService.createTodo(todoToInsert);

        assertNotNull(savedTodo);

        verify(todoRepository, times(1)).save(todoToInsert);
    }

    @DisplayName("Test set todo to complete")
    @Test
    public void testSetTodoComplete() {

        when(todoRepository.findById(todo1.getId())).thenReturn(Optional.of(todo1));

        when(todoRepository.save(todo1)).thenReturn(todo1);

        Todo updatedTodo = todoService.markAsComplete(todo1.getId());

        assertEquals(1, updatedTodo.getIsComplete());

        verify(todoRepository, times(1)).findById(todo1.getId());
        verify(todoRepository, times(1)).save(todo1);
    }

    @DisplayName("Test set todo to complete")
    @Test
    public void testSetTodoCompleteNotFound() {

        when(todoRepository.findById(todo1.getId())).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class,
                () -> todoService.markAsComplete(todo1.getId())
        );

        verify(todoRepository, times(1)).findById(todo1.getId());

    }

    @DisplayName("Test delete todo")
    @Test
    public void testDeleteTodoComplete() {

        when(todoRepository.findById(todo1.getId())).thenReturn(Optional.of(todo1));

        doNothing().when(todoRepository).deleteById(todo1.getId());

        todoService.deleteTodo(todo1.getId());

        verify(todoRepository, times(1)).deleteById(todo1.getId());
    }
}
