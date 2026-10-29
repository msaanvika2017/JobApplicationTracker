package com.saanvika.jobtracker.service;

import com.saanvika.jobtracker.entity.JobApplication;
import com.saanvika.jobtracker.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobApplicationService {

private final JobApplicationRepository repository;

public JobApplicationService(JobApplicationRepository repository) {
    this.repository = repository;
}

public JobApplication saveApplication(JobApplication application) {
    return repository.save(application);
}

public List<JobApplication> getAllApplications() {
    return repository.findAll();
}

public Optional<JobApplication> getApplicationById(Long id) {
    return repository.findById(id);
}

public void deleteApplication(Long id) {
    repository.deleteById(id);
}

}
