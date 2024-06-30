package com.backend.issueTracker.service;

import com.backend.issueTracker.controller.IssueController;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    @Autowired
    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public List<IssueController.Issue> getIssue() {
        return issueRepository.findAll(); // this easily fetches Issues from the database
    }

    public IssueController.Issue getIssueById(Long id) {
        return issueRepository.findById(id).orElse(null);
    }

    public void addNewIssue(IssueController.Issue issue) {
        issueRepository.save(issue);
        System.out.println(issue);
    }

    public void deleteIssue(Long issueId) {
        boolean exists = issueRepository.existsById(issueId);
        if (!exists) {
            throw new IllegalStateException("Student with Id " + issueId + " does not exists");
        }
        issueRepository.deleteById(issueId);
    }

    @Transactional
    public void updateIssue(Long issueId, String technician, LocalDateTime issueAssigned) {
        IssueController.Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new IllegalStateException(
                        "issue with id " + issueId + "does not exist"));

        // Update email if not null
        if (technician != null) {
            issue.setTechnician(technician);
            System.out.println(technician);
            System.out.println(issue.getTechnician());
        } else {
            throw new IllegalStateException("Technician null or not foun");
        }

        // Update issueCreated if not null
        if (issueAssigned != null) {
            issue.setIssueAssigned(issueAssigned);
            System.out.println(issueAssigned);
        } else {
            throw new IllegalStateException("Issue Assigned not found or NULL");
        }

        issue.setStatus(1);
    }

}
