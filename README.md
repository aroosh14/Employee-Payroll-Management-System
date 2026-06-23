# Employee Payroll Management System

A comprehensive, full-stack payroll and HR management system designed to automate salary calculations, tax deductions, attendance tracking and leave management while ensuring strict real-time data integrity.

## 🚀 Key Features

* **Automated Salary Processing:** SQL-based logic to accurately calculate net pay, factoring in complex tax brackets and unpaid absences.
* **Real-Time Data Integrity:** Relational database structures fortified with PL/SQL triggers, stored procedures and custom functions to guarantee accurate salary recalculations without race conditions.
* **Transparent HR Operations:** Generates detailed payroll reports and maintains immutable audit trails for every financial alteration.
* **Interactive Dashboard:** A modern, responsive web interface allowing administrators to manage employees, approve leaves and view system analytics.

## 🛠️ Tech Stack

* **Backend / Database:** Oracle Database (SQL, PL/SQL)
* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Architecture:** Relational Database Design, Client-Server Model

## ⚙️ Local Setup & Installation

To run this project locally, you will need an Oracle Database instance and a local web server.

1. **Clone the repository:**
   `git clone https://github.com/aroosh14/Employee-Payroll-Management-System.git`
2. **Initialize the Database:**
   * Run `schema.sql` to generate the relational tables and constraints.
   * Run `procedures.sql` to load the PL/SQL automation logic and triggers.
   * Run `seed.sql` to populate the database with mock employee data.
3. **Launch the Dashboard:**
   * Open your terminal and navigate to the project directory.
   * Start a local server: `python3 -m http.server`
   * Visit `http://localhost:8000` in your browser.
