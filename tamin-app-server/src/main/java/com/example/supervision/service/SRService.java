package com.example.supervision.service;

import com.example.supervision.exception.ResourceNotFoundException;
import com.example.supervision.model.RoleName;
import com.example.supervision.model.supervision.SRDetail;
import com.example.supervision.model.supervision.SRHeader;
import com.example.supervision.model.supervision.SRHeaderStatus;
import com.example.supervision.payload.PagedResponse;
import com.example.supervision.repository.SRDetailRepository;
import com.example.supervision.repository.SRHeaderRepository;
import com.example.supervision.security.UserPrincipal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;

import static com.example.supervision.util.Utils.hasRole;
import static com.example.supervision.util.Utils.validatePageNumberAndSize;

/**
 * Created by Shayegh@gmail.com on ۱۶/۱۱/۲۰۱۹ - ۰۹:۵۴ قبل‌ازظهر.
 */
@Slf4j
@Service
public class SRService {
    @Autowired
    private SRHeaderRepository headerRepository;

    @Autowired
    private SRDetailRepository detailRepository;

    public SRHeader createSRHeader(SRHeader srHeader) {

        return headerRepository.save(srHeader);

    }

    public PagedResponse<SRHeader> getAllHeaders(UserPrincipal currentUser, int page, int size) {
        validatePageNumberAndSize(page, size);
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
//        if(currentUser.getAuthorities().)
        Page<SRHeader> srHeaders = Page.empty();
        if (hasRole(RoleName.ROLE_ADMIN.name())) {
            srHeaders = headerRepository.findAll(pageable);
        } else if (hasRole(RoleName.ROLE_ED_BOSS.name())) {
            srHeaders = headerRepository.findByUnitName(currentUser.getUnitName(), pageable);
        } else if (hasRole(RoleName.ROLE_SHOB_BOSS.name())) {
            String[] status = {SRHeaderStatus.ED_BOSS_CONFIRM.toString(), SRHeaderStatus.SHOB_BOSS_CONFIRM.toString(), SRHeaderStatus.SHOB_UNIT_BOSS_CONFIRM.toString()};
            srHeaders = headerRepository.findByBrchNameAndStatusIn(currentUser.getBrchName(), Arrays.asList(status), pageable);
        } else if (hasRole(RoleName.ROLE_SHOB_UNIT_BOSS.name())) {
            String[] status = {SRHeaderStatus.ED_BOSS_CONFIRM.toString(), SRHeaderStatus.SHOB_BOSS_CONFIRM.toString(), SRHeaderStatus.SHOB_UNIT_BOSS_CONFIRM.toString()};
            srHeaders = headerRepository.findByBrchNameAndUnitNameAndStatusIn(currentUser.getBrchName(), currentUser.getUnitName(),Arrays.asList(status), pageable);
        }

        log.debug("SRHeader Count :{}", srHeaders.getTotalElements());
        if (srHeaders.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), srHeaders.getNumber(),
                    srHeaders.getSize(), srHeaders.getTotalElements(), srHeaders.getTotalPages(), srHeaders.isLast());
        }
        return new PagedResponse<>(srHeaders.getContent(), srHeaders.getNumber(),
                srHeaders.getSize(), srHeaders.getTotalElements(), srHeaders.getTotalPages(), srHeaders.isLast());

    }

    public SRDetail createSRDetail(Long headerId, SRDetail srDetail) {
        return headerRepository.findById(headerId).map(srHeader -> {
            srDetail.setSrHeader(srHeader);
            return detailRepository.save(srDetail);
        }).orElseThrow(() -> new ResourceNotFoundException("HeaderId " + headerId + " not found"));
    }
}
