package com.project.TimeTracker.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="Category")
@NoArgsConstructor
@Setter
@Getter
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    String name;

    @OneToOne (mappedBy = "category")
    private BudgetCategoryEntity budgetCategory;
}
