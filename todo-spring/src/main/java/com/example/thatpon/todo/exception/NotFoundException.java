package com.example.thatpon.todo.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException(Long id) {
        super("Could not find " + id);
    }
}
