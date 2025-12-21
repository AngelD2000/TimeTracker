package com.project.TimeTracker.service;

import com.project.TimeTracker.mapper.CategoryMapper;
import com.project.TimeTracker.persistence.Category;
import com.project.TimeTracker.persistence.entity.CategoryEntity;
import com.project.TimeTracker.persistence.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private CategoryMapper categoryMapper;

    public Long save(Category category) {
        CategoryEntity categoryEntity = categoryMapper.categoryToEntity(category);
        categoryRepository.save(categoryEntity);
        return categoryEntity.getId();
    }

    public Category getById(Long id) {
        CategoryEntity categoryEntity = categoryRepository.findById(id).orElse(null);
        return categoryEntity != null ? categoryMapper.entityToCategory(categoryEntity) : null;
    }

    public List<Category> getAll() {
        List<CategoryEntity> entities = categoryRepository.findAll();
        return entities.stream()
                .map(categoryMapper::entityToCategory)
                .collect(Collectors.toList());
    }

    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

    public Category update(Long id, Category category) {
        CategoryEntity existingEntity = categoryRepository.findById(id).orElse(null);
        if (existingEntity == null) {
            return null;
        }
        
        CategoryEntity updatedEntity = categoryMapper.categoryToEntity(category);
        updatedEntity.setId(id);
        CategoryEntity savedEntity = categoryRepository.save(updatedEntity);
        return categoryMapper.entityToCategory(savedEntity);
    }
}
