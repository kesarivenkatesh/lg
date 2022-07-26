package com.lg.user.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "doubts")
public class Doubt {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String question;
	private String answer;
	
	@OneToOne
	private Course course;
	
	@OneToOne
	private User user;

	public Doubt(String question, String answer) {
		super();
		this.question = question;
		this.answer = answer;
	}
}
