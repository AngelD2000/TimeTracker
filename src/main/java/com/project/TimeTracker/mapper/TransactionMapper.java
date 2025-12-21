package com.project.TimeTracker.mapper;

import com.project.TimeTracker.persistence.Transaction;
import com.project.TimeTracker.persistence.entity.TransactionEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper (componentModel = "spring")
public interface TransactionMapper {

    TransactionMapper INSTANCE = Mappers.getMapper(TransactionMapper.class);

    @Mapping(source = "budgetCategory.id", target = "budgetCategoryId")
    Transaction entityToTransaction(TransactionEntity transactionEntity);
    @Mapping(source = "budgetCategoryId", target="budgetCategory.id")
    TransactionEntity transactionToEntity(Transaction transaction);
}
