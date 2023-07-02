package com.example.thatpon.todo;

import com.example.thatpon.todo.payload.request.CreateTodoRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "admin", password = "123456", roles = {"ADMIN"})
//@Ignore
public class TodoControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void shouldBeOkWhenInsertTodo() throws Exception {

        CreateTodoRequest createTodoRequest = new CreateTodoRequest();
        createTodoRequest.setSubject("Test");
        createTodoRequest.setTagIds(List.of());
        createTodoRequest.setIsComplete(0);

        mvc.perform(MockMvcRequestBuilders
                        .post("/todos", createTodoRequest)
                        .content(objectMapper.writeValueAsString(createTodoRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }

    @Test
    public void shouldBeOkWhenGetAllTodos() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .get("/todos")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void shouldBeOkWhenFindTodoById() throws Exception {

        mvc.perform(MockMvcRequestBuilders
                        .get("/todos/{id}", 272)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void shouldBeNotFoundWhenFindTodo() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .get("/todos/{id}", -1)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(content().string(containsString("Could not find -1")));
    }

    @Test
    public void shouldBeOkWhenUpdateTodoToComplete() throws Exception {

        mvc.perform(MockMvcRequestBuilders
                        .patch("/todos/{id}", 116)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void shouldBeOkWhenFindAllTags() throws Exception {

        mvc.perform(MockMvcRequestBuilders
                        .get("/todos/tags")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

}
