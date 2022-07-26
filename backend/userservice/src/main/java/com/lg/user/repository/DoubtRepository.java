package com.lg.user.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.lg.user.dto.AllDoubtsResponse;
import com.lg.user.model.Doubt;

@Repository
public interface DoubtRepository extends JpaRepository<Doubt, Integer> {

	@Query(value = "select new com.lg.user.dto.AllDoubtsResponse(dc.id, d.question, d.answer, du.username) from Doubt d join d.course dc join d.user du")
	List<AllDoubtsResponse> getAllDoubts();

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query(value = "update Doubt d set d.answer = ?3 where d.question = ?4 and ?1 in (select c.id from Doubt d2 join d2.course c) and ?2 in (select u.username from Doubt d3 join d3.user u)")
	void updateAnswer(Integer id, String username, String answer, String question);

}
