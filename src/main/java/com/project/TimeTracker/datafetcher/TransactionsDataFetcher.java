package com.project.TimeTracker.datafetcher;

import com.project.TimeTracker.persistence.Transaction;
import com.project.TimeTracker.service.TransactionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
public class TransactionsDataFetcher {

    Logger logger = LoggerFactory.getLogger(TransactionsDataFetcher.class);

    TransactionService transactionService;

    @Autowired
    public TransactionsDataFetcher(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/post")
    public Long saveTransaction(@RequestBody Transaction transaction) {
        logger.info("Saving Transaction");
        return transactionService.save(transaction);
    }

    @GetMapping("/get/{id}")
    @Cacheable(value="transaction", key="#id")
    public Transaction getTransaction(@PathVariable("id") Long id){
        logger.info("getting transaction with id: {}", id);
        return transactionService.getById(id);
    }

    @GetMapping("/getAll")
    public List<Transaction> getAllTransactions() {
        logger.info("getting all transactions");
        return transactionService.getAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTransaction(@PathVariable("id") Long id) {
        logger.info("deleting transaction with id: {}", id);
        transactionService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public Transaction updateTransaction(@PathVariable("id") Long id, @RequestBody Transaction transaction) {
        logger.info("updating transaction with id: {}", id);
        return transactionService.update(id, transaction);
    }

}
