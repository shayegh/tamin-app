package com.example.supervision.util;

import com.example.supervision.exception.BadRequestException;

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
}
