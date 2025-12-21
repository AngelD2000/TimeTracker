package com.project.TimeTracker.persistence.repository;

import com.project.TimeTracker.persistence.entity.BudgetWeekEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetWeekRepository extends JpaRepository<BudgetWeekEntity,Long> {
}
