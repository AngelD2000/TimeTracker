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
    public String date;
    public String category;
    public Double amountSpent;
    public Double amountAllocated;
    public String description;
}
