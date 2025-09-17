package com.url.shortener.controller;

import com.url.shortener.dtos.AuthResponseDto;
import com.url.shortener.dtos.LoginRequest;
import com.url.shortener.dtos.PasswordResetRequest;
import com.url.shortener.dtos.PasswordUpdateDto;
import com.url.shortener.dtos.RegisterRequest;
import com.url.shortener.model.User;
import com.url.shortener.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(registerRequest.getPassword());
        user.setRole("ROLE_USER");
        user.setEmail(registerRequest.getEmail());
        userService.registerUser(user);

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(registerRequest.getUsername());
        loginRequest.setPassword(registerRequest.getPassword());

        AuthResponseDto response = userService.authenticateUser(loginRequest);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
        AuthResponseDto response = userService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody PasswordResetRequest passwordResetRequest) {
        userService.createPasswordResetToken(passwordResetRequest.getEmail());
        return ResponseEntity.ok("Password reset link sent successfully");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordUpdateDto passwordUpdateDto) {
        userService.resetPassword(passwordUpdateDto.getToken(), passwordUpdateDto.getNewPassword());
        return ResponseEntity.ok("Password updated successfully");
    }
}