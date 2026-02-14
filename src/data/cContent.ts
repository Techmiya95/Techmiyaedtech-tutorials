import { Chapter } from "./javaContent";

export const cChapters: Chapter[] = [
    {
        id: 1,
        slug: "introduction",
        title: "Introduction to Programming & C Language",
        description: "What is programming, history of C, features, applications, structure, and compilation process.",
        sections: [
            {
                heading: "What is Programming?",
                content:
                    "Programming is the process of creating a set of instructions that tell a computer how to perform a task. It involves writing code in a programming language that is then translated into machine-readable instructions. Programming is used to build software applications, websites, games, operating systems, and more.",
            },
            {
                heading: "History and Importance of C",
                content:
                    "C was developed by **Dennis Ritchie** in 1972 at Bell Laboratories (AT&T). It was originally designed for writing the UNIX operating system.\n\n• C evolved from the B language (created by Ken Thompson).\n• The first book on C — 'The C Programming Language' by Kernighan & Ritchie — was published in 1978.\n• In 1989, ANSI standardized C (ANSI C or C89). Later updates include C99, C11, and C17.\n• C is the foundation for many modern languages including C++, Java, C#, and Python's CPython interpreter.",
            },
            {
                heading: "Features of C",
                content:
                    "• **Simple & Efficient** — Easy syntax with powerful low-level capabilities.\n• **Portable** — Programs written in C can run on different machines with little modification.\n• **Fast Execution** — Compiled directly to machine code for high performance.\n• **Rich Library** — Extensive standard library with built-in functions.\n• **Structured Language** — Supports functions and modular programming.\n• **Low-Level Access** — Direct memory manipulation via pointers.\n• **Extensible** — New features can be added via libraries.",
            },
            {
                heading: "Applications of C in Industry",
                content:
                    "• **Operating Systems** — Linux, Windows kernel, macOS components.\n• **Embedded Systems** — Microcontrollers, IoT devices, automotive software.\n• **Compilers & Interpreters** — GCC, Python interpreter (CPython).\n• **Databases** — MySQL, PostgreSQL, SQLite.\n• **Gaming** — Game engines, graphics programming.\n• **Networking** — TCP/IP stack implementations, network drivers.\n• **Device Drivers** — Hardware interface programming.",
            },
            {
                heading: "Structure of a C Program",
                content: "Every C program follows a standard structure with preprocessor directives, the main function, and statements.",
                code: `/* Documentation Section - Comments about the program */

#include <stdio.h>    /* Preprocessor Directive */

/* Global Declaration Section */
int globalVar = 10;

/* Main Function */
int main() {
    /* Local Declaration */
    int num = 5;

    /* Executable Statements */
    printf("Hello, C Programming!\\n");
    printf("Number: %d\\n", num);

    return 0;  /* Return statement */
}`,
                codeTitle: "structure.c",
                output: "Hello, C Programming!\nNumber: 5",
            },
            {
                heading: "Compilation Process",
                content:
                    "C code goes through 4 stages before execution:\n\n• **Preprocessor** — Handles directives like `#include` and `#define`. Expands macros and includes header files. Output: `.i` file.\n• **Compiler** — Translates preprocessed C code into assembly language. Output: `.s` file.\n• **Assembler** — Converts assembly code into machine code (object file). Output: `.o` file.\n• **Linker** — Links object files with library functions to create the final executable.\n• **Loader** — Loads the executable into memory for execution.",
                code: `# Step-by-step compilation
gcc -E program.c -o program.i    # Preprocessing
gcc -S program.i -o program.s    # Compilation (assembly)
gcc -c program.s -o program.o    # Assembly (object code)
gcc program.o -o program         # Linking (executable)

# Or simply:
gcc program.c -o program         # All steps at once
./program                        # Execute`,
                codeTitle: "compile_steps.sh",
            },
            {
                heading: "Keywords, Identifiers, Constants & Variables",
                content:
                    "• **Keywords** — Reserved words with predefined meaning: `int`, `float`, `char`, `return`, `if`, `else`, `for`, `while`, `do`, `switch`, `case`, `break`, `continue`, `void`, `struct`, `union`, `typedef`, `sizeof`, `static`, `extern`, `const`, `volatile`, `enum`, `goto`, `default`, `register`, `auto`, `signed`, `unsigned`, `short`, `long`, `double`.\n\n• **Identifiers** — Names given to variables, functions, arrays, etc. Must start with a letter or underscore, can contain letters, digits, and underscores.\n\n• **Constants** — Fixed values that don't change during execution.\n\n• **Variables** — Named memory locations to store data.",
                code: `#include <stdio.h>

int main() {
    // Variables
    int age = 25;
    float salary = 50000.50;
    char grade = 'A';

    // Constants
    const float PI = 3.14159;
    #define MAX_SIZE 100

    printf("Age: %d\\n", age);
    printf("Salary: %.2f\\n", salary);
    printf("Grade: %c\\n", grade);
    printf("PI: %.5f\\n", PI);

    return 0;
}`,
                codeTitle: "variables.c",
                output: "Age: 25\nSalary: 50000.50\nGrade: A\nPI: 3.14159",
            },
        ],
    },
    {
        id: 2,
        slug: "data-types-operators",
        title: "Data Types, Operators & Expressions",
        description: "Basic & derived data types, type modifiers, casting, all operators, and expressions.",
        sections: [
            {
                heading: "Basic Data Types",
                content:
                    "C has four fundamental data types:\n\n• **int** — Integer values (4 bytes typically). Example: `int x = 10;`\n• **float** — Single precision floating point (4 bytes). Example: `float f = 3.14f;`\n• **double** — Double precision floating point (8 bytes). Example: `double d = 3.14159;`\n• **char** — Single character (1 byte). Example: `char c = 'A';`",
                code: `#include <stdio.h>

int main() {
    int age = 25;
    float height = 5.9f;
    double pi = 3.141592653589793;
    char initial = 'J';

    printf("Size of int: %lu bytes\\n", sizeof(int));
    printf("Size of float: %lu bytes\\n", sizeof(float));
    printf("Size of double: %lu bytes\\n", sizeof(double));
    printf("Size of char: %lu bytes\\n", sizeof(char));

    return 0;
}`,
                codeTitle: "data_types.c",
                output: "Size of int: 4 bytes\nSize of float: 4 bytes\nSize of double: 8 bytes\nSize of char: 1 byte",
            },
            {
                heading: "Type Modifiers",
                content:
                    "Modifiers alter the size and sign of basic types:\n\n• **short** — Reduces storage (2 bytes for int).\n• **long** — Increases storage (8 bytes for int/double).\n• **signed** — Can hold positive and negative values (default).\n• **unsigned** — Only positive values (doubles the positive range).",
                code: `#include <stdio.h>
#include <limits.h>

int main() {
    printf("short int: %d to %d\\n", SHRT_MIN, SHRT_MAX);
    printf("int: %d to %d\\n", INT_MIN, INT_MAX);
    printf("long int: %ld to %ld\\n", LONG_MIN, LONG_MAX);
    printf("unsigned int: 0 to %u\\n", UINT_MAX);
    return 0;
}`,
                codeTitle: "modifiers.c",
            },
            {
                heading: "Type Casting",
                content: "Type casting converts one data type to another.",
                code: `#include <stdio.h>

int main() {
    // Implicit casting (automatic)
    int a = 10;
    float b = a;         // int → float automatically
    printf("Implicit: %f\\n", b);

    // Explicit casting (manual)
    float x = 9.7f;
    int y = (int)x;      // float → int (truncates decimal)
    printf("Explicit: %d\\n", y);

    // Division example
    int p = 7, q = 2;
    printf("Without cast: %d\\n", p / q);          // 3
    printf("With cast: %.2f\\n", (float)p / q);     // 3.50

    return 0;
}`,
                codeTitle: "type_casting.c",
                output: "Implicit: 10.000000\nExplicit: 9\nWithout cast: 3\nWith cast: 3.50",
            },
            {
                heading: "Operators",
                content: "C provides a rich set of operators for performing various operations.",
                code: `#include <stdio.h>

int main() {
    int a = 15, b = 4;

    // Arithmetic Operators
    printf("a + b = %d\\n", a + b);    // 19
    printf("a - b = %d\\n", a - b);    // 11
    printf("a * b = %d\\n", a * b);    // 60
    printf("a / b = %d\\n", a / b);    // 3
    printf("a %% b = %d\\n", a % b);   // 3

    // Relational Operators
    printf("a > b: %d\\n", a > b);     // 1 (true)
    printf("a == b: %d\\n", a == b);   // 0 (false)

    // Logical Operators
    int x = 1, y = 0;
    printf("x && y: %d\\n", x && y);   // 0 (AND)
    printf("x || y: %d\\n", x || y);   // 1 (OR)
    printf("!x: %d\\n", !x);           // 0 (NOT)

    // Increment / Decrement
    int c = 10;
    printf("c++: %d\\n", c++);  // 10 (post-increment)
    printf("c now: %d\\n", c);  // 11
    printf("++c: %d\\n", ++c);  // 12 (pre-increment)

    // Ternary Operator
    int max = (a > b) ? a : b;
    printf("Max: %d\\n", max);

    return 0;
}`,
                codeTitle: "operators.c",
                output: "a + b = 19\na - b = 11\na * b = 60\na / b = 3\na % b = 3\na > b: 1\n...",
            },
            {
                heading: "Bitwise Operators",
                content: "Bitwise operators work on individual bits of integer values.",
                code: `#include <stdio.h>

int main() {
    int a = 12;   // Binary: 1100
    int b = 10;   // Binary: 1010

    printf("a & b  = %d\\n", a & b);   // AND: 1000 = 8
    printf("a | b  = %d\\n", a | b);   // OR:  1110 = 14
    printf("a ^ b  = %d\\n", a ^ b);   // XOR: 0110 = 6
    printf("~a     = %d\\n", ~a);      // NOT: ...0011 = -13
    printf("a << 1 = %d\\n", a << 1);  // Left shift: 11000 = 24
    printf("a >> 1 = %d\\n", a >> 1);  // Right shift: 0110 = 6

    return 0;
}`,
                codeTitle: "bitwise.c",
                output: "a & b  = 8\na | b  = 14\na ^ b  = 6\n~a     = -13\na << 1 = 24\na >> 1 = 6",
            },
            {
                heading: "Operator Precedence & Associativity",
                content:
                    "Operators are evaluated in a specific order:\n\n• **Highest:** `()` `[]` `->` `.` (Left to Right)\n• **Unary:** `!` `~` `++` `--` `+` `-` `*` `&` `sizeof` `(type)` (Right to Left)\n• **Multiplicative:** `*` `/` `%` (Left to Right)\n• **Additive:** `+` `-` (Left to Right)\n• **Shift:** `<<` `>>` (Left to Right)\n• **Relational:** `<` `<=` `>` `>=` (Left to Right)\n• **Equality:** `==` `!=` (Left to Right)\n• **Bitwise AND:** `&` → **XOR:** `^` → **OR:** `|`\n• **Logical AND:** `&&` → **OR:** `||`\n• **Ternary:** `?:` (Right to Left)\n• **Assignment:** `=` `+=` `-=` etc. (Right to Left)\n• **Comma:** `,` (Left to Right)",
                note: "When in doubt about precedence, use parentheses to make your code clearer!"
            },
        ],
    },
    {
        id: 3,
        slug: "input-output",
        title: "Input / Output Operations",
        description: "printf(), scanf(), format specifiers, escape sequences, and character I/O.",
        sections: [
            {
                heading: "printf() — Formatted Output",
                content: "`printf()` displays formatted output to the console. It uses format specifiers to define the type of data being printed.",
                code: `#include <stdio.h>

int main() {
    int age = 25;
    float gpa = 3.85f;
    char grade = 'A';
    char name[] = "Techmiya";

    printf("Name: %s\\n", name);
    printf("Age: %d\\n", age);
    printf("GPA: %.2f\\n", gpa);
    printf("Grade: %c\\n", grade);

    // Width and alignment
    printf("Right aligned: %10d\\n", age);
    printf("Left aligned:  %-10d|\\n", age);
    printf("Zero padded:   %05d\\n", age);

    return 0;
}`,
                codeTitle: "printf.c",
                output: "Name: Techmiya\nAge: 25\nGPA: 3.85\nGrade: A\nRight aligned:         25\nLeft aligned:  25        |\nZero padded:   00025",
            },
            {
                heading: "scanf() — Formatted Input",
                content: "`scanf()` reads formatted input from the user. Always use the `&` (address-of) operator for variables (except strings).",
                code: `#include <stdio.h>

int main() {
    int age;
    float height;
    char name[50];

    printf("Enter your name: ");
    scanf("%s", name);        // No & for strings

    printf("Enter your age: ");
    scanf("%d", &age);        // & required for int

    printf("Enter your height: ");
    scanf("%f", &height);     // & required for float

    printf("\\nHello %s! Age: %d, Height: %.1f\\n", name, age, height);

    return 0;
}`,
                codeTitle: "scanf.c",
                note: "`scanf(\"%s\", name)` reads only until a space. Use `fgets(name, sizeof(name), stdin)` to read full lines with spaces."
            },
            {
                heading: "Format Specifiers",
                content:
                    "Common format specifiers used with `printf()` and `scanf()`:\n\n• `%d` or `%i` — Integer (signed decimal)\n• `%u` — Unsigned integer\n• `%f` — Float / Double\n• `%e` — Scientific notation\n• `%c` — Single character\n• `%s` — String\n• `%p` — Pointer address\n• `%x` / `%X` — Hexadecimal\n• `%o` — Octal\n• `%ld` — Long int\n• `%lf` — Long double\n• `%%` — Prints a literal `%` sign",
            },
            {
                heading: "Escape Sequences",
                content:
                    "Special characters that begin with a backslash `\\`:\n\n• `\\n` — Newline\n• `\\t` — Tab\n• `\\\\` — Backslash\n• `\\'` — Single quote\n• `\\\"` — Double quote\n• `\\0` — Null character\n• `\\a` — Alert (beep)\n• `\\b` — Backspace\n• `\\r` — Carriage return",
                code: `#include <stdio.h>

int main() {
    printf("Line 1\\nLine 2\\n");
    printf("Col1\\tCol2\\tCol3\\n");
    printf("She said \\"Hello\\"\\n");
    printf("Path: C:\\\\Users\\\\file\\n");
    return 0;
}`,
                codeTitle: "escape.c",
                output: "Line 1\nLine 2\nCol1\tCol2\tCol3\nShe said \"Hello\"\nPath: C:\\Users\\file",
            },
            {
                heading: "Character I/O",
                content: "`getchar()` reads a single character and `putchar()` writes a single character.",
                code: `#include <stdio.h>

int main() {
    char ch;

    printf("Enter a character: ");
    ch = getchar();

    printf("You entered: ");
    putchar(ch);
    putchar('\\n');

    // Convert lowercase to uppercase
    if (ch >= 'a' && ch <= 'z') {
        printf("Uppercase: ");
        putchar(ch - 32);
        putchar('\\n');
    }

    return 0;
}`,
                codeTitle: "char_io.c",
                output: "Enter a character: h\nYou entered: h\nUppercase: H",
            },
        ],
    },
    {
        id: 4,
        slug: "control-statements",
        title: "Control Statements",
        description: "Decision making (if, switch), looping (for, while, do-while), and jump statements.",
        sections: [
            {
                heading: "if, if-else, nested if",
                content: "Decision-making statements control the flow of execution based on conditions.",
                code: `#include <stdio.h>

int main() {
    int marks = 78;

    // Simple if
    if (marks >= 40)
        printf("Passed!\\n");

    // if-else
    if (marks >= 90)
        printf("Grade: A+\\n");
    else if (marks >= 80)
        printf("Grade: A\\n");
    else if (marks >= 70)
        printf("Grade: B\\n");
    else if (marks >= 60)
        printf("Grade: C\\n");
    else
        printf("Grade: F\\n");

    // Nested if
    if (marks >= 40) {
        if (marks >= 80)
            printf("Distinction\\n");
        else
            printf("Regular pass\\n");
    }

    return 0;
}`,
                codeTitle: "if_else.c",
                output: "Passed!\nGrade: B\nRegular pass",
            },
            {
                heading: "switch-case",
                content: "The `switch` statement tests a variable against a list of values (cases).",
                code: `#include <stdio.h>

int main() {
    int day = 3;

    switch (day) {
        case 1: printf("Monday\\n"); break;
        case 2: printf("Tuesday\\n"); break;
        case 3: printf("Wednesday\\n"); break;
        case 4: printf("Thursday\\n"); break;
        case 5: printf("Friday\\n"); break;
        case 6:
        case 7: printf("Weekend!\\n"); break;
        default: printf("Invalid day\\n");
    }

    // Calculator example
    float a = 10, b = 3;
    char op = '/';
    switch (op) {
        case '+': printf("%.2f\\n", a + b); break;
        case '-': printf("%.2f\\n", a - b); break;
        case '*': printf("%.2f\\n", a * b); break;
        case '/':
            if (b != 0) printf("%.2f\\n", a / b);
            else printf("Division by zero!\\n");
            break;
        default: printf("Invalid operator\\n");
    }

    return 0;
}`,
                codeTitle: "switch.c",
                output: "Wednesday\n3.33",
            },
            {
                heading: "for, while, do-while Loops",
                content: "Loops repeat a block of code while a condition is true.",
                code: `#include <stdio.h>

int main() {
    // for loop — when count is known
    printf("for loop: ");
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");

    // while loop — when condition-based
    printf("while loop: ");
    int n = 5;
    while (n > 0) {
        printf("%d ", n);
        n--;
    }
    printf("\\n");

    // do-while — executes at least once
    int num;
    do {
        num = 5;  // Simulating input
        printf("do-while executed with: %d\\n", num);
    } while (num < 0);  // Would loop if negative

    // Nested loop — multiplication table
    printf("\\n3x Table:\\n");
    for (int i = 1; i <= 5; i++) {
        printf("3 x %d = %d\\n", i, 3 * i);
    }

    return 0;
}`,
                codeTitle: "loops.c",
                output: "for loop: 1 2 3 4 5\nwhile loop: 5 4 3 2 1\ndo-while executed with: 5\n\n3x Table:\n3 x 1 = 3\n3 x 2 = 6\n...",
            },
            {
                heading: "Jump Statements",
                content: "Jump statements alter the flow of control unconditionally.",
                code: `#include <stdio.h>

int main() {
    // break — exit loop immediately
    printf("break: ");
    for (int i = 1; i <= 10; i++) {
        if (i == 6) break;
        printf("%d ", i);
    }
    printf("\\n");

    // continue — skip current iteration
    printf("continue: ");
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) continue;  // Skip even numbers
        printf("%d ", i);
    }
    printf("\\n");

    // goto — jump to a label (use sparingly!)
    int count = 0;
    loop:
        count++;
        printf("goto count: %d\\n", count);
        if (count < 3) goto loop;

    return 0;
}`,
                codeTitle: "jump.c",
                output: "break: 1 2 3 4 5\ncontinue: 1 3 5 7 9\ngoto count: 1\ngoto count: 2\ngoto count: 3",
                note: "Avoid `goto` in modern C programming — it makes code hard to read and maintain. Use loops and functions instead."
            },
        ],
    },
    {
        id: 5,
        slug: "functions",
        title: "Functions",
        description: "Declaration, definition, call by value/reference, recursion, scope, and header files.",
        sections: [
            {
                heading: "Function Declaration, Definition & Call",
                content: "Functions break a program into reusable, modular blocks. A function has a declaration (prototype), definition (body), and is invoked via a call.",
                code: `#include <stdio.h>

// Function declaration (prototype)
int add(int a, int b);
void greet(char name[]);

int main() {
    greet("Techmiya");

    int result = add(15, 25);
    printf("Sum: %d\\n", result);

    return 0;
}

// Function definitions
int add(int a, int b) {
    return a + b;
}

void greet(char name[]) {
    printf("Hello, %s! Welcome to C.\\n", name);
}`,
                codeTitle: "functions.c",
                output: "Hello, Techmiya! Welcome to C.\nSum: 40",
            },
            {
                heading: "Call by Value vs Call by Reference",
                content: "**Call by Value** passes a copy — changes inside the function don't affect the original.\n**Call by Reference** passes the address — changes inside the function modify the original variable.",
                code: `#include <stdio.h>

// Call by Value
void swapByValue(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    printf("Inside swapByValue: a=%d, b=%d\\n", a, b);
}

// Call by Reference
void swapByRef(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;

    swapByValue(x, y);
    printf("After swapByValue: x=%d, y=%d\\n\\n", x, y); // Unchanged

    swapByRef(&x, &y);
    printf("After swapByRef: x=%d, y=%d\\n", x, y);     // Swapped!

    return 0;
}`,
                codeTitle: "call_by.c",
                output: "Inside swapByValue: a=20, b=10\nAfter swapByValue: x=10, y=20\n\nAfter swapByRef: x=20, y=10",
            },
            {
                heading: "Recursive Functions",
                content: "A function that calls itself. Every recursive function must have a **base case** to stop recursion.",
                code: `#include <stdio.h>

// Factorial using recursion
long long factorial(int n) {
    if (n <= 1) return 1;          // Base case
    return n * factorial(n - 1);   // Recursive case
}

// Fibonacci using recursion
int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    printf("5! = %lld\\n", factorial(5));

    printf("Fibonacci series: ");
    for (int i = 0; i < 10; i++)
        printf("%d ", fibonacci(i));
    printf("\\n");

    return 0;
}`,
                codeTitle: "recursion.c",
                output: "5! = 120\nFibonacci series: 0 1 1 2 3 5 8 13 21 34",
            },
            {
                heading: "Scope and Lifetime of Variables",
                content:
                    "• **Local variables** — Declared inside a function, accessible only within that function.\n• **Global variables** — Declared outside all functions, accessible everywhere.\n• **Static variables** — Retain their value between function calls.\n• **Register variables** — Stored in CPU registers for fast access (hint to compiler).\n• **Extern variables** — Declared in another file, linked during compilation.",
                code: `#include <stdio.h>

int globalVar = 100;  // Global variable

void counter() {
    static int count = 0;  // Retains value between calls
    count++;
    printf("Call #%d\\n", count);
}

int main() {
    int localVar = 50;  // Local variable

    printf("Global: %d, Local: %d\\n", globalVar, localVar);

    counter();  // Call #1
    counter();  // Call #2
    counter();  // Call #3

    return 0;
}`,
                codeTitle: "scope.c",
                output: "Global: 100, Local: 50\nCall #1\nCall #2\nCall #3",
            },
        ],
    },
    {
        id: 6,
        slug: "arrays",
        title: "Arrays",
        description: "1D, 2D, multi-dimensional arrays, passing to functions, searching & sorting.",
        sections: [
            {
                heading: "One-Dimensional Arrays",
                content: "An array is a collection of elements of the same data type stored in contiguous memory locations.",
                code: `#include <stdio.h>

int main() {
    // Declaration and initialization
    int numbers[5] = {10, 20, 30, 40, 50};

    // Array size
    int size = sizeof(numbers) / sizeof(numbers[0]);

    // Accessing and printing elements
    for (int i = 0; i < size; i++) {
        printf("numbers[%d] = %d\\n", i, numbers[i]);
    }

    // Modifying elements
    numbers[2] = 99;
    printf("Modified: numbers[2] = %d\\n", numbers[2]);

    // Sum of array
    int sum = 0;
    for (int i = 0; i < size; i++)
        sum += numbers[i];
    printf("Sum: %d\\n", sum);

    return 0;
}`,
                codeTitle: "array_1d.c",
                output: "numbers[0] = 10\nnumbers[1] = 20\nnumbers[2] = 30\n...\nModified: numbers[2] = 99\nSum: 219",
            },
            {
                heading: "Two-Dimensional Arrays",
                content: "A 2D array is essentially an array of arrays — used to represent matrices, tables, and grids.",
                code: `#include <stdio.h>

int main() {
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    printf("Matrix:\\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d\\t", matrix[i][j]);
        }
        printf("\\n");
    }

    // Sum of diagonal elements
    int diagSum = 0;
    for (int i = 0; i < 3; i++)
        diagSum += matrix[i][i];
    printf("Diagonal sum: %d\\n", diagSum);

    return 0;
}`,
                codeTitle: "array_2d.c",
                output: "Matrix:\n1\t2\t3\n4\t5\t6\n7\t8\t9\nDiagonal sum: 15",
            },
            {
                heading: "Passing Arrays to Functions",
                content: "Arrays are always passed by reference (as a pointer to the first element).",
                code: `#include <stdio.h>

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

float average(int arr[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++)
        sum += arr[i];
    return (float)sum / size;
}

int main() {
    int data[] = {85, 92, 78, 95, 88};
    int n = sizeof(data) / sizeof(data[0]);

    printf("Array: ");
    printArray(data, n);
    printf("Average: %.2f\\n", average(data, n));

    return 0;
}`,
                codeTitle: "array_func.c",
                output: "Array: 85 92 78 95 88\nAverage: 87.60",
            },
            {
                heading: "Searching: Linear & Binary Search",
                content: "Linear search checks each element sequentially. Binary search works on sorted arrays by dividing the search space in half.",
                code: `#include <stdio.h>

int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++)
        if (arr[i] == key) return i;
    return -1;
}

int binarySearch(int arr[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == key) return mid;
        else if (arr[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {11, 22, 33, 44, 55, 66, 77};
    int n = 7;

    int pos = linearSearch(arr, n, 44);
    printf("Linear Search: 44 found at index %d\\n", pos);

    pos = binarySearch(arr, n, 66);
    printf("Binary Search: 66 found at index %d\\n", pos);

    return 0;
}`,
                codeTitle: "searching.c",
                output: "Linear Search: 44 found at index 3\nBinary Search: 66 found at index 5",
            },
            {
                heading: "Sorting: Bubble Sort & Selection Sort",
                content: "Sorting arranges elements in a specific order (ascending/descending).",
                code: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
}

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx])
                minIdx = j;
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}

void printArr(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int a[] = {64, 34, 25, 12, 22, 11, 90};
    int n = 7;

    bubbleSort(a, n);
    printf("Bubble Sort: ");
    printArr(a, n);

    int b[] = {29, 10, 14, 37, 13};
    selectionSort(b, 5);
    printf("Selection Sort: ");
    printArr(b, 5);

    return 0;
}`,
                codeTitle: "sorting.c",
                output: "Bubble Sort: 11 12 22 25 34 64 90\nSelection Sort: 10 13 14 29 37",
            },
        ],
    },
    {
        id: 7,
        slug: "strings",
        title: "Strings",
        description: "Character arrays, string functions (strlen, strcpy, strcat, strcmp), and manipulation.",
        sections: [
            {
                heading: "String Declaration & Initialization",
                content: "In C, strings are arrays of characters terminated by a null character `'\\0'`.",
                code: `#include <stdio.h>
#include <string.h>

int main() {
    // Different ways to declare strings
    char str1[] = "Hello";                // Auto size
    char str2[20] = "World";              // Fixed size
    char str3[] = {'C', ' ', 'L', 'a', 'n', 'g', '\\0'};  // Char array

    printf("str1: %s (length: %lu)\\n", str1, strlen(str1));
    printf("str2: %s\\n", str2);
    printf("str3: %s\\n", str3);

    // Reading string input
    char name[50];
    printf("Enter name: ");
    fgets(name, sizeof(name), stdin);  // Reads full line
    printf("Hello, %s", name);

    return 0;
}`,
                codeTitle: "strings_basic.c",
                output: "str1: Hello (length: 5)\nstr2: World\nstr3: C Lang",
            },
            {
                heading: "String Handling Functions",
                content: "The `<string.h>` library provides commonly used string functions.",
                code: `#include <stdio.h>
#include <string.h>

int main() {
    char s1[50] = "Hello";
    char s2[50] = "World";
    char s3[50];

    // strlen() — length of string
    printf("Length of s1: %lu\\n", strlen(s1));

    // strcpy() — copy string
    strcpy(s3, s1);
    printf("After strcpy: s3 = %s\\n", s3);

    // strcat() — concatenate strings
    strcat(s1, " ");
    strcat(s1, s2);
    printf("After strcat: s1 = %s\\n", s1);

    // strcmp() — compare strings
    int cmp = strcmp("apple", "banana");
    printf("strcmp: %d (negative = first is smaller)\\n", cmp);

    // strncpy, strncat — safer versions with length limit
    char dest[10];
    strncpy(dest, "Hello World", 5);
    dest[5] = '\\0';
    printf("strncpy: %s\\n", dest);

    return 0;
}`,
                codeTitle: "string_functions.c",
                output: "Length of s1: 5\nAfter strcpy: s3 = Hello\nAfter strcat: s1 = Hello World\nstrcmp: -1 (negative = first is smaller)\nstrncpy: Hello",
            },
            {
                heading: "String Manipulation Programs",
                content: "Common interview-level string operations implemented from scratch.",
                code: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

// Reverse a string
void reverseString(char str[]) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        char temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
}

// Check palindrome
int isPalindrome(char str[]) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++)
        if (str[i] != str[len - 1 - i]) return 0;
    return 1;
}

// Count vowels
int countVowels(char str[]) {
    int count = 0;
    for (int i = 0; str[i]; i++) {
        char c = tolower(str[i]);
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
            count++;
    }
    return count;
}

int main() {
    char word[] = "madam";
    printf("Is '%s' palindrome? %s\\n", word,
           isPalindrome(word) ? "Yes" : "No");

    char text[] = "Hello World";
    printf("Vowels in '%s': %d\\n", text, countVowels(text));

    char rev[] = "Programming";
    reverseString(rev);
    printf("Reversed: %s\\n", rev);

    return 0;
}`,
                codeTitle: "string_programs.c",
                output: "Is 'madam' palindrome? Yes\nVowels in 'Hello World': 3\nReversed: gnimmargorP",
            },
        ],
    },
    {
        id: 8,
        slug: "pointers",
        title: "Pointers",
        description: "Pointer basics, arithmetic, pointers with arrays/functions, and dynamic memory allocation.",
        sections: [
            {
                heading: "Introduction to Pointers",
                content: "A pointer is a variable that stores the memory address of another variable. Pointers are one of the most powerful and important features of C.",
                code: `#include <stdio.h>

int main() {
    int num = 42;
    int *ptr = &num;  // ptr stores address of num

    printf("Value of num: %d\\n", num);
    printf("Address of num: %p\\n", (void*)&num);
    printf("Value of ptr (address): %p\\n", (void*)ptr);
    printf("Value pointed by ptr: %d\\n", *ptr);  // Dereferencing

    // Modify value through pointer
    *ptr = 100;
    printf("num after *ptr = 100: %d\\n", num);

    return 0;
}`,
                codeTitle: "pointers_intro.c",
                output: "Value of num: 42\nAddress of num: 0x7ffd5e8b3a4c\nValue of ptr (address): 0x7ffd5e8b3a4c\nValue pointed by ptr: 42\nnum after *ptr = 100: 100",
            },
            {
                heading: "Pointer Arithmetic",
                content: "You can perform arithmetic on pointers. The pointer moves by the size of the data type it points to.",
                code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;  // Points to first element

    printf("Using pointer arithmetic:\\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d (address: %p)\\n", i, *(ptr + i), (void*)(ptr + i));
    }

    // Increment pointer
    ptr++;  // Moves 4 bytes (sizeof int)
    printf("\\nAfter ptr++: *ptr = %d\\n", *ptr);

    // Difference between pointers
    int *start = &arr[0];
    int *end = &arr[4];
    printf("Elements between: %ld\\n", end - start);

    return 0;
}`,
                codeTitle: "pointer_arithmetic.c",
                output: "Using pointer arithmetic:\narr[0] = 10 (address: 0x...)\narr[1] = 20 (address: 0x...)\n...\nAfter ptr++: *ptr = 20\nElements between: 4",
            },
            {
                heading: "Pointers and Functions",
                content: "Pointers enable functions to modify the original variables and return multiple values.",
                code: `#include <stdio.h>

// Swap using pointers
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Return multiple values via pointers
void minMax(int arr[], int n, int *min, int *max) {
    *min = *max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}

int main() {
    int x = 5, y = 10;
    printf("Before swap: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After swap: x=%d, y=%d\\n", x, y);

    int arr[] = {34, 12, 56, 7, 89, 23};
    int min, max;
    minMax(arr, 6, &min, &max);
    printf("Min: %d, Max: %d\\n", min, max);

    return 0;
}`,
                codeTitle: "pointer_functions.c",
                output: "Before swap: x=5, y=10\nAfter swap: x=10, y=5\nMin: 7, Max: 89",
            },
            {
                heading: "Dynamic Memory Allocation",
                content: "C provides functions to allocate memory at runtime from the heap.",
                code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;

    // malloc — allocates uninitialized memory
    int *arr = (int *)malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }
    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;

    printf("malloc: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    // calloc — allocates zero-initialized memory
    int *zeroed = (int *)calloc(n, sizeof(int));
    printf("calloc: ");
    for (int i = 0; i < n; i++) printf("%d ", zeroed[i]);
    printf("\\n");

    // realloc — resize allocated memory
    n = 8;
    arr = (int *)realloc(arr, n * sizeof(int));
    for (int i = 5; i < n; i++) arr[i] = (i + 1) * 10;
    printf("realloc: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    // free — release memory
    free(arr);
    free(zeroed);
    printf("Memory freed successfully.\\n");

    return 0;
}`,
                codeTitle: "dynamic_memory.c",
                output: "malloc: 10 20 30 40 50\ncalloc: 0 0 0 0 0\nrealloc: 10 20 30 40 50 60 70 80\nMemory freed successfully.",
                note: "Always `free()` dynamically allocated memory when done. Failing to do so causes **memory leaks** — a common bug in production C programs."
            },
        ],
    },
    {
        id: 9,
        slug: "structures-unions",
        title: "Structures and Unions",
        description: "Structures, nested structures, array of structures, unions, and industry use cases.",
        sections: [
            {
                heading: "Structure Declaration & Usage",
                content: "A `struct` groups different data types under one name — like a record in a database.",
                code: `#include <stdio.h>

struct Student {
    int id;
    char name[50];
    float gpa;
};

int main() {
    // Declaration and initialization
    struct Student s1 = {101, "Alice", 3.85};

    // Accessing members
    printf("ID: %d\\n", s1.id);
    printf("Name: %s\\n", s1.name);
    printf("GPA: %.2f\\n", s1.gpa);

    // Modify members
    s1.gpa = 3.90;
    printf("Updated GPA: %.2f\\n", s1.gpa);

    return 0;
}`,
                codeTitle: "struct_basic.c",
                output: "ID: 101\nName: Alice\nGPA: 3.85\nUpdated GPA: 3.90",
            },
            {
                heading: "Array of Structures & Functions",
                content: "You can create arrays of structures to manage multiple records, and pass structures to functions.",
                code: `#include <stdio.h>

struct Employee {
    int id;
    char name[50];
    float salary;
};

void printEmployee(struct Employee e) {
    printf("  [%d] %-15s ₹%.2f\\n", e.id, e.name, e.salary);
}

float avgSalary(struct Employee emps[], int n) {
    float total = 0;
    for (int i = 0; i < n; i++)
        total += emps[i].salary;
    return total / n;
}

int main() {
    struct Employee team[] = {
        {1, "Ravi", 55000.00},
        {2, "Priya", 62000.00},
        {3, "Amit", 48000.00}
    };
    int n = 3;

    printf("Team:\\n");
    for (int i = 0; i < n; i++)
        printEmployee(team[i]);

    printf("Average Salary: ₹%.2f\\n", avgSalary(team, n));

    return 0;
}`,
                codeTitle: "struct_array.c",
                output: "Team:\n  [1] Ravi            ₹55000.00\n  [2] Priya           ₹62000.00\n  [3] Amit            ₹48000.00\nAverage Salary: ₹55000.00",
            },
            {
                heading: "Nested Structures",
                content: "A structure can contain another structure as a member.",
                code: `#include <stdio.h>

struct Address {
    char city[30];
    char state[30];
    int pincode;
};

struct Person {
    char name[50];
    int age;
    struct Address addr;  // Nested structure
};

int main() {
    struct Person p = {
        "Joel",
        28,
        {"Hyderabad", "Telangana", 500001}
    };

    printf("Name: %s, Age: %d\\n", p.name, p.age);
    printf("City: %s, State: %s, PIN: %d\\n",
           p.addr.city, p.addr.state, p.addr.pincode);

    return 0;
}`,
                codeTitle: "nested_struct.c",
                output: "Name: Joel, Age: 28\nCity: Hyderabad, State: Telangana, PIN: 500001",
            },
            {
                heading: "Unions",
                content: "A `union` is similar to a struct but all members **share the same memory location**. Only one member can hold a value at a time. This saves memory.",
                code: `#include <stdio.h>

union Data {
    int i;
    float f;
    char c;
};

int main() {
    union Data d;

    printf("Size of union: %lu bytes\\n", sizeof(d));

    d.i = 42;
    printf("d.i = %d\\n", d.i);

    d.f = 3.14;  // Overwrites d.i
    printf("d.f = %.2f\\n", d.f);
    printf("d.i now = %d (corrupted!)\\n", d.i);

    d.c = 'A';   // Overwrites d.f
    printf("d.c = %c\\n", d.c);

    return 0;
}`,
                codeTitle: "union.c",
                output: "Size of union: 4 bytes\nd.i = 42\nd.f = 3.14\nd.i now = 1078523331 (corrupted!)\nd.c = A",
                note: "In a union, the size equals the largest member. In a struct, the size is the sum of all members (plus padding). Use unions when you only need one value at a time."
            },
        ],
    },
];
