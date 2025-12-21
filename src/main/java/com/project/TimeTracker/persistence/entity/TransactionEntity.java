package com.project.TimeTracker.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name="Transaction")
@Getter
@Setter
@NoArgsConstructor
public class TransactionEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="fk_budgetCategoryId", referencedColumnName = "id")
    private BudgetCategoryEntity budgetCategory;

    private Instant date;
    private Double timeSpent;
    private String description;
}
