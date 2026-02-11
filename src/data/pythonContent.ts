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

export const pythonChapters: Chapter[] = [
    {
        id: 1,
        slug: "introduction",
        title: "Introduction to Python",
        description: "What is Python, history, features, and why learn Python.",
        sections: [
            {
                heading: "What is Python?",
                content:
                    "Python is a high-level, general-purpose, interpreted programming language created by Guido van Rossum in 1991. It emphasizes code readability with its use of significant indentation and supports multiple programming paradigms including procedural, object-oriented, and functional programming.\n\nPython is used extensively in web development, data science, machine learning, artificial intelligence, automation, scripting, DevOps, and cloud infrastructure. Companies like Google, Netflix, Instagram, Spotify, Dropbox, and NASA rely on Python for mission-critical systems.",
            },
            {
                heading: "Key Features of Python",
                content:
                    "• **Easy to Learn & Read** — Python's syntax is clean, concise, and mirrors natural English, making it ideal for beginners.\n• **Interpreted Language** — Python executes code line by line, which simplifies debugging.\n• **Dynamically Typed** — No need to declare variable types; Python infers them at runtime.\n• **Cross-Platform** — Write once, run anywhere — Windows, macOS, Linux.\n• **Huge Standard Library** — Batteries included: file I/O, HTTP, JSON, regex, threading, and more.\n• **Third-Party Ecosystem** — Over 400,000 packages on PyPI (pip install).\n• **Community Support** — One of the largest developer communities worldwide.",
            },
            {
                heading: "Python in the Industry",
                content:
                    "Python is the #1 language on the TIOBE Index and StackOverflow Developer Survey. Here's how it's used across industries:\n\n• **Web Development** — Django, Flask, FastAPI for scalable backend APIs.\n• **Data Science & Analytics** — Pandas, NumPy, Matplotlib, Seaborn.\n• **Machine Learning & AI** — TensorFlow, PyTorch, scikit-learn, Keras.\n• **DevOps & Automation** — Ansible, SaltStack, Fabric, Boto3 (AWS SDK).\n• **Cybersecurity** — Penetration testing tools, network scanners.\n• **Finance** — Algorithmic trading, risk modeling, quantitative analysis.",
            },
            {
                heading: "Your First Python Program",
                content: "Let's write the classic Hello World program:",
                code: `# This is a comment — Python ignores it
# The print() function outputs text to the console

print("Hello, World!")
print("Welcome to Techmiya Python Tutorials")

# You can also print numbers and expressions
print(42)
print(10 + 20)`,
                codeTitle: "hello_world.py",
                output: "Hello, World!\nWelcome to Techmiya Python Tutorials\n42\n30",
            },
            {
                heading: "Python 2 vs Python 3",
                content:
                    "Python 2 reached end-of-life on January 1, 2020. All modern development should use **Python 3.x** (3.10+ recommended). Key differences:\n\n• `print` is a function in Python 3: `print(\"hello\")` vs `print \"hello\"`\n• Integer division: `5/2` returns `2.5` in Python 3 (was `2` in Python 2)\n• All strings are Unicode in Python 3\n• `range()` returns an iterator in Python 3 (was a list in Python 2)",
                note: "Always use Python 3.10 or later for new projects. Python 2 is no longer maintained and has known security vulnerabilities.",
            },
        ],
    },
    {
        id: 2,
        slug: "installation",
        title: "Python Installation & Setup",
        description: "Installing Python, setting up IDE, running your first program.",
        sections: [
            {
                heading: "Installing Python on Windows",
                content:
                    "Follow these steps to install Python on Windows:\n\n1. Go to https://www.python.org/downloads/\n2. Download the latest Python 3.x installer\n3. **Important:** Check the box ✅ \"Add Python to PATH\" during installation\n4. Click 'Install Now'\n5. Verify the installation by opening Command Prompt:",
                code: `# Open Command Prompt (cmd) or PowerShell and type:
python --version
# Output: Python 3.12.x

pip --version
# Output: pip 24.x.x from ...`,
                codeTitle: "Verify Installation",
                output: "Python 3.12.1\npip 24.0 from C:\\Python312\\lib\\site-packages (python 3.12)",
            },
            {
                heading: "Installing on macOS & Linux",
                content: "macOS and most Linux distributions come with Python pre-installed, but it may be Python 2. Install the latest Python 3:",
                code: `# macOS (using Homebrew)
brew install python3

# Ubuntu / Debian
sudo apt update
sudo apt install python3 python3-pip python3-venv

# Fedora / CentOS
sudo dnf install python3 python3-pip

# Verify
python3 --version
pip3 --version`,
                codeTitle: "macOS & Linux Installation",
            },
            {
                heading: "Setting Up a Virtual Environment",
                content:
                    "Virtual environments are essential in production Python development. They isolate project dependencies so different projects can use different package versions without conflicts.",
                code: `# Create a virtual environment
python -m venv myproject_env

# Activate it
# Windows:
myproject_env\\Scripts\\activate

# macOS/Linux:
source myproject_env/bin/activate

# Your prompt changes to show the active environment:
# (myproject_env) C:\\Users\\you>

# Install packages inside the virtual environment
pip install requests flask

# Freeze dependencies to a file
pip freeze > requirements.txt

# Deactivate when done
deactivate`,
                codeTitle: "Virtual Environment Setup",
                note: "ALWAYS use virtual environments for real projects. Never install packages globally with pip — it leads to dependency conflicts.",
            },
            {
                heading: "Choosing an IDE / Code Editor",
                content:
                    "For professional Python development, use one of these:\n\n• **VS Code** (Free) — Lightweight, extensible, excellent Python extension by Microsoft. Best for most developers.\n• **PyCharm** (Free Community / Paid Pro) — Full-featured Python IDE with debugger, testing, and refactoring tools.\n• **Jupyter Notebook** — Interactive notebooks for data science. Great for exploration and visualization.\n• **Vim / Neovim** — Terminal-based editors for advanced users.\n\nWe recommend **VS Code** with the Python extension for this tutorial series.",
            },
            {
                heading: "Running Python Code",
                content: "There are multiple ways to run Python code:",
                code: `# 1. Interactive REPL — type 'python' in terminal
>>> 2 + 3
5
>>> print("Hello from REPL")
Hello from REPL
>>> exit()

# 2. Run a script file
# Save code to a .py file, then:
python my_script.py

# 3. Run as a module
python -m my_module

# 4. Jupyter Notebook
jupyter notebook`,
                codeTitle: "Running Python",
            },
        ],
    },
    {
        id: 3,
        slug: "variables-data-types",
        title: "Variables & Data Types",
        description: "Numbers, strings, booleans, type conversion, and naming rules.",
        sections: [
            {
                heading: "Variables in Python",
                content:
                    "A variable is a name that refers to a value stored in memory. Python is dynamically typed — you don't declare types explicitly.",
                code: `# Variable assignment
name = "Techmiya"          # str
age = 25                    # int
salary = 75000.50           # float
is_active = True            # bool

# Multiple assignment
x, y, z = 10, 20, 30

# Same value to multiple variables
a = b = c = 0

# Check variable type
print(type(name))     # <class 'str'>
print(type(age))      # <class 'int'>
print(type(salary))   # <class 'float'>
print(type(is_active))# <class 'bool'>`,
                codeTitle: "variables.py",
                output: "<class 'str'>\n<class 'int'>\n<class 'float'>\n<class 'bool'>",
            },
            {
                heading: "Variable Naming Rules",
                content:
                    "Follow these rules and conventions:\n\n• Must start with a letter or underscore: `name`, `_private`, `__dunder__`\n• Can contain letters, digits, and underscores: `user_age`, `count2`\n• Case-sensitive: `Name` ≠ `name` ≠ `NAME`\n• Cannot use Python keywords: `if`, `for`, `class`, `return`, etc.\n\n**Python Naming Conventions (PEP 8):**\n• Variables & functions: `snake_case` → `user_name`, `calculate_total()`\n• Constants: `UPPER_SNAKE_CASE` → `MAX_RETRIES`, `API_KEY`\n• Classes: `PascalCase` → `UserProfile`, `DatabaseConnection`\n• Private: prefix with `_` → `_internal_method`",
            },
            {
                heading: "Numeric Types — int, float, complex",
                content: "Python handles numbers with precision and supports arbitrarily large integers.",
                code: `# Integers — unlimited precision
count = 42
big_number = 10**100  # Googol — Python handles this!
hex_val = 0xFF        # 255
bin_val = 0b1010      # 10
oct_val = 0o17        # 15

# Floats — 64-bit double precision (IEEE 754)
price = 19.99
scientific = 2.5e6    # 2,500,000.0
tiny = 1.23e-4        # 0.000123

# Complex numbers (used in engineering/science)
z = 3 + 4j
print(z.real)    # 3.0
print(z.imag)    # 4.0
print(abs(z))    # 5.0 (magnitude)

# Numeric operations
print(10 / 3)    # 3.3333... (true division)
print(10 // 3)   # 3 (floor division)
print(10 % 3)    # 1 (modulus)
print(2 ** 10)   # 1024 (exponentiation)

# Underscores for readability (Python 3.6+)
population = 1_400_000_000  # Same as 1400000000`,
                codeTitle: "numbers.py",
                output: "3.0\n4.0\n5.0\n3.3333333333333335\n3\n1\n1024",
            },
            {
                heading: "Strings — str",
                content: "Strings are immutable sequences of characters. Python has powerful string handling.",
                code: `# String creation
single = 'Hello'
double = "World"
multi = """This is a
multi-line string"""
raw = r"C:\\Users\\path"  # Raw string — no escape processing

# String operations
name = "Python"
print(len(name))          # 6
print(name[0])            # P (indexing)
print(name[-1])           # n (negative indexing)
print(name[1:4])          # yth (slicing)
print(name[::-1])         # nohtyP (reverse)

# String methods (industry essentials)
text = "  Hello, World!  "
print(text.strip())       # "Hello, World!" (trim whitespace)
print(text.lower())       # "  hello, world!  "
print(text.upper())       # "  HELLO, WORLD!  "
print(text.replace("World", "Python"))
print("Hello".startswith("He"))  # True
print("data.csv".endswith(".csv"))  # True
print(",".join(["a", "b", "c"]))   # "a,b,c"
print("a,b,c".split(","))          # ['a', 'b', 'c']

# f-strings (Python 3.6+) — INDUSTRY STANDARD
name = "Techmiya"
version = 3.12
print(f"Welcome to {name}! Python {version}")
print(f"2 + 3 = {2 + 3}")
print(f"{'Python':>15}")   # Right-align in 15 chars
print(f"{3.14159:.2f}")    # "3.14" (2 decimal places)`,
                codeTitle: "strings.py",
                output: '6\nP\nn\nyth\nnohtyP\nHello, World!\n  hello, world!  \n  HELLO, WORLD!  \nWelcome to Techmiya! Python 3.12\n2 + 3 = 5\n         Python\n3.14',
            },
            {
                heading: "Booleans & None",
                content: "Boolean values represent truth and are fundamental to control flow.",
                code: `# Boolean values
is_valid = True
has_access = False

# Truthy and Falsy values
# Falsy: False, 0, 0.0, "", [], {}, set(), None
# Everything else is Truthy

print(bool(0))        # False
print(bool(42))       # True
print(bool(""))       # False
print(bool("hello"))  # True
print(bool([]))       # False
print(bool([1, 2]))   # True

# None — represents absence of value
result = None
print(result is None)  # True (use 'is', not '==')
print(type(None))      # <class 'NoneType'>

# Boolean operations
print(True and False)  # False
print(True or False)   # True
print(not True)        # False`,
                codeTitle: "booleans.py",
            },
            {
                heading: "Type Conversion (Casting)",
                content: "Converting between types is common in real-world applications — handling user input, API responses, database records, etc.",
                code: `# Explicit type conversion
num_str = "42"
num_int = int(num_str)       # str → int
num_float = float(num_str)   # str → float
back_to_str = str(num_int)   # int → str

print(type(num_int))    # <class 'int'>
print(type(num_float))  # <class 'float'>

# Common real-world pattern: user input is always a string
user_input = input("Enter your age: ")  # Returns str
age = int(user_input)  # Convert to int for calculations

# Safe conversion with error handling
def safe_int(value, default=0):
    """Convert to int safely — industry pattern."""
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

print(safe_int("123"))     # 123
print(safe_int("abc"))     # 0 (default)
print(safe_int(None, -1))  # -1

# List / Tuple / Set conversions
my_list = [1, 2, 2, 3, 3]
my_set = set(my_list)     # {1, 2, 3} — removes duplicates
my_tuple = tuple(my_set)  # (1, 2, 3) — immutable`,
                codeTitle: "type_conversion.py",
                note: "Always validate and convert user input. Never trust external data — this is a core security principle in production systems.",
            },
        ],
    },
    {
        id: 4,
        slug: "operators",
        title: "Operators in Python",
        description: "Arithmetic, comparison, logical, assignment, and bitwise operators.",
        sections: [
            {
                heading: "Arithmetic Operators",
                content: "Standard mathematical operations with some Python-specific behaviors.",
                code: `a, b = 17, 5

print(f"{a} + {b} = {a + b}")     # 22 (Addition)
print(f"{a} - {b} = {a - b}")     # 12 (Subtraction)
print(f"{a} * {b} = {a * b}")     # 85 (Multiplication)
print(f"{a} / {b} = {a / b}")     # 3.4 (True Division — always returns float)
print(f"{a} // {b} = {a // b}")   # 3 (Floor Division — rounds down)
print(f"{a} % {b} = {a % b}")     # 2 (Modulus — remainder)
print(f"{a} ** {b} = {a ** b}")   # 1419857 (Exponentiation)

# Floor division with negatives — rounds toward -infinity
print(-17 // 5)   # -4 (not -3!)
print(17 // -5)   # -4

# Practical uses
total_seconds = 3725
minutes = total_seconds // 60    # 62
seconds = total_seconds % 60     # 5
print(f"{minutes}m {seconds}s")  # "62m 5s"`,
                codeTitle: "arithmetic.py",
                output: "17 + 5 = 22\n17 - 5 = 12\n17 * 5 = 85\n17 / 5 = 3.4\n17 // 5 = 3\n17 % 5 = 2\n17 ** 5 = 1419857\n-4\n-4\n62m 5s",
            },
            {
                heading: "Comparison Operators",
                content: "Return Boolean values. Used extensively in conditionals, filtering, and validation.",
                code: `x, y = 10, 20

print(x == y)    # False (equal to)
print(x != y)    # True  (not equal to)
print(x > y)     # False (greater than)
print(x < y)     # True  (less than)
print(x >= 10)   # True  (greater than or equal)
print(x <= 5)    # False (less than or equal)

# Chained comparisons — Pythonic and industry-preferred
age = 25
print(18 <= age <= 65)   # True — readable and clean!

# String comparisons (lexicographic / alphabetical)
print("apple" < "banana")   # True
print("Python" == "python") # False — case-sensitive

# Identity operators (is vs ==)
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)   # True — same VALUE
print(a is b)   # False — different OBJECTS in memory
print(a is c)   # True — same object reference

# Membership operators
fruits = ["apple", "banana", "mango"]
print("apple" in fruits)       # True
print("grape" not in fruits)   # True
print("Py" in "Python")        # True — works with strings too`,
                codeTitle: "comparison.py",
                note: "Use '==' for value comparison and 'is' for identity (same object in memory). Always use 'is' when comparing to None: `if x is None:`",
            },
            {
                heading: "Logical Operators",
                content: "Combine Boolean expressions. Python uses English words instead of symbols (&&, ||, !).",
                code: `# and — True only if BOTH are True
# or  — True if AT LEAST ONE is True
# not — Inverts the value

age = 25
has_license = True
has_insurance = True

# All conditions must be true
can_drive = age >= 18 and has_license and has_insurance
print(f"Can drive: {can_drive}")  # True

# At least one condition
is_weekend = False
is_holiday = True
day_off = is_weekend or is_holiday
print(f"Day off: {day_off}")  # True

# Short-circuit evaluation — Python stops early
# 'and' stops at first False; 'or' stops at first True
def check():
    print("check() was called")
    return True

# check() is NOT called because first operand is False
result = False and check()

# Industry pattern: default values using 'or'
username = "" or "anonymous"       # "anonymous"
config_port = None or 8080         # 8080
api_key = os.environ.get("API_KEY") or "default-key"`,
                codeTitle: "logical.py",
            },
            {
                heading: "Assignment & Augmented Assignment",
                content: "Shorthand operators for modifying variables in place.",
                code: `# Basic assignment
x = 10

# Augmented assignment operators
x += 5    # x = x + 5  → 15
x -= 3    # x = x - 3  → 12
x *= 2    # x = x * 2  → 24
x //= 5   # x = x // 5 → 4
x **= 3   # x = x ** 3 → 64
x %= 10   # x = x % 10 → 4

# Walrus operator := (Python 3.8+) — Assignment Expression
# Assign AND use a value in one expression
import re

# Without walrus
line = input()
match = re.search(r'\\d+', line)
if match:
    print(match.group())

# With walrus — cleaner
if match := re.search(r'\\d+', line):
    print(match.group())

# Walrus in while loop
while (chunk := file.read(8192)):
    process(chunk)

# Walrus in list comprehension
results = [y for x in data if (y := expensive_function(x)) > threshold]`,
                codeTitle: "assignment.py",
                note: "The walrus operator (:=) is heavily used in production Python 3.8+ code. It reduces redundancy and makes code more readable.",
            },
            {
                heading: "Bitwise Operators",
                content: "Operate on individual bits. Used in low-level programming, flags, permissions, and performance-critical code.",
                code: `a = 0b1100  # 12 in binary
b = 0b1010  # 10 in binary

print(f"a & b  = {a & b:04b}")   # AND:  1000 (8)
print(f"a | b  = {a | b:04b}")   # OR:   1110 (14)
print(f"a ^ b  = {a ^ b:04b}")   # XOR:  0110 (6)
print(f"~a     = {~a}")           # NOT: -13 (inverts all bits)
print(f"a << 2 = {a << 2}")      # Left shift:  48 (multiply by 4)
print(f"a >> 1 = {a >> 1}")      # Right shift: 6 (divide by 2)

# Industry use case: Permission flags
READ    = 0b100  # 4
WRITE   = 0b010  # 2
EXECUTE = 0b001  # 1

# Set permissions using OR
user_perms = READ | WRITE       # 6 (read + write)

# Check permissions using AND
can_read = bool(user_perms & READ)      # True
can_execute = bool(user_perms & EXECUTE) # False

# Add permission
user_perms |= EXECUTE  # Now has read + write + execute

# Remove permission
user_perms &= ~WRITE   # Remove write permission`,
                codeTitle: "bitwise.py",
            },
            {
                heading: "Operator Precedence",
                content: "When multiple operators appear in an expression, Python follows this order (highest to lowest):\n\n1. `**` — Exponentiation\n2. `~`, `+x`, `-x` — Unary operators\n3. `*`, `/`, `//`, `%` — Multiplication, division\n4. `+`, `-` — Addition, subtraction\n5. `<<`, `>>` — Bitwise shifts\n6. `&` — Bitwise AND\n7. `^` — Bitwise XOR\n8. `|` — Bitwise OR\n9. `==`, `!=`, `<`, `>`, `<=`, `>=`, `is`, `in` — Comparisons\n10. `not` — Logical NOT\n11. `and` — Logical AND\n12. `or` — Logical OR",
                code: `# Precedence examples
result = 2 + 3 * 4      # 14 (not 20!) — * before +
result = (2 + 3) * 4    # 20 — parentheses override

# Common gotcha
print(2 ** 3 ** 2)       # 512 (not 64!) — ** is right-associative
# Evaluated as 2 ** (3 ** 2) = 2 ** 9 = 512

# Best practice: USE PARENTHESES for clarity
# Even when not strictly needed, they improve readability
total = (base_price * quantity) + (tax_rate * base_price) - discount`,
                codeTitle: "precedence.py",
                note: "When in doubt, use parentheses. Code is read far more often than it is written — clarity beats cleverness.",
            },
        ],
    },
    {
        id: 5,
        slug: "control-flow",
        title: "Control Flow — if, elif, else",
        description: "Conditional statements, nested conditions, and ternary expressions.",
        sections: [
            {
                heading: "if, elif, else Statements",
                content: "Control flow lets your program make decisions based on conditions. Python uses indentation (4 spaces) to define code blocks — no curly braces needed.",
                code: `# Basic if-elif-else
score = 85

if score >= 90:
    grade = "A"
    print("Excellent!")
elif score >= 80:
    grade = "B"
    print("Good job!")
elif score >= 70:
    grade = "C"
    print("Average")
elif score >= 60:
    grade = "D"
    print("Below average")
else:
    grade = "F"
    print("Fail")

print(f"Grade: {grade}")  # Grade: B`,
                codeTitle: "conditionals.py",
                output: "Good job!\nGrade: B",
            },
            {
                heading: "Ternary (Conditional) Expression",
                content: "One-line if-else — used extensively in production code for concise assignments.",
                code: `# Syntax: value_if_true if condition else value_if_false

age = 20
status = "adult" if age >= 18 else "minor"
print(status)  # "adult"

# Nested ternary (use sparingly — readability matters)
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "F"

# Industry patterns
# 1. Default values
username = user_input.strip() if user_input else "anonymous"

# 2. API response formatting
response = {"status": "success" if result else "error"}

# 3. Logging
log_level = "DEBUG" if is_development else "WARNING"`,
                codeTitle: "ternary.py",
            },
            {
                heading: "Pattern Matching — match/case (Python 3.10+)",
                content: "Python 3.10 introduced structural pattern matching — similar to switch/case but far more powerful.",
                code: `# Basic match/case
def handle_command(command):
    match command.split():
        case ["quit"]:
            print("Quitting...")
            return False
        case ["hello", name]:
            print(f"Hello, {name}!")
        case ["add", *numbers]:
            total = sum(int(n) for n in numbers)
            print(f"Sum: {total}")
        case _:
            print(f"Unknown command: {command}")
    return True

handle_command("hello Techmiya")   # Hello, Techmiya!
handle_command("add 1 2 3 4")      # Sum: 10
handle_command("quit")             # Quitting...

# Pattern matching with types — powerful for API handling
def process_response(response):
    match response:
        case {"status": 200, "data": data}:
            return f"Success: {data}"
        case {"status": 404}:
            return "Not found"
        case {"status": status} if status >= 500:
            return f"Server error: {status}"
        case _:
            return "Unknown response"`,
                codeTitle: "pattern_matching.py",
                note: "match/case is invaluable for parsing API responses, command-line arguments, and protocol messages in production systems.",
            },
            {
                heading: "Guard Clauses — Industry Best Practice",
                content: "Instead of deeply nested if-else blocks, use early returns (guard clauses) to handle edge cases first. This is the standard in production codebases.",
                code: `# ❌ Bad: deeply nested (pyramid of doom)
def process_order(order):
    if order is not None:
        if order.is_valid():
            if order.has_stock():
                if order.payment_verified():
                    ship_order(order)
                    return "shipped"
                else:
                    return "payment failed"
            else:
                return "out of stock"
        else:
            return "invalid order"
    else:
        return "no order"

# ✅ Good: guard clauses — flat and readable
def process_order(order):
    if order is None:
        return "no order"
    if not order.is_valid():
        return "invalid order"
    if not order.has_stock():
        return "out of stock"
    if not order.payment_verified():
        return "payment failed"
    
    ship_order(order)
    return "shipped"`,
                codeTitle: "guard_clauses.py",
                note: "Guard clauses dramatically improve readability. Google, Meta, and most open-source projects enforce this pattern in code reviews.",
            },
        ],
    },
    {
        id: 6,
        slug: "loops",
        title: "Loops — for & while",
        description: "For loops, while loops, break, continue, range(), and nested loops.",
        sections: [
            {
                heading: "for Loop",
                content: "Python's for loop iterates over any iterable — lists, strings, ranges, dictionaries, files, and more.",
                code: `# Iterating over a list
languages = ["Python", "Java", "JavaScript", "C++"]
for lang in languages:
    print(f"Learn {lang}")

# Iterating with index using enumerate()
for index, lang in enumerate(languages):
    print(f"{index + 1}. {lang}")

# Iterating over a string
for char in "Python":
    print(char, end=" ")  # P y t h o n

# Iterating over a dictionary
config = {"host": "localhost", "port": 8080, "debug": True}
for key, value in config.items():
    print(f"{key}: {value}")

# range() — generate sequences
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)
for i in range(2, 10, 2):   # 2, 4, 6, 8 (start, stop, step)
    print(i)
for i in range(10, 0, -1):  # 10, 9, 8, ..., 1 (countdown)
    print(i)`,
                codeTitle: "for_loop.py",
            },
            {
                heading: "while Loop",
                content: "Executes as long as a condition is True. Use when you don't know the number of iterations in advance.",
                code: `# Basic while loop
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

# Industry pattern: retry mechanism
import time

def fetch_data(url, max_retries=3):
    """Fetch data with automatic retry — production pattern."""
    attempts = 0
    while attempts < max_retries:
        try:
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            attempts += 1
            wait_time = 2 ** attempts  # Exponential backoff
            print(f"Attempt {attempts} failed: {e}")
            print(f"Retrying in {wait_time}s...")
            time.sleep(wait_time)
    raise Exception(f"Failed after {max_retries} retries")

# Input validation loop
while True:
    user_input = input("Enter a number (1-100): ")
    if user_input.isdigit() and 1 <= int(user_input) <= 100:
        break
    print("Invalid input. Try again.")`,
                codeTitle: "while_loop.py",
                note: "The retry-with-exponential-backoff pattern is standard in microservices, API clients, and cloud applications.",
            },
            {
                heading: "break, continue, and else with Loops",
                content: "Control loop execution flow with these keywords.",
                code: `# break — exit loop immediately
for num in range(1, 100):
    if num % 7 == 0 and num % 5 == 0:
        print(f"First number divisible by both 7 and 5: {num}")
        break  # Found it, stop searching

# continue — skip to next iteration
for i in range(10):
    if i % 2 == 0:
        continue  # Skip even numbers
    print(i)  # Prints: 1, 3, 5, 7, 9

# else with for — executes if loop completes WITHOUT break
def find_prime(n):
    """Check if n is prime."""
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False  # Not prime
    else:
        return True  # Loop completed — it's prime!

# Practical example: search with confirmation
users = ["alice", "bob", "charlie"]
target = "dave"
for user in users:
    if user == target:
        print(f"Found {target}!")
        break
else:
    print(f"{target} not found in the system.")`,
                codeTitle: "break_continue.py",
            },
            {
                heading: "List Comprehensions — Pythonic Loops",
                content: "The most iconic Python feature. Replace verbose loops with elegant one-liners. Used everywhere in production code.",
                code: `# Basic list comprehension
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition (filter)
evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# With transformation + condition
words = ["Hello", "WORLD", "Python", "CODE"]
lower_long = [w.lower() for w in words if len(w) > 4]
# ['hello', 'world', 'python']

# Dictionary comprehension
prices = {"apple": 1.5, "banana": 0.5, "mango": 2.0}
expensive = {k: v for k, v in prices.items() if v > 1.0}
# {'apple': 1.5, 'mango': 2.0}

# Set comprehension
unique_lengths = {len(word) for word in words}
# {4, 5, 6}

# Nested comprehension — flatten a matrix
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Generator expression (memory-efficient for large data)
total = sum(x**2 for x in range(1_000_000))`,
                codeTitle: "comprehensions.py",
                note: "List comprehensions are 20-30% faster than equivalent for loops in CPython. Use them whenever the logic is simple enough to fit on one line.",
            },
        ],
    },
];
