package com.backend.issueTracker.user;

import com.backend.issueTracker.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/user")
    public ResponseEntity<List<UserDTO>> fetchUserByRole(){
        List<UserDTO> technicians = userService.fetchTechicians();
        if(technicians.isEmpty()){
            throw new UserNotFoundException("No technicans found");
        }
        System.out.println(technicians);
        return ResponseEntity.ok(technicians);
    }

}
