package com.lg.admin.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lg.admin.entity.Admin;
import com.lg.admin.entity.Contributor;
import com.lg.admin.entity.User;
import com.lg.admin.feignrest.AdminRestContributor;
import com.lg.admin.feignrest.AdminRestUser;
import com.lg.admin.service.AdminService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	AdminService as;
	@Autowired
	AdminRestContributor arc;
	@Autowired
	AdminRestUser aru;
		
	@GetMapping("/welcome")
	public String isWorking() {
		return "Working";
	}
	@PostMapping("/login")
	public Admin adminlogin(@RequestBody Admin admin)
	{
		return as.login(admin);
		
	}
	@GetMapping("/contributor/all")
	public List<Contributor> getContributors()
	{
		return arc.getContributors();
	}
	@GetMapping("/user/all")
	public List<User> getAllUsers()
	{
		return aru.getAllUsers();
	}
	
}
