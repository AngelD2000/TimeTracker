package com.project.TimeTracker.persistence.repository;

import com.project.TimeTracker.persistence.Transaction;
import com.project.TimeTracker.persistence.entity.TransactionEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository {
    Long save(Transaction transaction);
    List<TransactionEntity> findAll();
    TransactionEntity findById(Long id);
    void deleteById(Long id);
    void deleteAll();
    Long update(Transaction transaction);
}
