import { Chapter } from "./javaContent"; // Reuse interface

export const javascriptChapters: Chapter[] = [
    {
        id: 1,
        slug: "introduction",
        title: "Introduction to JavaScript",
        description: "What is JavaScript, its role in web development, and ES6+.",
        sections: [
            {
                heading: "What is JavaScript?",
                content:
                    "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. It is well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.",
            },
            {
                heading: "The Modern Web & ES6+",
                content:
                    "Modern JavaScript usually refers to ES6 (ECMAScript 2015) and beyond. It introduced significant features like arrow functions, classes, template literals, and destructing, making the language more powerful and easier to write.",
            },
            {
                heading: "Your First JS Code",
                content: "JavaScript can be run in the browser console or using Node.js.",
                code: `// Printing to the console
console.log("Hello, World!");

// Alerting in the browser
// alert("Hello from JS!");`,
                codeTitle: "hello.js",
                output: "Hello, World!",
                note: "`console.log` is the most common way to debug JS code."
            },
        ],
    },
    {
        id: 2,
        slug: "variables-datatypes",
        title: "Variables & Data Types",
        description: "let vs const vs var, primitives, and template literals.",
        sections: [
            {
                heading: "Variable Declaration",
                content: "Always use `let` or `const`. Avoid `var` in modern code.\n• `const`: For values that won't change.\n• `let`: For values that will be reassigned.",
                code: `const appName = "Techmiya Tutorials";
let visitors = 0;

visitors = visitors + 1;
// appName = "New Name"; // Error: Assignment to constant variable.

console.log(appName, visitors);`,
                codeTitle: "variables.js",
                output: "Techmiya Tutorials 1"
            },
            {
                heading: "Data Types",
                content: "JavaScript has primitives (String, Number, BigInt, Boolean, Undefined, Null, Symbol) and Objects.",
                code: `let name = "Alice";      // String
let age = 25;            // Number
let isStudent = true;    // Boolean
let empty = null;        // Null (intentional absence)
let notDefined;          // Undefined

console.log(typeof name);
console.log(typeof isStudent);`,
                codeTitle: "types.js",
                output: "string\nboolean"
            },
            {
                heading: "Template Literals",
                content: "Use backticks (\`) to embed variables inside strings.",
                code: `const user = "John";
const greeting = \`Hello, \${user}! Welcome back.\`;
console.log(greeting);`,
                codeTitle: "template_literals.js",
                output: "Hello, John! Welcome back."
            }
        ],
    },
    {
        id: 3,
        slug: "functions",
        title: "Functions",
        description: "Function declarations, expressions, and Arrow Functions.",
        sections: [
            {
                heading: "Function Declaration vs Expression",
                content: "Standard ways to define functions.",
                code: `// Declaration
funcDeclaration(); // Hoisted (works before definition)
function funcDeclaration() {
    console.log("I am a declaration");
}

// Expression
const funcExpression = function() {
    console.log("I am an expression");
};
funcExpression(); // Must be called after definition`,
                codeTitle: "basics.js",
                output: "I am a declaration\nI am an expression"
            },
            {
                heading: "Arrow Functions (ES6)",
                content: "A shorter syntax for writing function expressions. They do not have their own `this`.",
                code: `const add = (a, b) => {
    return a + b;
};

// Implicit return for one-liners
const multiply = (a, b) => a * b;

console.log(add(5, 3));      // 8
console.log(multiply(4, 2)); // 8`,
                codeTitle: "arrow_functions.js"
            }
        ],
    },
    {
        id: 4,
        slug: "arrays-objects",
        title: "Arrays & Objects",
        description: "Destructuring, Spread Operator, and Array Methods.",
        sections: [
            {
                heading: "Destructuring",
                content: "Unpack values from arrays or properties from objects into distinct variables.",
                code: `// Object Destructuring
const user = { id: 1, username: "dev_guru", role: "admin" };
const { username, role } = user;

console.log(username); // dev_guru

// Array Destructuring
const colors = ["red", "green", "blue"];
const [first, second] = colors;

console.log(first); // red`,
                codeTitle: "destructuring.js"
            },
            {
                heading: "Spread Operator (...)",
                content: "Expands an iterable into more elements.",
                code: `const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

const person = { name: "Max" };
const updatedPerson = { ...person, age: 30 }; // { name: "Max", age: 30 }

console.log(updatedPerson);`,
                codeTitle: "spread.js",
                output: "{ name: 'Max', age: 30 }"
            },
            {
                heading: "Array Methods",
                content: "`map`, `filter`, and `reduce` are essential for functional programming.",
                code: `const numbers = [1, 2, 3, 4, 5];

// Map: Transform elements
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Filter: Select elements
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]`,
                codeTitle: "array_methods.js"
            }
        ],
    },
    {
        id: 5,
        slug: "async-javascript",
        title: "Async JavaScript",
        description: "Callbacks, Promises, and Async/Await.",
        sections: [
            {
                heading: "Promises",
                content: "The `Promise` object represents the eventual completion (or failure) of an asynchronous operation.",
                code: `const myPromise = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
        resolve("Operation Successful!");
    } else {
        reject("Operation Failed.");
    }
});

myPromise
    .then(res => console.log(res))
    .catch(err => console.log(err));`,
                codeTitle: "promise.js",
                output: "Operation Successful!"
            },
            {
                heading: "Async / Await",
                content: "Syntactic sugar built on top of Promises. It makes async code look and behave a little more like synchronous code.",
                code: `const fetchData = async () => {
    try {
        // Simulating a fetch call
        const response = await new Promise(resolve => setTimeout(() => resolve("Data loaded"), 1000));
        console.log(response);
    } catch (error) {
        console.log("Error:", error);
    }
};

fetchData();`,
                codeTitle: "async_await.js",
                output: "Data loaded" // (after 1 second)
            }
        ],
    },
    {
        id: 6,
        slug: "classes-modules",
        title: "Classes & Modules",
        description: "ES6 Classes and Import/Export.",
        sections: [
            {
                heading: "Classes",
                content: "Templates for creating objects.",
                code: `class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(\`\${this.name} makes a noise.\`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(\`\${this.name} barks.\`);
    }
}

const dog = new Dog("Rex");
dog.speak();`,
                codeTitle: "classes.js",
                output: "Rex barks."
            },
            {
                heading: "Modules",
                content: "Use `export` to expose functionality and `import` to use it.",
                code: `// math.js
export const add = (a, b) => a + b;

// main.js
// import { add } from './math.js';
// console.log(add(2, 3));`,
                codeTitle: "modules.js",
                note: "Modules require a server environment or build tool to work directly in simpler setups."
            }
        ],
    },
    {
        id: 7,
        slug: "dom-manipulation",
        title: "DOM Manipulation",
        description: "Selecting elements and handling events.",
        sections: [
            {
                heading: "Selecting Elements",
                content: "Interacting with the creating, changing, or removing HTML elements.",
                code: `// Select by ID
const title = document.getElementById("main-title");

// Select by Query
const buttons = document.querySelectorAll(".btn");

// Changing content
if (title) {
    title.innerText = "Updated Title";
    title.style.color = "blue";
}`,
                codeTitle: "dom.js"
            },
            {
                heading: "Event Listeners",
                content: "Responding to user interactions.",
                code: `const btn = document.querySelector("button");

btn.addEventListener("click", () => {
    alert("Button Clicked!");
});`,
                codeTitle: "events.js"
            }
        ],
    }
];
