package com.backend.issueTracker.auth;

import com.backend.issueTracker.config.JwtService;
import com.backend.issueTracker.user.Role;
import com.backend.issueTracker.user.User;
import com.backend.issueTracker.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        Role role = determineRole(request);

        var user = User.builder()
                .firstname(request.getFirstName())
                .lastname(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        try {
            var user = repository.findByEmail(request.getEmail())
                    .orElseThrow();
            System.out.println(user);
            System.out.println(user.getRole());
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .email(user.getEmail())
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .roleEnum(user.getRole())
                    .build();
        } catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    private Role determineRole(RegisterRequest request){
        if(request.getEmail().endsWith("@lsfs.com")){
            return Role.ADMIN;
        } else {
            return Role.USER;
        }
    }
}
