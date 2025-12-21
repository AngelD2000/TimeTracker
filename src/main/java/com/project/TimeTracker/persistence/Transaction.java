package com.project.TimeTracker.persistence;

import lombok.*;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Transaction {
    public Long id;
    public Long budgetCategoryId;
    public Instant date;
    public Double timeSpent;
    public String description;
}
