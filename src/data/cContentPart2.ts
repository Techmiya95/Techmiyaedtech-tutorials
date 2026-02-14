import { Chapter } from "./javaContent";

export const cChaptersPart2: Chapter[] = [
    {
        id: 10,
        slug: "file-handling",
        title: "File Handling",
        description: "Text & binary files, file operations (open, read, write, append, close), and error handling.",
        sections: [
            {
                heading: "File Operations Overview",
                content: "File handling allows programs to store data permanently. C uses the `FILE` pointer and functions from `<stdio.h>`.\n\n• **Text files** — Store data as readable characters.\n• **Binary files** — Store data in binary format (raw bytes).",
                code: `#include <stdio.h>

int main() {
    FILE *fp;

    // Writing to a file
    fp = fopen("output.txt", "w");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }
    fprintf(fp, "Hello, File Handling!\\n");
    fprintf(fp, "Line 2: C Programming\\n");
    fprintf(fp, "Line 3: Score = %d\\n", 95);
    fclose(fp);
    printf("File written successfully.\\n");

    // Reading from a file
    char buffer[100];
    fp = fopen("output.txt", "r");
    if (fp == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }
    printf("\\nFile contents:\\n");
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);
    }
    fclose(fp);

    return 0;
}`,
                codeTitle: "file_basic.c",
                output: "File written successfully.\n\nFile contents:\nHello, File Handling!\nLine 2: C Programming\nLine 3: Score = 95",
            },
            {
                heading: "File Modes & Functions",
                content:
                    "Common file modes:\n• `\"r\"` — Read (file must exist)\n• `\"w\"` — Write (creates/overwrites)\n• `\"a\"` — Append (adds to end)\n• `\"r+\"` — Read + Write\n• `\"rb\"` / `\"wb\"` — Binary modes\n\nKey functions:\n• `fopen()` — Open a file\n• `fclose()` — Close a file\n• `fprintf()` / `fscanf()` — Formatted I/O\n• `fgets()` / `fputs()` — String I/O\n• `fread()` / `fwrite()` — Binary I/O\n• `fseek()` / `ftell()` — File positioning\n• `feof()` — Check end of file",
                code: `#include <stdio.h>

int main() {
    FILE *fp;

    // Append mode
    fp = fopen("log.txt", "a");
    fputs("New log entry added.\\n", fp);
    fclose(fp);

    // fscanf — reading formatted data
    fp = fopen("data.txt", "w");
    fprintf(fp, "Alice 85\\nBob 92\\nCharlie 78\\n");
    fclose(fp);

    fp = fopen("data.txt", "r");
    char name[50];
    int score;
    printf("Student Scores:\\n");
    while (fscanf(fp, "%s %d", name, &score) != EOF) {
        printf("  %s: %d\\n", name, score);
    }
    fclose(fp);

    return 0;
}`,
                codeTitle: "file_functions.c",
                output: "Student Scores:\n  Alice: 85\n  Bob: 92\n  Charlie: 78",
            },
        ],
    },
    {
        id: 11,
        slug: "preprocessor-directives",
        title: "Preprocessor Directives",
        description: "#include, #define, macros, conditional compilation, and header file creation.",
        sections: [
            {
                heading: "Preprocessor Directives",
                content: "Preprocessor directives are processed before compilation. They begin with `#`.",
                code: `#include <stdio.h>   // System header
#include "mylib.h"   // User-defined header

// Object-like macros
#define PI 3.14159
#define MAX_SIZE 100
#define TRUE 1
#define FALSE 0

// Function-like macros
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

int main() {
    printf("PI = %f\\n", PI);
    printf("Square of 5 = %d\\n", SQUARE(5));
    printf("Max(10, 20) = %d\\n", MAX(10, 20));

    float radius = 7.0;
    float area = PI * SQUARE(radius);
    printf("Area of circle: %.2f\\n", area);

    return 0;
}`,
                codeTitle: "preprocessor.c",
                output: "PI = 3.141590\nSquare of 5 = 25\nMax(10, 20) = 20\nArea of circle: 153.94",
                note: "Always wrap macro arguments in parentheses to avoid unexpected behavior: `#define SQUARE(x) ((x) * (x))` not `#define SQUARE(x) x * x`."
            },
            {
                heading: "Conditional Compilation",
                content: "Compile different code sections based on conditions — useful for platform-specific code and debugging.",
                code: `#include <stdio.h>

#define DEBUG 1
#define PLATFORM_WINDOWS 0

int main() {
    #if DEBUG
        printf("[DEBUG] Debug mode is ON\\n");
    #endif

    #ifdef DEBUG
        printf("[DEBUG] Variable tracking enabled\\n");
    #endif

    #if PLATFORM_WINDOWS
        printf("Running on Windows\\n");
    #else
        printf("Running on Linux/Mac\\n");
    #endif

    // Include guard pattern (in header files):
    // #ifndef MYHEADER_H
    // #define MYHEADER_H
    // ... declarations ...
    // #endif

    return 0;
}`,
                codeTitle: "conditional_compile.c",
                output: "[DEBUG] Debug mode is ON\n[DEBUG] Variable tracking enabled\nRunning on Linux/Mac",
            },
        ],
    },
    {
        id: 12,
        slug: "command-line-arguments",
        title: "Command Line Arguments",
        description: "argc and argv, passing arguments to main(), and practical examples.",
        sections: [
            {
                heading: "argc and argv",
                content: "`argc` (argument count) holds the number of command-line arguments. `argv` (argument vector) is an array of strings containing the arguments.",
                code: `#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    printf("Number of arguments: %d\\n", argc);

    for (int i = 0; i < argc; i++) {
        printf("argv[%d] = %s\\n", i, argv[i]);
    }

    // Practical: Simple calculator
    if (argc == 4) {
        float a = atof(argv[1]);
        char op = argv[2][0];
        float b = atof(argv[3]);
        float result;

        switch (op) {
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case 'x': result = a * b; break;
            case '/': result = (b != 0) ? a / b : 0; break;
            default: printf("Invalid operator\\n"); return 1;
        }
        printf("%.2f %c %.2f = %.2f\\n", a, op, b, result);
    }

    return 0;
}`,
                codeTitle: "cmdline.c",
                output: "$ ./calc 10 + 5\nNumber of arguments: 4\nargv[0] = ./calc\nargv[1] = 10\nargv[2] = +\nargv[3] = 5\n10.00 + 5.00 = 15.00",
                note: "argv[0] is always the program name. User-supplied arguments start from argv[1]."
            },
        ],
    },
    {
        id: 13,
        slug: "error-handling-debugging",
        title: "Error Handling & Debugging",
        description: "Compile-time, run-time, and logical errors, debugging techniques, and compiler flags.",
        sections: [
            {
                heading: "Types of Errors",
                content:
                    "• **Compile-time errors** — Syntax errors caught by the compiler (missing semicolons, undeclared variables).\n• **Run-time errors** — Errors that occur during execution (division by zero, null pointer dereference, segfaults).\n• **Logical errors** — Program runs but produces wrong results (incorrect algorithm, off-by-one errors).",
                code: `#include <stdio.h>
#include <errno.h>
#include <string.h>

int main() {
    // Using errno for error handling
    FILE *fp = fopen("nonexistent.txt", "r");
    if (fp == NULL) {
        printf("Error code: %d\\n", errno);
        printf("Error message: %s\\n", strerror(errno));
        perror("fopen failed");
    }

    // Safe division
    int a = 10, b = 0;
    if (b != 0) {
        printf("Result: %d\\n", a / b);
    } else {
        fprintf(stderr, "Error: Division by zero!\\n");
    }

    return 0;
}`,
                codeTitle: "error_handling.c",
                output: "Error code: 2\nError message: No such file or directory\nfopen failed: No such file or directory\nError: Division by zero!",
            },
            {
                heading: "Debugging Techniques & Compiler Flags",
                content: "Use compiler flags and tools to catch bugs early.",
                code: `# Compile with all warnings
gcc -Wall -Wextra -Werror program.c -o program

# Include debug information for GDB
gcc -g program.c -o program

# Run with GDB debugger
gdb ./program
# GDB commands: break main, run, next, print var, backtrace

# Static analysis with warnings
gcc -Wall -Wextra -pedantic -std=c11 program.c

# Check for memory issues with Valgrind
valgrind --leak-check=full ./program

# Address sanitizer (catches buffer overflows)
gcc -fsanitize=address -g program.c -o program`,
                codeTitle: "debugging.sh",
                note: "Always compile with `-Wall -Wextra` during development. These flags catch common mistakes that would otherwise be silent bugs."
            },
        ],
    },
    {
        id: 14,
        slug: "memory-management",
        title: "Memory Management & Optimization",
        description: "Stack vs heap, memory allocation strategies, memory leaks, buffer overflow, and secure coding.",
        sections: [
            {
                heading: "Stack vs Heap Memory",
                content:
                    "• **Stack** — Automatic memory for local variables. Fast allocation/deallocation. Fixed size. LIFO order. Managed by compiler.\n• **Heap** — Dynamic memory via `malloc`/`calloc`/`realloc`. Slower but flexible. Must be manually freed with `free()`. Can cause fragmentation.",
                code: `#include <stdio.h>
#include <stdlib.h>

int globalVar = 10;  // Data segment

int main() {
    int stackVar = 20;           // Stack
    static int staticVar = 30;   // Data segment

    int *heapVar = (int *)malloc(sizeof(int));  // Heap
    *heapVar = 40;

    printf("Stack: %d (addr: %p)\\n", stackVar, (void*)&stackVar);
    printf("Heap:  %d (addr: %p)\\n", *heapVar, (void*)heapVar);
    printf("Global: %d\\n", globalVar);
    printf("Static: %d\\n", staticVar);

    free(heapVar);  // Must free heap memory!
    return 0;
}`,
                codeTitle: "memory_layout.c",
            },
            {
                heading: "Memory Leaks & Prevention",
                content: "A memory leak occurs when dynamically allocated memory is not freed, causing the program to consume increasing amounts of memory.",
                code: `#include <stdio.h>
#include <stdlib.h>

// BAD — Memory leak!
void leakyFunction() {
    int *data = (int *)malloc(100 * sizeof(int));
    // ... use data ...
    // Forgot to free! Memory is leaked.
}

// GOOD — Proper memory management
void properFunction() {
    int *data = (int *)malloc(100 * sizeof(int));
    if (data == NULL) {
        fprintf(stderr, "Allocation failed!\\n");
        return;
    }
    // ... use data ...
    free(data);       // Always free
    data = NULL;      // Set to NULL after freeing (prevents dangling pointer)
}

// Best practice: cleanup pattern
int processData() {
    int *buffer = NULL;
    int result = -1;

    buffer = (int *)malloc(1024 * sizeof(int));
    if (!buffer) goto cleanup;

    // Process...
    result = 0;

cleanup:
    free(buffer);
    return result;
}

int main() {
    properFunction();
    printf("Memory managed correctly.\\n");
    return 0;
}`,
                codeTitle: "memory_leaks.c",
                note: "Rules to prevent leaks: 1) Every `malloc` needs a `free`. 2) Set pointers to NULL after freeing. 3) Check return value of `malloc`. 4) Use Valgrind to detect leaks."
            },
            {
                heading: "Buffer Overflow & Secure Coding",
                content: "Buffer overflow occurs when writing beyond the allocated memory boundary — a critical security vulnerability.",
                code: `#include <stdio.h>
#include <string.h>

int main() {
    // UNSAFE — buffer overflow risk
    // char name[10];
    // gets(name);  // NEVER use gets()

    // SAFE alternatives
    char name[50];
    printf("Enter name: ");
    fgets(name, sizeof(name), stdin);  // Limits input size

    // UNSAFE string copy
    // char dest[5];
    // strcpy(dest, "This is too long!");  // Overflow!

    // SAFE string copy
    char dest[20];
    strncpy(dest, "Safe copy", sizeof(dest) - 1);
    dest[sizeof(dest) - 1] = '\\0';  // Ensure null termination
    printf("Dest: %s\\n", dest);

    // SAFE formatted input
    char buffer[20];
    snprintf(buffer, sizeof(buffer), "Score: %d", 100);
    printf("%s\\n", buffer);

    return 0;
}`,
                codeTitle: "secure_coding.c",
                note: "Never use `gets()`, `strcpy()`, or `sprintf()` without bounds checking. Use `fgets()`, `strncpy()`, and `snprintf()` instead."
            },
        ],
    },
    {
        id: 15,
        slug: "data-structures",
        title: "Data Structures using C",
        description: "Stack, Queue, and Linked List — implementation and operations.",
        sections: [
            {
                heading: "Stack (LIFO)",
                content: "A stack follows Last In, First Out (LIFO) — like a stack of plates.",
                code: `#include <stdio.h>
#define MAX 5

int stack[MAX], top = -1;

void push(int val) {
    if (top == MAX - 1) { printf("Stack Overflow!\\n"); return; }
    stack[++top] = val;
    printf("Pushed: %d\\n", val);
}

int pop() {
    if (top == -1) { printf("Stack Underflow!\\n"); return -1; }
    return stack[top--];
}

void display() {
    if (top == -1) { printf("Stack is empty\\n"); return; }
    printf("Stack: ");
    for (int i = top; i >= 0; i--) printf("%d ", stack[i]);
    printf("\\n");
}

int main() {
    push(10); push(20); push(30);
    display();
    printf("Popped: %d\\n", pop());
    display();
    return 0;
}`,
                codeTitle: "stack.c",
                output: "Pushed: 10\nPushed: 20\nPushed: 30\nStack: 30 20 10\nPopped: 30\nStack: 20 10",
            },
            {
                heading: "Queue (FIFO)",
                content: "A queue follows First In, First Out (FIFO) — like a line at a ticket counter.",
                code: `#include <stdio.h>
#define MAX 5

int queue[MAX], front = -1, rear = -1;

void enqueue(int val) {
    if (rear == MAX - 1) { printf("Queue Full!\\n"); return; }
    if (front == -1) front = 0;
    queue[++rear] = val;
    printf("Enqueued: %d\\n", val);
}

int dequeue() {
    if (front == -1 || front > rear) { printf("Queue Empty!\\n"); return -1; }
    return queue[front++];
}

void display() {
    if (front == -1 || front > rear) { printf("Queue is empty\\n"); return; }
    printf("Queue: ");
    for (int i = front; i <= rear; i++) printf("%d ", queue[i]);
    printf("\\n");
}

int main() {
    enqueue(10); enqueue(20); enqueue(30);
    display();
    printf("Dequeued: %d\\n", dequeue());
    display();
    return 0;
}`,
                codeTitle: "queue.c",
                output: "Enqueued: 10\nEnqueued: 20\nEnqueued: 30\nQueue: 10 20 30\nDequeued: 10\nQueue: 20 30",
            },
            {
                heading: "Singly Linked List",
                content: "A linked list stores elements in nodes, where each node points to the next — enabling dynamic memory usage.",
                code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node *head = NULL;

void insertFront(int val) {
    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = head;
    head = newNode;
}

void display() {
    struct Node *temp = head;
    printf("List: ");
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");
}

void freeList() {
    struct Node *temp;
    while (head) {
        temp = head;
        head = head->next;
        free(temp);
    }
}

int main() {
    insertFront(30);
    insertFront(20);
    insertFront(10);
    display();
    freeList();
    return 0;
}`,
                codeTitle: "linked_list.c",
                output: "List: 10 -> 20 -> 30 -> NULL",
            },
        ],
    },
    {
        id: 16,
        slug: "industry-system-programming",
        title: "C for Industry & System Programming",
        description: "C in embedded systems, operating systems, networking, device drivers, and real-time apps.",
        sections: [
            {
                heading: "C in Industry",
                content:
                    "C remains the backbone of system-level software:\n\n• **Embedded Systems** — Microcontrollers (Arduino, STM32, ESP32), automotive ECUs, medical devices. C gives direct hardware access with minimal overhead.\n• **Operating Systems** — Linux kernel, Windows kernel, macOS (XNU kernel) are written primarily in C.\n• **Networking** — TCP/IP stacks, routers, firewalls, and protocol implementations.\n• **Device Drivers** — Interface between hardware and the OS. Nearly all device drivers are written in C.\n• **Real-Time Systems** — Systems with strict timing requirements (aerospace, industrial automation).\n• **Databases** — MySQL, PostgreSQL, SQLite are all implemented in C.",
            },
            {
                heading: "Low-Level System Programming Example",
                content: "Working with system calls and process management.",
                code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// Bit manipulation — common in embedded/system programming
void printBinary(unsigned int n) {
    for (int i = 31; i >= 0; i--) {
        printf("%d", (n >> i) & 1);
        if (i % 8 == 0) printf(" ");
    }
    printf("\\n");
}

// Register-style flag management
#define FLAG_READ    (1 << 0)  // 0001
#define FLAG_WRITE   (1 << 1)  // 0010
#define FLAG_EXECUTE (1 << 2)  // 0100

int main() {
    unsigned int permissions = 0;

    // Set flags
    permissions |= FLAG_READ;
    permissions |= FLAG_WRITE;

    printf("Permissions: ");
    printBinary(permissions);

    // Check flags
    if (permissions & FLAG_READ) printf("Read: YES\\n");
    if (permissions & FLAG_WRITE) printf("Write: YES\\n");
    if (permissions & FLAG_EXECUTE) printf("Execute: YES\\n");
    else printf("Execute: NO\\n");

    // Clear a flag
    permissions &= ~FLAG_WRITE;
    printf("After removing write: ");
    if (!(permissions & FLAG_WRITE)) printf("Write removed\\n");

    return 0;
}`,
                codeTitle: "system_prog.c",
                output: "Permissions: 00000000 00000000 00000000 00000011\nRead: YES\nWrite: YES\nExecute: NO\nAfter removing write: Write removed",
                note: "Bit manipulation is essential in embedded and systems programming for managing hardware registers, flags, and optimizing memory."
            },
        ],
    },
    {
        id: 17,
        slug: "interview-preparation",
        title: "Interview & Industry Preparation",
        description: "Frequently asked C interview questions, output-based and pointer problems, coding tests.",
        sections: [
            {
                heading: "Output-Based Questions",
                content: "Predict the output — a favorite interview format.",
                code: `#include <stdio.h>

int main() {
    // Question 1: Post vs Pre increment
    int a = 5;
    printf("Q1: %d %d\\n", a++, ++a);
    // Answer: Undefined behavior! Compiler-dependent.

    // Question 2: sizeof on arrays
    int arr[] = {1, 2, 3, 4, 5};
    printf("Q2: sizeof(arr) = %lu\\n", sizeof(arr));      // 20
    printf("Q2: sizeof(arr[0]) = %lu\\n", sizeof(arr[0])); // 4

    // Question 3: String and pointer
    char *s = "Hello";
    printf("Q3: %c\\n", *(s + 1));    // 'e'
    printf("Q3: %c\\n", s[4]);        // 'o'

    // Question 4: static variable
    for (int i = 0; i < 3; i++) {
        static int count = 0;
        count++;
        printf("Q4: count = %d\\n", count);
    }

    return 0;
}`,
                codeTitle: "interview_output.c",
                output: "Q2: sizeof(arr) = 20\nQ2: sizeof(arr[0]) = 4\nQ3: e\nQ3: o\nQ4: count = 1\nQ4: count = 2\nQ4: count = 3",
            },
            {
                heading: "Pointer & Memory Questions",
                content: "Pointer-based questions test deep understanding of memory management.",
                code: `#include <stdio.h>
#include <stdlib.h>

// Q: What happens here?
void dangling_pointer_demo() {
    int *ptr = (int *)malloc(sizeof(int));
    *ptr = 42;
    free(ptr);
    // ptr is now a dangling pointer!
    // *ptr = 10;  // UNDEFINED BEHAVIOR
    ptr = NULL;    // Best practice: nullify after free
}

// Q: What's the output?
void array_pointer_relation() {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;

    printf("%d\\n", *p);        // 10
    printf("%d\\n", *(p + 2));  // 30
    printf("%d\\n", p[3]);      // 40
    printf("%d\\n", 2[arr]);    // 30 (equivalent to arr[2])
}

// Q: Difference between these?
void const_pointers() {
    int x = 10, y = 20;

    const int *p1 = &x;     // Pointer to const int
    // *p1 = 30;             // ERROR: can't modify value
    p1 = &y;                 // OK: can change pointer

    int *const p2 = &x;     // Const pointer to int
    *p2 = 30;                // OK: can modify value
    // p2 = &y;              // ERROR: can't change pointer
}

int main() {
    dangling_pointer_demo();
    array_pointer_relation();
    return 0;
}`,
                codeTitle: "interview_pointers.c",
                output: "10\n30\n40\n30",
            },
            {
                heading: "Common Coding Test Problems",
                content: "Classic problems frequently asked in coding interviews and placement tests.",
                code: `#include <stdio.h>

// Check if a number is prime
int isPrime(int n) {
    if (n <= 1) return 0;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return 0;
    return 1;
}

// Reverse a number
int reverseNum(int n) {
    int rev = 0;
    while (n != 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    return rev;
}

// Check Armstrong number (153 = 1³ + 5³ + 3³)
int isArmstrong(int n) {
    int original = n, sum = 0, digits = 0;
    int temp = n;
    while (temp) { digits++; temp /= 10; }
    temp = n;
    while (temp) {
        int d = temp % 10;
        int power = 1;
        for (int i = 0; i < digits; i++) power *= d;
        sum += power;
        temp /= 10;
    }
    return sum == original;
}

int main() {
    printf("Is 29 prime? %s\\n", isPrime(29) ? "Yes" : "No");
    printf("Reverse of 12345: %d\\n", reverseNum(12345));
    printf("Is 153 Armstrong? %s\\n", isArmstrong(153) ? "Yes" : "No");
    printf("Is 370 Armstrong? %s\\n", isArmstrong(370) ? "Yes" : "No");

    // Pattern printing
    printf("\\nPattern:\\n");
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= i; j++)
            printf("* ");
        printf("\\n");
    }

    return 0;
}`,
                codeTitle: "coding_test.c",
                output: "Is 29 prime? Yes\nReverse of 12345: 54321\nIs 153 Armstrong? Yes\nIs 370 Armstrong? Yes\n\nPattern:\n* \n* * \n* * * \n* * * * \n* * * * *",
            },
        ],
    },
];
