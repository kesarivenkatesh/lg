package com.lg.user.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
import com.lg.user.exception.NoUsersPresentException;
import com.lg.user.exception.UserAlreadyPresent;
import com.lg.user.exception.UserLoginException;
import com.lg.user.exception.UserNotFoundException;
import com.lg.user.exception.UserNotRegisteredCourseException;
import com.lg.user.feignrest.ContributorRestUser;
import com.lg.user.model.Course;
import com.lg.user.model.Doubt;
import com.lg.user.model.User;
import com.lg.user.repository.CourseRepository;
import com.lg.user.repository.DoubtRepository;
import com.lg.user.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ContributorRestUser crUser;

	@Autowired
	private CourseRepository courseRepo;

	@Autowired
	private DoubtRepository doubtRepo;

	@Override
	public SignupResponse createUser(User user) throws UserAlreadyPresent {
		Optional<User> u = userRepo.findById(user.getUsername());
		if (u.isPresent()) {
			throw new UserAlreadyPresent("User Already Registered");
		}
		user.setLoggedIn(false);
		userRepo.save(user);
		
		SignupResponse res = new SignupResponse();
		res.setUsername(user.getUsername());
		res.setFirstname(user.getFirstname());
		res.setLastname(user.getLastname());
		res.setEmail(user.getEmail());
		res.setPassword(user.getPassword());
		res.setLoggedIn(user.getLoggedIn());
		return res;
	}

	@Override
	public LoginResponse login(AuthRequest authRequest) throws UserNotFoundException {
		User ue = null;
		Optional<User> u = userRepo.findById(authRequest.getUsername());
		if (u.isPresent()) {
			ue = u.get();
			if (ue.getPassword().equals(authRequest.getPassword())) {
				ue.setLoggedIn(true);
				userRepo.save(ue);
				LoginResponse res = new LoginResponse();
				res.setUsername(ue.getUsername());
				res.setFirstname(ue.getFirstname());
				res.setLastname(ue.getLastname());
				res.setEmail(ue.getEmail());
				res.setPassword(ue.getPassword());
				res.setLoggedIn(ue.getLoggedIn());
				return res;
			}
		} else {
			throw new UserNotFoundException("Please Login with correct details. If new user SignUp first");
		}
		return null;
	}
	
	@Override
	public List<CourseResponse> enroll(String username, Integer id)
			throws CourseNotFoundException, UserNotFoundException, CourseAlreadyEnrolled, UserLoginException {
		Course course = null;
		// from fiegn get course
		course = crUser.getCourseById(id);
		
		// res
		List<CourseResponse> res = null;
		// if course is present
		if (course != null) {
			course.setId(id);
			// if user is present
			Optional<User> temp = userRepo.findById(username);
			if (temp.isPresent()) {
				User user = temp.get();
				// check if user is loggged in or not
				if(!(user.getLoggedIn())) {
					throw new UserLoginException("User is Not Logged in yet");
				}
				// check if user not enrolled before
				for (Course kl : user.getCourses()) {
					System.out.println(kl.getId());
					if (kl.getId() == course.getId()) {
						throw new CourseAlreadyEnrolled("Course is already Enrolled by the User");
					}
				}

				// add to course table
				Course t = courseRepo.save(course);
				// add to user courses list
				user.addCourse(t);
				// save user
				User h = userRepo.save(user);

				// for returning list
				List<Course> ht = h.getCourses();
				res = new ArrayList<>();
				for (Course k : ht) {
					CourseResponse ecr = new CourseResponse();
					ecr.setId(k.getId());
					ecr.setTitle(k.getTitle());
					ecr.setDescription(k.getDescription());
					ecr.setEstimatedTime(k.getEstimatedTime());
					String contributorName = crUser.getContributorById(k.getId());
					ecr.setContributor(contributorName);
					res.add(ecr);
				}

			} else {
				throw new UserNotFoundException("First Login/ Signup");
			}
		} else {
			throw new CourseNotFoundException("Course is Not found");
		}
		return res;
	}

	@Override
	public List<AllCoursesResponse> getAllCourses() throws FiegnException, NoCoursesPresent {
		try {
			List<AllCoursesResponse> k = crUser.getAllCourses();
			if(k.isEmpty()) {
				throw new NoCoursesPresent("No Courses Present");
			} else {
				return k;
			}
		} catch(Exception e) {
			throw new FiegnException("Check if contributor service is started");
		}
	}

	@Override
	public List<CourseResponse> getEnrolledCourses(String username) throws UserNotFoundException, UserLoginException, CourseNotFoundException {
		Optional<User> t = userRepo.findById(username);
		if (t.isPresent()) {
			User user = t.get();
			// check if user is logged in or not
			if(!(user.getLoggedIn())) {
				throw new UserLoginException("Login To See Enrolled Courses");
			}
			List<Course> ht = user.getCourses();
			if(ht.isEmpty()) {
				throw new CourseNotFoundException("No Courses Registered");
			}
			List<CourseResponse> res = new ArrayList<CourseResponse>();
			for (Course k : ht) {
				CourseResponse ecr = new CourseResponse();
				ecr.setId(k.getId());
				ecr.setTitle(k.getTitle());
				ecr.setDescription(k.getDescription());
				ecr.setEstimatedTime(k.getEstimatedTime());
				String contributorName = crUser.getContributorById(k.getId());
				ecr.setContributor(contributorName);
				res.add(ecr);
			}
			return res;
		} else {
			throw new UserNotFoundException("No user present with this login");
		}
	}

	@Override
	public List<DoubtResponse> askDoubt(String username, Integer id, DoubtRequest doubt) throws UserLoginException, UserNotFoundException,
	UserNotRegisteredCourseException, CourseNotFoundException {
		// result
		List<DoubtResponse> res = new ArrayList<DoubtResponse>();
		// new doubt to be added
		Doubt d = new Doubt();
		d.setQuestion(doubt.getQuestion());
		d.setAnswer("Yet to Be Answered");
		// check if user present
		Optional<User> t = userRepo.findById(username);
		if (t.isPresent()) {
			User user = t.get();
			// check if user is loggged in or not
			if(!(user.getLoggedIn())) {
				throw new UserLoginException("Login to ask Doubt");
			}
			// check if course present
			Optional<Course> ct = courseRepo.findById(id);
			if (ct.isPresent()) {
				Course course = ct.get();
				// check if user registered with course
				if (course.getUsers().contains(user)) {
					d.setCourse(course);
					d.setUser(user);

					// already present doubts
					List<Doubt> doubts = user.getDoubts();
					for (Doubt df : doubts) {
						DoubtResponse dres = new DoubtResponse();
						dres.setId(df.getId());
						dres.setQuestion(df.getQuestion());
						dres.setAnswer(df.getAnswer());

						res.add(dres);
					}

					// add doubt to table
					Doubt df1 = doubtRepo.save(d);
					DoubtResponse dres1 = new DoubtResponse();
					dres1.setId(df1.getId());
					dres1.setQuestion(df1.getQuestion());
					dres1.setAnswer(df1.getAnswer());
					res.add(dres1);

					return res;
				} else {
					throw new UserNotRegisteredCourseException("UserNot Registered with course");
				}
			} else {
				throw new CourseNotFoundException("Course is Not present");
			}
		} else {
			throw new UserNotFoundException("First Login/Signup");
		}
	}

	@Override
	public List<AllDoubtsResponse> getAllDoubts() throws NoDoubtsException {
		List<AllDoubtsResponse> k = doubtRepo.getAllDoubts();
		if(k.isEmpty()) {
			throw new NoDoubtsException("No Doubts Present");
		}
		return k;
	}

	@Override
	public List<AllDoubtsResponse> getAllAnswers() throws NoDoubtsException {
		List<AllDoubtsResponse> t = crUser.getAllAnswers();
		if(!(t.isEmpty())) {
			for(AllDoubtsResponse adr: t) {
				if(!(adr.getAnswer().equals("Yet to Be Answered"))) {
					doubtRepo.updateAnswer(adr.getId(), adr.getUsername(), adr.getAnswer(), adr.getQuestion());
				}
			}
		}
		return getAllDoubts();
	}

	@Override
	public List<LoginResponse> allUsers() throws NoUsersPresentException {
		List<User> k = userRepo.findAll();
		if(k.isEmpty()) {
			throw new NoUsersPresentException("No Users Registered");
		}
		List<LoginResponse> res = new ArrayList<LoginResponse>();
		for(User t: k) {
			LoginResponse lr = new LoginResponse();
			lr.setUsername(t.getUsername());
			lr.setFirstname(t.getFirstname());
			lr.setLastname(t.getLastname());
			lr.setEmail(t.getEmail());
			lr.setLoggedIn(t.getLoggedIn());
			lr.setPassword(t.getPassword());
			
			res.add(lr);
		}
		return res;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
