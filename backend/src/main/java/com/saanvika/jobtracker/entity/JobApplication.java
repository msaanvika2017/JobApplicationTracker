package com.saanvika.jobtracker.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Table(name = "job_applications")
public class JobApplication {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@NotBlank(message = "Company name is required")
private String company;

@NotBlank(message = "Job role is required")
private String jobRole;

private LocalDate applicationDate;

private String status = "Applied";

public JobApplication() {
}

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getCompany() {
    return company;
}

public void setCompany(String company) {
    this.company = company;
}

public String getJobRole() {
    return jobRole;
}

public void setJobRole(String jobRole) {
    this.jobRole = jobRole;
}

public LocalDate getApplicationDate() {
    return applicationDate;
}

public void setApplicationDate(LocalDate applicationDate) {
    this.applicationDate = applicationDate;
}

public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}


}
