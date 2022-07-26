package com.lg.contributor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseAddRequest {
	private String title;
	private String description;
	private Integer estimatedTime;

}
