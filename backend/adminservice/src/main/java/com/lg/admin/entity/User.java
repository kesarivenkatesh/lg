package com.lg.admin.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	private String firstname;
    private String lastname;
    private String email;
	private String username;
	private String password;

}
