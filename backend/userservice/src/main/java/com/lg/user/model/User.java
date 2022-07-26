package com.lg.user.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "username")
public class User {
	@Id
	@Column(name = "username")
	private String username;
	
	@Column(name = "firstname")
	private String firstname;
	
	@Column(name = "lastname")
	private String lastname;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "logged_in")
	private Boolean loggedIn;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
			name = "enrolled_courses",
			joinColumns = @JoinColumn(name = "user_username"),
			inverseJoinColumns = @JoinColumn(name = "course_id")
	)
	private List<Course> courses;
	
	@OneToMany(mappedBy = "user")
	private List<Doubt> doubts;

	public User(String username, String firstname, String lastname, String email, String password) {
		super();
		this.username = username;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
	}
	
	public void addCourse(Course course) {
		this.courses.add(course);
	}
	

}
