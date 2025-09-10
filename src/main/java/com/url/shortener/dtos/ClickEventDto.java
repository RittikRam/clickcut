package com.url.shortener.dtos;

import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ClickEventDto {
    private LocalDate clickDate;
    private long count;
}
