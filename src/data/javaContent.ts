export interface Section {
    heading: string;
    content: string;
    code?: string;
    codeTitle?: string;
    note?: string;
    output?: string;
}

export interface Chapter {
    id: number;
    slug: string;
    title: string;
    description: string;
    sections: Section[];
}

export const javaChapters: Chapter[] = [
    {
        id: 1,
        slug: "introduction",
        title: "Introduction to Java",
        description: "What is Java, history, features, and why learn Java.",
        sections: [
            {
                heading: "What is Java?",
                content:
                    "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let application developers write once, run anywhere (WORA), meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.",
            },
            {
                heading: "Key Features of Java",
                content:
                    "• **Object-Oriented** — In Java, everything is an Object. Java can be easily extended since it is based on the Object model.\n• **Platform Independent** — Unlike many other programming languages including C and C++, when Java is compiled, it is not compiled into platform specific machine, rather into platform independent byte code. This byte code is distributed over the web and interpreted by the Virtual Machine (JVM) on whichever platform it is being run on.\n• **Simple** — Java is designed to be easy to learn. If you understand the basic concept of OOP Java, it would be easy to master.\n• **Secure** — With Java's secure feature it enables to develop virus-free, tamper-free systems. Authentication techniques are based on public-key encryption.\n• **Architecture-neutral** — Java compiler generates an architecture-neutral object file format, which makes the compiled code executable on many processors, with the presence of Java runtime system.\n• **Portable** — Being architecture-neutral and having no implementation dependent aspects of the specification makes Java portable.\n• **Robust** — Java makes an effort to eliminate error prone situations by emphasizing mainly on compile time error checking and runtime checking.",
            },
            {
                heading: "Your First Java Program",
                content: "Let's write the classic Hello World program in Java. Save this code in a file named `HelloWorld.java`.",
                code: `public class HelloWorld {
    public static void main(String[] args) {
        // Prints "Hello, World" to the terminal window.
        System.out.println("Hello, World");
    }
}`,
                codeTitle: "HelloWorld.java",
                output: "Hello, World",
                note: "In Java, the file name must match the class name (case-sensitive). So, if your class is `HelloWorld`, the file must be `HelloWorld.java`."
            },
        ],
    },
    {
        id: 2,
        slug: "installation",
        title: "Java Installation & Setup",
        description: "Installing JDK, setting up environment variables, and verify installation.",
        sections: [
            {
                heading: "Installing Java Development Kit (JDK)",
                content:
                    "To strictly develop Java applications, you need the JDK. The JRE (Java Runtime Environment) is only for running them.\n\n1. Visit the [Oracle website](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://jdk.java.net/).\n2. Download the latest JDK installer for your operating system (Windows, macOS, or Linux).\n3. Run the installer and follow the on-screen instructions.",
            },
            {
                heading: "Setting Environment Variables (Windows)",
                content: "1. Search for 'Environment Variables' in your system settings.\n2. Click 'Environment Variables'.\n3. Under 'System variables', find `Path`, select it, and click 'Edit'.\n4. Click 'New' and add the path to your JDK `bin` directory (e.g., `C:\\Program Files\\Java\\jdk-21\\bin`).\n5. Click 'OK' to save.",
            },
            {
                heading: "Verifying Installation",
                content: "Open a command prompt or terminal and type:",
                code: `java -version
javac -version`,
                output: "java version \"21.0.1\" 2023-10-17 LTS\njavac 21.0.1",
            },
        ],
    },
    {
        id: 3,
        slug: "variables-data-types",
        title: "Variables & Data Types",
        description: "Primitive types, non-primitive types, and variable declaration.",
        sections: [
            {
                heading: "Variables in Java",
                content:
                    "A variable provides us with named storage that our programs can manipulate. Each variable in Java has a specific type, which determines the size and layout of the variable's memory; the range of values that can be stored within that memory; and the set of operations that can be applied to the variable.",
                code: `int age = 25;
String name = "Techmiya";
double salary = 50000.0;
boolean isActive = true;`,
                codeTitle: "Variables.java",
            },
            {
                heading: "Primitive Data Types",
                content:
                    "Java supports 8 primitive data types:\n\n• **byte**: 8-bit signed integer.\n• **short**: 16-bit signed integer.\n• **int**: 32-bit signed integer. (Most commonly used)\n• **long**: 64-bit signed integer. (Use 'L' suffix, e.g., `100000L`)\n• **float**: 32-bit floating point. (Use 'f' suffix, e.g., `3.14f`)\n• **double**: 64-bit floating point. (Default for decimals)\n• **boolean**: `true` or `false`.\n• **char**: Single 16-bit Unicode character (e.g., `'A'`).",
            },
            {
                heading: "Non-Primitive Data Types",
                content: "Reference types refer to objects. Examples include Strings, Arrays, Classes, Interfaces, etc.",
                code: `String message = "Hello Objects";
int[] numbers = {1, 2, 3, 4, 5};`,
                codeTitle: "ReferenceTypes.java",
            },
        ],
    },
    {
        id: 4,
        slug: "operators",
        title: "Operators",
        description: "Arithmetic, Relational, Logical, and Bitwise operators.",
        sections: [
            {
                heading: "Arithmetic Operators",
                content: "Used for mathematical operations.",
                code: `int a = 10, b = 20;

System.out.println("a + b = " + (a + b));
System.out.println("a - b = " + (a - b));
System.out.println("a * b = " + (a * b));
System.out.println("b / a = " + (b / a));
System.out.println("b % a = " + (b % a));`,
                output: "a + b = 30\na - b = -10\na * b = 200\nb / a = 2\nb % a = 0",
            },
            {
                heading: "Relational Operators",
                content: "Used to compare two values.",
                code: `int a = 10, b = 20;

System.out.println("a == b = " + (a == b));
System.out.println("a != b = " + (a != b));
System.out.println("a > b = " + (a > b));
System.out.println("a < b = " + (a < b));
System.out.println("b >= a = " + (b >= a));
System.out.println("b <= a = " + (b <= a));`,
                output: "a == b = false\na != b = true\na > b = false\na < b = true\nb >= a = true\nb <= a = false",
            },
        ],
    },
    {
        id: 5,
        slug: "control-flow",
        title: "Control Flow Statements",
        description: "Decision making with if, if-else, switch.",
        sections: [
            {
                heading: "If-Else Statement",
                content: "Executes a block of code if a specified condition is true.",
                code: `int x = 30;

if( x < 20 ) {
   System.out.print("This is if statement");
} else {
   System.out.print("This is else statement");
}`,
                output: "This is else statement",
            },
            {
                heading: "Switch Statement",
                content: "Selects one of many code blocks to be executed.",
                code: `int day = 4;
switch (day) {
  case 1:
    System.out.println("Monday");
    break;
  case 2:
    System.out.println("Tuesday");
    break;
  case 3:
    System.out.println("Wednesday");
    break;
  case 4:
    System.out.println("Thursday");
    break;
  case 5:
    System.out.println("Friday");
    break;
  case 6:
    System.out.println("Saturday");
    break;
  case 7:
    System.out.println("Sunday");
    break;
}`,
                output: "Thursday",
            },
        ],
    },
    {
        id: 6,
        slug: "loops",
        title: "Loops",
        description: "For, While, and Do-While loops.",
        sections: [
            {
                heading: "While Loop",
                content: "Loops through a block of code as long as a specified condition is true.",
                code: `int i = 0;
while (i < 5) {
  System.out.println(i);
  i++;
}`,
                output: "0\n1\n2\n3\n4",
            },
            {
                heading: "For Loop",
                content: "When you know exactly how many times you want to loop through a block of code.",
                code: `for (int i = 0; i < 5; i++) {
  System.out.println(i);
}`,
                output: "0\n1\n2\n3\n4",
            },
            {
                heading: "For-Each Loop",
                content: "Exclusively to loop through elements in an array or collection.",
                code: `String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
for (String i : cars) {
  System.out.println(i);
}`,
                output: "Volvo\nBMW\nFord\nMazda",
            },
        ],
    },
    {
        id: 7,
        slug: "oop-concepts",
        title: "Object-Oriented Programming",
        description: "Classes, Objects, Inheritance, Polymorphism, Encapsulation, and Abstraction.",
        sections: [
            {
                heading: "Classes and Objects",
                content: "A Class is a blueprint for creating objects (a particular data structure), providing initial values for state (member variables or attributes), and implementations of behavior (member functions or methods). An object is an instance of a class.",
                code: `class Car {
    String brand;
    String model;
    int year;

    // Constructor
    public Car(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    // Method
    public void displayInfo() {
        System.out.println(brand + " " + model + " (" + year + ")");
    }
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car("Toyota", "Corolla", 2022);
        myCar.displayInfo();
    }
}`,
                output: "Toyota Corolla (2022)",
                codeTitle: "ClassesAndObjects.java"
            },
            {
                heading: "Inheritance",
                content: "Inheritance allows a class to acquire the properties and methods of another class. The class that inherits is called the subclass (child), and the class being inherited from is the superclass (parent).",
                code: `class Vehicle { // Superclass
    protected String brand = "Ford";
    public void honk() {
        System.out.println("Tuut, tuut!");
    }
}

class Car extends Vehicle { // Subclass
    private String modelName = "Mustang";
    public void display() {
        System.out.println(brand + " " + modelName);
    }
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.honk();
        myCar.display();
    }
}`,
                output: "Tuut, tuut!\nFord Mustang",
                codeTitle: "InheritanceDemo.java"
            },
            {
                heading: "Polymorphism",
                content: "Polymorphism means 'many forms', and it occurs when we have many classes that are related to each other by inheritance.",
                code: `class Animal {
    public void animalSound() {
        System.out.println("The animal makes a sound");
    }
}

class Pig extends Animal {
    public void animalSound() {
        System.out.println("The pig says: wee wee");
    }
}

class Dog extends Animal {
    public void animalSound() {
        System.out.println("The dog says: bow wow");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myAnimal = new Animal();
        Animal myPig = new Pig();
        Animal myDog = new Dog();

        myAnimal.animalSound();
        myPig.animalSound();
        myDog.animalSound();
    }
}`,
                output: "The animal makes a sound\nThe pig says: wee wee\nThe dog says: bow wow",
                codeTitle: "PolymorphismDemo.java"
            }
        ]
    },
    {
        id: 8,
        slug: "exception-handling",
        title: "Exception Handling",
        description: "Try-catch blocks, throw, throws, and custom exceptions.",
        sections: [
            {
                heading: "Try-Catch Block",
                content: "Exception handling allows you to handle runtime errors gracefully, preserving the application's flow. The code that might generate an exception is placed in the try block.",
                code: `public class Main {
    public static void main(String[] args) {
        try {
            int[] myNumbers = {1, 2, 3};
            System.out.println(myNumbers[10]); // Index out of bounds
        } catch (Exception e) {
            System.out.println("Something went wrong: " + e.getMessage());
        } finally {
            System.out.println("The 'try catch' is finished.");
        }
    }
}`,
                output: "Something went wrong: Index 10 out of bounds for length 3\nThe 'try catch' is finished.",
                codeTitle: "ExceptionHandling.java"
            },
            {
                heading: "Throw and Throws",
                content: "`throw` is used to explicitly throw an exception. `throws` is used in the method signature to declare that the method might throw specific exceptions.",
                code: `class AgeValidator {
    static void checkAge(int age) throws ArithmeticException {
        if (age < 18) {
            throw new ArithmeticException("Access denied - You must be at least 18 years old.");
        } else {
            System.out.println("Access granted - You are old enough!");
        }
    }

    public static void main(String[] args) {
        try {
            checkAge(15);
        } catch (ArithmeticException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
                output: "Access denied - You must be at least 18 years old.",
                codeTitle: "ThrowDemo.java"
            }
        ]
    },
    {
        id: 9,
        slug: "collections-framework",
        title: "Collections Framework",
        description: "List, Set, Map, ArrayList, HashMap, and Iterators.",
        sections: [
            {
                heading: "ArrayList (List Interface)",
                content: "The ArrayList class is a resizable array, which can be found in the `java.util` package. The difference between a built-in array and an ArrayList is that the size of an array cannot be modified.",
                code: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> cars = new ArrayList<String>();
        cars.add("Volvo");
        cars.add("BMW");
        cars.add("Ford");
        
        System.out.println(cars);
        System.out.println("Size: " + cars.size());
        
        // Access item
        System.out.println(cars.get(0));
        
        // Remove item
        cars.remove(0);
        System.out.println(cars);
    }
}`,
                output: "[Volvo, BMW, Ford]\nSize: 3\nVolvo\n[BMW, Ford]",
                codeTitle: "ArrayListDemo.java"
            },
            {
                heading: "HashMap (Map Interface)",
                content: "A HashMap store items in \"key/value\" pairs, and you can access them by an index of another type (e.g. a String).",
                code: `import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, String> capitalCities = new HashMap<String, String>();

        // Add keys and values (Country, City)
        capitalCities.put("England", "London");
        capitalCities.put("Germany", "Berlin");
        capitalCities.put("Norway", "Oslo");
        capitalCities.put("USA", "Washington DC");
        
        System.out.println(capitalCities);
        System.out.println("Capital of England: " + capitalCities.get("England"));
        
        // Iterate
        for (String i : capitalCities.keySet()) {
             System.out.println("key: " + i + " value: " + capitalCities.get(i));
        }
    }
}`,
                output: "{USA=Washington DC, Norway=Oslo, England=London, Germany=Berlin}\nCapital of England: London\nkey: USA value: Washington DC\n...",
                codeTitle: "HashMapDemo.java"
            }
        ]
    },
    {
        id: 10,
        slug: "java-8-features",
        title: "Java 8+ Features",
        description: "Lambda Expressions, Streams API, and Optional.",
        sections: [
            {
                heading: "Lambda Expressions",
                content: "Lambda expressions usually express instances of functional interfaces (an interface with a single abstract method). They provide a clear and concise way to represent one method interface using an expression.",
                code: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<Integer> numbers = new ArrayList<Integer>();
    numbers.add(5);
    numbers.add(9);
    numbers.add(8);
    numbers.add(1);
    
    // Using Lambda in forEach
    numbers.forEach( (n) -> { System.out.println(n); } );
  }
}`,
                output: "5\n9\n8\n1",
                codeTitle: "LambdaDemo.java"
            },
            {
                heading: "Streams API",
                content: "Streams allow you to process sequences of elements declaratively (e.g., filter, sort, map).",
                code: `import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("apple", "banana", "orange", "avocado", "grape");
        
        // Filter strings starting with 'a', convert to uppercase, and sort
        List<String> result = list.stream()
            .filter(s -> s.startsWith("a"))
            .map(String::toUpperCase)
            .sorted()
            .collect(Collectors.toList());
            
        System.out.println(result);
    }
}`,
                output: "[APPLE, AVOCADO]",
                codeTitle: "StreamDemo.java"
            }
        ]
    },
    {
        id: 11,
        slug: "multithreading",
        title: "Multithreading & Concurrency",
        description: "Creating threads, Runnable interface, and Synchronization.",
        sections: [
            {
                heading: "Creating Threads (Extending Thread)",
                content: "Multithreading enables writing a program effectively usage the CPU by performing multiple tasks concurrently.",
                code: `class MyThread extends Thread {
    public void run() {
        System.out.println("This code is running in a thread");
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start();
        System.out.println("This code is outside of the thread");
    }
}`,
                output: "This code is outside of the thread\nThis code is running in a thread",
                codeTitle: "ThreadClassDemo.java",
                note: "The order of output is not guaranteed due to thread scheduling."
            },
            {
                heading: "Implementing Runnable",
                content: "This is the preferred way to create threads as it allows your class to extend another class if needed.",
                code: `class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable thread running");
    }
}

public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(new MyRunnable());
        thread.start();
    }
}`,
                output: "Runnable thread running",
                codeTitle: "RunnableDemo.java"
            }
        ]
    },
    {
        id: 12,
        slug: "file-io",
        title: "File I/O",
        description: "Reading and writing files using java.io and java.nio.",
        sections: [
            {
                heading: "Writing to a File (FileWriter)",
                content: "The `FileWriter` class is used to write character-oriented data to a file.",
                code: `import java.io.FileWriter;
import java.io.IOException;

public class Main {
  public static void main(String[] args) {
    try {
      FileWriter myWriter = new FileWriter("filename.txt");
      myWriter.write("Files in Java might be tricky, but it is fun enough!");
      myWriter.close();
      System.out.println("Successfully wrote to the file.");
    } catch (IOException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }
  }
}`,
                output: "Successfully wrote to the file.",
                codeTitle: "WriteFile.java"
            },
            {
                heading: "Reading a File (Scanner)",
                content: "Reading files can be done using the `Scanner` class.",
                code: `import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    try {
      File myObj = new File("filename.txt");
      Scanner myReader = new Scanner(myObj);
      while (myReader.hasNextLine()) {
        String data = myReader.nextLine();
        System.out.println(data);
      }
      myReader.close();
    } catch (FileNotFoundException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }
  }
}`,
                output: "Files in Java might be tricky, but it is fun enough!",
                codeTitle: "ReadFile.java"
            }
        ]
    }
];
