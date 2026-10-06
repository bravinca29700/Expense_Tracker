package com.ajubravin.expense_tracker.service;

import com.ajubravin.expense_tracker.exception.ResourceNotFoundException;
import com.ajubravin.expense_tracker.model.Expense;
import com.ajubravin.expense_tracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Expense not found with id: " + id));
    }

    public Expense updateExpense(Long id, Expense updatedExpense) {

        Expense existingExpense = getExpenseById(id);

        existingExpense.setDate(updatedExpense.getDate());
        existingExpense.setParticular(updatedExpense.getParticular());
        existingExpense.setAmount(updatedExpense.getAmount());

        return expenseRepository.save(existingExpense);
    }

    public void deleteExpense(Long id) {
        Expense existingExpense = getExpenseById(id);
        expenseRepository.delete(existingExpense);
    }

    public double getTotalSpent() {
    return expenseRepository.findAll()
            .stream()
            .mapToDouble(Expense::getAmount)
            .sum();
}
}