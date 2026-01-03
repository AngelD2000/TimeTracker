package com.project.TimeTracker.datafetcher;

import com.project.TimeTracker.persistence.BudgetCategory;
import com.project.TimeTracker.service.BudgetCategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/budgetCategory")
public class BudgetCategoryDataFetcher {
    Logger logger  = LoggerFactory.getLogger(BudgetCategoryDataFetcher.class);
    private final BudgetCategoryService budgetCategoryService;

    @Autowired
    public BudgetCategoryDataFetcher(BudgetCategoryService budgetCategoryService) {
        this.budgetCategoryService = budgetCategoryService;
    }

    @PostMapping("/post")
    public Long saveBudgetCategory(@RequestBody BudgetCategory budgetCategory){
        logger.info("Saving budgetCategory: {}", budgetCategory);
        return budgetCategoryService.save(budgetCategory);
    }

    @GetMapping("/get/{id}")
    @Cacheable(value="budgetCategory", key="#id")
    public BudgetCategory budgetCategory(@PathVariable("id") Long id){
        logger.info("Fetching budgetCategory with id: {}", id);
        return budgetCategoryService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBudgetCategory(@PathVariable("id") Long id) {
        logger.info("deleting budget category with id: {}", id);
        budgetCategoryService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public BudgetCategory updateBudgetCategory(@PathVariable("id") Long id, @RequestBody BudgetCategory budgetCategory) {
        logger.info("updating budget category with id: {}", id);
        return budgetCategoryService.update(id, budgetCategory);
    }

    @GetMapping("/budgets/{weekStart}")
    public List<BudgetCategory> budgetCategoryByWeekStart(@PathVariable("weekStart") String weekStart) {
        logger.info("getting budget category by week: {}", weekStart);
        return budgetCategoryService.getBudgetCategoriesByWeek(weekStart);

    }

}
