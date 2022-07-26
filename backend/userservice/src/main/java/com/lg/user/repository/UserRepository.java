package com.lg.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lg.user.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

}
