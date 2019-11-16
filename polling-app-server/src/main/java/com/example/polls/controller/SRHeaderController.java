package com.example.polls.controller;

import com.example.polls.model.supervision.SRHeader;
import com.example.polls.payload.ApiResponse;
import com.example.polls.payload.PagedResponse;
import com.example.polls.security.CurrentUser;
import com.example.polls.security.UserPrincipal;
import com.example.polls.service.SRService;
import com.example.polls.util.AppConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

/**
 * Created by Shayegh@gmail.com on ۱۶/۱۱/۲۰۱۹ - ۱۰:۱۰ قبل‌ازظهر.
 */
@Slf4j
@RestController
@RequestMapping("/api/headers")
public class SRHeaderController {
    @Autowired
    private SRService srService;
    @PostMapping
//    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createHeader(@Valid @RequestBody SRHeader srHeader) {
        SRHeader header = srService.createSRHeader(srHeader);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{headerId}")
                .buildAndExpand(header.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Header Created Successfully",header.getId()));
    }

    @GetMapping
    public PagedResponse<SRHeader> getHeaders(@CurrentUser UserPrincipal currentUser,
                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {

        return srService.getAllHeaders(currentUser, page, size);
    }

}

