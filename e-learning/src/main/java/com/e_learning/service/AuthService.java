package com.e_learning.service;

import com.e_learning.model.Role;
import com.e_learning.model.User;
import com.e_learning.repository.UserRepository;
import com.e_learning.security.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final ResponseService responseService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtil jwtUtil, ResponseService responseService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.responseService = responseService;
    }

    public User register(User userDetail) {
        // Check if username already exists
        if (userRepository.existsByUsername(userDetail.getUsername())) {
            throw new IllegalArgumentException("Username is already taken");
        }
        // Check if email already exists
        if (userRepository.existsByEmail(userDetail.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }
        User user = new User();
        user.setFirstName(userDetail.getFirstName());
        user.setLastName(userDetail.getLastName());
        user.setUsername(userDetail.getUsername());
        user.setEmail(userDetail.getEmail());
        user.setRole(Role.USER);
        user.setActive(1);
        user.setPassword(passwordEncoder.encode(userDetail.getPassword()));
        return userRepository.save(user);
    }

    public ResponseEntity<Map<String, Object>> login(User userDetail) {
        // Will throw BadCredentialsException if invalid
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDetail.getUsername(),
                        userDetail.getPassword()
                )
        );
        var user = userRepository.findByUsername(userDetail.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid Username or Password."));

        var jwt = jwtUtil.generateToken(user);
        Map<String, String> tokenMap = Map.of("token", jwt);
        return responseService.createResponse(200, tokenMap, HttpStatus.OK);
    }

}