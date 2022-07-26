package com.lg.contributor.fiegnclient;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.lg.contributor.model.Doubt;

@FeignClient(name = "USER-SERVICE")
public interface UserRestContributor {
	@GetMapping("/user/doubts/all")
	public List<Doubt> getAllDoubts();
}
