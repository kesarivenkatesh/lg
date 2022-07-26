package com.lg.admin.feignrest;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.lg.admin.entity.User;



@FeignClient(name="USER-SERVICE")
public interface AdminRestUser {
	@GetMapping("/user/all")
	public List<User> getAllUsers();

}
