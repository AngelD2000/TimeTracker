package com.project.TimeTracker.datafetcher;

import com.project.TimeTracker.persistence.Transaction;
import com.project.TimeTracker.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionsDataFetcher {

    TransactionService transactionService;

    @Autowired
    public TransactionsDataFetcher(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/get/{id}")
    public Transaction get(@PathVariable("id") long id) {
        return transactionService.getTransactionById(id);
    }

    @GetMapping("/get/all")
    public List<Transaction> getAll() {
        return transactionService.getAllTransactions();
    }

    @PostMapping("/post")
    public Long post(@RequestBody Transaction transaction) {
       return transactionService.saveTransaction(transaction);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") long id) {
        transactionService.deleteTransactionById(id);
    }

    @DeleteMapping("/delete/all")
    public void deleteAll() {
        transactionService.deleteAllTransactions();
    }
}
