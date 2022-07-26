package com.lg.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.lg.admin.entity.Admin;
import com.lg.admin.repository.AdminRepository;

@Service
public class AdminService {
	
	@Autowired
	AdminRepository ar;
	@Value("${admin.username}")
	String username;
	@Value("${admin.password}")
	String password;
	
	public Admin login(Admin admin)
	{
		
		if(admin.getUsername().equals(username)&& admin.getPassword().equals(password))
		{
			return admin;
		}
		return null;
	}

}
