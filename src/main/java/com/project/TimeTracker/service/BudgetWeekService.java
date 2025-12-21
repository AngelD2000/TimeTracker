package com.project.TimeTracker.service;

import com.project.TimeTracker.mapper.BudgetWeekMapper;
import com.project.TimeTracker.persistence.BudgetWeek;
import com.project.TimeTracker.persistence.entity.BudgetWeekEntity;
import com.project.TimeTracker.persistence.repository.BudgetWeekRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BudgetWeekService {
    @Autowired
    private BudgetWeekRepository budgetWeekRepository;

    @Autowired
    private BudgetWeekMapper budgetWeekMapper;

    public Long save(BudgetWeek budgetWeek){
        BudgetWeekEntity createBudgetWeekEntity = budgetWeekMapper.budgetWeekToEntity(budgetWeek);
        return budgetWeekRepository.save(createBudgetWeekEntity).getId();
    }

    public BudgetWeek getById(Long id){
        BudgetWeekEntity budgetWeekEntity = budgetWeekRepository.findById(id).orElse(null);
        return budgetWeekEntity != null ? budgetWeekMapper.budgetWeekEntityToBudgetWeek(budgetWeekEntity) : null;
    }

    public List<BudgetWeek> getAll() {
        List<BudgetWeekEntity> entities = budgetWeekRepository.findAll();
        return entities.stream()
                .map(budgetWeekMapper::budgetWeekEntityToBudgetWeek)
                .collect(Collectors.toList());
    }

    public void deleteById(Long id) {
        budgetWeekRepository.deleteById(id);
    }

    public BudgetWeek update(Long id, BudgetWeek budgetWeek) {
        BudgetWeekEntity existingEntity = budgetWeekRepository.findById(id).orElse(null);
        if (existingEntity == null) {
            return null;
        }
        
        BudgetWeekEntity updatedEntity = budgetWeekMapper.budgetWeekToEntity(budgetWeek);
        updatedEntity.setId(id);
        BudgetWeekEntity savedEntity = budgetWeekRepository.save(updatedEntity);
        return budgetWeekMapper.budgetWeekEntityToBudgetWeek(savedEntity);
    }
}
