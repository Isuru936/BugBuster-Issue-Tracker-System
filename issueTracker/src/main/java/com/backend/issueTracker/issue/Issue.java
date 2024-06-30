package com.backend.issueTracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Issue {
    @Id
    @SequenceGenerator(name = "Issue_sequence", allocationSize = 1, sequenceName = "Issue_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Issue_sequence")
    private Long id;
    private String email;
    private String subject;
    private String description;
    private String technician;
    private String imageURL;
    private LocalDateTime issueCreated;
    private LocalDateTime issueAssigned;

    private int status;

}
