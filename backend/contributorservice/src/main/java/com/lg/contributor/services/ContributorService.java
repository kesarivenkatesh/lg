package com.lg.contributor.services;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.lg.contributor.dto.AllCoursesResponse;
import com.lg.contributor.dto.AllDoubtsResponse;
import com.lg.contributor.dto.AnswerDoubtRequest;
import com.lg.contributor.dto.AuthRequest;
import com.lg.contributor.dto.ContributorSignupResponse;
import com.lg.contributor.dto.CourseAddRequest;
import com.lg.contributor.dto.CourseAddResponse;
import com.lg.contributor.dto.CourseEditRequest;
import com.lg.contributor.dto.CourseEditResponse;
import com.lg.contributor.dto.UserCoursesResponse;
import com.lg.contributor.model.Contributor;
import com.lg.contributor.model.Course;
import com.lg.contributor.model.Document;
import com.lg.contributor.model.Doubt;

public interface ContributorService {
	ContributorSignupResponse createContributor(Contributor contributor);
	ContributorSignupResponse login(AuthRequest authRequest);
	boolean removeCourse(String username, Integer id);
	CourseAddResponse addCourse(String username, CourseAddRequest car);
	CourseEditResponse editCourse(String username, Integer id, CourseEditRequest cer);
	List<UserCoursesResponse> getUserCourses(String username);
	List<AllCoursesResponse> getAllCourses();
	Course getCourseById(Integer id);
	String getContributorNameById(Integer id);
	List<Doubt> getAllDoubts();
	Doubt answerQuestion(Integer pid, AnswerDoubtRequest adr);
	List<AllDoubtsResponse> getAllAnswers();
	List<ContributorSignupResponse> allContributors();
	
	Document saveFile(MultipartFile file);
	Optional<Document> getFile(Integer fileId);
	List<Document> getFiles();
}
