package com.project.TimeTracker.persistence;

import lombok.*;

import java.time.Instant;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class BudgetWeek {
    public Long id;
    public Instant startDate;
    public Instant endDate;
}
