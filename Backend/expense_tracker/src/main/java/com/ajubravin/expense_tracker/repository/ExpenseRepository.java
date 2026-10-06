package com.ajubravin.expense_tracker.repository;

import com.ajubravin.expense_tracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}