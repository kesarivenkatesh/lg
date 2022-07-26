package com.lg.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AllDoubtsResponse {
	
	private Integer id;
	private String question;
	private String answer;
	private String username;

}
