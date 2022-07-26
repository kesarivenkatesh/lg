package com.lg.contributor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lg.contributor.model.Document;

public interface DocumentRepository extends JpaRepository<Document, Integer> {

}
