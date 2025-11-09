package com.project.TimeTracker.persistence.repository;

import com.project.TimeTracker.mapper.TransactionMapper;
import com.project.TimeTracker.persistence.Transaction;
import com.project.TimeTracker.persistence.entity.TransactionEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TransactionRepositoryImpl implements TransactionRepository {
    private final TransactionMapper transactionMapper;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public TransactionRepositoryImpl(TransactionMapper transactionMapper) {
        this.transactionMapper = transactionMapper;
    }

    @Override
    public Long save(Transaction transaction) {
        //use mapper to change transaction to transactionEntity
        TransactionEntity transactionEntity = transactionMapper.toEntity(transaction, null);
        entityManager.persist(transactionEntity);
        return transactionEntity.getId();
    }

    @Override
    public List<TransactionEntity> findAll() {
        return entityManager.createQuery("SELECT t FROM TransactionEntity t", TransactionEntity.class).getResultList();
    }

    @Override
    public TransactionEntity findById(Long id) {
        return entityManager.find(TransactionEntity.class, id);
    }

    @Override
    public void deleteById(Long id) {
        TransactionEntity transactionEntity = findById(id);
        entityManager.remove(transactionEntity);
    }

    @Override
    public void deleteAll() {
        entityManager.createQuery("DELETE FROM TransactionEntity").executeUpdate();
    }

    @Override
    public Long update(Transaction transaction) {
        TransactionEntity oldEntity = entityManager.find(TransactionEntity.class, transaction.getId());
        Transaction oldTransaction = transactionMapper.fromEntity(oldEntity);
        TransactionEntity transactionEntity = transactionMapper.toEntity(transaction, oldTransaction);
        entityManager.merge(transactionEntity);
        return transactionEntity.getId();
    }
}
