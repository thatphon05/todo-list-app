package com.example.thatpon.todo.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class CreateTodoRequest {

    @NotBlank(message = "subject field is mandatory")
    private String subject;

    private Integer isComplete = 0;

    private List<Long> tagIds;
}
