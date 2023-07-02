package com.example.thatpon.todo.repository;

import com.example.thatpon.todo.entity.ERole;
import com.example.thatpon.todo.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
