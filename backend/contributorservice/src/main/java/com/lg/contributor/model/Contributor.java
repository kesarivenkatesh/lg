package com.lg.contributor.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "contributor")
@AllArgsConstructor
@NoArgsConstructor
public class Contributor {
	@Id
	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private String email;
	private Integer experience;
	
	@OneToMany(mappedBy = "contributor")
	private List<Course> courses;

	public Contributor(String username, String password, String firstname, String lastname, String email,
			Integer experience) {
		super();
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.experience = experience;
	}

}
