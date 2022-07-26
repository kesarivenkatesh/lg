package com.lg.contributor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.lg.contributor.dto.AllCoursesResponse;
import com.lg.contributor.dto.CourseEditResponse;
import com.lg.contributor.dto.UserCoursesResponse;
import com.lg.contributor.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
	
	@Query(value = "select new com.lg.contributor.dto.UserCoursesResponse(c.id,c.title,c.description,c.estimatedTime,cn.username) from Course c JOIN c.contributor cn where cn.username= ?1")
	List<UserCoursesResponse> getUserCourses(String username);

	@Query(value = "select new com.lg.contributor.dto.AllCoursesResponse(c.id,c.title,c.description,c.estimatedTime,CONCAT(cn.firstname, ' ', cn.lastname)) from Course c JOIN c.contributor cn")
	List<AllCoursesResponse> getAllCourses();
	
	@Query(value = "select new com.lg.contributor.dto.CourseEditResponse(c.id,c.title,c.description,c.estimatedTime,cn.username) from Course c JOIN c.contributor cn where c.id = ?1")
	CourseEditResponse getCourseById(Integer id);

	@Query(value = "select CONCAT(cn.firstname, ' ', cn.lastname) from Course c JOIN c.contributor cn where c.id = ?1")
	String getContributorNameById(Integer id);
	
}
