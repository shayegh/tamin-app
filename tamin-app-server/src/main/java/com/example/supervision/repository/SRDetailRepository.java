package com.example.supervision.repository;

import com.example.supervision.model.supervision.SRDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SRDetailRepository extends JpaRepository<SRDetail, Long> {
    Optional<SRDetail> findById(Long srHeaderId);
    Page<SRDetail> findBysrHeaderId(Long headerId, Pageable pageable);
}
