package com.project.TimeTracker.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="BudgetCategory")
@NoArgsConstructor
@Setter
@Getter
public class BudgetCategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="fk_categoryId", referencedColumnName="id")
    private CategoryEntity category;

    @ManyToOne
    @JoinColumn(name="fk_budgetWeekId", referencedColumnName = "id")
    private BudgetWeekEntity budgetWeek;

//    @OneToMany(mappedBy = "budgetCategory")
//    private List<TransactionEntity> transactions;

    String description;
    Double plannedTimeAllocation;
}
