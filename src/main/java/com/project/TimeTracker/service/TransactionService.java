package com.project.TimeTracker.service;

import com.project.TimeTracker.mapper.TransactionMapper;
import com.project.TimeTracker.persistence.Transaction;
import com.project.TimeTracker.persistence.entity.TransactionEntity;
import com.project.TimeTracker.persistence.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private TransactionMapper transactionMapper;

    public Long save(Transaction transaction) {
        TransactionEntity createdEntity = transactionMapper.transactionToEntity(transaction);
        transactionRepository.save(createdEntity);
        return createdEntity.getId();
    }

    public Transaction getById(Long id){
        TransactionEntity transactionEntity = transactionRepository.findById(id).orElse(null);
        return  transactionEntity != null ? transactionMapper.entityToTransaction(transactionEntity): null;
    }

    public List<Transaction> getAll() {
        List<TransactionEntity> entities = transactionRepository.findAll();
        return entities.stream()
                .map(transactionMapper::entityToTransaction)
                .collect(Collectors.toList());
    }

    public void deleteById(Long id) {
        transactionRepository.deleteById(id);
    }

    public Transaction update(Long id, Transaction transaction) {
        TransactionEntity existingEntity = transactionRepository.findById(id).orElse(null);
        if (existingEntity == null) {
            return null;
        }
        
        TransactionEntity updatedEntity = transactionMapper.transactionToEntity(transaction);
        updatedEntity.setId(id);
        TransactionEntity savedEntity = transactionRepository.save(updatedEntity);
        return transactionMapper.entityToTransaction(savedEntity);
    }
}
