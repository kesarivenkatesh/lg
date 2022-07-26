package com.lg.user.feignrest;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.lg.user.dto.AllCoursesResponse;
import com.lg.user.dto.AllDoubtsResponse;
import com.lg.user.model.Course;

@FeignClient(name = "CONTRIBUTOR-SERVICE")
public interface ContributorRestUser {
	@GetMapping("/contributor/courses/all")
	public List<AllCoursesResponse> getAllCourses();
	
	@GetMapping("/contributor/course/{id}")
	public Course getCourseById(@PathVariable Integer id);
	
	@GetMapping("/contributor/course/{id}/cname")
	public String getContributorById(@PathVariable Integer id);

	@GetMapping("/contributor/course/doubts/answers/all")
	public List<AllDoubtsResponse> getAllAnswers();
}
