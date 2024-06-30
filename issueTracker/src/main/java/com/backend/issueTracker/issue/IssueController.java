package com.backend.issueTracker.controller;

import com.backend.issueTracker.model.Issue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/auth/")
public class IssueController {
    private final IssueService issueService;

    @Autowired
    public IssueController(IssueService issueService) {
        this.issueService = issueService; // instead of this we can use dependency injection to solve
        // the issues so we use @AutoWired Annoatation to magically instantiate

    }

    @GetMapping // GET I CAN ADD ANY ENDPOINT FOR THIS IN A VRACKER LIKE GetMapping("/greets")
    // HERE WELL BE stuff FROM THE IssueService
    public List<Issue> getIssue() {
        return issueService.getIssue();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long id){
        Issue issue = issueService.getIssueById(id);
        if(issue == null){
            System.out.println(id);
            return ResponseEntity.notFound().build();
        } else {
            System.out.println(issue);
            return ResponseEntity.ok(issue);

        }
    }

    @PostMapping
    public void registerNewIssue(@RequestBody Issue issue) {
        issueService.addNewIssue(issue);
    }

    @DeleteMapping(path = "{issueId}")
    public void deleteIssue(@PathVariable("issueId") Long issueId) {
        issueService.deleteIssue(issueId);
    }

    @PutMapping(path = "{issueId}")
    public void updateIssue(
            @PathVariable("issueId") Long issueId,
            @RequestParam(required = true) String technician,
            @RequestParam(required = false) LocalDateTime issueAssigned){
        System.out.println("Controller " + technician);
        issueService.updateIssue(issueId, technician, issueAssigned);
    }
}
