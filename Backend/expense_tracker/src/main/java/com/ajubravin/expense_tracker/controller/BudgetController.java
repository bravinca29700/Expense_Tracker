package com.ajubravin.expense_tracker.controller;

import com.ajubravin.expense_tracker.model.Budget;
import com.ajubravin.expense_tracker.service.BudgetService;
import com.ajubravin.expense_tracker.service.ExpenseService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetService budgetService;
    private final ExpenseService expenseService;

   public BudgetController(
        BudgetService budgetService,
        ExpenseService expenseService) {

    this.budgetService = budgetService;
    this.expenseService = expenseService;
}

    @PostMapping
    public ResponseEntity<Budget> setBudget(@Valid @RequestBody Budget budget) {
        return new ResponseEntity<>(
                budgetService.setBudget(budget),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Budget>> getAllBudgets() {
        return ResponseEntity.ok(budgetService.getAllBudgets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Budget> getBudgetById(@PathVariable Long id) {
        return ResponseEntity.ok(budgetService.getBudgetById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Budget> updateBudget(
            @PathVariable Long id,
            @RequestBody Budget budget) {

        return ResponseEntity.ok(
                budgetService.updateBudget(id, budget));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long id) {
        budgetService.deleteBudget(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/remaining")
    public ResponseEntity<Double> getRemainingBudget() {

        double totalSpent = expenseService.getTotalSpent();

        return ResponseEntity.ok(
                budgetService.getRemainingBudget(totalSpent));
    }
}