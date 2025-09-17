package com.url.shortener.service;

import com.url.shortener.dtos.AuthResponseDto;
import com.url.shortener.dtos.LoginRequest;
import com.url.shortener.dtos.UserDto;
import com.url.shortener.model.PasswordResetToken;
import com.url.shortener.model.User;
import com.url.shortener.repository.PasswordResetTokenRepository;
import com.url.shortener.repository.UserRepository;
import com.url.shortener.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private PasswordResetTokenRepository passwordResetTokenRepository;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;
    private JavaMailSender mailSender;

    public User registerUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public AuthResponseDto authenticateUser(LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = jwtUtils.generateToken(userDetails);
        User user = findByUsername(userDetails.getUsername());
        UserDto userDto = new UserDto(user);
        return new AuthResponseDto(jwt, userDto);
    }

    public User findByUsername(String name) {
        return userRepository.findByUsername(name).orElseThrow(
                ()-> new UsernameNotFoundException("User not found with that username"+name)
        );
    }

    public void createPasswordResetToken(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Check if a token already exists for the user and delete it
        Optional<PasswordResetToken> existingToken = passwordResetTokenRepository.findByUserId(user.getId());
        existingToken.ifPresent(passwordResetTokenRepository::delete);

        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(passwordResetToken);

        sendPasswordResetEmail(user.getEmail(), token);
    }

    private void sendPasswordResetEmail(String email, String token) {
        String resetUrl = "http://localhost:5000/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("rittik123998@gmail.com");
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, please click the link below:\n" + resetUrl);

        mailSender.send(message);
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Invalid token"));
        if (passwordResetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token has expired");
        }
        User user = passwordResetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        passwordResetTokenRepository.delete(passwordResetToken);
    }
}