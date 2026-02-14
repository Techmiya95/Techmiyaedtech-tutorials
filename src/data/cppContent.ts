import { Chapter } from "./javaContent";

export const cppChapters: Chapter[] = [
    {
        id: 1,
        slug: "introduction",
        title: "Introduction to C++",
        description: "Evolution, features, C vs C++, structure, compilation, and first program.",
        sections: [
            {
                heading: "Evolution of C++",
                content: "C++ was developed by **Bjarne Stroustrup** at Bell Labs in 1979 as an extension of C. Originally called 'C with Classes', it was renamed C++ in 1983. It combines high-level features with low-level memory manipulation.",
            },
            {
                heading: "Difference between C and C++",
                content:
                    "• **Paradigm**: C is procedural; C++ is multi-paradigm (procedural + object-oriented).\n• **Data Security**: C lacks data hiding; C++ supports encapsulation (private/protected members).\n• **Memory Management**: C uses `malloc/free`; C++ uses `new/delete`.\n• **Function Overloading**: Supported in C++, not in C.\n• **References**: C++ supports reference variables; C does not.",
            },
            {
                heading: "Structure of a C++ Program",
                content: "A C++ program consists of headers, namespaces, the main function, and statements.",
                code: `// Single-line comment
/* Multi-line comment */

#include <iostream>  // Input/Output stream library

using namespace std; // Standard namespace

// Main function - entry point
int main() {
    cout << "Hello, C++ World!" << endl;
    return 0;
}`,
                codeTitle: "structure.cpp",
                output: "Hello, C++ World!",
            },
            {
                heading: "Compilation Process",
                content: "C++ compilation involves preprocessing, compiling to assembly, assembling to object code, and linking to create an executable.",
                code: `# Compile and run using g++
g++ hello.cpp -o hello
./hello`,
                codeTitle: "terminal",
            },
        ],
    },
    {
        id: 2,
        slug: "data-types-operators",
        title: "Data Types, Variables & Operators",
        description: "Built-in types, auto, const, type casting, and operators.",
        sections: [
            {
                heading: "Data Types & Variables",
                content: "C++ has primitive types (`int`, `float`, `double`, `char`, `bool`) and user-defined types (`struct`, `class`, `union`, `enum`).",
                code: `#include <iostream>
using namespace std;

int main() {
    int age = 25;
    double price = 19.99;
    char grade = 'A';
    bool isPassed = true;
    
    // Type modifier
    unsigned int positiveNum = 100;
    long long bigNum = 123456789012345;

    cout << "Age: " << age << endl;
    cout << "Price: " << price << endl;
    cout << "Passed: " << boolalpha << isPassed << endl; // Prints true/false instead of 1/0
    
    return 0;
}`,
                codeTitle: "datatypes.cpp",
                output: "Age: 25\nPrice: 19.99\nPassed: true",
            },
            {
                heading: "auto keyword & Constants",
                content: "`auto` lets the compiler deduce the type. `const` creates read-only variables.",
                code: `#include <iostream>
#include <typeinfo>
using namespace std;

int main() {
    auto x = 10;        // int
    auto y = 3.14;      // double
    auto z = "Hello";   // const char*
    const float PI = 3.14159f;

    // PI = 3.15; // Error: assignment of read-only variable

    cout << "x is type: " << typeid(x).name() << endl;
    return 0;
}`,
                codeTitle: "auto_const.cpp",
            },
        ],
    },
    {
        id: 3,
        slug: "input-output",
        title: "Input / Output in C++",
        description: "cin, cout, endl, and iomanip library.",
        sections: [
            {
                heading: "cin and cout",
                content: "`cin` (standard input stream) and `cout` (standard output stream) are used for I/O operations.",
                code: `#include <iostream>
using namespace std;

int main() {
    int age;
    cout << "Enter your age: ";
    cin >> age;
    
    cout << "You differ from 100 by " << (100 - age) << " years." << endl;
    return 0;
}`,
                codeTitle: "io.cpp",
            },
            {
                heading: "iomanip Library",
                content: "Used for formatting output (`setw`, `setprecision`, `fixed`).",
                code: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double pi = 3.1415926535;
    
    cout << "Default: " << pi << endl;
    cout << "Fixed point (2 decimals): " << fixed << setprecision(2) << pi << endl;
    cout << "Width 10: |" << setw(10) << 123 << "|" << endl;
    
    return 0;
}`,
                codeTitle: "iomanip.cpp",
                output: "Default: 3.14159\nFixed point (2 decimals): 3.14\nWidth 10: |       123|",
            },
        ],
    },
    {
        id: 4,
        slug: "control-statements",
        title: "Control Statements",
        description: "Conditionals, loops, and range-based for loops.",
        sections: [
            {
                heading: "Range-based for Loop (C++11)",
                content: "A modern, cleaner way to iterate over arrays and containers.",
                code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    
    // Traditional for loop
    for(int i = 0; i < 5; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    // Range-based for loop (read-only)
    cout << "Using range-based: ";
    for(int val : arr) {
        cout << val << " ";
    }
    cout << endl;

    // Range-based with reference (to modify)
    for(int &val : arr) {
        val *= 2;
    }
    
    cout << "Doubled: ";
    for(int val : arr) cout << val << " ";
    cout << endl;

    return 0;
}`,
                codeTitle: "range_loop.cpp",
                output: "10 20 30 40 50 \nUsing range-based: 10 20 30 40 50 \nDoubled: 20 40 60 80 100 ",
            },
        ],
    },
    {
        id: 5,
        slug: "functions",
        title: "Functions in C++",
        description: "Overloading, default arguments, inline functions, and recursion.",
        sections: [
            {
                heading: "Function Overloading",
                content: "Creating multiple functions with the same name but different parameters.",
                code: `#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}

int main() {
    cout << "Add int: " << add(5, 10) << endl;
    cout << "Add double: " << add(5.5, 2.2) << endl;
    cout << "Add 3 ints: " << add(1, 2, 3) << endl;
    return 0;
}`,
                codeTitle: "overloading.cpp",
                output: "Add int: 15\nAdd double: 7.7\nAdd 3 ints: 6",
            },
            {
                heading: "Inline Functions & Default Arguments",
                content: "`inline` hints the compiler to replace the call with the function body. Default arguments allow calling functions with fewer parameters.",
                code: `#include <iostream>
using namespace std;

inline int square(int x) {
    return x * x;
}

void greet(string name, string msg = "Welcome") {
    cout << "Hello " << name << ", " << msg << endl;
}

int main() {
    cout << "Square of 5: " << square(5) << endl;
    
    greet("Alice");
    greet("Bob", "Good Morning");
    
    return 0;
}`,
                codeTitle: "inline_default.cpp",
                output: "Square of 5: 25\nHello Alice, Welcome\nHello Bob, Good Morning",
            },
        ],
    },
    {
        id: 6,
        slug: "oop-core",
        title: "Introduction to OOP",
        description: "Classes, objects, constructors, destructors, access specifiers, and 'this' pointer.",
        sections: [
            {
                heading: "Classes and Objects",
                content: "A class is a blueprint for creating objects (instances). Access specifiers (`public`, `private`, `protected`) control visibility.",
                code: `#include <iostream>
using namespace std;

class Car {
private:
    int speed; // only accessible inside class

public:
    string brand;

    // Constructor
    Car(string b, int s) {
        brand = b;
        speed = s;
        cout << brand << " created." << endl;
    }

    // Method to access private data
    void accelerate(int increase) {
        speed += increase;
        cout << "Speed is now: " << speed << " km/h" << endl;
    }
    
    // Destructor
    ~Car() {
        cout << brand << " destroyed." << endl;
    }
};

int main() {
    Car myCar("Tesla", 0);
    myCar.accelerate(50);
    myCar.accelerate(20);
    
    return 0;
}`,
                codeTitle: "class_demo.cpp",
                output: "Tesla created.\nSpeed is now: 50 km/h\nSpeed is now: 70 km/h\nTesla destroyed.",
            },
            {
                heading: "Static Members",
                content: "Static variables are shared among all objects of a class. Static functions can only access static variables.",
                code: `#include <iostream>
using namespace std;

class Counter {
public:
    static int count; // Declaration

    Counter() {
        count++;
    }
    
    static void showCount() {
        cout << "Total objects: " << count << endl;
    }
};

int Counter::count = 0; // Definition and initialization

int main() {
    Counter c1;
    Counter c2;
    Counter::showCount(); // 2
    
    Counter c3;
    Counter::showCount(); // 3
    return 0;
}`,
                codeTitle: "static.cpp",
                output: "Total objects: 2\nTotal objects: 3",
            },
        ],
    },
    {
        id: 7,
        slug: "inheritance",
        title: "Inheritance",
        description: "Single, multiple, multilevel, hierarchical inheritance, and visibility modes.",
        sections: [
            {
                heading: "Concept of Inheritance",
                content: "Inheritance allows a class (derived/child) to acquire properties and behaviors of another class (base/parent).",
                code: `#include <iostream>
using namespace std;

// Base class
class Animal {
public:
    void eat() {
        cout << "I can eat!" << endl;
    }
};

// Derived class
class Dog : public Animal {
public:
    void bark() {
        cout << "I can bark! Woof woof!" << endl;
    }
};

int main() {
    Dog dog1;
    dog1.eat();  // Inherited from Animal
    dog1.bark(); // Defined in Dog
    return 0;
}`,
                codeTitle: "inheritance.cpp",
                output: "I can eat!\nI can bark! Woof woof!",
            },
            {
                heading: "Multiple Inheritance",
                content: "A class can inherit from more than one base class.",
                code: `#include <iostream>
using namespace std;

class Engine {
public:
    void start() { cout << "Engine started" << endl; }
};

class Wheels {
public:
    void rotate() { cout << "Wheels rotating" << endl; }
};

// Inherits from both
class Car : public Engine, public Wheels {
public:
    void drive() { cout << "Car is moving" << endl; }
};

int main() {
    Car c;
    c.start();
    c.rotate();
    c.drive();
    return 0;
}`,
                codeTitle: "multiple_inheritance.cpp",
                output: "Engine started\nWheels rotating\nCar is moving",
            },
        ],
    },
];
