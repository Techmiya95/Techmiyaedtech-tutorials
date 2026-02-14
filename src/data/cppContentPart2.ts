import { Chapter } from "./javaContent";

export const cppChaptersPart2: Chapter[] = [
    {
        id: 8,
        slug: "polymorphism",
        title: "Polymorphism",
        description: "Compile-time vs Run-time polymorphism, function overloading, operator overloading, and virtual functions.",
        sections: [
            {
                heading: "Compile-time Polymorphism",
                content: "Achieved via Function Overloading and Operator Overloading.",
                code: `#include <iostream>
using namespace std;

class Complex {
private:
    int real, imag;
public:
    Complex(int r = 0, int i = 0) : real(r), imag(i) {}

    // Operator overloading
    Complex operator + (Complex const &obj) {
        return Complex(real + obj.real, imag + obj.imag);
    }
    
    void print() { cout << real << " + " << imag << "i" << endl; }
};

int main() {
    Complex c1(10, 5), c2(2, 4);
    Complex c3 = c1 + c2; // Calls operator+
    c3.print();
    return 0;
}`,
                codeTitle: "operator_overload.cpp",
                output: "12 + 9i",
            },
            {
                heading: "Run-time Polymorphism",
                content: "Achieved via Virtual Functions and Function Overriding.",
                code: `#include <iostream>
using namespace std;

class Base {
public:
    virtual void print() { cout << "Base Function" << endl; }
    void show() { cout << "Base Show" << endl; }
};

class Derived : public Base {
public:
    // Override keyword ensures we are overriding a virtual function
    void print() override { cout << "Derived Function" << endl; }
    void show() { cout << "Derived Show" << endl; }
};

int main() {
    Base *bptr;
    Derived d;
    bptr = &d;
    
    // Virtual function, binds at runtime -> Derived print
    bptr->print();
    
    // Non-virtual function, binds at compile time -> Base show
    bptr->show();
    
    return 0;
}`,
                codeTitle: "virtual_functions.cpp",
                output: "Derived Function\nBase Show",
            },
        ],
    },
    {
        id: 9,
        slug: "abstraction-encapsulation",
        title: "Abstraction & Encapsulation",
        description: "Abstract classes, pure virtual functions, and interfaces.",
        sections: [
            {
                heading: "Abstract Classes & Pure Virtual Functions",
                content: "An abstract class cannot be instantiated and usually contains at least one pure virtual function.",
                code: `#include <iostream>
using namespace std;

// Abstract Class
class Shape {
public:
    // Pure virtual function
    virtual void draw() = 0; 
};

class Circle : public Shape {
public:
    void draw() override {
        cout << "Drawing Circle" << endl;
    }
};

class Rectangle : public Shape {
public:
    void draw() override {
        cout << "Drawing Rectangle" << endl;
    }
};

int main() {
    // Shape s; // Error: Cannot instantiate abstract class
    
    Shape *s1 = new Circle();
    Shape *s2 = new Rectangle();
    
    s1->draw();
    s2->draw();
    
    delete s1;
    delete s2;
    return 0;
}`,
                codeTitle: "abstract_class.cpp",
                output: "Drawing Circle\nDrawing Rectangle",
            },
        ],
    },
    {
        id: 10,
        slug: "pointers-memory",
        title: "Pointers & Memory Management",
        description: "Pointers, references, dynamic allocation, and smart pointers (unique_ptr, shared_ptr).",
        sections: [
            {
                heading: "Dynamic Memory Allocation (new/delete)",
                content: "`new` allocates memory on the heap, and `delete` frees it.",
                code: `#include <iostream>
using namespace std;

int main() {
    // Allocate single integer
    int *p = new int(10);
    cout << "Value: " << *p << endl;
    delete p;
    
    // Allocate array
    int *arr = new int[5];
    for (int i=0; i<5; i++) arr[i] = i*10;
    
    cout << "Array element: " << arr[2] << endl;
    delete[] arr; // Delete array
    
    return 0;
}`,
                codeTitle: "dynamic_mem.cpp",
            },
            {
                heading: "Smart Pointers (Modern C++)",
                content: "Smart pointers automatically manage memory, preventing leaks. Include `<memory>`.",
                code: `#include <iostream>
#include <memory>
using namespace std;

class Entity {
public:
    Entity() { cout << "Created Entity" << endl; }
    ~Entity() { cout << "Destroyed Entity" << endl; }
    void print() { cout << "Entity method" << endl; }
};

int main() {
    {
        // unique_ptr: Exclusive ownership
        unique_ptr<Entity> entity1 = make_unique<Entity>();
        entity1->print();
        
        // shared_ptr: Shared ownership (reference counting)
        shared_ptr<Entity> shared1 = make_shared<Entity>();
        {
            shared_ptr<Entity> shared2 = shared1;
            cout << "Reference count: " << shared1.use_count() << endl; // 2
        } // shared2 destroyed, count becomes 1
        
        cout << "Reference count: " << shared1.use_count() << endl; // 1
    } // entity1 and shared1 destroyed automatically
    
    return 0;
}`,
                codeTitle: "smart_pointers.cpp",
                output: "Created Entity\nEntity method\nCreated Entity\nReference count: 2\nReference count: 1\nDestroyed Entity\nDestroyed Entity",
            },
        ],
    },
    {
        id: 11,
        slug: "exception-handling",
        title: "Exception Handling",
        description: "try, catch, throw, and multiple catch blocks.",
        sections: [
            {
                heading: "Basic Exception Handling",
                content: "Use `try` to wrap risky code, `catch` to handle errors, and `throw` to generate exceptions.",
                code: `#include <iostream>
using namespace std;

double divide(double a, double b) {
    if (b == 0) {
        throw "Division by zero condition!";
    }
    return a / b;
}

int main() {
    double x = 50, y = 0;
    
    try {
        double z = divide(x, y);
        cout << z << endl;
    } catch (const char* msg) {
        cerr << "Error: " << msg << endl;
    }
    
    return 0;
}`,
                codeTitle: "exception.cpp",
                output: "Error: Division by zero condition!",
            },
        ],
    },
    {
        id: 12,
        slug: "templates",
        title: "Templates",
        description: "Function templates and Class templates for generic programming.",
        sections: [
            {
                heading: "Function Templates",
                content: "Enable writing functions that work with any data type.",
                code: `#include <iostream>
using namespace std;

template <typename T>
T myMax(T x, T y) {
    return (x > y) ? x : y;
}

int main() {
    cout << myMax<int>(3, 7) << endl;
    cout << myMax<double>(3.5, 2.1) << endl;
    cout << myMax<char>('g', 'e') << endl;
    return 0;
}`,
                codeTitle: "templates.cpp",
                output: "7\n3.5\ng",
            },
            {
                heading: "Class Templates",
                content: "Create classes that can handle any data type.",
                code: `#include <iostream>
using namespace std;

template <typename T>
class Pair {
private:
    T first, second;
public:
    Pair(T a, T b) : first(a), second(b) {}
    T getMax() { return (first > second) ? first : second; }
};

int main() {
    Pair<int> p1(10, 20);
    cout << "Max int: " << p1.getMax() << endl;
    
    Pair<float> p2(10.5, 5.5);
    cout << "Max float: " << p2.getMax() << endl;
    
    return 0;
}`,
                codeTitle: "class_template.cpp",
                output: "Max int: 20\nMax float: 10.5",
            },
        ],
    },
    {
        id: 13,
        slug: "stl",
        title: "Standard Template Library (STL)",
        description: "Vectors, Lists, Maps, Iterators, and Algorithms.",
        sections: [
            {
                heading: "Vectors (Dynamic Arrays)",
                content: "`std::vector` is a dynamic array that resizes automatically.",
                code: `#include <iostream>
#include <vector>
#include <algorithm> // for sort
using namespace std;

int main() {
    vector<int> v = {10, 5, 20, 3};
    
    // Add element
    v.push_back(15);
    
    // Sort
    sort(v.begin(), v.end());
    
    cout << "Vectors: ";
    for (int n : v) cout << n << " ";
    cout << endl;
    
    return 0;
}`,
                codeTitle: "vector.cpp",
                output: "Vectors: 3 5 10 15 20 ",
            },
            {
                heading: "Maps (Key-Value Pairs)",
                content: "`std::map` stores key-value pairs sorted by key.",
                code: `#include <iostream>
#include <map>
using namespace std;

int main() {
    map<string, int> scores;
    scores["Alice"] = 95;
    scores["Bob"] = 80;
    scores["Charlie"] = 90;
    
    for (auto const& [name, score] : scores) {
        cout << name << ": " << score << endl;
    }
    
    // Find element
    if (scores.find("Alice") != scores.end()) {
        cout << "Alice exists!" << endl;
    }
    
    return 0;
}`,
                codeTitle: "map.cpp",
                output: "Alice: 95\nBob: 80\nCharlie: 90\nAlice exists!",
            },
        ],
    },
    {
        id: 14,
        slug: "file-handling",
        title: "File Handling in C++",
        description: "Reading and writing files using ifstream, ofstream, and fstream.",
        sections: [
            {
                heading: "Writing and Reading Text Files",
                content: "Use `<fstream>` for file operations.",
                code: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // Write
    ofstream outFile("example.txt");
    if (outFile.is_open()) {
        outFile << "Hello C++ File Handling!" << endl;
        outFile << "Line 2" << endl;
        outFile.close();
    }
    
    // Read
    string line;
    ifstream inFile("example.txt");
    if (inFile.is_open()) {
        while (getline(inFile, line)) {
            cout << line << endl;
        }
        inFile.close();
    }
    
    return 0;
}`,
                codeTitle: "file_io.cpp",
                output: "Hello C++ File Handling!\nLine 2",
            },
        ],
    },
];
