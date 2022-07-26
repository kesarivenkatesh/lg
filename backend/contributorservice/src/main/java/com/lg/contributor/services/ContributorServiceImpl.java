package com.lg.contributor.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
import com.lg.contributor.fiegnclient.UserRestContributor;
import com.lg.contributor.model.Contributor;
import com.lg.contributor.model.Course;
import com.lg.contributor.model.Document;
import com.lg.contributor.model.Doubt;
import com.lg.contributor.repository.ContributorRepository;
import com.lg.contributor.repository.CourseRepository;
import com.lg.contributor.repository.DocumentRepository;
import com.lg.contributor.repository.DoubtRepository;

@Service
public class ContributorServiceImpl implements ContributorService {
	
	@Autowired
	private ContributorRepository contributorRepository;
	
	@Autowired
	private CourseRepository courseRepository;
	
	@Autowired
	private DoubtRepository doubtRepository;
	
	@Autowired
	private DocumentRepository docRepository;
	
	@Autowired
	private UserRestContributor urCont;

	public ContributorServiceImpl() {
	}

	@Override
	public ContributorSignupResponse createContributor(Contributor contributor) {
		Contributor k = contributorRepository.save(contributor);
		ContributorSignupResponse csr = new ContributorSignupResponse();
		csr.setUsername(k.getUsername());
		csr.setFirstname(k.getFirstname());
		csr.setLastname(k.getLastname());
		csr.setEmail(k.getEmail());
		csr.setPassword(k.getPassword());
		csr.setExperience(k.getExperience());
		return csr;
	}

	@Override
	public ContributorSignupResponse login(AuthRequest authRequest) {
		Contributor contributor = null;
		Optional<Contributor> c = contributorRepository.findById(authRequest.getUsername());
		if(c.isPresent()) {
			contributor = c.get();
			if(contributor.getPassword().equals(authRequest.getPassword())) {
				Contributor k = contributor;
				ContributorSignupResponse csr = new ContributorSignupResponse();
				csr.setUsername(k.getUsername());
				csr.setFirstname(k.getFirstname());
				csr.setLastname(k.getLastname());
				csr.setEmail(k.getEmail());
				csr.setPassword(k.getPassword());
				csr.setExperience(k.getExperience());
				return csr;
			}
		}
		return null;
	}

	@Override
	public CourseAddResponse addCourse(String username, CourseAddRequest car) {
		Course c = new Course();
		c.setTitle(car.getTitle());
		c.setDescription(car.getDescription());
		c.setEstimatedTime(car.getEstimatedTime());
		
		Optional<Contributor> con = contributorRepository.findById(username);
		if(con.isPresent()) {
			Contributor cont = con.get();
			c.setContributor(cont);
			Course k = courseRepository.save(c);
			CourseAddResponse cart = new CourseAddResponse();
			cart.setId(k.getId());
			cart.setTitle(k.getTitle());
			cart.setDescription(k.getDescription());
			cart.setEstimatedTime(k.getEstimatedTime());
			cart.setUsername(username);
			return cart;
		}
		return null;
	}

	
	@Override
	public CourseEditResponse editCourse(String username, Integer id, CourseEditRequest cer) {
		Optional<Course> c = courseRepository.findById(id);
		CourseEditResponse car = null;
		if(c.isPresent()) {
			
			Course t = c.get();
			t.setTitle(cer.getTitle());
			t.setDescription(cer.getDescription());
			t.setEstimatedTime(cer.getEstimatedTime());
			
			Course k = courseRepository.save(t);
			
			car = new CourseEditResponse();
			car.setId(k.getId());
			car.setTitle(k.getTitle());
			car.setDescription(k.getDescription());
			car.setEstimatedTime(k.getEstimatedTime());
			car.setUsername(username);

		}
		return car;
	}

	@Override
	public boolean removeCourse(String username, Integer id) {
		courseRepository.deleteById(id);
		return true;
	}

	@Override
	public List<UserCoursesResponse> getUserCourses(String username) {
		return courseRepository.getUserCourses(username);
	}

	@Override
	public List<AllCoursesResponse> getAllCourses() {
		return courseRepository.getAllCourses();
	}

	@Override
	public Course getCourseById(Integer id) {
		Optional<Course> k = courseRepository.findById(id);
		if(k.isPresent()) {
			return k.get();
		}
		return null;
	}

	@Override
	public String getContributorNameById(Integer id) {
		return courseRepository.getContributorNameById(id);
	}

	@Override
	public List<Doubt> getAllDoubts() {
		List<Doubt> k = urCont.getAllDoubts();
		return doubtRepository.saveAll(k);
	}

	@Override
	public Doubt answerQuestion(Integer pid, AnswerDoubtRequest adr) {
		Optional<Doubt> t = doubtRepository.findById(pid);
		if(t.isPresent()) {
			Doubt d = t.get();
			d.setAnswer(adr.getAnswer());
			
			return doubtRepository.save(d);
		}
		return null;
	}

	@Override
	public List<AllDoubtsResponse> getAllAnswers() {
		List<Doubt> t = doubtRepository.findAll();
		List<AllDoubtsResponse> res = null;
		if(!(t.isEmpty())) {
			res = new ArrayList<AllDoubtsResponse>();
			for(Doubt k: t) {
				AllDoubtsResponse adr = new AllDoubtsResponse();
				adr.setId(k.getId());
				adr.setUsername(k.getUsername());
				adr.setQuestion(k.getQuestion());
				adr.setAnswer(k.getAnswer());
				
				res.add(adr);
			}
		}
		return res;
	}

	@Override
	public List<ContributorSignupResponse> allContributors() {
		List<Contributor> k = contributorRepository.findAll();
		List<ContributorSignupResponse> res = new ArrayList<>();
		for(Contributor t: k) {
			ContributorSignupResponse csr = new ContributorSignupResponse();
			csr.setUsername(t.getUsername());
			csr.setFirstname(t.getFirstname());
			csr.setLastname(t.getLastname());
			csr.setEmail(t.getEmail());
			csr.setExperience(t.getExperience());
			csr.setPassword(t.getPassword());
			res.add(csr);
		}
		return res;
	}
	
	public Document saveFile(MultipartFile file) {
		String docname = file.getOriginalFilename();
		try {
			Document doc = new Document(docname, file.getContentType(), file.getBytes());
			return docRepository.save(doc);
		} catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public Optional<Document> getFile(Integer fileId) {
		return docRepository.findById(fileId);
	}
	
	public List<Document> getFiles() {
		return docRepository.findAll();
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
