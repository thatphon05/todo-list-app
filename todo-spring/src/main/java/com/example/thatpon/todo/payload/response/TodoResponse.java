package com.example.thatpon.todo.payload.response;

import com.example.thatpon.todo.entity.Tag;
import com.example.thatpon.todo.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;


@Data
@NoArgsConstructor
public class TodoResponse {

    private Long id;

    private String subject;

    private Integer isComplete;

    private Date createdAt;

    private Date updatedAt;

    private User user;

    private List<Tag> tags;

}
