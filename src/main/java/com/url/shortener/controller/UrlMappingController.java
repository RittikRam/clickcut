package com.url.shortener.controller;

import com.url.shortener.dtos.ClickEventDto;
import com.url.shortener.dtos.UrlMappingDto;
import com.url.shortener.model.ClickEvent;
import com.url.shortener.model.User;
import com.url.shortener.service.UrlMappingService;
import com.url.shortener.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {
    private UrlMappingService urlMappingService;
    private UserService userService;

    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMappingDto> createShortUrl(@RequestBody Map<String , String> request, Principal principal){
        String originalUrl = request.get("originalUrl");
        User user = userService.findByUsername(principal.getName());
        UrlMappingDto urlMappingDto = urlMappingService.createShortUrl(originalUrl, user);

        return ResponseEntity.ok(urlMappingDto);
    }

    @GetMapping("/myurls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDto>> getUserUrls(Principal principal){
        User user = userService.findByUsername(principal.getName());
        List<UrlMappingDto> urls = urlMappingService.getUrlsByUser( user);
        return ResponseEntity.ok(urls);
    }

    @GetMapping("/analytics/{shorturl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventDto>> getUrlAnalytics(@PathVariable String shorturl, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate,formatter);
        LocalDateTime  end = LocalDateTime.parse(endDate,formatter);
        List<ClickEventDto> clickEventDtos = urlMappingService.getClickEventsByDate(shorturl,start,end);
        return ResponseEntity.ok(clickEventDtos);
    }

    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate, Long>> getTotalClicksByDate(Principal principal, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){
        User user = userService.findByUsername(principal.getName());

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate start = LocalDate.parse(startDate,formatter);
        LocalDate  end = LocalDate.parse(endDate,formatter);
        Map<LocalDate, Long> totalClicks  = urlMappingService.getTotlaClicksByUserAndDate(user,start,end);
        return ResponseEntity.ok(totalClicks);
    }
}
