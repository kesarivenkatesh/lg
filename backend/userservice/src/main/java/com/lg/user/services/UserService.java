package com.lg.user.services;


import java.util.List;

import com.lg.user.dto.AllCoursesResponse;
import com.lg.user.dto.AllDoubtsResponse;
import com.lg.user.dto.AuthRequest;
import com.lg.user.dto.CourseResponse;
import com.lg.user.dto.DoubtRequest;
import com.lg.user.dto.DoubtResponse;
import com.lg.user.dto.LoginResponse;
import com.lg.user.dto.SignupResponse;
import com.lg.user.exception.CourseAlreadyEnrolled;
import com.lg.user.exception.CourseNotFoundException;
import com.lg.user.exception.FiegnException;
import com.lg.user.exception.UserAlreadyPresent;
import com.lg.user.exception.UserLoginException;
import com.lg.user.exception.UserNotFoundException;
import com.lg.user.model.User;

public interface UserService {
	LoginResponse login(AuthRequest authRequest) throws Exception;
	SignupResponse createUser(User user) throws UserAlreadyPresent;
	List<CourseResponse> enroll(String username, Integer id) throws CourseNotFoundException, UserNotFoundException, CourseAlreadyEnrolled, UserLoginException;
	List<AllCoursesResponse> getAllCourses() throws FiegnException;
	List<CourseResponse> getEnrolledCourses(String username) throws UserNotFoundException, UserLoginException;
	List<DoubtResponse> askDoubt(String username, Integer id, DoubtRequest doubt) throws UserLoginException;
	List<AllDoubtsResponse> getAllDoubts();
	List<AllDoubtsResponse> getAllAnswers();
	List<LoginResponse> allUsers();
}
