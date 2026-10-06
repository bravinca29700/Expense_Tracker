package com.ajubravin.expense_tracker.service;

import com.ajubravin.expense_tracker.exception.ResourceNotFoundException;
import com.ajubravin.expense_tracker.model.Budget;
import com.ajubravin.expense_tracker.repository.BudgetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;

    public BudgetService(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    public Budget setBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    public Budget getBudgetById(Long id) {
        return budgetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Budget not found with id: " + id
                ));
    }

    public Budget updateBudget(Long id, Budget updatedBudget) {

        Budget existingBudget = getBudgetById(id);

        existingBudget.setAmount(updatedBudget.getAmount());
        existingBudget.setMonth(updatedBudget.getMonth());

        return budgetRepository.save(existingBudget);
    }

    public void deleteBudget(Long id) {
        Budget existingBudget = getBudgetById(id);
        budgetRepository.delete(existingBudget);
    }

    public double getRemainingBudget(double totalSpent) {

    Budget budget = budgetRepository.findAll()
            .stream()
            .findFirst()
            .orElseThrow(() -> new ResourceNotFoundException(
                    "Budget not found"
            ));

    return budget.getAmount().doubleValue() - totalSpent;
}
}