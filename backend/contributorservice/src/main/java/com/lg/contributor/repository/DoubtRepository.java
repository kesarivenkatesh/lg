package com.lg.contributor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lg.contributor.model.Doubt;

@Repository
public interface DoubtRepository extends JpaRepository<Doubt, Integer> {

}
