package com.lg.user.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
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
@Table(name = "course")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Course {
	
	@Id
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "estimated_time")
	private Integer estimatedTime;
	
	@ManyToMany(cascade = CascadeType.ALL, mappedBy = "courses")
	private List<User> users;
	
	@OneToMany(mappedBy = "course")
	private List<Doubt> doubts;

	public Course(Integer id, String title, String description, Integer estimatedTime) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.estimatedTime = estimatedTime;
	}
	
	

}
