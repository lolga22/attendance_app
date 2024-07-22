-- Создание базы данных
CREATE DATABASE AttendanceDB;
GO

-- Использование базы данных
USE AttendanceDB;
GO

-- Создание таблицы employees
CREATE TABLE employees (
    id INT IDENTITY(1,1) PRIMARY KEY,
    last_name NVARCHAR(128) NOT NULL,
    first_name NVARCHAR(128) NOT NULL
);
GO

-- Вставка тестовых данных в таблицу employees
INSERT INTO employees (last_name, first_name) VALUES 
('Иванов', 'Иван'),
('Петров', 'Петр'),
('Сидоров', 'Сидор'),
('Смирнов', 'Сергей'),
('Кузнецов', 'Алексей');
GO

-- Создание таблицы timesheet
CREATE TABLE timesheet (
    id INT IDENTITY(1,1) PRIMARY KEY,
    employee INT NOT NULL,
    reason INT NOT NULL,
    start_date DATE NOT NULL,
    duration INT NOT NULL,
    discounted BIT NOT NULL,
    description NVARCHAR(1024),
    FOREIGN KEY (employee) REFERENCES employees(id)
);
GO

-- Добавление тестовых данных в таблицу timesheet
INSERT INTO timesheet (employee, reason, start_date, duration, discounted, description) VALUES
(1, 1, '2023-07-01', 5, 1, 'Едет в отпуск'),
(2, 2, '2023-07-15', 3, 0, 'На больничном'),
(3, 3, '2023-07-20', 1, 0, 'Прогул без уважительной причины'),
(4, 1, '2023-08-01', 10, 1, 'Едет в отпуск с семьей'),
(5, 2, '2023-08-10', 4, 0, 'Серьезное заболевание');
GO

-- Тестирование данных
SELECT * FROM employees;
SELECT * FROM timesheet;
GO
