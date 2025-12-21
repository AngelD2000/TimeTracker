package com.project.TimeTracker.persistence;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BudgetCategory {
    public Long  id;
    public Long categoryId;
    public Long budgetWeekId;
    public String description;
    public Double plannedTimeAllocation;
}
