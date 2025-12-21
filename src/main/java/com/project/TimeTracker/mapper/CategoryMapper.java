package com.project.TimeTracker.mapper;

import com.project.TimeTracker.persistence.Category;
import com.project.TimeTracker.persistence.entity.CategoryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);
    
    Category entityToCategory(CategoryEntity categoryEntity);
    CategoryEntity categoryToEntity(Category category);
}
