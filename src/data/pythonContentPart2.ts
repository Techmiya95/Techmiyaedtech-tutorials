import { Chapter } from "./pythonContent";

export const pythonChapters2: Chapter[] = [
    {
        id: 7,
        slug: "functions",
        title: "Functions",
        description: "Defining functions, arguments, return values, lambda, and scope.",
        sections: [
            {
                heading: "Defining Functions",
                content: "Functions are reusable blocks of code. They are the building blocks of any production Python application.",
                code: `def greet(name: str) -> str:
    """Return a greeting message.
    
    Args:
        name: The person's name.
    
    Returns:
        A formatted greeting string.
    """
    return f"Hello, {name}! Welcome to Techmiya."

# Call the function
message = greet("Alice")
print(message)  # Hello, Alice! Welcome to Techmiya.

# Function with default parameters
def connect_db(host="localhost", port=5432, db="mydb"):
    print(f"Connecting to {db} at {host}:{port}")
    return {"host": host, "port": port, "db": db}

connect_db()                          # Uses all defaults
connect_db(host="prod-server")        # Override host only
connect_db(port=3306, db="users")     # Keyword arguments`,
                codeTitle: "functions_basic.py",
                output: "Hello, Alice! Welcome to Techmiya.\nConnecting to mydb at localhost:5432\nConnecting to mydb at prod-server:5432\nConnecting to users at localhost:3306",
            },
            {
                heading: "*args and **kwargs",
                content: "Accept variable number of arguments — essential for building flexible APIs and decorators.",
                code: `# *args — variable positional arguments (tuple)
def calculate_total(*prices):
    return sum(prices)

print(calculate_total(10, 20, 30))       # 60
print(calculate_total(5.5, 3.2, 8.8))    # 17.5

# **kwargs — variable keyword arguments (dict)
def create_user(**kwargs):
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

create_user(name="Alice", age=30, role="engineer")

# Combining all parameter types
def api_request(method, url, *args, timeout=30, **headers):
    print(f"{method} {url}")
    print(f"Timeout: {timeout}")
    print(f"Headers: {headers}")

api_request("GET", "/api/users", 
            timeout=10, 
            Authorization="Bearer xyz",
            Content_Type="application/json")`,
                codeTitle: "args_kwargs.py",
            },
            {
                heading: "Lambda Functions",
                content: "Anonymous one-line functions used for short operations, callbacks, and sorting.",
                code: `# Lambda syntax: lambda arguments: expression
square = lambda x: x ** 2
print(square(5))  # 25

# Sorting with lambda — very common in production
users = [
    {"name": "Charlie", "age": 30},
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 35},
]
sorted_users = sorted(users, key=lambda u: u["age"])
print(sorted_users)
# [{'name': 'Alice', 'age': 25}, {'name': 'Charlie', 'age': 30}, ...]

# With map, filter, reduce
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

evens = list(filter(lambda x: x % 2 == 0, numbers))
doubled = list(map(lambda x: x * 2, numbers))

from functools import reduce
total = reduce(lambda acc, x: acc + x, numbers, 0)
print(f"Evens: {evens}")     # [2, 4, 6, 8, 10]
print(f"Doubled: {doubled}") # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
print(f"Total: {total}")     # 55`,
                codeTitle: "lambda.py",
            },
            {
                heading: "Decorators — Industry Essential",
                content: "Decorators modify function behavior without changing their code. Used everywhere: Flask routes, Django views, authentication, caching, logging.",
                code: `import time
import functools

# Basic decorator pattern
def timer(func):
    """Measure execution time of a function."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def process_data(n):
    return sum(i**2 for i in range(n))

process_data(1_000_000)  # process_data took 0.1234s

# Decorator with arguments
def retry(max_attempts=3, delay=1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise
                    print(f"Attempt {attempt} failed, retrying...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=2)
def call_api(url):
    # This will retry up to 3 times on failure
    response = requests.get(url)
    return response.json()`,
                codeTitle: "decorators.py",
                note: "Decorators are one of the most powerful Python features. Master them — they appear in every Python framework and library.",
            },
        ],
    },
    {
        id: 8,
        slug: "strings",
        title: "Strings in Python",
        description: "String methods, slicing, formatting, f-strings, and regex basics.",
        sections: [
            {
                heading: "String Methods Deep Dive",
                content: "Python strings have 40+ built-in methods. Here are the ones used daily in production.",
                code: `text = "  Hello, World! Welcome to Python Programming  "

# Whitespace handling
print(text.strip())        # Remove leading/trailing whitespace
print(text.lstrip())       # Remove left whitespace
print(text.rstrip())       # Remove right whitespace

# Case methods
print("hello".capitalize())  # "Hello"
print("hello world".title())  # "Hello World"
print("Hello".swapcase())     # "hELLO"

# Search & check methods
email = "user@techmiya.com"
print(email.find("@"))            # 4 (index of @)
print(email.index("@"))           # 4 (same but raises ValueError if not found)
print(email.count("m"))           # 2
print(email.startswith("user"))   # True
print(email.endswith(".com"))     # True

# Validation methods — essential for input validation
print("12345".isdigit())      # True
print("hello".isalpha())      # True
print("hello123".isalnum())   # True
print("  ".isspace())         # True
print("HELLO".isupper())      # True

# Replace and translate
csv_line = "name,age,city"
print(csv_line.replace(",", " | "))  # "name | age | city"

# Splitting and joining
path = "/home/user/documents/file.txt"
parts = path.split("/")       # ['', 'home', 'user', 'documents', 'file.txt']
rebuilt = "/".join(parts)      # "/home/user/documents/file.txt"

# Practical: parse CSV row
row = "Alice,30,Engineer,Bangalore"
name, age, role, city = row.split(",")`,
                codeTitle: "string_methods.py",
            },
            {
                heading: "Regular Expressions (regex)",
                content: "Pattern matching for text — used for validation, parsing, data extraction, and search.",
                code: `import re

# Basic patterns
text = "Contact us at support@techmiya.com or call +91 6363760275"

# Find email
email = re.search(r'[\\w.]+@[\\w.]+\\.\\w+', text)
print(f"Email: {email.group()}")  # support@techmiya.com

# Find phone number
phone = re.search(r'\\+?\\d[\\d\\s]{9,}', text)
print(f"Phone: {phone.group()}")  # +91 6363760275

# Common validation patterns
def validate_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def validate_password(password: str) -> dict:
    return {
        "min_length": len(password) >= 8,
        "has_upper": bool(re.search(r'[A-Z]', password)),
        "has_lower": bool(re.search(r'[a-z]', password)),
        "has_digit": bool(re.search(r'\\d', password)),
        "has_special": bool(re.search(r'[!@#$%^&*]', password)),
    }

# Find all matches
log = "ERROR at 10:30 | WARNING at 11:15 | ERROR at 14:22"
errors = re.findall(r'ERROR at (\\d{2}:\\d{2})', log)
print(errors)  # ['10:30', '14:22']

# Replace with regex
cleaned = re.sub(r'\\s+', ' ', "  too   many    spaces  ").strip()
print(cleaned)  # "too many spaces"`,
                codeTitle: "regex.py",
                note: "Regex is essential for log parsing, data cleaning, and validation in production systems. Master at least the basics.",
            },
        ],
    },
    {
        id: 9,
        slug: "lists-tuples",
        title: "Lists & Tuples",
        description: "Creating, indexing, slicing, list methods, and tuple operations.",
        sections: [
            {
                heading: "Lists — Mutable Sequences",
                content: "Lists are the most versatile data structure in Python. They are ordered, mutable, and can hold mixed types.",
                code: `# Creating lists
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True, None]
nested = [[1, 2], [3, 4], [5, 6]]
from_range = list(range(1, 11))  # [1, 2, ..., 10]

# Indexing and slicing
fruits = ["apple", "banana", "cherry", "date", "elderberry"]
print(fruits[0])      # "apple" (first)
print(fruits[-1])     # "elderberry" (last)
print(fruits[1:4])    # ["banana", "cherry", "date"]
print(fruits[::2])    # ["apple", "cherry", "elderberry"] (every 2nd)
print(fruits[::-1])   # Reversed list

# Essential list methods
tasks = ["code", "test"]
tasks.append("deploy")              # Add to end
tasks.insert(1, "review")           # Insert at index
tasks.extend(["monitor", "log"])    # Add multiple items
print(tasks)
# ['code', 'review', 'test', 'deploy', 'monitor', 'log']

tasks.remove("test")       # Remove first occurrence
popped = tasks.pop()       # Remove and return last item
tasks.sort()               # Sort in place
tasks.reverse()            # Reverse in place
idx = tasks.index("code")  # Find index of item
count = tasks.count("code")  # Count occurrences

# Copying lists (IMPORTANT — common bug source)
original = [1, 2, [3, 4]]
shallow = original.copy()        # Shallow copy
import copy
deep = copy.deepcopy(original)   # Deep copy — nested objects too`,
                codeTitle: "lists.py",
                note: "Always use deep copy when your list contains nested mutable objects. Shallow copy only copies references to nested objects — modifying them affects both copies.",
            },
            {
                heading: "Tuples — Immutable Sequences",
                content: "Tuples are like lists but immutable. They are faster, hashable (can be dict keys), and signal intent that data shouldn't change.",
                code: `# Creating tuples
point = (10, 20)
rgb = (255, 128, 0)
single = (42,)             # Single-element tuple (note the comma!)
from_list = tuple([1,2,3])

# Tuple unpacking — used constantly in Python
x, y = point
r, g, b = rgb
first, *rest = [1, 2, 3, 4, 5]  # first=1, rest=[2,3,4,5]
first, *middle, last = [1, 2, 3, 4, 5]  # first=1, middle=[2,3,4], last=5

# Named tuples — lightweight classes for structured data
from collections import namedtuple

User = namedtuple("User", ["name", "email", "role"])
alice = User("Alice", "alice@techmiya.com", "engineer")
print(alice.name)    # "Alice"
print(alice.email)   # "alice@techmiya.com"

# Tuples as dictionary keys (lists can't be used as keys)
grid = {}
grid[(0, 0)] = "origin"
grid[(1, 2)] = "point A"

# When to use tuple vs list:
# Tuple: coordinates, RGB colors, database rows, function returns
# List: collections you need to modify, dynamic data`,
                codeTitle: "tuples.py",
            },
        ],
    },
    {
        id: 10,
        slug: "dictionaries-sets",
        title: "Dictionaries & Sets",
        description: "Key-value pairs, dictionary methods, sets, and frozen sets.",
        sections: [
            {
                heading: "Dictionaries — Key-Value Store",
                content: "Dictionaries are hash maps — O(1) average lookup. They are the backbone of Python data handling: JSON, configs, caching, and more.",
                code: `# Creating dictionaries
user = {
    "name": "Alice",
    "age": 30,
    "email": "alice@techmiya.com",
    "skills": ["Python", "SQL", "AWS"],
}

# Accessing values
print(user["name"])             # "Alice"
print(user.get("phone", "N/A"))  # "N/A" (safe access with default)

# Modifying
user["age"] = 31                 # Update value
user["phone"] = "+91-999"        # Add new key
del user["phone"]                # Delete key
skills = user.pop("skills")     # Remove and return

# Iteration
for key in user:                 # Keys only
    print(key)
for key, value in user.items():  # Key-value pairs
    print(f"{key}: {value}")
for value in user.values():      # Values only
    print(value)

# Dictionary comprehension
prices = {"apple": 1.5, "banana": 0.5, "mango": 2.5, "grape": 3.0}
expensive = {k: v for k, v in prices.items() if v > 1.0}
# {'apple': 1.5, 'mango': 2.5, 'grape': 3.0}

# Merging dictionaries (Python 3.9+)
defaults = {"theme": "dark", "lang": "en", "page_size": 25}
user_prefs = {"theme": "light", "lang": "hi"}
config = defaults | user_prefs  # user_prefs overrides defaults
# {'theme': 'light', 'lang': 'hi', 'page_size': 25}

# defaultdict — auto-initialize missing keys
from collections import defaultdict
word_count = defaultdict(int)
for word in "hello world hello python hello".split():
    word_count[word] += 1
print(dict(word_count))  # {'hello': 3, 'world': 1, 'python': 1}`,
                codeTitle: "dictionaries.py",
            },
            {
                heading: "Sets — Unique Collections",
                content: "Sets store unique elements with O(1) lookup. Perfect for deduplication, membership testing, and mathematical set operations.",
                code: `# Creating sets
fruits = {"apple", "banana", "cherry"}
from_list = set([1, 2, 2, 3, 3, 3])  # {1, 2, 3}
empty_set = set()  # NOT {} — that creates an empty dict!

# Set operations — very powerful
backend = {"Python", "Java", "Go", "Rust"}
frontend = {"JavaScript", "TypeScript", "Python"}

print(backend & frontend)   # Intersection: {'Python'}
print(backend | frontend)   # Union: all languages
print(backend - frontend)   # Difference: {'Java', 'Go', 'Rust'}
print(backend ^ frontend)   # Symmetric difference (XOR)

# Practical: find common users
premium_users = {"alice", "bob", "charlie"}
active_users = {"bob", "dave", "charlie", "eve"}
premium_and_active = premium_users & active_users  # {'bob', 'charlie'}
inactive_premium = premium_users - active_users     # {'alice'}

# Performance: set vs list for lookups
# List: O(n) — checks each element
# Set:  O(1) — hash-based instant lookup
valid_codes = set(range(100000))  # Use set for large lookups
if 42 in valid_codes:  # Instant!
    print("Valid")`,
                codeTitle: "sets.py",
                note: "When checking membership in large collections, always convert to a set first. 'x in my_set' is O(1) vs 'x in my_list' which is O(n).",
            },
        ],
    },
    {
        id: 11,
        slug: "file-handling",
        title: "File Handling",
        description: "Reading and writing files, CSV, JSON, and exception handling with files.",
        sections: [
            {
                heading: "Reading and Writing Files",
                content: "File I/O is fundamental. Always use the 'with' statement (context manager) to ensure files are properly closed.",
                code: `# Writing to a file
with open("output.txt", "w") as f:
    f.write("Hello, Techmiya!\\n")
    f.write("Python file handling tutorial\\n")

# Reading entire file
with open("output.txt", "r") as f:
    content = f.read()
    print(content)

# Reading line by line (memory-efficient for large files)
with open("output.txt", "r") as f:
    for line in f:
        print(line.strip())

# Appending to a file
with open("output.txt", "a") as f:
    f.write("New line appended\\n")

# Reading into a list of lines
with open("output.txt", "r") as f:
    lines = f.readlines()
    print(lines)

# Binary files (images, PDFs, etc.)
with open("image.png", "rb") as f:
    data = f.read()

# File modes: r (read), w (write), a (append), 
#             rb/wb (binary), r+ (read+write)`,
                codeTitle: "file_basics.py",
            },
            {
                heading: "Working with JSON — Industry Standard",
                content: "JSON is the universal data exchange format for APIs, configs, and data storage.",
                code: `import json

# Python dict to JSON string
data = {
    "name": "Techmiya",
    "courses": ["Python", "Java", "AWS"],
    "students": 10000,
    "active": True
}

# Write JSON to file
with open("config.json", "w") as f:
    json.dump(data, f, indent=2)

# Read JSON from file
with open("config.json", "r") as f:
    loaded = json.load(f)
    print(loaded["name"])  # "Techmiya"

# JSON string conversion
json_str = json.dumps(data, indent=2)
parsed = json.loads(json_str)

# Handling API responses
import requests

response = requests.get("https://api.github.com/users/python")
user_data = response.json()  # Parse JSON response
print(f"Name: {user_data.get('name')}")
print(f"Repos: {user_data.get('public_repos')}")`,
                codeTitle: "json_handling.py",
                note: "Always use json.loads/dumps for API data. Never use eval() to parse data — it's a critical security vulnerability.",
            },
            {
                heading: "Working with CSV Files",
                content: "CSV (Comma-Separated Values) is the most common format for tabular data in data science and business applications.",
                code: `import csv

# Writing CSV
employees = [
    ["Name", "Department", "Salary"],
    ["Alice", "Engineering", 95000],
    ["Bob", "Marketing", 72000],
    ["Charlie", "Engineering", 88000],
]

with open("employees.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(employees)

# Reading CSV
with open("employees.csv", "r") as f:
    reader = csv.reader(f)
    header = next(reader)  # Skip header
    for row in reader:
        name, dept, salary = row
        print(f"{name} - {dept} - \${salary}")

# DictReader/DictWriter — more readable
with open("employees.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['Name']} earns {row['Salary']}")

# Writing with DictWriter
with open("output.csv", "w", newline="") as f:
    fieldnames = ["name", "score", "grade"]
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerow({"name": "Alice", "score": 95, "grade": "A"})`,
                codeTitle: "csv_handling.py",
            },
        ],
    },
    {
        id: 12,
        slug: "oop",
        title: "Object-Oriented Programming",
        description: "Classes, objects, inheritance, polymorphism, encapsulation, and abstraction.",
        sections: [
            {
                heading: "Classes and Objects",
                content: "OOP organizes code into reusable, logical structures. Python's OOP is clean and powerful.",
                code: `class User:
    """Represents a user in the system."""
    
    # Class variable — shared by all instances
    platform = "Techmiya"
    _user_count = 0
    
    def __init__(self, name: str, email: str, role: str = "student"):
        """Initialize a new User instance."""
        self.name = name          # Public attribute
        self.email = email
        self.role = role
        self._login_count = 0     # Protected (convention)
        self.__password = None    # Private (name-mangled)
        User._user_count += 1
    
    def login(self):
        self._login_count += 1
        return f"{self.name} logged in (count: {self._login_count})"
    
    def __str__(self):
        return f"User({self.name}, {self.role})"
    
    def __repr__(self):
        return f"User(name='{self.name}', email='{self.email}')"
    
    @classmethod
    def get_user_count(cls):
        return cls._user_count
    
    @staticmethod
    def validate_email(email: str) -> bool:
        return "@" in email and "." in email

# Usage
alice = User("Alice", "alice@techmiya.com", "engineer")
bob = User("Bob", "bob@techmiya.com")

print(alice)                        # User(Alice, engineer)
print(alice.login())                # Alice logged in (count: 1)
print(User.get_user_count())        # 2
print(User.validate_email("test"))  # False`,
                codeTitle: "classes.py",
            },
            {
                heading: "Inheritance and Polymorphism",
                content: "Build class hierarchies to share and extend behavior. This is the foundation of scalable application architecture.",
                code: `from abc import ABC, abstractmethod

# Abstract base class
class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass
    
    @abstractmethod
    def perimeter(self) -> float:
        pass
    
    def describe(self):
        return f"{self.__class__.__name__}: area={self.area():.2f}"

class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height
    
    def area(self) -> float:
        return self.width * self.height
    
    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius
    
    def area(self) -> float:
        import math
        return math.pi * self.radius ** 2
    
    def perimeter(self) -> float:
        import math
        return 2 * math.pi * self.radius

# Polymorphism in action
shapes = [Rectangle(5, 3), Circle(4), Rectangle(10, 2)]
for shape in shapes:
    print(shape.describe())  # Each calls its own area()

# Output:
# Rectangle: area=15.00
# Circle: area=50.27
# Rectangle: area=20.00`,
                codeTitle: "inheritance.py",
            },
            {
                heading: "Dataclasses — Modern Python OOP",
                content: "Python 3.7+ dataclasses reduce boilerplate for data-holding classes. Used extensively in modern production code.",
                code: `from dataclasses import dataclass, field
from typing import List, Optional
from datetime import datetime

@dataclass
class Product:
    name: str
    price: float
    category: str
    in_stock: bool = True
    tags: List[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.now)
    
    @property
    def display_price(self) -> str:
        return f"Rs. {self.price:,.2f}"
    
    def apply_discount(self, percent: float) -> float:
        return self.price * (1 - percent / 100)

# Auto-generates __init__, __repr__, __eq__
laptop = Product("MacBook Pro", 199999.0, "Electronics", tags=["premium"])
phone = Product("iPhone 15", 79999.0, "Electronics")

print(laptop)
# Product(name='MacBook Pro', price=199999.0, ...)
print(laptop.display_price)  # Rs. 1,99,999.00
print(laptop == phone)       # False (auto __eq__)

# Frozen dataclass — immutable
@dataclass(frozen=True)
class Config:
    host: str
    port: int
    debug: bool = False

config = Config("localhost", 8080)
# config.port = 3000  # Error! FrozenInstanceError`,
                codeTitle: "dataclasses.py",
                note: "Prefer dataclasses over regular classes when the primary purpose is storing data. They reduce boilerplate by 60-70% and are the industry standard for DTOs and models.",
            },
        ],
    },
];
