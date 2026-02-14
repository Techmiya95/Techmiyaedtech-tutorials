import { Chapter } from "./javaContent";

export const cppChaptersPart3: Chapter[] = [
    {
        id: 15,
        slug: "advanced-cpp",
        title: "Namespaces & Advanced C++",
        description: "Namespaces, type inference, move semantics, and the Rule of 5.",
        sections: [
            {
                heading: "Namespaces",
                content: "Namespaces prevent naming conflicts.",
                code: `#include <iostream>
using namespace std;

namespace Math {
    int add(int a, int b) { return a + b; }
}

namespace StringOps {
    string add(string a, string b) { return a + b; }
}

using namespace Math; // Import Math namespace

int main() {
    cout << add(5, 10) << endl; // Uses Math::add
    cout << StringOps::add("Hello", "World") << endl;
    return 0;
}`,
                codeTitle: "namespace.cpp",
                output: "15\nHelloWorld",
            },
            {
                heading: "Move Semantics & Rule of 5 (C++11)",
                content: "Move semantics allow transferring resources instead of copying. The Rule of 5 states if you define one of (Destructor, Copy Constructor, Copy Assignment, Move Constructor, Move Assignment), you likely need all 5.",
                code: `#include <iostream>
#include <vector>
using namespace std;

class Buffer {
public:
    int* data;
    int size;
    
    // Constructor
    Buffer(int s) : size(s) {
        data = new int[size];
        cout << "Allocated" << endl;
    }
    
    // Destructor
    ~Buffer() {
        delete[] data;
        cout << "Deallocated" << endl;
    }
    
    // Move Constructor
    Buffer(Buffer&& other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr; // Nullify source
        other.size = 0;
        cout << "Moved" << endl;
    }
};

int main() {
    vector<Buffer> v;
    v.push_back(Buffer(10)); // Move constructor called
    return 0;
}`,
                codeTitle: "move_semantics.cpp",
                output: "Allocated\nMoved\nDeallocated\nDeallocated",
            },
        ],
    },
    {
        id: 16,
        slug: "multithreading",
        title: "Multithreading & Concurrency",
        description: "Threads, mutexes, locks, and avoiding deadlocks.",
        sections: [
            {
                heading: "Creating Threads",
                content: "Use `<thread>` to run code in parallel.",
                code: `#include <iostream>
#include <thread>
using namespace std;

void task(int id) {
    cout << "Thread " << id << " running" << endl;
}

int main() {
    thread t1(task, 1);
    thread t2(task, 2);
    
    t1.join(); // Wait for t1
    t2.join(); // Wait for t2
    
    cout << "Main thread finished" << endl;
    return 0;
}`,
                codeTitle: "threads.cpp",
                output: "Thread 1 running\nThread 2 running\nMain thread finished",
            },
            {
                heading: "Mutex and Locking",
                content: "Use `std::mutex` to protect shared data.",
                code: `#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

int counter = 0;
mutex mtx;

void increment() {
    for (int i = 0; i < 1000; i++) {
        lock_guard<mutex> lock(mtx); // Auto-locks and unlocks
        counter++;
    }
}

int main() {
    thread t1(increment);
    thread t2(increment);
    
    t1.join();
    t2.join();
    
    cout << "Final Counter: " << counter << endl;
    return 0;
}`,
                codeTitle: "mutex.cpp",
                output: "Final Counter: 2000",
            },
        ],
    },
    {
        id: 17,
        slug: "competitive-programming",
        title: "C++ for Competitive Programming",
        description: "Optimizing code, fast I/O, and common patterns.",
        sections: [
            {
                heading: "Fast Input/Output",
                content: "Use `ios::sync_with_stdio(0); cin.tie(0);` for faster I/O.",
                code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Fast I/O
    ios::sync_with_stdio(0);
    cin.tie(0);
    
    // Typical CP setup
    int t;
    cin >> t;
    while(t--) {
        int n;
        cin >> n;
        // Solve problem
        cout << n * n << "\\n"; // Use \\n instead of endl
    }
    return 0;
}`,
                codeTitle: "fast_io.cpp",
            },
        ],
    },
    {
        id: 18,
        slug: "industry-applications",
        title: "C++ in Industry Applications",
        description: "Game development, embedded systems, and finance.",
        sections: [
            {
                heading: "Industry Domains",
                content:
                    "• **Game Development**: Unreal Engine uses C++. High performance is critical for rendering and physics.\n• **Embedded Systems**: C++ is used in automotive (AUTOSAR), robotics (ROS), and IoT.\n• **Finance**: High-frequency trading (HFT) systems use C++ for microsecond-latency execution.\n• **Browsers**: Chrome (V8 engine) and Firefox are built with C++.",
            },
        ],
    },
    {
        id: 19,
        slug: "debugging-optimization",
        title: "Debugging, Testing & Optimization",
        description: "GDB, assertions, and secure coding.",
        sections: [
            {
                heading: "Debugging Tools",
                content:
                    "• **GDB (GNU Debugger)**: Step through code, inspect variables, and find segfaults.\n• **Valgrind**: Detect memory leaks and invalid memory access.\n• **Sanitizers**: AddressSanitizer (ASan) and UndefinedBehaviorSanitizer (UBSan).",
                code: `#include <iostream>
#include <cassert>
using namespace std;

int divide(int a, int b) {
    assert(b != 0 && "Division by zero!");
    return a / b;
}

int main() {
    cout << divide(10, 2) << endl;
    // cout << divide(10, 0) << endl; // Triggers assertion failure
    return 0;
}`,
                codeTitle: "assertions.cpp",
            },
        ],
    },
    {
        id: 20,
        slug: "interview-preparation",
        title: "Interview & Job Preparation",
        description: "Interview questions, projects, and tools.",
        sections: [
            {
                heading: "Common Interview Questions",
                content:
                    "1. **Virtual Destructor**: Why should a base class destructor be virtual?\n   *Answer*: To ensure the derived class destructor is called when deleting via a base pointer, preventing memory leaks.\n\n2. **Diamond Problem**: What is it and how to solve it?\n   *Answer*: Multiple inheritance ambiguity. Solved using `virtual` inheritance.\n\n3. **vtable vs vptr**: How does virtual function mechanism work?\n   *Answer*: Compiler creates a vtable (array of function pointers) for each class and adds a vptr (pointer to vtable) to each object.",
            },
            {
                heading: "Mini Projects for Portfolio",
                content:
                    "• **Student Management System**: Use file handling and OOP.\n• **Banking Application**: diverse inheritance and transaction logging.\n• **Library System**: STL maps for book tracking.\n• **Chat Application**: Multithreading and sockets.\n• **Game**: Simple 2D game using SFML or SDL.",
            },
            {
                heading: "Tools Used in Industry",
                content: "• **Build Systems**: CMake, Make\n• **Version Control**: Git, GitHub/GitLab\n• **IDEs**: VS Code, CLion, Visual Studio\n• **Compilers**: GCC, Clang, MSVC",
            },
        ],
    },
];
