package com.lg.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
import com.lg.user.exception.NoCoursesPresent;
import com.lg.user.exception.NoDoubtsException;
import com.lg.user.exception.NoPathAvailable;
import com.lg.user.exception.NoUsersPresentException;
import com.lg.user.exception.UserAlreadyPresent;
import com.lg.user.exception.UserLoginException;
import com.lg.user.exception.UserNotFoundException;
import com.lg.user.exception.UserNotRegisteredCourseException;
import com.lg.user.model.User;
import com.lg.user.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public SignupResponse createUser(@RequestBody User user) throws UserAlreadyPresent {
		return userService.createUser(user);
	}

	@PostMapping("/login")
	public LoginResponse login(@RequestBody AuthRequest authRequest) throws UserNotFoundException {
		return userService.login(authRequest);
	}

	@GetMapping("/{username}/courses/all")
	public List<AllCoursesResponse> allCourses() throws FiegnException, NoCoursesPresent {
		return userService.getAllCourses();
	}

	@GetMapping("/{username}/courses/enroll/{id}")
	public List<CourseResponse> enrollCourse(@PathVariable(name = "username") String username,
			@PathVariable(name = "id") Integer id) throws CourseNotFoundException, UserNotFoundException, CourseAlreadyEnrolled, UserLoginException {
		return userService.enroll(username, id);
	}

	@GetMapping("/{username}/courses/enrolled")
	public List<CourseResponse> getEnrolledCourses(@PathVariable String username) throws UserNotFoundException, UserLoginException,
			CourseNotFoundException {
		return userService.getEnrolledCourses(username);
	}

	@PostMapping("/{username}/course/{id}/askdoubt")
	public List<DoubtResponse> askDoubt(@PathVariable(name = "username") String username,
			@PathVariable(name = "id") Integer id, @RequestBody DoubtRequest doubt) throws UserLoginException,
			UserNotFoundException, UserNotRegisteredCourseException, CourseNotFoundException {
		return userService.askDoubt(username, id, doubt);
	}
	
	// feign client end points
	@GetMapping("/doubts/all")
	public List<AllDoubtsResponse> getAllDoubts() throws NoDoubtsException {
		return userService.getAllDoubts();
	}
	
	@GetMapping("/doubts/answers/all")
	public List<AllDoubtsResponse> getAllAnswers() throws NoDoubtsException {
		return userService.getAllAnswers();
	}
	
	@GetMapping("/all")
	public List<LoginResponse> allUsers() throws NoUsersPresentException {
		return userService.allUsers();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	@RequestMapping(path = "/**")
	public ResponseEntity<String> unAvailablePath() throws NoPathAvailable {
		throw new NoPathAvailable("Path is not available");
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
