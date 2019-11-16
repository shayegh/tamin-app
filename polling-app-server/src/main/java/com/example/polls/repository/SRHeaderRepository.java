package com.example.polls.repository;

import com.example.polls.model.supervision.SRHeader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Shayegh@gmail.com on ۱۶/۱۱/۲۰۱۹:۰۹:۰۷ قبل‌ازظهر.
 */
@Repository
public interface SRHeaderRepository extends JpaRepository<SRHeader, Long> {
    Optional<SRHeader> findById(Long srHeaderId);

    Page<SRHeader> findByCreatedBy(Long userId, Pageable pageable);

    long countByCreatedBy(Long userId);

    List<SRHeader> findByIdIn(List<Long> srHeaderIds);

    List<SRHeader> findByIdIn(List<Long> srHeaderIds, Sort sort);
}
