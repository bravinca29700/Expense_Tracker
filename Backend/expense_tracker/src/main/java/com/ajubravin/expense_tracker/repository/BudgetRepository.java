package com.ajubravin.expense_tracker.repository;

import com.ajubravin.expense_tracker.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

}