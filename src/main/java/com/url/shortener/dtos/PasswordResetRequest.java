package com.url.shortener.dtos;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String email;
}