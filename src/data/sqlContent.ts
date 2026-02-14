import { Chapter } from "./javaContent";

export const sqlChapters: Chapter[] = [
    {
        id: 1,
        slug: "introduction",
        title: "Introduction to Databases & SQL",
        description: "What is a Database, DBMS, RDBMS, and Introduction to SQL.",
        sections: [
            {
                heading: "What is a Database?",
                content: "A database is an organized collection of structured information, or data, typically stored electronically in a computer system.",
            },
            {
                heading: "RDBMS vs DBMS",
                content:
                    "• **DBMS (Database Management System)**: Software to manage databases (e.g., File systems, XML).\n• **RDBMS (Relational DBMS)**: Stores data in tables with rows and columns. Examples: MySQL, PostgreSQL, SQL Server, Oracle.",
            },
            {
                heading: "What is SQL?",
                content: "SQL (Structured Query Language) is the standard language for dealing with Relational Databases. It can be used to insert, search, update, and delete database records.",
            },
        ],
    },
    {
        id: 2,
        slug: "basic-sql-statements",
        title: "Basic SQL Statements",
        description: "SELECT, INSERT, UPDATE, DELETE (CRUD Operations).",
        sections: [
            {
                heading: "SELECT Statement",
                content: "Used to select data from a database.",
                code: `-- Select all columns
SELECT * FROM Users;

-- Select specific columns
SELECT FirstName, LastName FROM Users;`,
                codeTitle: "select.sql",
            },
            {
                heading: "INSERT Statement",
                content: "Used to insert new records in a table.",
                code: `INSERT INTO Users (FirstName, LastName, Age)
VALUES ('John', 'Doe', 25);`,
                codeTitle: "insert.sql",
            },
            {
                heading: "UPDATE Statement",
                content: "Used to modify the existing records in a table.",
                code: `UPDATE Users
SET Age = 26
WHERE FirstName = 'John';`,
                codeTitle: "update.sql",
            },
            {
                heading: "DELETE Statement",
                content: "Used to delete existing records in a table.",
                code: `DELETE FROM Users
WHERE FirstName = 'John';`,
                codeTitle: "delete.sql",
                note: "Always use WHERE clause with UPDATE and DELETE, otherwise all records will be affected!",
            },
        ],
    },
    {
        id: 3,
        slug: "filtering-data",
        title: "Filtering Data",
        description: "WHERE clause and operators (AND, OR, NOT, IN, BETWEEN, LIKE).",
        sections: [
            {
                heading: "WHERE Clause",
                content: "Used to filter records.",
                code: `SELECT * FROM Products
WHERE Price > 50;`,
                codeTitle: "where.sql",
            },
            {
                heading: "AND, OR, NOT Operators",
                content: "Combine multiple conditions.",
                code: `SELECT * FROM Products
WHERE Price > 50 AND Category = 'Electronics';

SELECT * FROM Products
WHERE City = 'Berlin' OR City = 'London';`,
                codeTitle: "logic_operators.sql",
            },
            {
                heading: "IN, BETWEEN, LIKE",
                content: "• **IN**: Multiple specific values.\n• **BETWEEN**: Range of values.\n• **LIKE**: Pattern matching using wildcards (`%`, `_`).",
                code: `SELECT * FROM Users WHERE Country IN ('USA', 'UK', 'India');

SELECT * FROM Products WHERE Price BETWEEN 10 AND 20;

SELECT * FROM Users WHERE Name LIKE 'J%'; -- Starts with J`,
                codeTitle: "advanced_filter.sql",
            },
        ],
    },
    {
        id: 4,
        slug: "sorting-limiting",
        title: "Sorting and Limiting",
        description: "ORDER BY, LIMIT, and OFFSET.",
        sections: [
            {
                heading: "ORDER BY",
                content: "Sorts the result set in ascending (ASC) or descending (DESC) order.",
                code: `SELECT * FROM Users
ORDER BY Age DESC;`,
                codeTitle: "orderby.sql",
            },
            {
                heading: "LIMIT and OFFSET",
                content: "Used for pagination. `LIMIT` restricts the number of rows, `OFFSET` skips rows.",
                code: `SELECT * FROM Products
ORDER BY Price
LIMIT 5 OFFSET 10; -- Skip 10, take next 5`,
                codeTitle: "limit_offset.sql",
            },
        ],
    },
    {
        id: 5,
        slug: "joins",
        title: "SQL Joins",
        description: "INNER, LEFT, RIGHT, FULL OUTER, and CROSS joins.",
        sections: [
            {
                heading: "INNER JOIN",
                content: "Returns records that have matching values in both tables.",
                code: `SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;`,
                codeTitle: "inner_join.sql",
            },
            {
                heading: "LEFT JOIN",
                content: "Returns all records from the left table, and the matched records from the right table.",
                code: `SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID;`,
                codeTitle: "left_join.sql",
            },
        ],
    },
    {
        id: 6,
        slug: "groups-aggregates",
        title: "Grouping and Aggregates",
        description: "GROUP BY, HAVING, COUNT, SUM, AVG, MIN, MAX.",
        sections: [
            {
                heading: "Aggregate Functions",
                content: "Perform a calculation on a set of values and return a single value.",
                code: `SELECT COUNT(*) FROM Users;
SELECT AVG(Price) FROM Products;
SELECT MAX(Age) FROM Users;`,
                codeTitle: "aggregates.sql",
            },
            {
                heading: "GROUP BY and HAVING",
                content: "`GROUP BY` groups rows that have the same values into summary rows. `HAVING` filters groups.",
                code: `SELECT Country, COUNT(CustomerID)
FROM Customers
GROUP BY Country
HAVING COUNT(CustomerID) > 5;`,
                codeTitle: "groupby.sql",
            },
        ],
    },
    {
        id: 7,
        slug: "subqueries",
        title: "Subqueries",
        description: "Nested queries inside SELECT, INSERT, UPDATE, or DELETE.",
        sections: [
            {
                heading: "Subquery in WHERE Clause",
                content: "A query within a query.",
                code: `SELECT * FROM Products
WHERE Price > (SELECT AVG(Price) FROM Products);`,
                codeTitle: "subquery.sql",
            },
            {
                heading: "EXISTS Operator",
                content: "Tests for existence of any record in a subquery.",
                code: `SELECT SupplierName
FROM Suppliers
WHERE EXISTS (SELECT ProductName FROM Products WHERE Products.SupplierID = Suppliers.supplierID AND Price < 20);`,
                codeTitle: "exists.sql",
            },
        ],
    },
    {
        id: 8,
        slug: "table-management",
        title: "Table Management (DDL)",
        description: "CREATE, ALTER, DROP, and TRUNCATE tables.",
        sections: [
            {
                heading: "CREATE TABLE",
                content: "Creates a new table in the database.",
                code: `CREATE TABLE Users (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);`,
                codeTitle: "create_table.sql",
            },
            {
                heading: "ALTER TABLE",
                content: "Adds, deletes, or modifies columns in an existing table.",
                code: `ALTER TABLE Users
ADD DateOfBirth date;

ALTER TABLE Users
DROP COLUMN Address;`,
                codeTitle: "alter_table.sql",
            },
            {
                heading: "DROP vs TRUNCATE",
                content: "• **DROP**: Deletes the table and its structure.\n• **TRUNCATE**: Deletes all data but keeps the structure.",
                code: `DROP TABLE Users;
TRUNCATE TABLE Users;`,
                codeTitle: "drop_truncate.sql",
            },
        ],
    },
];
