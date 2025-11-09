package com.project.TimeTracker.persistence.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Entity
@Table(name="transactions")
@Data
public class TransactionEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private Instant date;
    private String category;
    private Double amountSpent;
    private Double amountAllocated;
    private String description;
}
