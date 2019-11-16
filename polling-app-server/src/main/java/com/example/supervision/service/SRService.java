package com.example.supervision.service;

import com.example.supervision.model.supervision.SRHeader;
import com.example.supervision.payload.PagedResponse;
import com.example.supervision.repository.SRHeaderRepository;
import com.example.supervision.security.UserPrincipal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;

import static com.example.supervision.util.Utils.validatePageNumberAndSize;

/**
 * Created by Shayegh@gmail.com on ۱۶/۱۱/۲۰۱۹ - ۰۹:۵۴ قبل‌ازظهر.
 */
@Slf4j
@Service
public class SRService {
    @Autowired
    private SRHeaderRepository headerRepository;

    public SRHeader createSRHeader(SRHeader srHeader) {

        return headerRepository.save(srHeader);

    }

    public PagedResponse<SRHeader> getAllHeaders(UserPrincipal currentUser, int page, int size) {
        validatePageNumberAndSize(page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<SRHeader> srHeaders = headerRepository.findAll(pageable);
        log.debug("SRService is working");
        if(srHeaders.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), srHeaders.getNumber(),
                    srHeaders.getSize(), srHeaders.getTotalElements(), srHeaders.getTotalPages(), srHeaders.isLast());
        }
        return new PagedResponse<>(srHeaders.getContent(), srHeaders.getNumber(),
                srHeaders.getSize(), srHeaders.getTotalElements(), srHeaders.getTotalPages(), srHeaders.isLast());

    }


}
