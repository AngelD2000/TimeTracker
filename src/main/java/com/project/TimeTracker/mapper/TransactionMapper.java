package com.project.TimeTracker.mapper;

import com.project.TimeTracker.persistence.Transaction;
import com.project.TimeTracker.persistence.entity.TransactionEntity;
import io.netty.util.internal.StringUtil;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class TransactionMapper {

    public TransactionEntity toEntity(Transaction transaction, Transaction oldTransaction) {
        Instant date = dateFromString(transaction, oldTransaction);
        if(oldTransaction == null){
            return TransactionEntity.builder()
                    .id(transaction.getId())
                    .category(transaction.getCategory())
                    .date(date)
                    .amountAllocated(transaction.getAmountAllocated())
                    .amountSpent(transaction.getAmountSpent())
                    .description(transaction.getDescription())
                    .build();
        }
        else{

            return TransactionEntity.builder()
                .id(transaction.getId() != null ? transaction.getId() : oldTransaction.getId())
                .category(transaction.getCategory() != null ? transaction.getCategory() : oldTransaction.getCategory())
                .date(date)
                .amountAllocated(transaction.getAmountAllocated() != null ? transaction.getAmountAllocated() : oldTransaction.getAmountAllocated())
                .amountSpent(transaction.getAmountSpent() !=  null ? transaction.getAmountSpent() : oldTransaction.getAmountSpent())
                .description(transaction.getDescription() != null ? transaction.getDescription() : oldTransaction.getDescription())
                .build();
        }
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

    private Instant dateFromString(Transaction transaction, Transaction oldTransaction) {
        String dateString = (transaction != null && transaction.getDate() != null) ? transaction.getDate() : null;
        String oldDateString = (oldTransaction != null && oldTransaction.getDate() != null) ? oldTransaction.getDate() : null;
        if(StringUtil.isNullOrEmpty(dateString) && oldDateString != null){
            return Instant.parse(oldDateString);
        }
        else if(dateString != null){
            return Instant.parse(dateString);
        }
        else{
            return Instant.now();
        }
    }

}
