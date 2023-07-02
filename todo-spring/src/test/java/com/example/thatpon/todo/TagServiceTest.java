package com.example.thatpon.todo;

import com.example.thatpon.todo.entity.Tag;
import com.example.thatpon.todo.repository.TagRepository;
import com.example.thatpon.todo.service.TagService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@Log4j2
//@MockitoSettings(strictness = Strictness.LENIENT)
public class TagServiceTest {

    @InjectMocks
    private TagService tagService;

    @Mock
    private TagRepository tagRepository;

    private List<Tag> tagList;

    @BeforeEach
    public void setUp() {

        Tag tag1 = new Tag();
        tag1.setId(1L);
        tag1.setName("tag1");

        Tag tag2 = new Tag();
        tag2.setId(1L);
        tag2.setName("tag2");

        tagList = List.of(tag1, tag2);
    }

    @DisplayName("Test get all tags")
    @Test
    public void GivenAllTodos() {

        // stubbing mock to return specific data
        when(tagRepository.findAll(Sort.by(Sort.Direction.ASC, "name"))).thenReturn(tagList);

        List<Tag> getAllTags = tagService.findAllTags();

        assertEquals(tagList, getAllTags);
        assertEquals(tagList.size(), getAllTags.size());

        verify(tagRepository, times(1)).findAll(Sort.by(Sort.Direction.ASC, "name"));
    }
}
