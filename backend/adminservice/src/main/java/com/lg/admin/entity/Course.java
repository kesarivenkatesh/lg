package com.lg.admin.entity;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
	@Id
	private Integer id;
	private String title;
	private String description;
	private Integer estimatedTime;
	private String contributor;

}
