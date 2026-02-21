import { Chapter } from "./javaContent";

export const shellChapters: Chapter[] = [
    {
        id: 1,
        slug: "bash-introduction",
        title: "Bash Introduction & Fundamentals",
        description: "What is a shell? Types of shells, creating scripts, and the shebang line.",
        sections: [
            {
                heading: "What is a Shell?",
                content: "A shell is a command-line interpreter that provides an interface between the user and the operating system kernel. It reads commands, interprets them, and executes them.\n\n**Common Shells:**\n• **Bash** (Bourne Again Shell) — The most widely used shell on Linux. Default on most distros.\n• **sh** (Bourne Shell) — The original Unix shell.\n• **zsh** (Z Shell) — Modern shell with advanced features. Default on macOS.\n• **fish** — User-friendly shell with auto-suggestions.\n• **ksh** (Korn Shell) — Used in enterprise Unix systems.",
                code: `# Check your current shell
echo $SHELL

# List available shells
cat /etc/shells

# Switch to bash
bash

# Check bash version
bash --version`,
                codeTitle: "check-shell.sh",
                note: "Shell scripting is essential for automating repetitive sysadmin and DevOps tasks like deployments, backups, and monitoring."
            },
            {
                heading: "Creating Your First Script",
                content: "A shell script is a text file containing a series of commands. The first line (shebang) tells the system which interpreter to use.",
                code: `#!/bin/bash
# My first shell script
# Author: Techmiya EdTech

echo "========================================="
echo "  Welcome to Shell Scripting Tutorial"
echo "========================================="
echo ""
echo "Current Date  : $(date '+%Y-%m-%d %H:%M:%S')"
echo "Current User  : $(whoami)"
echo "Hostname      : $(hostname)"
echo "Working Dir   : $(pwd)"
echo "OS Info       : $(uname -s) $(uname -r)"
echo ""
echo "Script completed successfully!"`,
                codeTitle: "hello.sh",
                note: "Make the script executable with chmod +x hello.sh, then run it with ./hello.sh"
            },
            {
                heading: "Script Execution Methods",
                content: "There are multiple ways to run a shell script:",
                code: `# Method 1: Make executable and run directly
chmod +x script.sh
./script.sh

# Method 2: Run with bash explicitly
bash script.sh

# Method 3: Source the script (runs in current shell)
source script.sh
# or
. script.sh

# Method 4: Run with sh (POSIX compatible)
sh script.sh

# Debugging: Run with debug mode (shows each command before executing)
bash -x script.sh

# Strict mode (exit on error, undefined vars, pipe failures)
#!/bin/bash
set -euo pipefail`,
                codeTitle: "run-scripts.sh",
                note: "Always use set -euo pipefail at the top of production scripts to catch errors early."
            }
        ]
    },
    {
        id: 2,
        slug: "variables-operators",
        title: "Variables, Operators & User Input",
        description: "Storing data, arithmetic operations, string manipulation, and reading user input.",
        sections: [
            {
                heading: "Working with Variables",
                content: "Variables in Bash do not require a type declaration. There must be **no spaces** around the `=` sign.",
                code: `#!/bin/bash

# String variables
NAME="Techmiya"
GREETING="Hello"
echo "$GREETING, $NAME!"

# Integer variables
COUNT=10
PORT=8080

# Command substitution (store command output)
CURRENT_DATE=$(date '+%Y-%m-%d')
FILE_COUNT=$(ls | wc -l)
IP_ADDRESS=$(hostname -I | awk '{print $1}')
echo "Date: $CURRENT_DATE"
echo "Files: $FILE_COUNT"
echo "IP: $IP_ADDRESS"

# Read-only variables (constants)
readonly APP_NAME="MyApp"
# APP_NAME="Changed"  # ERROR: readonly variable

# Environment variables
export DB_HOST="localhost"
export DB_PORT="5432"

# Unsetting a variable
MY_VAR="temp"
unset MY_VAR`,
                codeTitle: "variables.sh"
            },
            {
                heading: "Special Variables",
                content: "Bash provides built-in special variables for script arguments and status.",
                code: `#!/bin/bash
# Run with: ./script.sh arg1 arg2 arg3

echo "Script Name      : $0"
echo "First Argument   : $1"
echo "Second Argument  : $2"
echo "All Arguments    : $@"
echo "Number of Args   : $#"
echo "Last Exit Code   : $?"
echo "Current PID      : $$"
echo "Background PID   : $!"

# Example: A script that requires arguments
if [ $# -lt 2 ]; then
    echo "Usage: $0 <username> <environment>"
    echo "Example: $0 joel production"
    exit 1
fi

USERNAME=$1
ENVIRONMENT=$2
echo "Deploying as $USERNAME to $ENVIRONMENT"`,
                codeTitle: "special-vars.sh",
                note: "Exit code 0 means success. Any non-zero exit code indicates failure."
            },
            {
                heading: "Arithmetic Operators",
                content: "Bash supports arithmetic operations using several methods.",
                code: `#!/bin/bash

# Method 1: Double parentheses (recommended)
A=10
B=3
echo "Addition       : $((A + B))"     # 13
echo "Subtraction    : $((A - B))"     # 7
echo "Multiplication : $((A * B))"     # 30
echo "Division       : $((A / B))"     # 3 (integer only)
echo "Modulus        : $((A % B))"     # 1
echo "Exponent       : $((A ** 2))"    # 100

# Increment / Decrement
((A++))
echo "After increment: $A"    # 11
((A--))

# Method 2: expr command
RESULT=$(expr 10 + 5)
echo "expr result: $RESULT"

# Method 3: let command
let "SUM = 10 + 20"
echo "let result: $SUM"

# Floating point (use bc calculator)
RESULT=$(echo "scale=2; 10 / 3" | bc)
echo "Float division: $RESULT"    # 3.33`,
                codeTitle: "arithmetic.sh"
            },
            {
                heading: "Reading User Input",
                content: "Use the `read` command to capture input from the user interactively.",
                code: `#!/bin/bash

# Basic input
echo -n "Enter your name: "
read USERNAME
echo "Hello, $USERNAME!"

# Input with prompt (-p flag)
read -p "Enter server IP: " SERVER_IP
echo "Connecting to $SERVER_IP..."

# Silent input (-s flag) — for passwords
read -sp "Enter password: " PASSWORD
echo ""
echo "Password accepted (length: \${#PASSWORD})"

# Input with timeout (-t flag)
read -t 10 -p "Enter value (10 sec timeout): " VALUE
if [ -z "$VALUE" ]; then
    echo "Timed out! Using default value."
    VALUE="default"
fi

# Input with default value
read -p "Enter port [8080]: " PORT
PORT=\${PORT:-8080}
echo "Using port: $PORT"

# Read multiple values
read - p "Enter first and last name: " FIRST LAST
echo "First: $FIRST, Last: $LAST"`,
                codeTitle: "user-input.sh"
            }
        ]
    },
    {
        id: 3,
        slug: "control-flow",
        title: "Control Flow — if/else, Loops & Case",
        description: "Decision making with conditionals, iteration with loops, and switch-case statements.",
        sections: [
            {
                heading: "If-Else Statements",
                content: "Bash uses `if`, `elif`, and `else ` for decision making. Conditions are enclosed in `[]` or `[[]]`.",
                code: `#!/bin/bash

read - p "Enter a number: " NUM

# Numeric comparison
if [$NUM - gt 100]; then
    echo "$NUM is greater than 100"
elif[$NUM - gt 50 ]; then
    echo "$NUM is between 51 and 100"
elif[$NUM - gt 0 ]; then
    echo "$NUM is between 1 and 50"
else
    echo "$NUM is zero or negative"
fi

# String comparison(use[[]] for safety)
    read - p "Enter environment (dev/staging/prod): " ENV
if [["$ENV" == "prod"]]; then
    echo "WARNING: You are deploying to PRODUCTION!"
elif[["$ENV" == "staging"]]; then
    echo "Deploying to staging..."
else
    echo "Deploying to development..."
fi

# File and directory checks
FILE = "/etc/nginx/nginx.conf"
if [-f "$FILE"]; then
    echo "Nginx config found at $FILE"
elif[-d "/etc/nginx" ]; then
    echo "Nginx directory exists but config is missing"
else
    echo "Nginx is not installed"
fi`,
                codeTitle: "conditionals.sh",
                note: "Common test operators: -eq (equal), -ne (not equal), -gt (greater than), -lt (less than), -ge (>=), -le (<=), -f (file exists), -d (dir exists), -z (string empty), -n (string not empty)."
            },
            {
                heading: "For Loops",
                content: "Iterate over lists, ranges, and command outputs.",
                code: `#!/bin/bash

# Loop over a list
for FRUIT in apple banana cherry mango; do
    echo "Fruit: $FRUIT"
done

# Loop over a range
for i in { 1..10 }; do
    echo "Count: $i"
done

# Loop with step
for i in { 0..100..10}; do
    echo "Percentage: $i%"
done

# C - style for loop
for ((i = 0; i < 5; i++)); do
    echo "Index: $i"
done

# Loop over files in a directory
for FILE in /var/log/*.log; do
    echo "Log file: $FILE ($(wc -l < "$FILE") lines)"
done

# Loop over command output
for USER in $(cat /etc/passwd | cut -d: -f1); do
    echo "User: $USER"
done

# Loop over array
SERVERS=("web-01" "web-02" "db-01" "cache-01")
for SERVER in "\${SERVERS[@]}"; do
    echo "Checking $SERVER..."
    ping -c 1 "$SERVER" &>/dev/null && echo "  UP" || echo "  DOWN"
done`,
                codeTitle: "for-loops.sh"
            },
            {
                heading: "While & Until Loops",
                content: "While loops run as long as the condition is true. Until loops run until the condition becomes true.",
                code: `#!/bin/bash

# While loop — countdown
COUNT=5
while [ $COUNT -gt 0 ]; do
    echo "Countdown: $COUNT"
    ((COUNT--))
    sleep 1
done
echo "Launch!"

# While loop — read file line by line
while IFS= read -r LINE; do
    echo "Processing: $LINE"
done < /etc/hosts

# While loop — infinite (with break)
while true; do
    read -p "Enter 'quit' to exit: " INPUT
    if [[ "$INPUT" == "quit" ]]; then
        echo "Goodbye!"
        break
    fi
    echo "You entered: $INPUT"
done

# Until loop — wait for a service to start
until curl -s http://localhost:8080/health > /dev/null 2>&1; do
    echo "Waiting for service to start..."
    sleep 2
done
echo "Service is up!"

# While with continue (skip iteration)
for i in {1..10}; do
    if [ $((i % 2)) -eq 0 ]; then
        continue  # Skip even numbers
    fi
    echo "Odd number: $i"
done`,
                codeTitle: "while-loops.sh"
            },
            {
                heading: "Case Statements",
                content: "Case statements are a cleaner alternative to long if-elif chains.",
                code: `#!/bin/bash

# Service management script
read -p "Enter action (start/stop/restart/status): " ACTION

case $ACTION in
    start)
        echo "Starting the service..."
        sudo systemctl start nginx
        ;;
    stop)
        echo "Stopping the service..."
        sudo systemctl stop nginx
        ;;
    restart)
        echo "Restarting the service..."
        sudo systemctl restart nginx
        ;;
    status)
        sudo systemctl status nginx
        ;;
    *)
        echo "Invalid action: $ACTION"
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac

# Pattern matching in case
read -p "Enter filename: " FILENAME
case "$FILENAME" in
    *.tar.gz | *.tgz)
        echo "Extracting tar.gz..."
        tar -xzf "$FILENAME"
        ;;
    *.zip)
        echo "Extracting zip..."
        unzip "$FILENAME"
        ;;
    *.deb)
        echo "Installing deb package..."
        sudo dpkg -i "$FILENAME"
        ;;
    *)
        echo "Unknown file type"
        ;;
esac`,
                codeTitle: "case-statement.sh"
            }
        ]
    },
    {
        id: 4,
        slug: "shell-functions",
        title: "Functions & Error Handling",
        description: "Modularizing code with functions, return values, and robust error handling.",
        sections: [
            {
                heading: "Creating Functions",
                content: "Functions help organize code into reusable, modular blocks.",
                code: `#!/bin/bash

# Simple function
greet() {
    echo "Hello, $1! Welcome to $2."
}
greet "Joel" "Techmiya"

# Function with local variables
calculate_disk_usage() {
    local USAGE=$(df -h / | awk 'NR==2 {print $5}')
    local TOTAL=$(df -h / | awk 'NR==2 {print $2}')
    echo "Disk Usage: $USAGE of $TOTAL"
}
calculate_disk_usage

# Function with return value (exit code)
is_service_running() {
    local SERVICE=$1
    systemctl is-active --quiet "$SERVICE"
    return $?  # Returns 0 if running, non-zero otherwise
}

if is_service_running "nginx"; then
    echo "Nginx is running"
else
    echo "Nginx is NOT running"
fi

# Function returning a string value
get_timestamp() {
    echo "$(date '+%Y-%m-%d_%H-%M-%S')"
}
TIMESTAMP=$(get_timestamp)
echo "Backup timestamp: $TIMESTAMP"`,
                codeTitle: "functions.sh"
            },
            {
                heading: "Logging Function",
                content: "Create a reusable logging function for professional scripts.",
                code: `#!/bin/bash

# Color-coded logging function
LOG_FILE="/var/log/my-script.log"

log() {
    local LEVEL=$1
    shift
    local MESSAGE="$@"
    local TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

    case $LEVEL in
        INFO)  COLOR="\\033[0;32m" ;;   # Green
        WARN)  COLOR="\\033[0;33m" ;;   # Yellow
        ERROR) COLOR="\\033[0;31m" ;;   # Red
        *)     COLOR="\\033[0m"    ;;   # Default
    esac

    # Print to console with color
    echo -e "\${COLOR}[$TIMESTAMP] [$LEVEL] $MESSAGE\\033[0m"
    
    # Write to log file without color
    echo "[$TIMESTAMP] [$LEVEL] $MESSAGE" >> "$LOG_FILE"
}

# Usage
log INFO "Script started"
log INFO "Processing 100 files..."
log WARN "Disk usage above 80%"
log ERROR "Connection to database failed"
log INFO "Script completed"`,
                codeTitle: "logging.sh"
            },
            {
                heading: "Error Handling & Traps",
                content: "Robust error handling makes scripts reliable in production environments.",
                code: `#!/bin/bash
set -euo pipefail

# Trap: Execute cleanup on exit (success or failure)
cleanup() {
    local EXIT_CODE=$?
    echo "Cleaning up temporary files..."
    rm -rf /tmp/my-script-*
    if [ $EXIT_CODE -ne 0 ]; then
        echo "Script failed with exit code: $EXIT_CODE"
    fi
    exit $EXIT_CODE
}
trap cleanup EXIT

# Trap: Handle Ctrl+C gracefully
trap 'echo "Interrupted! Cleaning up..."; exit 130' INT

# Error handling function
die() {
    echo "ERROR: $1" >&2
    exit \${2:-1}
}

# Usage with error handling
REQUIRED_FILE="/etc/app/config.yaml"
[ -f "$REQUIRED_FILE" ] || die "Config file not found: $REQUIRED_FILE"

# Try-catch pattern
if ! OUTPUT=$(some_command 2>&1); then
    echo "Command failed: $OUTPUT"
    exit 1
fi

# Retry logic
retry() {
    local MAX_RETRIES=3
    local COUNT=0
    until "$@"; do
        COUNT=$((COUNT + 1))
        if [ $COUNT -ge $MAX_RETRIES ]; then
            echo "Failed after $MAX_RETRIES attempts"
            return 1
        fi
        echo "Retry $COUNT/$MAX_RETRIES..."
        sleep 2
    done
}
retry curl -sf http://localhost:8080/health`,
                codeTitle: "error-handling.sh",
                note: "set -e exits on error, set -u treats undefined variables as errors, set -o pipefail catches pipe failures."
            }
        ]
    },
    {
        id: 5,
        slug: "file-automation",
        title: "File Automation & Backup Scripts",
        description: "Automating file operations, creating backup systems, and log management.",
        sections: [
            {
                heading: "File Automation Scripts",
                content: "Automate common file operations like renaming, organizing, and processing.",
                code: `#!/bin/bash
set -euo pipefail

# Batch rename files (add prefix)
DIRECTORY="/home/user/images"
PREFIX="2024_"
for FILE in "$DIRECTORY"/*.jpg; do
    BASENAME=$(basename "$FILE")
    mv "$FILE" "$DIRECTORY/\${PREFIX}$BASENAME"
    echo "Renamed: $BASENAME → \${PREFIX}$BASENAME"
done

# Organize files by extension
organize_files() {
    local DIR=$1
    for FILE in "$DIR"/*; do
        [ -f "$FILE" ] || continue
        EXT="\${FILE##*.}"
        mkdir -p "$DIR/$EXT"
        mv "$FILE" "$DIR/$EXT/"
        echo "Moved $(basename "$FILE") → $EXT/"
    done
}
organize_files "/home/user/downloads"

# Find and delete files older than 30 days
find /var/log -name "*.log" -mtime +30 -exec rm -f {} \\;
echo "Cleaned logs older than 30 days"

# Monitor a directory for new files
inotifywait -m /uploads -e create |
while read DIR ACTION FILE; do
    echo "New file detected: $FILE"
    # Process the new file...
done`,
                codeTitle: "file-automation.sh"
            },
            {
                heading: "Automated Backup Script",
                content: "A production-ready backup script with compression, rotation, and notifications.",
                code: `#!/bin/bash
set -euo pipefail

# =============================================
# Automated Backup Script
# =============================================

# Configuration
BACKUP_SOURCE="/var/www/html"
BACKUP_DEST="/backups"
DB_NAME="production_db"
DB_USER="admin"
RETENTION_DAYS=7
TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
BACKUP_DIR="$BACKUP_DEST/backup_$TIMESTAMP"

# Create backup directory
mkdir -p "$BACKUP_DIR"

echo "=== Starting Backup: $TIMESTAMP ==="

# 1. Backup application files
echo "[1/3] Backing up application files..."
tar -czf "$BACKUP_DIR/app_files.tar.gz" -C "$BACKUP_SOURCE" .
echo "  ✓ Files backed up"

# 2. Backup database
echo "[2/3] Backing up database..."
mysqldump -u "$DB_USER" "$DB_NAME" | gzip > "$BACKUP_DIR/database.sql.gz"
echo "  ✓ Database backed up"

# 3. Calculate backup size
BACKUP_SIZE=$(du -sh "$BACKUP_DIR" | awk '{print $1}')
echo "[3/3] Backup size: $BACKUP_SIZE"

# 4. Remove old backups
echo "Removing backups older than $RETENTION_DAYS days..."
find "$BACKUP_DEST" -maxdepth 1 -type d -name "backup_*" \\
    -mtime +$RETENTION_DAYS -exec rm -rf {} \\;

echo "=== Backup Complete ==="
echo "Location: $BACKUP_DIR"
echo "Size: $BACKUP_SIZE"`,
                codeTitle: "backup.sh",
                note: "Schedule this script with cron to run daily. Always test your backup restoration process!"
            },
            {
                heading: "Log Cleanup Automation",
                content: "Automate log rotation and cleanup to prevent disk space issues.",
                code: `#!/bin/bash
set -euo pipefail

# =============================================
# Log Cleanup & Rotation Script
# =============================================

LOG_DIRS=("/var/log/nginx" "/var/log/app" "/var/log/syslog")
MAX_SIZE_MB=100
ARCHIVE_DIR="/var/log/archive"
RETENTION_DAYS=30

mkdir -p "$ARCHIVE_DIR"

echo "=== Log Cleanup Started: $(date) ==="

for LOG_DIR in "\${LOG_DIRS[@]}"; do
    echo "Processing: $LOG_DIR"
    
    # Find large log files
    find "$LOG_DIR" -name "*.log" -size +\${MAX_SIZE_MB}M 2>/dev/null | while read FILE; do
        BASENAME=$(basename "$FILE")
        TIMESTAMP=$(date '+%Y%m%d')
        
        echo "  Rotating: $BASENAME ($(du -h "$FILE" | cut -f1))"
        
        # Compress and move to archive
        gzip -c "$FILE" > "$ARCHIVE_DIR/\${BASENAME}.$TIMESTAMP.gz"
        
        # Truncate original file (keeps file handle for running services)
        > "$FILE"
        
        echo "  ✓ Archived and truncated"
    done
done

# Remove old archives
DELETED=$(find "$ARCHIVE_DIR" -name "*.gz" -mtime +$RETENTION_DAYS -delete -print | wc -l)
echo "Deleted $DELETED old archive(s)"

# Report disk usage
echo "Current /var/log usage: $(du -sh /var/log | awk '{print $1}')"
echo "=== Cleanup Complete ==="`,
                codeTitle: "log-cleanup.sh"
            }
        ]
    },
    {
        id: 6,
        slug: "deployment-scripts",
        title: "Deployment & Server Automation Scripts",
        description: "Automating application deployments, server provisioning, and health checks.",
        sections: [
            {
                heading: "Deployment Script",
                content: "A production deployment script with rollback capability.",
                code: `#!/bin/bash
set -euo pipefail

# =============================================
# Zero-Downtime Deployment Script
# =============================================

APP_NAME="web-app"
DEPLOY_DIR="/var/www/$APP_NAME"
REPO_URL="https://github.com/techmiya/$APP_NAME.git"
BRANCH="\${1:-main}"
RELEASE_DIR="$DEPLOY_DIR/releases/$(date '+%Y%m%d%H%M%S')"
CURRENT_LINK="$DEPLOY_DIR/current"

log() { echo "[$(date '+%H:%M:%S')] $1"; }

log "=== Deploying $APP_NAME (branch: $BRANCH) ==="

# 1. Clone the repository
log "Cloning repository..."
git clone -b "$BRANCH" --depth 1 "$REPO_URL" "$RELEASE_DIR"

# 2. Install dependencies
log "Installing dependencies..."
cd "$RELEASE_DIR"
npm ci --production

# 3. Build the application
log "Building..."
npm run build

# 4. Run database migrations
log "Running migrations..."
npm run migrate

# 5. Switch the symlink (zero-downtime)
log "Switching to new release..."
ln -sfn "$RELEASE_DIR" "$CURRENT_LINK"

# 6. Restart the application
log "Restarting service..."
sudo systemctl restart "$APP_NAME"

# 7. Health check
log "Running health check..."
sleep 3
if curl -sf http://localhost:3000/health > /dev/null; then
    log "✓ Deployment successful!"
else
    log "✗ Health check failed! Rolling back..."
    PREVIOUS=$(ls -t "$DEPLOY_DIR/releases/" | sed -n '2p')
    ln -sfn "$DEPLOY_DIR/releases/$PREVIOUS" "$CURRENT_LINK"
    sudo systemctl restart "$APP_NAME"
    log "Rolled back to: $PREVIOUS"
    exit 1
fi

# 8. Cleanup old releases (keep last 5)
cd "$DEPLOY_DIR/releases"
ls -t | tail -n +6 | xargs -r rm -rf
log "Cleaned up old releases"`,
                codeTitle: "deploy.sh"
            },
            {
                heading: "Server Health Check Script",
                content: "Monitor multiple servers and services with automated health checks.",
                code: `#!/bin/bash

# =============================================
# Server Health Check Script
# =============================================

SERVERS=("web-01:80" "web-02:80" "api-01:3000" "db-01:5432")
SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/WEBHOOK"

check_health() {
    local HOST=$(echo "$1" | cut -d: -f1)
    local PORT=$(echo "$1" | cut -d: -f2)
    
    if nc -z -w3 "$HOST" "$PORT" 2>/dev/null; then
        echo "  ✓ $HOST:$PORT — UP"
        return 0
    else
        echo "  ✗ $HOST:$PORT — DOWN"
        return 1
    fi
}

echo "=== Health Check: $(date '+%Y-%m-%d %H:%M:%S') ==="

FAILURES=0
for SERVER in "\${SERVERS[@]}"; do
    if ! check_health "$SERVER"; then
        ((FAILURES++))
    fi
done

echo ""
if [ $FAILURES -gt 0 ]; then
    echo "WARNING: $FAILURES server(s) are DOWN!"
    # Send alert (uncomment for production)
    # curl -X POST -H 'Content-type: application/json' \\
    #     --data "{\"text\": \"🚨 $FAILURES server(s) DOWN!\"}" \\
    #     "$SLACK_WEBHOOK"
else
    echo "All servers are healthy ✓"
fi

# System resource checks
echo ""
echo "=== System Resources ==="
echo "CPU Load    : $(uptime | awk -F'load average:' '{print $2}')"
echo "Memory      : $(free -h | awk '/Mem/ {print $3 "/" $2}')"
echo "Disk Usage  : $(df -h / | awk 'NR==2 {print $5 " used"}')"`,
                codeTitle: "health-check.sh"
            }
        ]
    },
    {
        id: 7,
        slug: "cron-scheduling",
        title: "Cron Scheduling & Advanced Techniques",
        description: "Scheduling scripts with cron jobs, text processing with sed/awk, and advanced patterns.",
        sections: [
            {
                heading: "Cron Jobs",
                content: "Cron is a time-based job scheduler in Linux. Use it to run scripts automatically at specific intervals.",
                code: `# Edit crontab for current user
crontab -e

# View current cron jobs
crontab -l

# Cron syntax:
# ┌───── minute (0-59)
# │ ┌───── hour (0-23)
# │ │ ┌───── day of month (1-31)
# │ │ │ ┌───── month (1-12)
# │ │ │ │ ┌───── day of week (0-7, 0 and 7 = Sunday)
# │ │ │ │ │
# * * * * *  command

# Examples:
# Run every minute
* * * * *  /scripts/monitor.sh

# Run every day at 2:30 AM
30 2 * * *  /scripts/backup.sh

# Run every Monday at 9 AM
0 9 * * 1  /scripts/weekly-report.sh

# Run every 5 minutes
*/5 * * * * /scripts/health - check.sh

# Run at midnight on the 1st of every month
0 0 1 * * /scripts/monthly - cleanup.sh

# Run every weekday at 6 PM
0 18 * * 1 - 5 / scripts / end - of - day.sh

# Log output and errors
    * /5 * * * *  /scripts / job.sh >> /var/log / cron - job.log 2 >& 1`,
                codeTitle: "crontab-examples",
                note: "Always log cron job output — debugging silent failures is extremely difficult."
            },
            {
                heading: "Text Processing with sed & awk",
                content: "Advanced text processing tools essential for DevOps automation.",
                code: `#!/bin/bash

# === sed(Stream Editor) ===

# Replace text in a file
sed - i 's/old_value/new_value/g' config.yml

# Replace with environment variable
DB_HOST = "production-db.example.com"
sed - i "s/DB_HOST=.*/DB_HOST=$DB_HOST/".env

# Delete lines matching a pattern
sed - i '/^#/d' config.conf          # Remove comment lines
sed - i '/^$/d' config.conf          # Remove empty lines

# Insert a line after a match
sed - i '/\[server\]/a server_name = web-01' config.ini

# === awk(Pattern - Based Processing) ===

# Print specific columns from a log
awk '{print $1, $4, $7}' access.log

# Filter by condition
awk '$9 == 500 {print $7}' access.log     # URLs with 500 errors

# Sum a column
awk '{sum += $10} END {print "Total bytes:", sum}' access.log

# Count occurrences
awk '{count[$9]++} END {for (code in count) print code, count[code]}' access.log

# Format output as table
awk - F: '{printf "%-20s %-10s %s\\n", $1, $3, $7}' / etc / passwd`,
                codeTitle: "sed-awk.sh"
            },
            {
                heading: "Advanced Patterns",
                content: "Professional shell scripting patterns used in production environments.",
                code: `#!/bin/bash

# === Arrays ===
    SERVERS=("web-01" "web-02" "web-03" "db-01")
echo "Total servers: \${#SERVERS[@]}"
echo "First server : \${SERVERS[0]}"
echo "All servers  : \${SERVERS[@]}"

# Add to array
SERVERS += ("cache-01")

# Loop with index
for i in "\${!SERVERS[@]}"; do
    echo "  [$i] \${SERVERS[$i]}"
done

# === Associative Arrays(Bash 4 +) ===
    declare - A CONFIG
CONFIG[db_host] = "localhost"
CONFIG[db_port] = "5432"
CONFIG[db_name] = "myapp"

for KEY in "\${!CONFIG[@]}"; do
    echo "  $KEY = \${CONFIG[$KEY]}"
done

# === Here Documents ===
    cat << EOF > /tmp/config.yaml
server:
host: localhost
port: 8080
database:
host: \${ CONFIG[db_host] }
port: \${ CONFIG[db_port] }
EOF

# === Parallel Execution ===
    deploy_to_server() {
    echo "Deploying to $1..."
    sleep 2
    echo "  ✓ $1 done"
}

for SERVER in "\${SERVERS[@]}"; do
    deploy_to_server "$SERVER" &
    done
wait  # Wait for all background jobs
echo "All deployments complete!"`,
                codeTitle: "advanced-patterns.sh",
                note: "Use & to run commands in parallel and wait to synchronize — this can dramatically speed up multi-server scripts."
            }
        ]
    }
];
