package com.project.TimeTracker.mapper;

import com.project.TimeTracker.persistence.BudgetCategory;
import com.project.TimeTracker.persistence.entity.BudgetCategoryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface BudgetCategoryMapper {
    BudgetCategoryMapper INSTANCE = Mappers.getMapper(BudgetCategoryMapper.class);

    @Mapping(source="category.id", target = "categoryId")
    @Mapping(source="budgetWeek.id", target="budgetWeekId")
    BudgetCategory entityToBudgetCategory(BudgetCategoryEntity budgetCategoryEntity);

    @Mapping(source="categoryId", target = "category.id")
    @Mapping(source="budgetWeekId", target="budgetWeek.id")
    BudgetCategoryEntity budgetCategoryToEntity(BudgetCategory budgetCategory);
}
