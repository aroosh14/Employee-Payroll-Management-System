-- ==========================================
-- EMPLOYEE PAYROLL MANAGEMENT SYSTEM
-- Oracle PL/SQL Business Logic (Triggers & Packages)
-- ==========================================

-- 1. TRIGGER: trg_attendance_status
-- Automatically calculates attendance status based on check-in time.
-- Office hours start at 09:00 AM.
-- Check-in <= 09:15 AM -> Present
-- Check-in between 09:16 AM and 12:00 PM -> Late
-- Check-in > 12:00 PM -> Half-Day
CREATE OR REPLACE TRIGGER trg_attendance_status
BEFORE INSERT OR UPDATE ON ATTENDANCE
FOR EACH ROW
DECLARE
    v_check_in_time VARCHAR2(5);
BEGIN
    -- Check status determination if check_in is provided and status is not manually overridden
    IF :NEW.CHECK_IN IS NOT NULL AND (:NEW.STATUS IS NULL OR :NEW.STATUS NOT IN ('On Leave', 'Absent')) THEN
        v_check_in_time := TO_CHAR(:NEW.CHECK_IN, 'HH24:MI');
        
        IF v_check_in_time <= '09:15' THEN
            :NEW.STATUS := 'Present';
        ELSIF v_check_in_time <= '12:00' THEN
            :NEW.STATUS := 'Late';
        ELSE
            :NEW.STATUS := 'Half-Day';
        END IF;
    ELSIF :NEW.CHECK_IN IS NULL AND :NEW.STATUS IS NULL THEN
        -- Default to Absent if check_in is missing
        :NEW.STATUS := 'Absent';
    END IF;
END;
/


-- 2. TRIGGER: trg_validate_leave
-- Prevents overlapping leaves for an employee.
CREATE OR REPLACE TRIGGER trg_validate_leave
BEFORE INSERT OR UPDATE ON LEAVES
FOR EACH ROW
DECLARE
    v_overlap_count NUMBER;
BEGIN
    -- Only validate if the leave is being approved
    IF :NEW.STATUS = 'Approved' THEN
        SELECT COUNT(*)
        INTO v_overlap_count
        FROM LEAVES
        WHERE EMPLOYEE_ID = :NEW.EMPLOYEE_ID
          AND STATUS = 'Approved'
          AND LEAVE_ID <> NVL(:NEW.LEAVE_ID, -1) -- Exclude the current record during updates
          AND (
               (:NEW.START_DATE BETWEEN START_DATE AND END_DATE) OR
               (:NEW.END_DATE BETWEEN START_DATE AND END_DATE) OR
               (START_DATE BETWEEN :NEW.START_DATE AND :NEW.END_DATE)
              );
              
        IF v_overlap_count > 0 THEN
            RAISE_APPLICATION_ERROR(-20001, 'Error: The requested leave period overlaps with an already approved leave.');
        END IF;
    END IF;
END;
/


-- 3. PAYROLL PACKAGE SPECIFICATION
CREATE OR REPLACE PACKAGE PAYROLL_PKG AS
    -- Calculates salary components (allowances, deductions, tax, net) for a single employee
    PROCEDURE calculate_salary_components(
        p_employee_id    IN NUMBER,
        p_start_date     IN DATE,
        p_end_date       IN DATE,
        p_basic_salary   OUT NUMBER,
        p_allowances     OUT NUMBER,
        p_deductions     OUT NUMBER,
        p_tax            OUT NUMBER,
        p_net_salary     OUT NUMBER
    );

    -- Processes and logs payroll for a single employee in the PAYROLL table
    PROCEDURE process_payroll_for_employee(
        p_employee_id    IN NUMBER,
        p_start_date     IN DATE,
        p_end_date       IN DATE
    );

    -- Processes payroll for all employees in a specific department
    PROCEDURE process_monthly_payroll(
        p_department_id  IN NUMBER,
        p_start_date     IN DATE,
        p_end_date       IN DATE
    );
END PAYROLL_PKG;
/


-- 4. PAYROLL PACKAGE BODY
CREATE OR REPLACE PACKAGE BODY PAYROLL_PKG AS

    PROCEDURE calculate_salary_components(
        p_employee_id    IN NUMBER,
        p_start_date     IN DATE,
        p_end_date       IN DATE,
        p_basic_salary   OUT NUMBER,
        p_allowances     OUT NUMBER,
        p_deductions     OUT NUMBER,
        p_tax            OUT NUMBER,
        p_net_salary     OUT NUMBER
    ) IS
        v_daily_wage       NUMBER;
        v_unpaid_days      NUMBER := 0;
        v_absent_days      NUMBER := 0;
        v_half_days        NUMBER := 0;
        v_late_days        NUMBER := 0;
        v_late_deductions  NUMBER := 0;
        v_leave_days       NUMBER := 0;
    BEGIN
        -- Get base monthly salary
        SELECT SALARY INTO p_basic_salary
        FROM EMPLOYEES
        WHERE EMPLOYEE_ID = p_employee_id;

        -- Daily rate based on 22 working days standard month
        v_daily_wage := p_basic_salary / 22;

        -- A. ALLOWANCES CALCULATION
        -- 10% HRA (House Rent Allowance) + 5% Medical Allowance
        p_allowances := ROUND(p_basic_salary * 0.15, 2);

        -- B. DEDUCTIONS CALCULATION
        -- 1. Unpaid Leaves (Approved leaves with type 'Unpaid')
        SELECT NVL(SUM(END_DATE - START_DATE + 1), 0)
        INTO v_unpaid_days
        FROM LEAVES
        WHERE EMPLOYEE_ID = p_employee_id
          AND STATUS = 'Approved'
          AND LEAVE_TYPE = 'Unpaid'
          AND START_DATE >= p_start_date
          AND END_DATE <= p_end_date;

        -- 2. Absent Days from attendance logs
        SELECT COUNT(*)
        INTO v_absent_days
        FROM ATTENDANCE
        WHERE EMPLOYEE_ID = p_employee_id
          AND WORK_DATE BETWEEN p_start_date AND p_end_date
          AND STATUS = 'Absent';

        -- 3. Half-Day Attendance logs (each half-day deducts 0.5 * daily wage)
        SELECT COUNT(*)
        INTO v_half_days
        FROM ATTENDANCE
        WHERE EMPLOYEE_ID = p_employee_id
          AND WORK_DATE BETWEEN p_start_date AND p_end_date
          AND STATUS = 'Half-Day';

        -- 4. Late Attendance logs (late check-ins)
        -- Rule: Standard grace of 3 late days per month. Every late day past 3 results in a 0.2 * daily wage deduction.
        SELECT COUNT(*)
        INTO v_late_days
        FROM ATTENDANCE
        WHERE EMPLOYEE_ID = p_employee_id
          AND WORK_DATE BETWEEN p_start_date AND p_end_date
          AND STATUS = 'Late';

        IF v_late_days > 3 THEN
            v_late_deductions := (v_late_days - 3) * (v_daily_wage * 0.2);
        END IF;

        -- Total deductions calculation
        p_deductions := ROUND(
            (v_unpaid_days * v_daily_wage) +
            (v_absent_days * v_daily_wage) +
            (v_half_days * v_daily_wage * 0.5) +
            v_late_deductions,
            2
        );

        -- Ensure deductions do not exceed basic salary + allowances
        IF p_deductions > (p_basic_salary + p_allowances) THEN
            p_deductions := p_basic_salary + p_allowances;
        END IF;

        -- C. INCOME TAX CALCULATION (Based on gross taxable income: Basic + Allowances - Deductions)
        -- Slab rates (Monthly):
        -- Up to $3,000 : 0%
        -- $3,001 to $6,000 : 10% on excess of $3,000
        -- $6,001 to $10,000 : 15% on excess of $6,000
        -- Above $10,000 : 20% on excess of $10,000
        DECLARE
            v_taxable_income NUMBER := (p_basic_salary + p_allowances) - p_deductions;
        BEGIN
            IF v_taxable_income <= 3000 THEN
                p_tax := 0;
            ELSIF v_taxable_income <= 6000 THEN
                p_tax := (v_taxable_income - 3000) * 0.10;
            ELSIF v_taxable_income <= 10000 THEN
                p_tax := (3000 * 0.10) + ((v_taxable_income - 6000) * 0.15);
            ELSE
                p_tax := (3000 * 0.10) + (4000 * 0.15) + ((v_taxable_income - 10000) * 0.20);
            END IF;
            p_tax := ROUND(p_tax, 2);
        END;

        -- D. NET SALARY CALCULATION
        p_net_salary := ROUND((p_basic_salary + p_allowances) - p_deductions - p_tax, 2);
        
        -- Fallback check to avoid negative salary
        IF p_net_salary < 0 THEN
            p_net_salary := 0;
        END IF;

    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            p_basic_salary := 0;
            p_allowances := 0;
            p_deductions := 0;
            p_tax := 0;
            p_net_salary := 0;
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Error during salary calculation: ' || SQLERRM);
    END calculate_salary_components;


    PROCEDURE process_payroll_for_employee(
        p_employee_id    IN NUMBER,
        p_start_date     IN DATE,
        p_end_date       IN DATE
    ) IS
        v_basic          NUMBER;
        v_allowances     NUMBER;
        v_deductions     NUMBER;
        v_tax            NUMBER;
        v_net            NUMBER;
        v_payroll_exists NUMBER;
    BEGIN
        -- Check if payroll already exists for this period and employee
        SELECT COUNT(*) INTO v_payroll_exists
        FROM PAYROLL
        WHERE EMPLOYEE_ID = p_employee_id
          AND PAY_PERIOD_START = p_start_date
          AND PAY_PERIOD_END = p_end_date;

        IF v_payroll_exists > 0 THEN
            -- Delete the draft/existing payroll to recalculate
            DELETE FROM PAYROLL
            WHERE EMPLOYEE_ID = p_employee_id
              AND PAY_PERIOD_START = p_start_date
              AND PAY_PERIOD_END = p_end_date
              AND STATUS = 'Draft';
        END IF;

        -- Perform salary calculations
        calculate_salary_components(
            p_employee_id  => p_employee_id,
            p_start_date   => p_start_date,
            p_end_date     => p_end_date,
            p_basic_salary => v_basic,
            p_allowances   => v_allowances,
            p_deductions   => v_deductions,
            p_tax          => v_tax,
            p_net_salary   => v_net
        );

        -- Insert newly calculated payroll statement
        INSERT INTO PAYROLL (
            EMPLOYEE_ID,
            PAY_PERIOD_START,
            PAY_PERIOD_END,
            BASIC_SALARY,
            ALLOWANCES,
            DEDUCTIONS,
            TAX,
            NET_SALARY,
            PAYMENT_DATE,
            STATUS
        ) VALUES (
            p_employee_id,
            p_start_date,
            p_end_date,
            v_basic,
            v_allowances,
            v_deductions,
            v_tax,
            v_net,
            SYSDATE,
            'Draft'
        );

        COMMIT;
    END process_payroll_for_employee;


    PROCEDURE process_monthly_payroll(
        p_department_id  IN NUMBER,
        p_start_date     IN DATE,
        p_end_date       IN DATE
    ) IS
        -- Cursor to fetch all active employees in a department
        CURSOR emp_cur IS
            SELECT EMPLOYEE_ID
            FROM EMPLOYEES
            WHERE DEPARTMENT_ID = p_department_id
              AND STATUS = 'Active';
              
        v_emp_id NUMBER;
    BEGIN
        OPEN emp_cur;
        LOOP
            FETCH emp_cur INTO v_emp_id;
            EXIT WHEN emp_cur%NOTFOUND;
            
            -- Call single employee process logic
            process_payroll_for_employee(v_emp_id, p_start_date, p_end_date);
        END LOOP;
        CLOSE emp_cur;
    END process_monthly_payroll;

END PAYROLL_PKG;
/
