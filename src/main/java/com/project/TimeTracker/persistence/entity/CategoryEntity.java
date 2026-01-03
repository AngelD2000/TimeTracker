package com.project.TimeTracker.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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

    @OneToMany(mappedBy = "category")
    private List<BudgetCategoryEntity> budgetCategoryEntityList;
}
