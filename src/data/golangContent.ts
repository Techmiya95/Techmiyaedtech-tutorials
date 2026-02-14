import { Chapter } from "./javaContent"; // Reuse interface

export const golangChapters: Chapter[] = [
    {
        id: 1,
        slug: "introduction",
        title: "Introduction to Go",
        description: "What is Go, history, installation, and Hello World.",
        sections: [
            {
                heading: "What is Go?",
                content:
                    "Go (also known as Golang) is an open-source programming language supported by Google. It is a statically typed, compiled language that feels like a dynamically typed, interpreted language. It is designed for simplicity, concurrency, and performance.",
            },
            {
                heading: "Key Features",
                content:
                    "• **Simplicity** — Go has a clean syntax with few keywords, making it easy to read and learn.\n• **Concurrency** — Go treats concurrency as a first-class citizen with Goroutines and Channels.\n• **Performance** — Go compiles to machine code, offering performance comparable to C++ and Java.\n• **Static Typing** — Detecting errors at compile-time for safer code.\n• **Garbage Collection** — Automatic memory management.",
            },
            {
                heading: "Hello World",
                content: "Every Go program is made up of packages. The main package is the entry point.",
                code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
                codeTitle: "hello.go",
                output: "Hello, World!",
                note: "To run this, save it as `hello.go` and run `go run hello.go` in your terminal."
            },
        ],
    },
    {
        id: 2,
        slug: "variables-constants",
        title: "Variables & Constants",
        description: "Declaring variables, short declaration, basic types, and constants.",
        sections: [
            {
                heading: "Variables",
                content: "Variables can be declared in multiple ways. Go is statically typed, but supports type inference.",
                code: `package main

import "fmt"

func main() {
    // Explicit declaration
    var i int = 10
    var s string = "Go"
    
    // Type inference
    var x = 20.5 // inferred as float64
    
    // Short declaration (inside functions only)
    isLive := true
    
    fmt.Printf("%v %T\\n", i, i)
    fmt.Printf("%v %T\\n", x, x)
    fmt.Println("Is Live:", isLive)
}`,
                codeTitle: "variables.go",
                output: "10 int\n20.5 float64\nIs Live: true",
            },
            {
                heading: "Zero Values",
                content: "Variables declared without an initial value are given their zero value:\n• `0` for numeric types\n• `false` for boolean\n• `\"\"` (empty string) for strings\n• `nil` for pointers, functions, interfaces, slices, channels, and maps.",
            },
            {
                heading: "Constants",
                content: "Constants are declared like variables but with the `const` keyword. They cannot be changed at runtime.",
                code: `const Pi = 3.14159
const (
    StatusOk = 200
    StatusNotFound = 404
)`,
                codeTitle: "constants.go",
            },
        ],
    },
    {
        id: 3,
        slug: "control-structures",
        title: "Control Structures",
        description: "If-else, Switch, and For loops (Go's only loop).",
        sections: [
            {
                heading: "If-Else",
                content: "Parentheses `()` are not required around the condition, but braces `{}` are mandatory.",
                code: `if x := 10; x > 5 {
    fmt.Println("x is greater than 5")
} else {
    fmt.Println("x is less than or equal to 5")
}`,
                codeTitle: "if_else.go",
                note: "You can execute a short statement before the condition, like `x := 10` above. The variable `x` is only available inside the if-else block."
            },
            {
                heading: "Switch",
                content: "Go creates an implicit `break` after each case. Use `fallthrough` to override this behavior.",
                code: `day := "Monday"
switch day {
case "Saturday", "Sunday":
    fmt.Println("Weekend")
default:
    fmt.Println("Weekday")
}`,
                codeTitle: "switch.go",
            },
            {
                heading: "For Loop",
                content: "Go has only one looping construct, the `for` loop, which can behave like a `while` loop.",
                code: `// Standard for loop
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// While-like loop
count := 1
for count < 10 {
    count *= 2
}

// Infinite loop
// for { }
`,
                codeTitle: "loops.go",
            },
        ],
    },
    {
        id: 4,
        slug: "data-structures",
        title: "Data Structures",
        description: "Arrays, Slices, Maps, and Structs.",
        sections: [
            {
                heading: "Arrays vs Slices",
                content: "Arrays have a fixed size. Slices are dynamic and more commonly used.",
                code: `// Array - Fixed size
var arr [3]int = [3]int{1, 2, 3}

// Slice - Dynamic
slice := []int{10, 20, 30}
slice = append(slice, 40) // Resizes automatically

fmt.Println(slice[1:3]) // Sub-slice [20 30]
`,
                codeTitle: "arrays_slices.go",
            },
            {
                heading: "Maps",
                content: "Maps are Go's built-in associative data type (hash tables).",
                code: `colors := map[string]string{
    "red": "#ff0000",
    "green": "#00ff00",
}

colors["blue"] = "#0000ff"
delete(colors, "red")

val, exists := colors["red"]
if !exists {
    fmt.Println("Red deleted")
}`,
                codeTitle: "maps.go",
            },
            {
                heading: "Structs",
                content: "Structs are typed collections of fields. They replace classes in Go.",
                code: `type Person struct {
    Name string
    Age  int
}

func main() {
    p := Person{Name: "Alice", Age: 30}
    fmt.Println(p.Name)
}`,
                codeTitle: "structs.go",
            },
        ],
    },
    {
        id: 5,
        slug: "functions-methods",
        title: "Functions & Methods",
        description: "Functions, multiple return values, named returns, and methods on structs.",
        sections: [
            {
                heading: "Functions with Multiple Returns",
                content: "Go functions can return multiple values, often used to return a result and an error.",
                code: `func divide(a, b float64) (float64, error) {
    if b == 0.0 {
        return 0.0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10.0, 0.0)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Result:", result)
}`,
                codeTitle: "functions.go",
            },
            {
                heading: "Methods (Receivers)",
                content: "Methods are functions associated with a particular type (the receiver).",
                code: `type Rectangle struct {
    width, height float64
}

// Pointer receiver (can modify the struct)
func (r *Rectangle) Scale(f float64) {
    r.width *= f
    r.height *= f
}

// Value receiver
func (r Rectangle) Area() float64 {
    return r.width * r.height
}

func main() {
    rect := Rectangle{10, 5}
    rect.Scale(2)
    fmt.Println(rect.Area()) // 200
}`,
                codeTitle: "methods.go",
            },
        ],
    },
    {
        id: 6,
        slug: "interfaces",
        title: "Interfaces",
        description: "Defining interfaces, implicit implementation, and the empty interface.",
        sections: [
            {
                heading: "Implicit Interfaces",
                content: "A type implements an interface simply by implementing its methods. No `implements` keyword is needed.",
                code: `type Shape interface {
    Area() float64
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return 3.14 * c.Radius * c.Radius
}

func printArea(s Shape) {
    fmt.Println("Area:", s.Area())
}

func main() {
    c := Circle{Radius: 5}
    printArea(c)
}`,
                codeTitle: "interfaces.go",
            },
        ],
    },
    {
        id: 7,
        slug: "concurrency",
        title: "Concurrency",
        description: "Goroutines, Channels, Select, and WaitGroups.",
        sections: [
            {
                heading: "Goroutines",
                content: "A goroutine is a lightweight thread managed by the Go runtime.",
                code: `package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 3; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    go say("world") // Starts a new goroutine
    say("hello")  // Runs in the main goroutine
}`,
                output: "hello\nworld\nhello\nworld...",
                codeTitle: "goroutines.go",
            },
            {
                heading: "Channels",
                content: "Channels are typed conduits through which you can send and receive values.",
                code: `func sum(s []int, c chan int) {
    sum := 0
    for _, v := range s {
        sum += v
    }
    c <- sum // Send sum to channel
}

func main() {
    s := []int{7, 2, 8, -9, 4, 0}
    c := make(chan int)
    
    go sum(s[:len(s)/2], c)
    go sum(s[len(s)/2:], c)
    
    x, y := <-c, <-c // Receive from c
    
    fmt.Println(x, y, x+y)
}`,
                codeTitle: "channels.go",
            },
        ],
    },
    {
        id: 8,
        slug: "error-handling",
        title: "Error Handling",
        description: "The error type, checking errors, and custom errors.",
        sections: [
            {
                heading: "The Error Pattern",
                content: "Go code uses return values to indicate abnormal states. There are no exceptions.",
                code: `import (
    "errors"
    "fmt"
)

func sqrt(x float64) (float64, error) {
    if x < 0 {
        return 0, errors.New("cannot take square root of negative number")
    }
    // implementation...
    return 0, nil
}

func main() {
    if _, err := sqrt(-1); err != nil {
        fmt.Println(err)
    }
}`,
                codeTitle: "error_handling.go",
            },
        ],
    },
];
