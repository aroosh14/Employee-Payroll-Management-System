/* ==========================================================================
   Employee Payroll Management System - Application Logic & Oracle Database Simulator
   ========================================================================== */

// --- IN-MEMORY DATABASE STATE (Simulating Oracle Tables) ---
let DB = {
    DEPARTMENTS: [
        { DEPARTMENT_ID: 10, DEPARTMENT_NAME: 'Engineering', MANAGER_ID: 101, LOCATION: 'Building A, Room 301' },
        { DEPARTMENT_ID: 20, DEPARTMENT_NAME: 'Human Resources', MANAGER_ID: 201, LOCATION: 'Building B, Room 102' },
        { DEPARTMENT_ID: 30, DEPARTMENT_NAME: 'Finance', MANAGER_ID: 301, LOCATION: 'Building A, Room 405' },
        { DEPARTMENT_ID: 40, DEPARTMENT_NAME: 'Sales & Marketing', MANAGER_ID: 401, LOCATION: 'Building C, Room 201' }
    ],
    EMPLOYEES: [
        { EMPLOYEE_ID: 101, FIRST_NAME: 'Alex', LAST_NAME: 'Mercer', EMAIL: 'alex.mercer@company.com', PHONE_NUMBER: '+1-555-0101', HIRE_DATE: '2024-03-15', JOB_TITLE: 'Lead Engineer', SALARY: 8500.00, DEPARTMENT_ID: 10, STATUS: 'Active' },
        { EMPLOYEE_ID: 102, FIRST_NAME: 'Sara', LAST_NAME: 'Connor', EMAIL: 'sara.connor@company.com', PHONE_NUMBER: '+1-555-0102', HIRE_DATE: '2024-11-01', JOB_TITLE: 'Software Developer', SALARY: 5800.00, DEPARTMENT_ID: 10, STATUS: 'Active' },
        { EMPLOYEE_ID: 103, FIRST_NAME: 'David', LAST_NAME: 'Miller', EMAIL: 'david.miller@company.com', PHONE_NUMBER: '+1-555-0103', HIRE_DATE: '2025-05-10', JOB_TITLE: 'QA Specialist', SALARY: 4500.00, DEPARTMENT_ID: 10, STATUS: 'Active' },
        { EMPLOYEE_ID: 201, FIRST_NAME: 'Elena', LAST_NAME: 'Gilbert', EMAIL: 'elena.gilbert@company.com', PHONE_NUMBER: '+1-555-0201', HIRE_DATE: '2023-01-15', JOB_TITLE: 'HR Director', SALARY: 7200.00, DEPARTMENT_ID: 20, STATUS: 'Active' },
        { EMPLOYEE_ID: 301, FIRST_NAME: 'Frank', LAST_NAME: 'Abagnale', EMAIL: 'frank.abagnale@company.com', PHONE_NUMBER: '+1-555-0301', HIRE_DATE: '2022-09-01', JOB_TITLE: 'Senior Accountant', SALARY: 6500.00, DEPARTMENT_ID: 30, STATUS: 'Active' },
        { EMPLOYEE_ID: 401, FIRST_NAME: 'Gordon', LAST_NAME: 'Gekko', EMAIL: 'gordon.gekko@company.com', PHONE_NUMBER: '+1-555-0401', HIRE_DATE: '2021-06-15', JOB_TITLE: 'Sales VP', SALARY: 9500.00, DEPARTMENT_ID: 40, STATUS: 'Active' }
    ],
    ATTENDANCE: [
        // June 1st (Monday)
        { ATTENDANCE_ID: 2001, EMPLOYEE_ID: 101, WORK_DATE: '2026-06-01', CHECK_IN: '08:55', CHECK_OUT: '17:30', STATUS: 'Present' },
        { ATTENDANCE_ID: 2002, EMPLOYEE_ID: 102, WORK_DATE: '2026-06-01', CHECK_IN: '09:05', CHECK_OUT: '17:00', STATUS: 'Present' },
        { ATTENDANCE_ID: 2003, EMPLOYEE_ID: 103, WORK_DATE: '2026-06-01', CHECK_IN: '09:35', CHECK_OUT: '18:00', STATUS: 'Late' },
        { ATTENDANCE_ID: 2004, EMPLOYEE_ID: 201, WORK_DATE: '2026-06-01', CHECK_IN: '08:45', CHECK_OUT: '17:00', STATUS: 'Present' },
        { ATTENDANCE_ID: 2005, EMPLOYEE_ID: 301, WORK_DATE: '2026-06-01', CHECK_IN: '09:10', CHECK_OUT: '18:05', STATUS: 'Present' },
        { ATTENDANCE_ID: 2006, EMPLOYEE_ID: 401, WORK_DATE: '2026-06-01', CHECK_IN: '09:40', CHECK_OUT: '17:15', STATUS: 'Late' },
        // June 2nd (Tuesday) - Elena on leave
        { ATTENDANCE_ID: 2007, EMPLOYEE_ID: 101, WORK_DATE: '2026-06-02', CHECK_IN: '08:50', CHECK_OUT: '18:00', STATUS: 'Present' },
        { ATTENDANCE_ID: 2008, EMPLOYEE_ID: 102, WORK_DATE: '2026-06-02', CHECK_IN: '09:00', CHECK_OUT: '17:00', STATUS: 'Present' },
        { ATTENDANCE_ID: 2009, EMPLOYEE_ID: 103, WORK_DATE: '2026-06-02', CHECK_IN: '08:58', CHECK_OUT: '17:30', STATUS: 'Present' },
        { ATTENDANCE_ID: 2010, EMPLOYEE_ID: 201, WORK_DATE: '2026-06-02', CHECK_IN: null, CHECK_OUT: null, STATUS: 'On Leave' },
        { ATTENDANCE_ID: 2011, EMPLOYEE_ID: 301, WORK_DATE: '2026-06-02', CHECK_IN: '08:45', CHECK_OUT: '17:30', STATUS: 'Present' },
        { ATTENDANCE_ID: 2012, EMPLOYEE_ID: 401, WORK_DATE: '2026-06-02', CHECK_IN: '09:55', CHECK_OUT: '17:00', STATUS: 'Late' },
        // June 3rd (Wednesday)
        { ATTENDANCE_ID: 2013, EMPLOYEE_ID: 101, WORK_DATE: '2026-06-03', CHECK_IN: '08:52', CHECK_OUT: '17:40', STATUS: 'Present' },
        { ATTENDANCE_ID: 2014, EMPLOYEE_ID: 102, WORK_DATE: '2026-06-03', CHECK_IN: '09:22', CHECK_OUT: '17:00', STATUS: 'Late' },
        { ATTENDANCE_ID: 2015, EMPLOYEE_ID: 103, WORK_DATE: '2026-06-03', CHECK_IN: '10:15', CHECK_OUT: '17:00', STATUS: 'Late' },
        { ATTENDANCE_ID: 2016, EMPLOYEE_ID: 201, WORK_DATE: '2026-06-03', CHECK_IN: null, CHECK_OUT: null, STATUS: 'On Leave' },
        { ATTENDANCE_ID: 2017, EMPLOYEE_ID: 301, WORK_DATE: '2026-06-03', CHECK_IN: '08:50', CHECK_OUT: '17:30', STATUS: 'Present' },
        { ATTENDANCE_ID: 2018, EMPLOYEE_ID: 401, WORK_DATE: '2026-06-03', CHECK_IN: '09:02', CHECK_OUT: '18:00', STATUS: 'Present' },
        // June 4th (Thursday)
        { ATTENDANCE_ID: 2019, EMPLOYEE_ID: 101, WORK_DATE: '2026-06-04', CHECK_IN: '08:56', CHECK_OUT: '17:35', STATUS: 'Present' },
        { ATTENDANCE_ID: 2020, EMPLOYEE_ID: 102, WORK_DATE: '2026-06-04', CHECK_IN: '08:58', CHECK_OUT: '17:00', STATUS: 'Present' },
        { ATTENDANCE_ID: 2021, EMPLOYEE_ID: 103, WORK_DATE: '2026-06-04', CHECK_IN: '09:28', CHECK_OUT: '17:30', STATUS: 'Late' },
        { ATTENDANCE_ID: 2022, EMPLOYEE_ID: 201, WORK_DATE: '2026-06-04', CHECK_IN: '09:05', CHECK_OUT: '17:00', STATUS: 'Present' },
        { ATTENDANCE_ID: 2023, EMPLOYEE_ID: 301, WORK_DATE: '2026-06-04', CHECK_IN: '09:00', CHECK_OUT: '17:30', STATUS: 'Present' },
        { ATTENDANCE_ID: 2024, EMPLOYEE_ID: 401, WORK_DATE: '2026-06-04', CHECK_IN: null, CHECK_OUT: null, STATUS: 'Absent' },
        // June 5th (Friday)
        { ATTENDANCE_ID: 2025, EMPLOYEE_ID: 101, WORK_DATE: '2026-06-05', CHECK_IN: '08:44', CHECK_OUT: '17:30', STATUS: 'Present' },
        { ATTENDANCE_ID: 2026, EMPLOYEE_ID: 102, WORK_DATE: '2026-06-05', CHECK_IN: '08:55', CHECK_OUT: '17:00', STATUS: 'Present' },
        { ATTENDANCE_ID: 2027, EMPLOYEE_ID: 103, WORK_DATE: '2026-06-05', CHECK_IN: '09:20', CHECK_OUT: '17:30', STATUS: 'Late' },
        { ATTENDANCE_ID: 2028, EMPLOYEE_ID: 201, WORK_DATE: '2026-06-05', CHECK_IN: '08:50', CHECK_OUT: '17:00', STATUS: 'Present' },
        { ATTENDANCE_ID: 2029, EMPLOYEE_ID: 301, WORK_DATE: '2026-06-05', CHECK_IN: '08:58', CHECK_OUT: '17:30', STATUS: 'Present' },
        { ATTENDANCE_ID: 2030, EMPLOYEE_ID: 401, WORK_DATE: '2026-06-05', CHECK_IN: '09:38', CHECK_OUT: '17:00', STATUS: 'Late' }
    ],
    LEAVES: [
        { LEAVE_ID: 1001, EMPLOYEE_ID: 201, LEAVE_TYPE: 'Casual', START_DATE: '2026-06-02', END_DATE: '2026-06-03', STATUS: 'Approved', REASON: 'Family function' },
        { LEAVE_ID: 1002, EMPLOYEE_ID: 101, LEAVE_TYPE: 'Sick', START_DATE: '2026-06-10', END_DATE: '2026-06-11', STATUS: 'Approved', REASON: 'Medical checkup' },
        { LEAVE_ID: 1003, EMPLOYEE_ID: 103, LEAVE_TYPE: 'Unpaid', START_DATE: '2026-06-15', END_DATE: '2026-06-16', STATUS: 'Approved', REASON: 'Personal business' },
        { LEAVE_ID: 1004, EMPLOYEE_ID: 102, LEAVE_TYPE: 'Annual', START_DATE: '2026-06-25', END_DATE: '2026-06-30', STATUS: 'Pending', REASON: 'Summer trip' }
    ],
    PAYROLL: [
        { PAYROLL_ID: 5001, EMPLOYEE_ID: 101, PAY_PERIOD_START: '2026-05-01', PAY_PERIOD_END: '2026-05-31', BASIC_SALARY: 8500.00, ALLOWANCES: 1275.00, DEDUCTIONS: 0.00, TAX: 1505.00, NET_SALARY: 8270.00, PAYMENT_DATE: '2026-05-31', STATUS: 'Paid' },
        { PAYROLL_ID: 5002, EMPLOYEE_ID: 102, PAY_PERIOD_START: '2026-05-01', PAY_PERIOD_END: '2026-05-31', BASIC_SALARY: 5800.00, ALLOWANCES: 870.00, DEDUCTIONS: 0.00, TAX: 667.00, NET_SALARY: 6003.00, PAYMENT_DATE: '2026-05-31', STATUS: 'Paid' },
        { PAYROLL_ID: 5003, EMPLOYEE_ID: 201, PAY_PERIOD_START: '2026-05-01', PAY_PERIOD_END: '2026-05-31', BASIC_SALARY: 7200.00, ALLOWANCES: 1080.00, DEDUCTIONS: 0.00, TAX: 1116.00, NET_SALARY: 7164.00, PAYMENT_DATE: '2026-05-31', STATUS: 'Paid' }
    ]
};

// Next Auto IDs (Emulating SEQUENCE auto-generation)
let SEQUENCE = {
    DEPARTMENTS: 50,
    EMPLOYEES: 402,
    ATTENDANCE: 2031,
    LEAVES: 1005,
    PAYROLL: 5004
};

// --- ORACLE PL/SQL LOGIC SIMULATORS (Triggers & Packages) ---

/**
 * TRIGGER: trg_attendance_status
 * Modifies an attendance log record before insert/update.
 */
function trg_attendance_status(record) {
    if (record.CHECK_IN && record.STATUS !== 'On Leave' && record.STATUS !== 'Absent') {
        const time = record.CHECK_IN; // Expecting "HH:MM"
        if (time <= '09:15') {
            record.STATUS = 'Present';
        } else if (time <= '12:00') {
            record.STATUS = 'Late';
        } else {
            record.STATUS = 'Half-Day';
        }
    } else if (!record.CHECK_IN && !record.STATUS) {
        record.STATUS = 'Absent';
    }
    return record;
}

/**
 * TRIGGER: trg_validate_leave
 * Throws error if there is an overlapping approved leave.
 */
function trg_validate_leave(newLeave) {
    if (newLeave.STATUS !== 'Approved') return true;
    
    const overlap = DB.LEAVES.find(oldLeave => {
        if (oldLeave.EMPLOYEE_ID !== newLeave.EMPLOYEE_ID) return false;
        if (oldLeave.STATUS !== 'Approved') return false;
        if (oldLeave.LEAVE_ID === newLeave.LEAVE_ID) return false; // same record
        
        // Date overlap logic
        const s1 = new Date(newLeave.START_DATE);
        const e1 = new Date(newLeave.END_DATE);
        const s2 = new Date(oldLeave.START_DATE);
        const e2 = new Date(oldLeave.END_DATE);
        
        return (s1 <= e2 && e1 >= s2);
    });
    
    if (overlap) {
        throw new Error(`ORA-20001: Leave application overlaps with an already approved leave (${overlap.START_DATE} to ${overlap.END_DATE}).`);
    }
    return true;
}

/**
 * PACKAGE: PAYROLL_PKG
 */
const PAYROLL_PKG = {
    // Port of PAYROLL_PKG.calculate_salary_components
    calculate_salary_components: function(employeeId, startDate, endDate) {
        const emp = DB.EMPLOYEES.find(e => e.EMPLOYEE_ID === employeeId);
        if (!emp) throw new Error("ORA-01403: no data found in EMPLOYEES");
        
        const basicSalary = emp.SALARY;
        const dailyWage = basicSalary / 22;
        
        // 1. Allowances (10% HRA + 5% Medical)
        const allowances = Math.round(basicSalary * 0.15 * 100) / 100;
        
        // 2. Unpaid Leaves
        // Find approved unpaid leaves within period
        let unpaidDays = 0;
        DB.LEAVES.forEach(lv => {
            if (lv.EMPLOYEE_ID === employeeId && lv.STATUS === 'Approved' && lv.LEAVE_TYPE === 'Unpaid') {
                // calculate intersection between leave dates and payroll dates
                const lStart = new Date(lv.START_DATE);
                const lEnd = new Date(lv.END_DATE);
                const pStart = new Date(startDate);
                const pEnd = new Date(endDate);
                
                const start = new Date(Math.max(lStart, pStart));
                const end = new Date(Math.min(lEnd, pEnd));
                
                if (start <= end) {
                    const days = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
                    unpaidDays += days;
                }
            }
        });
        
        // 3. Absent Days
        let absentDays = 0;
        let halfDays = 0;
        let lateDays = 0;
        
        DB.ATTENDANCE.forEach(att => {
            if (att.EMPLOYEE_ID === employeeId) {
                const attDate = new Date(att.WORK_DATE);
                const pStart = new Date(startDate);
                const pEnd = new Date(endDate);
                
                if (attDate >= pStart && attDate <= pEnd) {
                    if (att.STATUS === 'Absent') absentDays++;
                    else if (att.STATUS === 'Half-Day') halfDays++;
                    else if (att.STATUS === 'Late') lateDays++;
                }
            }
        });
        
        let lateDeductions = 0;
        if (lateDays > 3) {
            lateDeductions = (lateDays - 3) * (dailyWage * 0.2);
        }
        
        let deductions = Math.round(
            ((unpaidDays * dailyWage) +
            (absentDays * dailyWage) +
            (halfDays * dailyWage * 0.5) +
            lateDeductions) * 100
        ) / 100;
        
        // Cap deductions
        if (deductions > (basicSalary + allowances)) {
            deductions = basicSalary + allowances;
        }
        
        // 3. Tax calculation on taxable gross (basic + allowances - deductions)
        const taxableIncome = (basicSalary + allowances) - deductions;
        let tax = 0;
        if (taxableIncome <= 3000) {
            tax = 0;
        } else if (taxableIncome <= 6000) {
            tax = (taxableIncome - 3000) * 0.10;
        } else if (taxableIncome <= 10000) {
            tax = (3000 * 0.10) + ((taxableIncome - 6000) * 0.15);
        } else {
            tax = (3000 * 0.10) + (4000 * 0.15) + ((taxableIncome - 10000) * 0.20);
        }
        tax = Math.round(tax * 100) / 100;
        
        // 4. Net Salary
        let netSalary = Math.round((basicSalary + allowances - deductions - tax) * 100) / 100;
        if (netSalary < 0) netSalary = 0;
        
        return {
            basicSalary,
            allowances,
            deductions,
            tax,
            netSalary,
            breakdown: {
                unpaidDays,
                absentDays,
                halfDays,
                lateDays,
                dailyWage: Math.round(dailyWage * 100) / 100
            }
        };
    },
    
    // Port of PAYROLL_PKG.process_payroll_for_employee
    process_payroll_for_employee: function(employeeId, startDate, endDate, logs = []) {
        const emp = DB.EMPLOYEES.find(e => e.EMPLOYEE_ID === employeeId);
        if (!emp) return;
        
        logs.push(`PL/SQL: Processing salary calculation for Employee ID ${employeeId} (${emp.FIRST_NAME} ${emp.LAST_NAME})...`);
        
        // Remove duplicate draft payroll for the period if exists
        const oldIndex = DB.PAYROLL.findIndex(p => p.EMPLOYEE_ID === employeeId && p.PAY_PERIOD_START === startDate && p.PAY_PERIOD_END === endDate);
        if (oldIndex !== -1) {
            logs.push(`PL/SQL: Found existing payroll record. Overwriting draft...`);
            DB.PAYROLL.splice(oldIndex, 1);
        }
        
        const calc = this.calculate_salary_components(employeeId, startDate, endDate);
        
        const newPayroll = {
            PAYROLL_ID: SEQUENCE.PAYROLL++,
            EMPLOYEE_ID: employeeId,
            PAY_PERIOD_START: startDate,
            PAY_PERIOD_END: endDate,
            BASIC_SALARY: calc.basicSalary,
            ALLOWANCES: calc.allowances,
            DEDUCTIONS: calc.deductions,
            TAX: calc.tax,
            NET_SALARY: calc.netSalary,
            PAYMENT_DATE: new Date().toISOString().split('T')[0],
            STATUS: 'Draft'
        };
        
        DB.PAYROLL.push(newPayroll);
        logs.push(`PL/SQL: SUCCESS - Employee Payroll calculated: Basic = $${calc.basicSalary}, Net = $${calc.netSalary}`);
        return newPayroll;
    },
    
    // Port of PAYROLL_PKG.process_monthly_payroll
    process_monthly_payroll: function(departmentId, startDate, endDate, logs = []) {
        const dept = DB.DEPARTMENTS.find(d => d.DEPARTMENT_ID === departmentId);
        if (!dept) {
            logs.push(`PL/SQL ERROR: Department ${departmentId} not found.`);
            return;
        }
        
        logs.push(`PL/SQL: Starting monthly payroll process for Department: ${dept.DEPARTMENT_NAME} (ID: ${departmentId})`);
        logs.push(`PL/SQL: Period: ${startDate} to ${endDate}`);
        
        const employees = DB.EMPLOYEES.filter(e => e.DEPARTMENT_ID === departmentId && e.STATUS === 'Active');
        logs.push(`PL/SQL: Found ${employees.length} active employees in department.`);
        
        employees.forEach(emp => {
            this.process_payroll_for_employee(emp.EMPLOYEE_ID, startDate, endDate, logs);
        });
        
        logs.push(`PL/SQL: Monthly payroll processing completed successfully for ${dept.DEPARTMENT_NAME}.`);
        logs.push(`PL/SQL: Transaction COMMITTED.`);
    }
};

// --- CLIENT SIDE SQL CONSOLE INTERPRETER ---
function executeSQL(sqlQuery) {
    const q = sqlQuery.trim().replace(/;+$/, '');
    const logs = [];
    
    try {
        // Clear comments
        const cleanQuery = q.replace(/--.*$/gm, '').trim();
        
        // 1. SELECT Command Parser
        if (/^SELECT\s+\*\s+FROM\s+(\w+)/i.test(cleanQuery)) {
            const tableName = cleanQuery.match(/^SELECT\s+\*\s+FROM\s+(\w+)/i)[1].toUpperCase();
            if (DB[tableName]) {
                logs.push(`SQL: SELECT * FROM ${tableName} executed.`);
                return { success: true, type: 'SELECT', table: tableName, data: DB[tableName], logs };
            } else {
                throw new Error(`ORA-00942: table or view does not exist: ${tableName}`);
            }
        }
        
        // 2. UPDATE Command Parser
        if (/^UPDATE\s+(\w+)\s+SET\s+(\w+)\s*=\s*([\w\.\'\"]+)\s+WHERE\s+(\w+)\s*=\s*(\w+)/i.test(cleanQuery)) {
            const match = cleanQuery.match(/^UPDATE\s+(\w+)\s+SET\s+(\w+)\s*=\s*([\w\.\'\"]+)\s+WHERE\s+(\w+)\s*=\s*(\w+)/i);
            const tableName = match[1].toUpperCase();
            const colName = match[2].toUpperCase();
            let val = match[3].replace(/['"]/g, '');
            const whereCol = match[4].toUpperCase();
            const whereVal = match[5];
            
            if (!DB[tableName]) {
                throw new Error(`ORA-00942: table or view does not exist: ${tableName}`);
            }
            
            // Convert to number if applicable
            if (!isNaN(val)) val = parseFloat(val);
            
            let updateCount = 0;
            DB[tableName].forEach(row => {
                if (row[whereCol] == whereVal) {
                    row[colName] = val;
                    updateCount++;
                }
            });
            
            logs.push(`SQL: UPDATE ${tableName} successful. ${updateCount} row(s) updated.`);
            syncUI();
            return { success: true, type: 'UPDATE', rowsUpdated: updateCount, logs };
        }
        
        // 3. EXEC Command Parser (PL/SQL Blocks)
        if (/^EXEC\s+PAYROLL_PKG\.process_monthly_payroll\s*\(\s*(\d+)\s*,\s*\'([\d-]+)\'\s*,\s*\'([\d-]+)\'\s*\)/i.test(cleanQuery)) {
            const match = cleanQuery.match(/^EXEC\s+PAYROLL_PKG\.process_monthly_payroll\s*\(\s*(\d+)\s*,\s*\'([\d-]+)\'\s*,\s*\'([\d-]+)\'\s*\)/i);
            const deptId = parseInt(match[1]);
            const start = match[2];
            const end = match[3];
            
            PAYROLL_PKG.process_monthly_payroll(deptId, start, end, logs);
            syncUI();
            return { success: true, type: 'EXEC', logs };
        }
        
        if (/^EXEC\s+PAYROLL_PKG\.process_payroll_for_employee\s*\(\s*(\d+)\s*,\s*\'([\d-]+)\'\s*,\s*\'([\d-]+)\'\s*\)/i.test(cleanQuery)) {
            const match = cleanQuery.match(/^EXEC\s+PAYROLL_PKG\.process_payroll_for_employee\s*\(\s*(\d+)\s*,\s*\'([\d-]+)\'\s*,\s*\'([\d-]+)\'\s*\)/i);
            const empId = parseInt(match[1]);
            const start = match[2];
            const end = match[3];
            
            PAYROLL_PKG.process_payroll_for_employee(empId, start, end, logs);
            syncUI();
            return { success: true, type: 'EXEC', logs };
        }
        
        // Fallback: unsupported mock SQL
        throw new Error("ORA-00900: invalid SQL statement (Simulated engine only supports SELECT * FROM [TABLE], UPDATE [TABLE] SET [COL] = [VAL] WHERE [ID] = [VAL], and EXEC PAYROLL_PKG.process_monthly_payroll/process_payroll_for_employee).");
        
    } catch(err) {
        logs.push(err.message);
        return { success: false, logs };
    }
}


// --- UI SYNCING & INTERACTIVE CONTROLLERS ---

function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

function syncUI() {
    // 1. Dashboard Metrics
    const totalEmployees = DB.EMPLOYEES.filter(e => e.STATUS === 'Active').length;
    document.getElementById('m-active-employees').textContent = totalEmployees;
    
    // Average Salary
    const totalSalary = DB.EMPLOYEES.reduce((sum, emp) => sum + (emp.STATUS === 'Active' ? emp.SALARY : 0), 0);
    const avgSalary = totalEmployees > 0 ? (totalSalary / totalEmployees) : 0;
    document.getElementById('m-avg-salary').textContent = formatCurrency(avgSalary);
    
    // Pending Leaves Count
    const pendingLeaves = DB.LEAVES.filter(l => l.STATUS === 'Pending').length;
    document.getElementById('m-pending-leaves').textContent = pendingLeaves;
    const leaveBadge = document.getElementById('pending-leave-badge');
    if (leaveBadge) {
        if (pendingLeaves > 0) {
            leaveBadge.textContent = pendingLeaves;
            leaveBadge.style.display = 'inline-block';
        } else {
            leaveBadge.style.display = 'none';
        }
    }
    
    // Monthly payroll expense
    const currentPayrollCost = DB.PAYROLL
        .filter(p => p.PAY_PERIOD_START === '2026-06-01' || p.STATUS === 'Paid')
        .reduce((sum, p) => sum + p.NET_SALARY, 0);
    document.getElementById('m-payroll-cost').textContent = formatCurrency(currentPayrollCost);
    
    // 2. Render Employees Tab
    renderEmployeeTable();
    populateEmployeeDropdowns();
    
    // 3. Render Attendance & Leaves Tabs
    renderAttendanceTable();
    renderLeavesTable();
    
    // 4. Render Payroll Tab
    renderPayrollTable();
}

// RENDER: Employees Table
function renderEmployeeTable() {
    const tbody = document.getElementById('employees-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    DB.EMPLOYEES.forEach(emp => {
        const deptName = DB.DEPARTMENTS.find(d => d.DEPARTMENT_ID === emp.DEPARTMENT_ID)?.DEPARTMENT_NAME || 'None';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>#${emp.EMPLOYEE_ID}</strong></td>
            <td>${emp.FIRST_NAME} ${emp.LAST_NAME}</td>
            <td>${emp.JOB_TITLE}</td>
            <td>${deptName}</td>
            <td>${formatCurrency(emp.SALARY)}</td>
            <td>${emp.HIRE_DATE}</td>
            <td><span class="badge badge-${emp.STATUS.toLowerCase()}">${emp.STATUS}</span></td>
            <td>
                <button class="btn btn-sm" onclick="editEmployee(${emp.EMPLOYEE_ID})"><i class="fas fa-edit"></i> Edit</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// RENDER: Attendance Logs Table
function renderAttendanceTable() {
    const tbody = document.getElementById('attendance-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    // Sort logs descending by date
    const sortedAttendance = [...DB.ATTENDANCE].sort((a, b) => b.WORK_DATE.localeCompare(a.WORK_DATE) || a.EMPLOYEE_ID - b.EMPLOYEE_ID);
    
    sortedAttendance.forEach(att => {
        const emp = DB.EMPLOYEES.find(e => e.EMPLOYEE_ID === att.EMPLOYEE_ID);
        const name = emp ? `${emp.FIRST_NAME} ${emp.LAST_NAME}` : 'Unknown';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${att.WORK_DATE}</td>
            <td><strong>#${att.EMPLOYEE_ID}</strong> - ${name}</td>
            <td>${att.CHECK_IN || '--:--'}</td>
            <td>${att.CHECK_OUT || '--:--'}</td>
            <td><span class="badge badge-${att.STATUS.toLowerCase().replace(' ', '-')}">${att.STATUS}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// RENDER: Leave Applications Table
function renderLeavesTable() {
    const tbody = document.getElementById('leaves-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    DB.LEAVES.forEach(lv => {
        const emp = DB.EMPLOYEES.find(e => e.EMPLOYEE_ID === lv.EMPLOYEE_ID);
        const name = emp ? `${emp.FIRST_NAME} ${emp.LAST_NAME}` : 'Unknown';
        
        let actionButtons = '';
        if (lv.STATUS === 'Pending') {
            actionButtons = `
                <button class="btn btn-success btn-sm" onclick="handleLeaveDecision(${lv.LEAVE_ID}, 'Approved')"><i class="fas fa-check"></i> Approve</button>
                <button class="btn btn-danger btn-sm" onclick="handleLeaveDecision(${lv.LEAVE_ID}, 'Rejected')"><i class="fas fa-times"></i> Reject</button>
            `;
        } else {
            actionButtons = `<span style="color: var(--text-muted); font-size:12px;">Processed</span>`;
        }
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>#${lv.LEAVE_ID}</strong></td>
            <td>${name}</td>
            <td>${lv.LEAVE_TYPE}</td>
            <td>${lv.START_DATE} to ${lv.END_DATE}</td>
            <td>${lv.REASON || 'No reason specified'}</td>
            <td><span class="badge badge-${lv.STATUS.toLowerCase()}">${lv.STATUS}</span></td>
            <td style="display:flex; gap:8px;">${actionButtons}</td>
        `;
        tbody.appendChild(tr);
    });
}

// RENDER: Payroll List
function renderPayrollTable() {
    const tbody = document.getElementById('payroll-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    // Sort descending by period start date
    const sortedPayroll = [...DB.PAYROLL].sort((a,b) => b.PAY_PERIOD_START.localeCompare(a.PAY_PERIOD_START));
    
    sortedPayroll.forEach(p => {
        const emp = DB.EMPLOYEES.find(e => e.EMPLOYEE_ID === p.EMPLOYEE_ID);
        const name = emp ? `${emp.FIRST_NAME} ${emp.LAST_NAME}` : 'Unknown';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>#${p.PAYROLL_ID}</strong></td>
            <td>${name}</td>
            <td>${p.PAY_PERIOD_START} to ${p.PAY_PERIOD_END}</td>
            <td>${formatCurrency(p.BASIC_SALARY)}</td>
            <td style="color: var(--color-success)">+${formatCurrency(p.ALLOWANCES)}</td>
            <td style="color: var(--color-danger)">-${formatCurrency(p.DEDUCTIONS)}</td>
            <td style="color: var(--color-danger)">-${formatCurrency(p.TAX)}</td>
            <td><strong>${formatCurrency(p.NET_SALARY)}</strong></td>
            <td><span class="badge badge-${p.STATUS.toLowerCase()}">${p.STATUS}</span></td>
            <td>
                <button class="btn btn-sm" onclick="showPayslip(${p.PAYROLL_ID})"><i class="fas fa-file-invoice-dollar"></i> Payslip</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// POPULATE: Dropdown lists dynamically
function populateEmployeeDropdowns() {
    const empSelect = document.getElementById('att-employee-id');
    const leaveEmpSelect = document.getElementById('leave-employee-id');
    
    if (empSelect) {
        empSelect.innerHTML = '<option value="">Select Employee</option>';
        DB.EMPLOYEES.forEach(e => {
            empSelect.innerHTML += `<option value="${e.EMPLOYEE_ID}">#${e.EMPLOYEE_ID} - ${e.FIRST_NAME} ${e.LAST_NAME} (${e.JOB_TITLE})</option>`;
        });
    }
    
    if (leaveEmpSelect) {
        leaveEmpSelect.innerHTML = '<option value="">Select Employee</option>';
        DB.EMPLOYEES.forEach(e => {
            leaveEmpSelect.innerHTML += `<option value="${e.EMPLOYEE_ID}">#${e.EMPLOYEE_ID} - ${e.FIRST_NAME} ${e.LAST_NAME}</option>`;
        });
    }
}

// EVENT: Add Employee
window.saveEmployee = function(event) {
    event.preventDefault();
    const empIdVal = document.getElementById('emp-id').value;
    const firstName = document.getElementById('emp-firstname').value;
    const lastName = document.getElementById('emp-lastname').value;
    const email = document.getElementById('emp-email').value;
    const phone = document.getElementById('emp-phone').value;
    const hireDate = document.getElementById('emp-hiredate').value;
    const jobTitle = document.getElementById('emp-jobtitle').value;
    const salary = parseFloat(document.getElementById('emp-salary').value);
    const deptId = parseInt(document.getElementById('emp-dept').value);
    const status = document.getElementById('emp-status').value;
    
    if (empIdVal) {
        // Update Existing
        const empId = parseInt(empIdVal);
        const index = DB.EMPLOYEES.findIndex(e => e.EMPLOYEE_ID === empId);
        if (index !== -1) {
            DB.EMPLOYEES[index] = {
                ...DB.EMPLOYEES[index],
                FIRST_NAME: firstName,
                LAST_NAME: lastName,
                EMAIL: email,
                PHONE_NUMBER: phone,
                HIRE_DATE: hireDate,
                JOB_TITLE: jobTitle,
                SALARY: salary,
                DEPARTMENT_ID: deptId,
                STATUS: status
            };
        }
    } else {
        // Insert New (SEQUENCE auto-gen)
        const newEmpId = SEQUENCE.EMPLOYEES++;
        DB.EMPLOYEES.push({
            EMPLOYEE_ID: newEmpId,
            FIRST_NAME: firstName,
            LAST_NAME: lastName,
            EMAIL: email,
            PHONE_NUMBER: phone,
            HIRE_DATE: hireDate || new Date().toISOString().split('T')[0],
            JOB_TITLE: jobTitle,
            SALARY: salary,
            DEPARTMENT_ID: deptId,
            STATUS: status
        });
    }
    
    closeModal();
    syncUI();
};

window.editEmployee = function(empId) {
    const emp = DB.EMPLOYEES.find(e => e.EMPLOYEE_ID === empId);
    if (!emp) return;
    
    document.getElementById('modal-title-text').textContent = 'Modify Employee Master';
    document.getElementById('emp-id').value = emp.EMPLOYEE_ID;
    document.getElementById('emp-firstname').value = emp.FIRST_NAME;
    document.getElementById('emp-lastname').value = emp.LAST_NAME;
    document.getElementById('emp-email').value = emp.EMAIL;
    document.getElementById('emp-phone').value = emp.PHONE_NUMBER;
    document.getElementById('emp-hiredate').value = emp.HIRE_DATE;
    document.getElementById('emp-jobtitle').value = emp.JOB_TITLE;
    document.getElementById('emp-salary').value = emp.SALARY;
    document.getElementById('emp-dept').value = emp.DEPARTMENT_ID;
    document.getElementById('emp-status').value = emp.STATUS;
    
    openModal('employee-modal');
};

window.showAddEmployeeForm = function() {
    document.getElementById('modal-title-text').textContent = 'Create New Employee Profile';
    document.getElementById('employee-form').reset();
    document.getElementById('emp-id').value = '';
    openModal('employee-modal');
};

// EVENT: Log Attendance
window.submitAttendance = function(event) {
    event.preventDefault();
    const empId = parseInt(document.getElementById('att-employee-id').value);
    const workDate = document.getElementById('att-date').value;
    const checkIn = document.getElementById('att-checkin').value;
    const checkOut = document.getElementById('att-checkout').value;
    
    if (!empId || !workDate) {
        alert("Please select employee and date.");
        return;
    }
    
    // Check if entry already exists
    const duplicate = DB.ATTENDANCE.find(a => a.EMPLOYEE_ID === empId && a.WORK_DATE === workDate);
    if (duplicate) {
        alert(`Attendance log already exists for this employee on ${workDate}. Use Oracle Terminal to modify.`);
        return;
    }
    
    // Simulate TRIGGER trg_attendance_status
    let newAtt = {
        ATTENDANCE_ID: SEQUENCE.ATTENDANCE++,
        EMPLOYEE_ID: empId,
        WORK_DATE: workDate,
        CHECK_IN: checkIn || null,
        CHECK_OUT: checkOut || null,
        STATUS: null
    };
    
    newAtt = trg_attendance_status(newAtt);
    DB.ATTENDANCE.push(newAtt);
    
    document.getElementById('attendance-form').reset();
    syncUI();
};

// EVENT: Apply for Leave
window.submitLeave = function(event) {
    event.preventDefault();
    const empId = parseInt(document.getElementById('leave-employee-id').value);
    const leaveType = document.getElementById('leave-type').value;
    const start = document.getElementById('leave-start').value;
    const end = document.getElementById('leave-end').value;
    const reason = document.getElementById('leave-reason').value;
    
    if (!empId || !start || !end) {
        alert("Please complete all required fields.");
        return;
    }
    
    const newLeave = {
        LEAVE_ID: SEQUENCE.LEAVES++,
        EMPLOYEE_ID: empId,
        LEAVE_TYPE: leaveType,
        START_DATE: start,
        END_DATE: end,
        STATUS: 'Pending',
        REASON: reason
    };
    
    DB.LEAVES.push(newLeave);
    document.getElementById('leave-form').reset();
    syncUI();
};

// EVENT: Leave Decisions (Approve / Reject) with Trigger Validation
window.handleLeaveDecision = function(leaveId, newStatus) {
    const leave = DB.LEAVES.find(l => l.LEAVE_ID === leaveId);
    if (!leave) return;
    
    if (newStatus === 'Approved') {
        try {
            // Emulate TRIGGER trg_validate_leave
            const mockRecord = { ...leave, STATUS: 'Approved' };
            trg_validate_leave(mockRecord);
            
            leave.STATUS = 'Approved';
            
            // Trigger auto-creation/update of ATTENDANCE logs for dates inside the leave range
            const start = new Date(leave.START_DATE);
            const end = new Date(leave.END_DATE);
            
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                const dateStr = d.toISOString().split('T')[0];
                // Check if log already exists
                const existing = DB.ATTENDANCE.find(a => a.EMPLOYEE_ID === leave.EMPLOYEE_ID && a.WORK_DATE === dateStr);
                if (existing) {
                    existing.STATUS = 'On Leave';
                    existing.CHECK_IN = null;
                    existing.CHECK_OUT = null;
                } else {
                    DB.ATTENDANCE.push({
                        ATTENDANCE_ID: SEQUENCE.ATTENDANCE++,
                        EMPLOYEE_ID: leave.EMPLOYEE_ID,
                        WORK_DATE: dateStr,
                        CHECK_IN: null,
                        CHECK_OUT: null,
                        STATUS: 'On Leave'
                    });
                }
            }
            
            alert("SUCCESS: Leave request Approved! Attendance registers updated to 'On Leave'.");
        } catch (err) {
            alert(err.message);
        }
    } else {
        leave.STATUS = 'Rejected';
    }
    
    syncUI();
};

// EVENT: PL/SQL Payroll Process UI Action
window.runPayrollProcess = function() {
    const deptId = parseInt(document.getElementById('pay-dept-select').value);
    const start = document.getElementById('pay-period-start').value;
    const end = document.getElementById('pay-period-end').value;
    
    if (!deptId || !start || !end) {
        alert("Please configure the parameters first.");
        return;
    }
    
    const logs = [];
    document.getElementById('payroll-progress-panel').style.display = 'block';
    const logsContainer = document.getElementById('payroll-log-output');
    logsContainer.innerHTML = 'PL/SQL compiler initialization...';
    
    // Simulate animated console steps
    setTimeout(() => {
        PAYROLL_PKG.process_monthly_payroll(deptId, start, end, logs);
        
        logsContainer.innerHTML = '';
        logs.forEach((log, index) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = 'calc-step';
                div.innerHTML = `<span class="calc-step-check">✓</span> <span>${log}</span>`;
                logsContainer.appendChild(div);
                logsContainer.scrollTop = logsContainer.scrollHeight;
            }, index * 250);
        });
        
        syncUI();
    }, 500);
};

// EVENT: Oracle Console execution
window.submitConsoleQuery = function() {
    const query = document.getElementById('sql-query-input').value;
    const consoleBody = document.getElementById('sql-console-output');
    
    if (!query.trim()) return;
    
    consoleBody.innerHTML = '';
    const res = executeSQL(query);
    
    res.logs.forEach(log => {
        const div = document.createElement('div');
        div.className = res.success ? 'console-success' : 'console-error';
        div.textContent = log;
        consoleBody.appendChild(div);
    });
    
    if (res.success && res.type === 'SELECT') {
        const tableHeader = document.createElement('div');
        tableHeader.style.fontWeight = 'bold';
        tableHeader.style.marginTop = '12px';
        tableHeader.style.color = '#38bdf8';
        tableHeader.textContent = `RESULT SET TABLE: ${res.table}`;
        consoleBody.appendChild(tableHeader);
        
        // Print columns
        if (res.data.length > 0) {
            const cols = Object.keys(res.data[0]);
            
            const tbl = document.createElement('table');
            tbl.style.width = '100%';
            tbl.style.marginTop = '8px';
            tbl.style.borderCollapse = 'collapse';
            tbl.style.border = '1px solid #1e293b';
            
            const trh = document.createElement('tr');
            cols.forEach(col => {
                const th = document.createElement('th');
                th.style.border = '1px solid #1e293b';
                th.style.padding = '6px';
                th.style.background = '#0f172a';
                th.style.textAlign = 'left';
                th.textContent = col;
                trh.appendChild(th);
            });
            tbl.appendChild(trh);
            
            res.data.forEach(row => {
                const tr = document.createElement('tr');
                cols.forEach(col => {
                    const td = document.createElement('td');
                    td.style.border = '1px solid #1e293b';
                    td.style.padding = '6px';
                    td.textContent = row[col] === null ? 'NULL' : row[col];
                    tr.appendChild(td);
                });
                tbl.appendChild(tr);
            });
            consoleBody.appendChild(tbl);
        } else {
            const emptyDiv = document.createElement('div');
            emptyDiv.style.color = '#94a3b8';
            emptyDiv.textContent = 'No rows returned.';
            consoleBody.appendChild(emptyDiv);
        }
    }
};

// EVENT: Print Payslip Details Modal
window.showPayslip = function(payrollId) {
    const pay = DB.PAYROLL.find(p => p.PAYROLL_ID === payrollId);
    if (!pay) return;
    
    const emp = DB.EMPLOYEES.find(e => e.EMPLOYEE_ID === pay.EMPLOYEE_ID);
    const dept = DB.DEPARTMENTS.find(d => d.DEPARTMENT_ID === emp?.DEPARTMENT_ID);
    
    // Detailed calculation breakdown using the packages formula
    const calc = PAYROLL_PKG.calculate_salary_components(pay.EMPLOYEE_ID, pay.PAY_PERIOD_START, pay.PAY_PERIOD_END);
    
    const container = document.getElementById('payslip-content');
    container.innerHTML = `
        <div class="payslip-box">
            <div class="payslip-header">
                <div class="payslip-logo">APEX CORPORATE LABS</div>
                <div class="payslip-title">Salary Statement / Payslip</div>
                <div style="font-size:11px; color:#6b7280;">Oracle DB Process ID: PAY-0${pay.PAYROLL_ID}</div>
            </div>
            
            <div class="payslip-meta">
                <div class="payslip-meta-item"><span>Employee ID:</span> #${emp.EMPLOYEE_ID}</div>
                <div class="payslip-meta-item"><span>Pay Period:</span> ${pay.PAY_PERIOD_START} to ${pay.PAY_PERIOD_END}</div>
                <div class="payslip-meta-item"><span>Name:</span> ${emp.FIRST_NAME} ${emp.LAST_NAME}</div>
                <div class="payslip-meta-item"><span>Department:</span> ${dept?.DEPARTMENT_NAME || 'General'}</div>
                <div class="payslip-meta-item"><span>Designation:</span> ${emp.JOB_TITLE}</div>
                <div class="payslip-meta-item"><span>Payment Status:</span> <strong style="color: #10b981">${pay.STATUS}</strong></div>
            </div>
            
            <div class="payslip-grid">
                <div>
                    <div class="payslip-col-title">Earnings & Allowances</div>
                    <div class="payslip-row">
                        <span>Basic Monthly Salary</span>
                        <span>${formatCurrency(pay.BASIC_SALARY)}</span>
                    </div>
                    <div class="payslip-row">
                        <span>HRA & Medical Allowances</span>
                        <span>${formatCurrency(pay.ALLOWANCES)}</span>
                    </div>
                    <div class="payslip-row total">
                        <span>Gross Earnings</span>
                        <span>${formatCurrency(pay.BASIC_SALARY + pay.ALLOWANCES)}</span>
                    </div>
                </div>
                
                <div>
                    <div class="payslip-col-title">Deductions & Taxes</div>
                    <div class="payslip-row">
                        <span>Unpaid Leaves (${calc.breakdown.unpaidDays} days)</span>
                        <span>${formatCurrency(calc.breakdown.unpaidDays * calc.breakdown.dailyWage)}</span>
                    </div>
                    <div class="payslip-row">
                        <span>Absences (${calc.breakdown.absentDays} days)</span>
                        <span>${formatCurrency(calc.breakdown.absentDays * calc.breakdown.dailyWage)}</span>
                    </div>
                    <div class="payslip-row">
                        <span>Late Check-in Deductions</span>
                        <span>${formatCurrency(calc.breakdown.lateDays > 3 ? (calc.breakdown.lateDays - 3) * calc.breakdown.dailyWage * 0.2 : 0)}</span>
                    </div>
                    <div class="payslip-row">
                        <span>Half-Days (${calc.breakdown.halfDays} days)</span>
                        <span>${formatCurrency(calc.breakdown.halfDays * calc.breakdown.dailyWage * 0.5)}</span>
                    </div>
                    <div class="payslip-row">
                        <span>Federal Income Tax</span>
                        <span>${formatCurrency(pay.TAX)}</span>
                    </div>
                    <div class="payslip-row total">
                        <span>Total Deductions</span>
                        <span>${formatCurrency(pay.DEDUCTIONS + pay.TAX)}</span>
                    </div>
                </div>
            </div>
            
            <div class="payslip-summary">
                <span>Net Salary Disbursed</span>
                <span class="payslip-summary-val">${formatCurrency(pay.NET_SALARY)}</span>
            </div>
            
            <div class="payslip-footer-text">
                This payslip is auto-generated by the PL/SQL database payroll engine on ${pay.PAYMENT_DATE}.
            </div>
        </div>
    `;
    
    openModal('payslip-modal');
};

// --- MODAL UTILS ---
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('show');
};

window.closeModal = function() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(m => m.classList.remove('show'));
};


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Current Local Date Display
    const dateOpts = { year: 'numeric', month: 'short', day: '2-digit' };
    const dateStr = new Date().toLocaleDateString('en-US', dateOpts);
    document.getElementById('sys-date-str').textContent = `DB System Time: ${dateStr}`;
    
    // Tab switching setup
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            if (!tabId) return;
            
            navItems.forEach(n => n.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));
            
            item.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Studio Table collapse animation
    const tableHeaders = document.querySelectorAll('.table-item-header');
    tableHeaders.forEach(th => {
        th.addEventListener('click', () => {
            const list = th.nextElementSibling;
            if (list) list.classList.toggle('show');
        });
    });
    
    // Run Sync on load
    syncUI();
});
