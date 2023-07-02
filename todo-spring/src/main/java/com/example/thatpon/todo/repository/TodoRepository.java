package com.example.thatpon.todo.repository;

import com.example.thatpon.todo.entity.Todo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    @Query(value = "SELECT * FROM todo WHERE isStatus = 1", nativeQuery = true)
    List<Todo> getCompleteTodo();

    List<Todo> findByIsComplete(@Param("isComplete") Integer isComplete);

    List<Todo> findTodosByUserId(Long userId, Pageable pageable);

    List<Todo> findTodosByUserId(Long userId);
}
