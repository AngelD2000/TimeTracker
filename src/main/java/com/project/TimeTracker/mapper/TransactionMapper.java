package com.project.TimeTracker.mapper;

import com.project.TimeTracker.persistence.Transaction;
import com.project.TimeTracker.persistence.entity.TransactionEntity;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class TransactionMapper {

    public TransactionEntity toEntity(Transaction transaction) {
        TransactionEntity transactionEntity = new TransactionEntity();
        transactionEntity.setId(transaction.getId());
        transactionEntity.setCategory(transaction.getCategory());
        String dateString = transaction.getDate();
        Instant date =  Instant.parse(dateString);
        transactionEntity.setDate(date);
        transactionEntity.setAmountSpent(transaction.getAmountSpent());
        transactionEntity.setAmountAllocated(transaction.getAmountAllocated());
        transactionEntity.setDescription(transaction.getDescription());
        return transactionEntity;
    }

    public Transaction fromEntity(TransactionEntity transactionEntity) {
        Instant date = transactionEntity.getDate();
        String dateString = date.toString();
        return Transaction.builder()
                .id(transactionEntity.getId())
                .date(dateString)
                .amountSpent(transactionEntity.getAmountSpent())
                .amountAllocated(transactionEntity.getAmountAllocated())
                .description(transactionEntity.getDescription())
                .category(transactionEntity.getCategory())
                .build();
    }

}
