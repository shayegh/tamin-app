package com.example.supervision.util;

import com.example.supervision.exception.BadRequestException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Map;

/**
 * Created by Shayegh@gmail.com on ۱۶/۱۱/۲۰۱۹ - ۱۰:۵۳ قبل‌ازظهر.
 */
@Slf4j
public class Utils {
    public static void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }

    public static boolean hasRole(String role) {

        boolean hasRole;
        Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>)
                SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        hasRole  = authorities.stream()
        .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(role));

//        boolean hasRole = false;
//        for (GrantedAuthority authority : authorities) {
//            hasRole = authority.getAuthority().equals(role);
//            if (hasRole) {
//                break;
//            }
//        }

        return hasRole;
    }

    public static String getJsonPropertyString(@Valid String jsonString, String propName) {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonMap;
        String propValue = "";
        try {
            jsonMap = objectMapper.readValue(jsonString, new TypeReference<Map<String, Object>>() {
            });
            propValue = jsonMap.get(propName).toString();
            log.debug("Status : {}", propValue);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return propValue;
    }
}
