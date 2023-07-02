package com.example.thatpon.todo.controller;

import com.example.thatpon.todo.entity.Todo;
import com.example.thatpon.todo.entity.User;
import com.example.thatpon.todo.exception.NotFoundException;
import com.example.thatpon.todo.repository.TodoRepository;
import com.example.thatpon.todo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@RestController
@RequestMapping("users")
public class UserController {

    private final UserRepository userRepository;

    private final TodoRepository todoRepository;

    @GetMapping
    public ResponseEntity<List<User>> getUserList() {
        log.info("Get all users");
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        log.info("Get user by id");
        User user = userRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/{id}/todos")
    public ResponseEntity<List<Todo>> getTodosByUsersId(@PathVariable("id") Long id) {
        log.info("Get all todos by userId");

        List<Todo> todos = todoRepository.findTodosByUserId(id);
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }
}
