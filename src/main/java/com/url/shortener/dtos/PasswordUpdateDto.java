package com.url.shortener.dtos;

import lombok.Data;

@Data
public class PasswordUpdateDto {
    private String token;
    private String newPassword;
}