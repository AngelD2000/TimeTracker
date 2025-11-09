package com.project.TimeTracker.datafetcher;

import com.project.TimeTracker.persistence.Transaction;
import com.project.TimeTracker.service.TransactionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionsDataFetcher {

    Logger logger = LoggerFactory.getLogger(TransactionsDataFetcher.class);

    TransactionService transactionService;

    @Autowired
    public TransactionsDataFetcher(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/get/{id}")
    public Transaction get(@PathVariable("id") long id) {
        logger.info("getting transaction with id: {}", id);
        return transactionService.getTransactionById(id);
    }

    @GetMapping("/get/all")
    public List<Transaction> getAll() {
        logger.info("getting all transactions");
        return transactionService.getAllTransactions();
    }

    @PostMapping("/post")
    public Long post(@RequestBody Transaction transaction) {
        logger.info("save transaction: {}", transaction);
       return transactionService.saveTransaction(transaction);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") long id) {
        logger.info("deleting transaction with id: {}", id);
        transactionService.deleteTransactionById(id);
    }

    @DeleteMapping("/delete/all")
    public void deleteAll() {
        logger.info("deleting all transactions");
        transactionService.deleteAllTransactions();
    }

    @PostMapping("update")
    public Long update(@RequestBody Transaction transaction) {
        logger.info("updating transaction: {}", transaction);
        return transactionService.updateTransaction(transaction);
    }
}
