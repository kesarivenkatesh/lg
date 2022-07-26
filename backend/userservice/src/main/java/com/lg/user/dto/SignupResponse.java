package com.lg.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupResponse {
	private String username;
	private String firstname;
	private String lastname;
	private String email;
	private String password;
	private Boolean loggedIn;
}
