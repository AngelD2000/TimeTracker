package com.project.TimeTracker.mapper;

import com.project.TimeTracker.persistence.BudgetWeek;
import com.project.TimeTracker.persistence.entity.BudgetWeekEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface BudgetWeekMapper {
    BudgetWeekMapper INSTANCE = Mappers.getMapper(BudgetWeekMapper.class);
    BudgetWeekEntity budgetWeekToEntity(BudgetWeek budgetWeek);
    BudgetWeek budgetWeekEntityToBudgetWeek(BudgetWeekEntity budgetWeekEntity);
}
