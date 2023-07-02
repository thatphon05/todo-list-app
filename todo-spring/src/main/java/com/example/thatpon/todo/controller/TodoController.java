package com.example.thatpon.todo.controller;

import com.example.thatpon.todo.entity.Tag;
import com.example.thatpon.todo.entity.Todo;
import com.example.thatpon.todo.entity.User;
import com.example.thatpon.todo.exception.NotFoundException;
import com.example.thatpon.todo.facade.AuthenticationFacade;
import com.example.thatpon.todo.payload.request.CreateTodoRequest;
import com.example.thatpon.todo.repository.TodoRepository;
import com.example.thatpon.todo.repository.UserRepository;
import com.example.thatpon.todo.service.TagService;
import com.example.thatpon.todo.service.TodoService;
import com.example.thatpon.todo.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Log4j2
@RequiredArgsConstructor
@RestController("Todo2")
//@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/todos")
public class TodoController {

    private final TodoService todoService;
    private final TagService tagService;
    private final UserService userService;
    private final UserRepository userRepository;

    private final AuthenticationFacade authenticationFacade;

    @GetMapping()
    public ResponseEntity<List<Todo>> getAllTodos(@RequestParam(value = "page", defaultValue = "0", required = false) Integer page) {

        Authentication authentication = authenticationFacade.getAuthentication();

        Optional<User> user = userService.findByUsername(authentication.getName());

        List<Todo> todos = todoService.getAllTodosByUserId(user.orElseThrow(() -> new NotFoundException(1L))
                .getId(), page);

        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    @GetMapping("/tags")
    public ResponseEntity<List<Tag>> getAllTags() {
        log.info("Get all tags");
        List<Tag> tags = tagService.findAllTags();

        return new ResponseEntity<>(tags, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") Long id) {

        log.info("Delete todo: " + id);
        todoService.deleteTodo(id);

        return new ResponseEntity<>("Delete Complete", HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Todo> updateTodoComplete(@PathVariable("id") Long id) {
        log.info("Mark todo complete");

        return new ResponseEntity<>(todoService.markAsComplete(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Todo> createTodo(@Valid @RequestBody CreateTodoRequest createTodoRequest) {
        log.info("create Todo: " + createTodoRequest);
        Authentication authentication = authenticationFacade.getAuthentication();
        String username = authentication.getName();

        Long userId = userRepository.findByUsername(username).get().getId();

        Todo todoToInsert = new Todo();
        todoToInsert.setSubject(createTodoRequest.getSubject());
        todoToInsert.setIsComplete(createTodoRequest.getIsComplete());
        todoToInsert.setUser(userService.findById(userId)
                .orElseThrow(() -> new NotFoundException(userId)));
        todoToInsert.setTags(tagService.findAllById(createTodoRequest.getTagIds()));

        return new ResponseEntity<>(todoService.createTodo(todoToInsert), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable("id") Long id) {
        log.info("Get todos by id");

        return new ResponseEntity<>(todoService.getTodoById(id), HttpStatus.OK);

    }

}
