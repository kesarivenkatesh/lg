package com.lg.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.lg.user.exception.UserAlreadyPresent;
import com.lg.user.exception.UserLoginException;
import com.lg.user.exception.UserNotFoundException;
import com.lg.user.model.User;
import com.lg.user.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<SignupResponse> createUser(@RequestBody User user) {
		try {
			SignupResponse k = userService.createUser(user);
			return ResponseEntity.status(HttpStatus.CREATED).body(k);
		} catch (UserAlreadyPresent e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.CONFLICT).header("error", "Already Registered User").build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody AuthRequest authRequest) {
		try {
			LoginResponse k = userService.login(authRequest);
			return ResponseEntity.ok().body(k);
		} catch (UserNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).header("error", "Not Yet Registered").build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/{username}/courses/all")
	public ResponseEntity<List<AllCoursesResponse>> allCourses() {
		try {
			List<AllCoursesResponse> k = userService.getAllCourses();
			if (k.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).header("error", "No Courses Yet").build();
			} else {
				return ResponseEntity.ok().body(k);
			}
		} catch (FiegnException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.NOT_FOUND).header("error", "Cannot Access Contributor Service")
					.build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/{username}/courses/enroll/{id}")
	public ResponseEntity<List<CourseResponse>> enrollCourse(@PathVariable(name = "username") String username,
			@PathVariable(name = "id") Integer id) {
		try {
			List<CourseResponse> k = userService.enroll(username, id);
			return ResponseEntity.ok().body(k);
		} catch (CourseNotFoundException | UserNotFoundException e1) {
			e1.printStackTrace();
			return ResponseEntity.status(HttpStatus.NOT_FOUND).header("error", "Course or User Not found").build();
		} catch (CourseAlreadyEnrolled e1) {
			e1.printStackTrace();
			return ResponseEntity.status(HttpStatus.CONFLICT).header("error", "Already Enrolled course for User")
					.build();
		} catch (UserLoginException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).header("error", "Login To Enroll Courses").build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/{username}/courses/enrolled")
	public ResponseEntity<List<CourseResponse>> getEnrolledCourses(@PathVariable String username) {
		try {
			List<CourseResponse> k = userService.getEnrolledCourses(username);
			if (k.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).header("error", "No Courses Enrolled Yet").build();
			}
			return ResponseEntity.ok().body(k);
		} catch (UserLoginException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).header("error", "Login To See Enrolled Courses").build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/{username}/course/{id}/askdoubt")
	public ResponseEntity<List<DoubtResponse>> askDoubt(@PathVariable(name = "username") String username,
			@PathVariable(name = "id") Integer id, @RequestBody DoubtRequest doubt) {
		try {
			List<DoubtResponse> k = userService.askDoubt(username, id, doubt);
			return ResponseEntity.status(HttpStatus.CREATED).body(k);
		} catch (UserLoginException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).header("error", "Login To Enroll Courses").build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	// feign client end points
	@GetMapping("/doubts/all")
	public List<AllDoubtsResponse> getAllDoubts() {
		return userService.getAllDoubts();
	}
	
	@GetMapping("/doubts/answers/all")
	public List<AllDoubtsResponse> getAllAnswers() {
		return userService.getAllAnswers();
	}
	
	@GetMapping("/all")
	public List<LoginResponse> allUsers() {
		return userService.allUsers();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	@RequestMapping(path = "/**")
	public ResponseEntity<String> unAvailablePath() {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Mapping Available");
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
