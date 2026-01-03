package com.project.TimeTracker.persistence.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.project.TimeTracker.persistence.entity.BudgetCategoryEntity;

import java.time.Instant;
import java.util.List;


@Repository
public interface BudgetCategoryRepository extends JpaRepository<BudgetCategoryEntity,Long> {
    @Query()
    List<BudgetCategoryEntity> findAllBudgetCategoriesByWeek(@Param("weekStart") String weekStart);
}
