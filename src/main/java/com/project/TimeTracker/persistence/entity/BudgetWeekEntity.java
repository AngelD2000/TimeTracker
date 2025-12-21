package com.project.TimeTracker.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "BudgetWeek")
@NoArgsConstructor
@Setter
@Getter
public class BudgetWeekEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant startDate;
    private Instant endDate;

//    @OneToMany(mappedBy="budgetWeek")
//    private List<BudgetCategoryEntity> budgetCategoryEntities;
}
