package com.example.supervision.controller;

import com.example.supervision.model.supervision.SRHeader;
import com.example.supervision.payload.ApiResponse;
import com.example.supervision.payload.PagedResponse;
import com.example.supervision.security.CurrentUser;
import com.example.supervision.security.UserPrincipal;
import com.example.supervision.service.SRService;
import com.example.supervision.util.AppConstants;
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
                .body(new ApiResponse(true, "Header Created Successfully", header.getId()));
    }

    @GetMapping
    public PagedResponse<SRHeader> getHeaders(@CurrentUser UserPrincipal currentUser,
                                              @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                              @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {

        return srService.getAllHeaders(currentUser, page, size);
    }

}

