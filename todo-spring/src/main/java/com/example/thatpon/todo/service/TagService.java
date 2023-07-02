package com.example.thatpon.todo.service;

import com.example.thatpon.todo.entity.Tag;
import com.example.thatpon.todo.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Service
public class TagService {

    private final TagRepository tagRepository;

    public List<Tag> findAllTags() {

        return tagRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    public List<Tag> findAllById(List<Long> tagIds) {
        return tagRepository.findAllById(tagIds);
    }

}
