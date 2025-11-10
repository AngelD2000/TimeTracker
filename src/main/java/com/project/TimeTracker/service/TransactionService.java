package com.project.TimeTracker.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.TimeTracker.mapper.TransactionMapper;
import com.project.TimeTracker.persistence.Transaction;
import com.project.TimeTracker.persistence.entity.TransactionEntity;
import com.project.TimeTracker.persistence.repository.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class TransactionService {

    TransactionRepository transactionRepository;
    TransactionMapper transactionMapper;
    ObjectMapper objectMapper;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, TransactionMapper transactionMapper,
                              ObjectMapper objectMapper) {
        this.transactionRepository = transactionRepository;
        this.transactionMapper = transactionMapper;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public Long saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Transactional
    public Transaction getTransactionById(Long id) {
        TransactionEntity transactionEntity = transactionRepository.findById(id);
        if(Objects.nonNull(transactionEntity)){
            return transactionMapper.fromEntity(transactionEntity);
        }
        return null;
    }

    @Transactional
    public List<Transaction> getAllTransactions(){
         List<TransactionEntity> allTransactionEntities = transactionRepository.findAll();
         List<Transaction> allTransactions = new ArrayList<>();
         for(TransactionEntity transactionEntity : allTransactionEntities){
             Transaction transaction = transactionMapper.fromEntity(transactionEntity);
             allTransactions.add(transaction);
         }
         return allTransactions;
    }

    @Transactional
    public void deleteTransactionById(Long id) {
        transactionRepository.deleteById(id);
    }

    @Transactional
    public void deleteAllTransactions(){
        transactionRepository.deleteAll();
    }

    @Transactional
    public Transaction updateTransaction(Long id, Transaction transaction) {
        TransactionEntity updatedEntity =  transactionRepository.update(id, transaction);
        return transactionMapper.fromEntity(updatedEntity);
    }
}
