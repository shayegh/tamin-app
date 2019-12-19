/*
 * Created by Mojtaba Shayegh (shayegh@gmail.com)
 */
package com.example.supervision.controller;

import com.example.supervision.model.supervision.SRDetail;
import com.example.supervision.payload.ApiResponse;
import com.example.supervision.repository.SRDetailRepository;
import com.example.supervision.service.SRService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api")
public class SRDetailController {

    @Autowired
    SRService srService;

    @Autowired
    SRDetailRepository detailRepository;

    @PostMapping("/headers/{headerId}/details")
    @PreAuthorize("hasAnyRole('SHOB_BOSS','SHOB_UNIT_BOSS','ED_BOSS')")
    public ResponseEntity<?> createComment(@PathVariable(value = "headerId") Long headerId,
                                           @Valid @RequestBody SRDetail detail) {
        SRDetail srDetail = srService.createSRDetail(headerId, detail);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/headers/" + headerId.toString() + "/details/{detailId}")
                .buildAndExpand(srDetail.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Header Created Successfully", srDetail.getId()));

    }

    @GetMapping("/headers/{headerId}/details")
    public Page<SRDetail> getAllDetailsByHeaderId(@PathVariable(value = "headerId") Long headerId,
                                                  Pageable pageable) {
        return detailRepository.findBysrHeaderId(headerId, pageable);
    }

    @DeleteMapping("/headers/{headerId}/details/{detailId}")
    public ResponseEntity<?> deletePost(@PathVariable Long headerId, @PathVariable Long detailId) {
//        log.debug("Header Id :{}", headerId);
        detailRepository.deleteById(detailId);
        return ResponseEntity.ok(new ApiResponse(true, "Detail Deleted Successfully"));

    }

    @PutMapping("/headers/{headerId}/details/{detailId}")
    @PreAuthorize("hasAnyRole('SHOB_BOSS','SHOB_UNIT_BOSS')")
    public ResponseEntity<?> addShobComment(@PathVariable Long headerId, @PathVariable Long detailId,
                                            @Valid @RequestBody String shobComment) {
        log.debug("Shob Comment :{}",shobComment.replace("\"",""));
        Optional<SRDetail> srDetail = detailRepository.findById(detailId);
        if (!srDetail.isPresent())
            return ResponseEntity.notFound().build();
        SRDetail srd = srDetail.get();
        srd.setSrdShobComment(shobComment.replace("\"",""));
//        headerRequest.setCreatedAt(srHeader.getCreatedAt());
//        headerRequest.setCreatedBy(srHeader.getCreatedBy());
        detailRepository.save(srd);
        return ResponseEntity.ok(new ApiResponse(true, "Comment Added Successfully", detailId));

    }

}
