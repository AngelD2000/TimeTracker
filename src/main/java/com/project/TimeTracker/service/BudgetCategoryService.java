package com.project.TimeTracker.service;

import com.project.TimeTracker.mapper.BudgetCategoryMapper;
import com.project.TimeTracker.persistence.BudgetCategory;
import com.project.TimeTracker.persistence.entity.BudgetCategoryEntity;
import com.project.TimeTracker.persistence.repository.BudgetCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BudgetCategoryService {
    @Autowired
    private BudgetCategoryRepository budgetCategoryRepository;

    @Autowired
    private BudgetCategoryMapper budgetCategoryMapper;

    public Long save(BudgetCategory budgetCategory){
        BudgetCategoryEntity budgetCategoryEntity = budgetCategoryMapper.budgetCategoryToEntity(budgetCategory);
        budgetCategoryRepository.save(budgetCategoryEntity);
        return budgetCategoryEntity.getId();
    }

    public BudgetCategory getById(Long id){
        BudgetCategoryEntity budgetCategoryEntity = budgetCategoryRepository.findById(id).orElse(null);
        return budgetCategoryEntity != null ? budgetCategoryMapper.entityToBudgetCategory(budgetCategoryEntity) : null;
    }

    public List<BudgetCategory> getAll() {
        List<BudgetCategoryEntity> entities = budgetCategoryRepository.findAll();
        return entities.stream()
                .map(budgetCategoryMapper::entityToBudgetCategory)
                .collect(Collectors.toList());
    }

    public void deleteById(Long id) {
        budgetCategoryRepository.deleteById(id);
    }

    public BudgetCategory update(Long id, BudgetCategory budgetCategory) {
        BudgetCategoryEntity existingEntity = budgetCategoryRepository.findById(id).orElse(null);
        if (existingEntity == null) {
            return null;
        }

        BudgetCategoryEntity updatedEntity = budgetCategoryMapper.budgetCategoryToEntity(budgetCategory);
        updatedEntity.setId(id);
        BudgetCategoryEntity savedEntity = budgetCategoryRepository.save(updatedEntity);
        return budgetCategoryMapper.entityToBudgetCategory(savedEntity);
    }

    public List<BudgetCategory> getBudgetCategoriesByWeek(String weekStart){
        List<BudgetCategoryEntity> entities = budgetCategoryRepository.findAllBudgetCategoriesByWeek(weekStart);
        return entities.stream().map(budgetCategoryMapper::entityToBudgetCategory).collect(Collectors.toList());
    }


}
