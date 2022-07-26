package com.lg.contributor.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.net.HttpHeaders;
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
import com.lg.contributor.services.ContributorService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/contributor")
public class ContributorController {
	@Autowired
	private ContributorService contributorService;

	@PostMapping("/register")
	public ContributorSignupResponse register(@RequestBody Contributor c) {
		return contributorService.createContributor(c);
	}

	@PostMapping("/login")
	public ContributorSignupResponse login(@RequestBody AuthRequest authRequest) {
		return contributorService.login(authRequest);
	}

	@PostMapping("/{username}/course/add")
	public CourseAddResponse addCourse(@PathVariable(name = "username") String username,
			@RequestBody CourseAddRequest car) {
		return contributorService.addCourse(username, car);
	}

	@GetMapping("/{username}/course/all")
	public List<UserCoursesResponse> getAllCourses(@PathVariable(name = "username") String username) {
		return contributorService.getUserCourses(username);
	}

	@PutMapping("/{username}/course/edit/{id}")
	public CourseEditResponse editCourse(@PathVariable(name = "username") String username,
			@PathVariable(name = "id") Integer id, @RequestBody CourseEditRequest cer) {
		return contributorService.editCourse(username, id, cer);
	}

	@DeleteMapping("/{username}/course/delete/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteCourse(@PathVariable(name = "username") String username,
			@PathVariable(name = "id") Integer id) {

		boolean deleted = false;
		deleted = contributorService.removeCourse(username, id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", deleted);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/{username}/course/doubt/{pid}/answer")
	public Doubt answerQuestion(@PathVariable Integer pid, @RequestBody AnswerDoubtRequest adr) {
		return contributorService.answerQuestion(pid, adr);
	}

	// fiegn

	@GetMapping("/courses/all")
	public List<AllCoursesResponse> getAllCourses() {
		return contributorService.getAllCourses();
	}

	@GetMapping("/course/{id}")
	public Course getCourseById(@PathVariable Integer id) {
		return contributorService.getCourseById(id);
	}

	@GetMapping("/course/{id}/cname")
	public String getContributorById(@PathVariable Integer id) {
		return contributorService.getContributorNameById(id);
	}

	@GetMapping("/doubts/all")
	public List<Doubt> getAllDoubts() {
		return contributorService.getAllDoubts();
	}

	@GetMapping("/course/doubts/answers/all")
	public List<AllDoubtsResponse> getAllAnswers() {
		return contributorService.getAllAnswers();
	}

	@GetMapping("/all")
	public List<ContributorSignupResponse> allContributors() {
		return contributorService.allContributors();
	}

	@PostMapping(value = "/upload")
	public void uploadFiles(@RequestBody MultipartFile[] files) {
		for (MultipartFile file : files) {
			contributorService.saveFile(file);
		}
	}
	
	@GetMapping("/downloadFile/{fileId}")
	public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable Integer fileId){
		Document doc = contributorService.getFile(fileId).get();
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(doc.getDocType()))
				.header(HttpHeaders.CONTENT_DISPOSITION,"attachment:filename=\""+doc.getDocName()+"\"")
				.body(new ByteArrayResource(doc.getData()));
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
