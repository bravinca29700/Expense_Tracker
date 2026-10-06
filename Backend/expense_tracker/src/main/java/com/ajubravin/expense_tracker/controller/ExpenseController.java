package com.ajubravin.expense_tracker.controller;

import com.ajubravin.expense_tracker.model.Expense;
import com.ajubravin.expense_tracker.service.ExpenseService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public ResponseEntity<Expense> addExpense(@Valid @RequestBody Expense expense) {
        return new ResponseEntity<>(
                expenseService.addExpense(expense),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        return ResponseEntity.ok(expenseService.getAllExpenses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        return ResponseEntity.ok(expenseService.getExpenseById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(
            @PathVariable Long id,
            @RequestBody Expense expense) {

        return ResponseEntity.ok(
                expenseService.updateExpense(id, expense)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/total")
public ResponseEntity<Double> getTotalSpent() {
    return ResponseEntity.ok(expenseService.getTotalSpent());
}
}