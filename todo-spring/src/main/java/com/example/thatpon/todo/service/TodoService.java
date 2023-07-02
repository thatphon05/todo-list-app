package com.example.thatpon.todo.service;

import com.example.thatpon.todo.entity.Todo;
import com.example.thatpon.todo.exception.NotFoundException;
import com.example.thatpon.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Service
public class TodoService {

    private final TodoRepository todoRepository;

    @PostAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public List<Todo> getAllTodos() {
        return todoRepository.findAll(Sort.by("id").descending());
    }

    public List<Todo> getAllTodosByUserId(Long userId, Integer pageNo) {

        log.info("getAllTodosByUserId");

        Pageable paging = PageRequest.of(pageNo, 5, Sort.by("id").descending());

        return todoRepository.findTodosByUserId(userId, paging);
    }

    @PostAuthorize("hasRole('ADMIN') or hasRole('MODERATOR') or returnObject.user.id == authentication.principal.id")
    public Todo getTodoById(long id) {
        return todoRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }

    @Transactional
    public Todo createTodo(Todo todo) {

        log.info("createTodo");

        return todoRepository.save(todo);
    }

    public Todo markAsComplete(Long id) {

        log.info("markAsComplete");

        Todo existedRecord = getTodoById(id);

        existedRecord.setIsComplete(1);

        return todoRepository.save(existedRecord);
    }

    public void deleteTodo(Long id) {
        log.info("deleteTodo");

        Todo existedRecord = getTodoById(id);

        todoRepository.deleteById(existedRecord.getId());
    }

}
