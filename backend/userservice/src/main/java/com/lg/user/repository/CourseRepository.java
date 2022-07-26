package com.lg.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lg.user.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

}
