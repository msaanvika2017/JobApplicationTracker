package com.saanvika.jobtracker.controller;

import com.saanvika.jobtracker.entity.JobApplication;
import com.saanvika.jobtracker.service.JobApplicationService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class JobApplicationController {

private final JobApplicationService service;

public JobApplicationController(JobApplicationService service) {
    this.service = service;
}

@PostMapping
public JobApplication createApplication(
        @Valid @RequestBody JobApplication application) {
    return service.saveApplication(application);
}

@GetMapping
public List<JobApplication> getAllApplications() {
    return service.getAllApplications();
}

@GetMapping("/{id}")
public ResponseEntity<JobApplication> getApplicationById(
        @PathVariable Long id) {
    return service.getApplicationById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}

@PutMapping("/{id}")
public ResponseEntity<JobApplication> updateApplication(
        @PathVariable Long id,
        @Valid @RequestBody JobApplication updatedApplication) {

    return service.getApplicationById(id)
            .map(existing -> {
                existing.setCompany(updatedApplication.getCompany());
                existing.setJobRole(updatedApplication.getJobRole());
                existing.setApplicationDate(updatedApplication.getApplicationDate());
                existing.setStatus(updatedApplication.getStatus());

                return ResponseEntity.ok(
                        service.saveApplication(existing));
            })
            .orElse(ResponseEntity.notFound().build());
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
    if (service.getApplicationById(id).isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    service.deleteApplication(id);
    return ResponseEntity.noContent().build();
}


}
