package com.project.TimeTracker.datafetcher;

import com.project.TimeTracker.persistence.Category;
import com.project.TimeTracker.service.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryDataFetcher {
    Logger logger = LoggerFactory.getLogger(CategoryDataFetcher.class);
    
    private final CategoryService categoryService;

    @Autowired
    public CategoryDataFetcher(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/post")
    public Long saveCategory(@RequestBody Category category) {
        logger.info("Saving Category");
        return categoryService.save(category);
    }

    @GetMapping("/get/{id}")
    @Cacheable(value="category", key="#id")
    public Category getCategory(@PathVariable("id") Long id) {
        logger.info("getting category with id: {}", id);
        return categoryService.getById(id);
    }

    @GetMapping("/getAll")
    public List<Category> getAllCategories() {
        logger.info("getting all categories");
        return categoryService.getAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCategory(@PathVariable("id") Long id) {
        logger.info("deleting category with id: {}", id);
        categoryService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public Category updateCategory(@PathVariable("id") Long id, @RequestBody Category category) {
        logger.info("updating category with id: {}", id);
        return categoryService.update(id, category);
    }
}
