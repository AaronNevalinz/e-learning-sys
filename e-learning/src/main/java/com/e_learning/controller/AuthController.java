package com.e_learning.controller;


import com.e_learning.model.User;
import com.e_learning.service.AuthService;
import com.e_learning.service.ResponseService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")

public class AuthController {

    private final AuthService authService;
    private final ResponseService responseService;

    public AuthController(AuthService authService, ResponseService responseService) {
        this.authService = authService;
        this.responseService = responseService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult bindingResult) {

        //model error
        if (bindingResult.hasErrors()) {
            Map<String, String[]> errors = new LinkedHashMap<>();

            bindingResult.getFieldErrors().forEach(error -> {
                errors.computeIfAbsent(error.getField(), key -> new String[1])[0] = error.getDefaultMessage();
            });
            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
        }
        // response error
        try {
            return authService.register(user);
        } catch (IllegalArgumentException e) {
            Map<String, String[]> errors = Map.of("general", new String[]{e.getMessage()});
            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        return authService.login(user);
    }

}
