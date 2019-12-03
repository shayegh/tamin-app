package com.example.supervision.util;

import com.example.supervision.exception.BadRequestException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collection;

/**
 * Created by Shayegh@gmail.com on ۱۶/۱۱/۲۰۱۹ - ۱۰:۵۳ قبل‌ازظهر.
 */
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
}
