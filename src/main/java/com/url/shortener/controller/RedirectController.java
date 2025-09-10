package com.url.shortener.controller;


import com.url.shortener.model.UrlMapping;
import com.url.shortener.service.UrlMappingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class RedirectController {
    private UrlMappingService urlMappingService;

    @GetMapping("/{shorturl}")
    public ResponseEntity<Void> redirect(@PathVariable String shorturl){
        UrlMapping urlMapping = urlMappingService.getOriginalUrl(shorturl);
        if(urlMapping != null){
            String targetUrl = urlMapping.getOriginalUrl();

            if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
                targetUrl = "https://" + targetUrl;
            }

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Location",targetUrl);
            return ResponseEntity.status(302).headers(httpHeaders).build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
