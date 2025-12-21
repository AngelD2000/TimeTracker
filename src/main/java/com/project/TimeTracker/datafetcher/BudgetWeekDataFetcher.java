package com.project.TimeTracker.datafetcher;

import com.project.TimeTracker.persistence.BudgetWeek;
import com.project.TimeTracker.service.BudgetWeekService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/budgetWeek")
public class BudgetWeekDataFetcher {
    Logger logger  = LoggerFactory.getLogger(BudgetWeekDataFetcher.class);

    BudgetWeekService budgetWeekService;

    @Autowired
    public BudgetWeekDataFetcher(BudgetWeekService budgetWeekService) {
        this.budgetWeekService = budgetWeekService;
    }

    @PostMapping("/post")
    public Long saveBudgetWeek(@RequestBody BudgetWeek budgetWeek){
        logger.info("saving budgetWeek: {}", budgetWeek);
        return budgetWeekService.save(budgetWeek);
    }

    @GetMapping("/get/{id}")
    @Cacheable(value="budgetWeek", key="#id")
    public BudgetWeek getBudgetWeek(@PathVariable Long id){
        logger.info("getting budgetWeek: {}", id);
        return budgetWeekService.getById(id);
    }

    @GetMapping("/getAll")
    public List<BudgetWeek> getAllBudgetWeeks() {
        logger.info("getting all budget weeks");
        return budgetWeekService.getAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBudgetWeek(@PathVariable("id") Long id) {
        logger.info("deleting budget week with id: {}", id);
        budgetWeekService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public BudgetWeek updateBudgetWeek(@PathVariable("id") Long id, @RequestBody BudgetWeek budgetWeek) {
        logger.info("updating budget week with id: {}", id);
        return budgetWeekService.update(id, budgetWeek);
    }

}
