import { Chapter } from "./javaContent";

export const sqlChaptersPart2: Chapter[] = [
    {
        id: 9,
        slug: "constraints",
        title: "SQL Constraints",
        description: "PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT.",
        sections: [
            {
                heading: "PRIMARY KEY and FOREIGN KEY",
                content: "• **PRIMARY KEY**: Uniquely identifies each record.\n• **FOREIGN KEY**: Links to a Primary Key in another table.",
                code: `CREATE TABLE Orders (
    OrderID int NOT NULL PRIMARY KEY,
    OrderNumber int NOT NULL,
    PersonID int,
    FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
);`,
                codeTitle: "keys.sql",
            },
            {
                heading: "Other Constraints",
                content: "• **NOT NULL**: Cannot be empty.\n• **UNIQUE**: All values must be different.\n• **CHECK**: Ensures values meet a condition.\n• **DEFAULT**: Sets a default value.",
                code: `CREATE TABLE Persons (
    ID int NOT NULL UNIQUE,
    Age int CHECK (Age >= 18),
    City varchar(255) DEFAULT 'New York'
);`,
                codeTitle: "constraints.sql",
            },
        ],
    },
    {
        id: 10,
        slug: "advanced-sql",
        title: "Advanced SQL",
        description: "UNION, INTERSECT, EXCEPT, CASE, and Views.",
        sections: [
            {
                heading: "UNION Operator",
                content: "Combines the result-set of two or more SELECT statements (removes duplicates). `UNION ALL` allows duplicates.",
                code: `SELECT City FROM Customers
UNION
SELECT City FROM Suppliers;`,
                codeTitle: "union.sql",
            },
            {
                heading: "CASE Expression",
                content: "Goes through conditions and returns a value when the first condition is met (like if-then-else).",
                code: `SELECT OrderID, Quantity,
CASE
    WHEN Quantity > 30 THEN 'The quantity is greater than 30'
    WHEN Quantity = 30 THEN 'The quantity is 30'
    ELSE 'The quantity is under 30'
END AS QuantityText
FROM OrderDetails;`,
                codeTitle: "case.sql",
            },
            {
                heading: "SQL Views",
                content: "A virtual table based on the result-set of an SQL statement.",
                code: `CREATE VIEW [Brazil Customers] AS
SELECT CustomerName, ContactName
FROM Customers
WHERE Country = 'Brazil';

-- Querying the view
SELECT * FROM [Brazil Customers];`,
                codeTitle: "views.sql",
            },
        ],
    },
    {
        id: 11,
        slug: "indexes-performance",
        title: "Indexes & Performance",
        description: "Creating indexes to speed up queries.",
        sections: [
            {
                heading: "CREATE INDEX",
                content: "Indexes are used to retrieve data from the database more quickly than otherwise. The users cannot see the indexes, they are just used to speed up searches/queries.",
                code: `CREATE INDEX idx_lastname
ON Users (LastName);

CREATE UNIQUE INDEX idx_email
ON Users (Email);`,
                codeTitle: "index.sql",
                note: "Updating a table with indexes takes more time than updating a table without (because the indexes also need an update). So, only create indexes on columns that will be frequently searched against.",
            },
        ],
    },
    {
        id: 12,
        slug: "transactions",
        title: "Transactions (ACID)",
        description: "COMMIT, ROLLBACK, SAVEPOINT, and ACID properties.",
        sections: [
            {
                heading: "ACID Properties",
                content:
                    "• **Atomicity**: All or nothing.\n• **Consistency**: Database remains in a valid state.\n• **Isolation**: Transactions happen independently.\n• **Durability**: Committed changes are permanent.",
            },
            {
                heading: "Transaction Commands",
                content: "Manage transaction processing.",
                code: `BEGIN TRANSACTION;

UPDATE Account SET Balance = Balance - 100 WHERE ID = 1;
UPDATE Account SET Balance = Balance + 100 WHERE ID = 2;

-- If everything is fine
COMMIT;

-- If error occurs
ROLLBACK;`,
                codeTitle: "transaction.sql",
            },
        ],
    },
    {
        id: 13,
        slug: "stored-procedures",
        title: "Stored Procedures",
        description: "Prepared SQL code that you can save and reuse.",
        sections: [
            {
                heading: "Creating Procedures",
                content: "A stored procedure is a prepared SQL code that you can save, so the code can be reused over and over again.",
                code: `CREATE PROCEDURE SelectAllCustomers
AS
SELECT * FROM Customers
GO;

-- Execute
EXEC SelectAllCustomers;`,
                codeTitle: "procedure.sql",
                note: "Syntax varies between databases (MySQL uses DELIMITER, T-SQL uses AS/GO).",
            },
            {
                heading: "Parameters",
                content: "Passing parameters to procedures.",
                code: `CREATE PROCEDURE SelectCustomersByCity @City nvarchar(30)
AS
SELECT * FROM Customers WHERE City = @City
GO;

EXEC SelectCustomersByCity @City = 'London';`,
                codeTitle: "params.sql",
            },
        ],
    },
    {
        id: 14,
        slug: "triggers",
        title: "SQL Triggers",
        description: "Code that automatically executes in response to certain events.",
        sections: [
            {
                heading: "Creating a Trigger",
                content: "A trigger is a stored procedure in database which automatically invokes whenever a special event (INSERT, UPDATE, DELETE) occurs in the database.",
                code: `CREATE TRIGGER AfterInsertUser
AFTER INSERT ON Users
FOR EACH ROW
BEGIN
   INSERT INTO Logs (Action, Date) VALUES ('User Inserted', NOW());
END;`,
                codeTitle: "trigger.sql",
            },
        ],
    },
    {
        id: 15,
        slug: "normalization",
        title: "Database Normalization",
        description: "Organization of data to reduce redundancy (1NF, 2NF, 3NF).",
        sections: [
            {
                heading: "Normalization Forms",
                content:
                    "• **1NF (First Normal Form)**: Atomic (indivisible) values, unique rows.\n• **2NF (Second Normal Form)**: 1NF + no partial dependency (all non-key attributes depend on the *entire* primary key).\n• **3NF (Third Normal Form)**: 2NF + no transitive dependency (non-key attributes depend *only* on the primary key, not on other non-key attributes).\n• **BCNF (Boyce-Codd Normal Form)**: A stricter version of 3NF.",
            },
        ],
    },
    {
        id: 16,
        slug: "nosql-intro",
        title: "Introduction to NoSQL",
        description: "SQL vs NoSQL, Document Stores (MongoDB), and Key-Value pairs.",
        sections: [
            {
                heading: "SQL vs NoSQL",
                content:
                    "• **SQL**: Relational, table-based, vertical scaling (CPU/RAM), predefined schema.\n• **NoSQL**: Non-relational, document/key-value/graph-based, horizontal scaling (sharding), dynamic schema.",
            },
            {
                heading: "MongoDB (Document Store)",
                content: "Stores data in JSON-like documents.",
                code: `// Insert document
db.users.insertOne({
  name: "John Doe",
  age: 25,
  skills: ["SQL", "NoSQL"]
});

// Find document
db.users.find({ name: "John Doe" });`,
                codeTitle: "mongodb.js",
            },
        ],
    },
];
