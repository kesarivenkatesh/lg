package com.lg.contributor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContributorSignupResponse {
	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private String email;
	private Integer experience;

}
