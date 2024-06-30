package com.backend.issueTracker.auth;

import com.backend.issueTracker.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String email;
    private String firstname;
    private String lastname;
    private String token;
    private Enum<Role> roleEnum;

}
