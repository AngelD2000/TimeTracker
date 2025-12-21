package com.project.TimeTracker.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.TimeTracker.persistence.entity.BudgetCategoryEntity;


@Repository
public interface BudgetCategoryRepository extends JpaRepository<BudgetCategoryEntity,Long> {
}
