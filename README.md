# Expense Tracker

A full-stack Expense Tracker application built using Java, Spring Boot, React, and MySQL.

The application allows users to manage their expenses, set a monthly budget, and track total spending and remaining budget through a simple and professional web interface.

## Features

- Add expenses
- View all expenses
- Edit expenses
- Delete expenses
- Set monthly budget
- Edit monthly budget
- Clear budget
- Calculate total spending automatically
- Calculate remaining budget automatically
- Input validation
- Global exception handling
- RESTful APIs
- React frontend
- Spring Boot backend
- MySQL database integration

## Tech Stack

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Jakarta Validation
- Maven
- MySQL

### Frontend

- React
- Vite
- JavaScript
- Axios
- CSS

## Project Architecture

Expense Tracker
│
├── backend
│   └── expense-tracker
│       └── src
│           └── main
│               └── java
│                   └── com.ajubravin.expense_tracker
│                       │
│                       ├── controller
│                       │   ├── ExpenseController.java
│                       │   └── BudgetController.java
│                       │
│                       ├── exception
│                       │   ├── ResourceNotFoundException.java
│                       │   └── GlobalExceptionHandler.java
│                       │
│                       ├── model
│                       │   ├── Expense.java
│                       │   └── Budget.java
│                       │
│                       ├── repository
│                       │   ├── ExpenseRepository.java
│                       │   └── BudgetRepository.java
│                       │
│                       ├── service
│                       │   ├── ExpenseService.java
│                       │   └── BudgetService.java
│                       │
│                       └── ExpenseTrackerApplication.java
│
├── Frontend
│   ├── src
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── api.js
│   │   └── main.jsx
│   │
│   ├── public
│   ├── package.json
│   └── index.html
│
└── README.md

## Application Functionality

### Expense Management

Users can:

1. Add a new expense with date, description, and amount.
2. View recently added expenses.
3. Edit an existing expense.
4. Delete an expense.
5. Automatically calculate total spending.

### Budget Management

Users can:

1. Set a monthly budget.
2. Edit the existing budget.
3. Clear the budget.
4. View the remaining budget after expenses.

## REST API Endpoints

### Expense APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/expenses | Add a new expense |
| GET | /api/expenses | Get all expenses |
| GET | /api/expenses/{id} | Get an expense by ID |
| PUT | /api/expenses/{id} | Update an expense |
| DELETE | /api/expenses/{id} | Delete an expense |
| GET | /api/expenses/total | Get total spending |

### Budget APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/budgets | Create a budget |
| GET | /api/budgets | Get all budgets |
| GET | /api/budgets/{id} | Get a budget by ID |
| PUT | /api/budgets/{id} | Update a budget |
| DELETE | /api/budgets/{id} | Delete a budget |
| GET | /api/budgets/remaining | Get remaining budget |

## Database Setup

Create the MySQL database:

CREATE DATABASE expense_tracker;

The application uses Hibernate to automatically create and update the required tables.

Update the database configuration in:

backend/expense-tracker/src/main/resources/application.properties

Example configuration:

spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

Replace YOUR_MYSQL_PASSWORD with your MySQL password.

## How to Run the Backend

Open Terminal and navigate to the backend project:

cd ~/Projects/"Expense Tracker"/backend/expense-tracker

Run the Spring Boot application:

./mvnw spring-boot:run

The backend will start at:

http://localhost:8080

## How to Run the Frontend

Open another Terminal window and navigate to the frontend:

cd ~/Projects/"Expense Tracker"/Frontend

Install the dependencies:

npm install

Start the React development server:

npm run dev

The frontend will be available at:

http://localhost:5173

## Validation and Exception Handling

The backend implements validation and centralized exception handling.

### Validation

The application validates:

- Expense date
- Expense description
- Expense amount
- Budget amount
- Budget month

### Exception Handling

The application includes:

- Custom ResourceNotFoundException
- Global exception handling using @RestControllerAdvice
- Structured error responses
- HTTP status codes such as 400 and 404

## Frontend and Backend Communication

The React frontend communicates with the Spring Boot backend using Axios.

The frontend uses REST APIs to perform CRUD operations and retrieve calculated spending information.

## Screenshots

Screenshots of the application can be added here after uploading the project images to GitHub.

## Future Improvements

Possible future enhancements include:

- User authentication and authorization
- Expense categories
- Monthly expense reports
- Expense charts and analytics
- Search and filtering
- Responsive mobile improvements
- Deployment to a cloud platform

## Author

Aju Bravin C

Java Full Stack Developer

Skills: Java | Spring Boot | React | MySQL | REST APIs | Git | GitHub