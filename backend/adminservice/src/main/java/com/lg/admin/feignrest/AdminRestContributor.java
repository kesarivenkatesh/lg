package com.lg.admin.feignrest;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.lg.admin.entity.Contributor;


@FeignClient(name="CONTRIBUTOR-SERVICE")
public interface AdminRestContributor {
	@GetMapping("/contributor/all")
	public List<Contributor> getContributors();

}
