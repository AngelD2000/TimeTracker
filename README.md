# TimeTracker
Project to track time spent in a day

## Requirements 
1. Be able to perform CRUD on transactions for time spent 
   1. Add a transaction
   2. Update a transaction
   3. Delete a transaction
   4. Get/List transaction(s)
      1. List all transaction
      2. Get transaction by id
2. Be able to create a time budget
   1. Add a budget category
   2. Update a budget category
   3. Delete a budget category
   4. List/Get budget category(s)
   5. Associate transaction to budget and display what's left
3. Create a budget week
   1. Associate budget categories to a budget week 
   2. Should be able to "rollover" budget categories if they want, or they can create a new budget
4. Display
   1. Based on category what have I spent my time on this week
   2. How much time I have left in each category item


SELECT trans.timeSpent FROM 
    Category as cat 
    WHERE cat.name = "Exercise"
    INNER JOIN
        BudgetCategory as budgetCat WHERE budgetCat.categoryId = cat.id
    INNER JOIN 
        Transaction as trans WHERE trans.budgetCategoryId = budgetCat.id


-- INIT database
CREATE TABLE BudgetWeek (
id SERIAL PRIMARY KEY,
startDate DATE NOT NULL,
endDate DATE NOT NULL
);

CREATE TABLE Category (
id SERIAL PRIMARY KEY,
Name VARCHAR(100)
);


CREATE TABLE BudgetCategory (
id SERIAL PRIMARY KEY,
categoryId INT REFERENCES Category(id),
budgetWeekId INT REFERENCES BudgetWeek(id),
plannedTimeAllocation BIGINT,
Description VARCHAR(255)
);

CREATE TABLE Transaction (
id SERIAL PRIMARY KEY,
budgetCategoryId BIGINT REFERENCES BudgetCategory(id),
Name VARCHAR(100),
Description VARCHAR(255)
);

## Finished
- CRUD operations for each of the entities 
- Front end with mocked data

## Need to do next 
- Working JPQL queries that can power apis to power the frontend
