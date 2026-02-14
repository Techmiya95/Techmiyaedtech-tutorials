import { Chapter } from "./javaContent"; // Reuse interface

export const linuxChapters: Chapter[] = [
    {
        id: 1,
        slug: "introduction",
        title: "Introduction to Linux",
        description: "What is Linux, its history, popular distributions, and why learn Linux.",
        sections: [
            {
                heading: "What is Linux?",
                content:
                    "Linux is a free, open-source operating system kernel originally created by Linus Torvalds in 1991. Combined with the GNU project tools, it forms a complete operating system commonly referred to as GNU/Linux. It powers everything from smartphones (Android) and embedded devices to the majority of the world's servers, supercomputers, and cloud infrastructure.",
            },
            {
                heading: "Why Learn Linux?",
                content:
                    "• **Server Dominance** — Over 96% of the world's top 1 million servers run on Linux. AWS, Azure, and GCP all default to Linux instances.\n• **DevOps & Cloud** — Tools like Docker, Kubernetes, Ansible, and Terraform are built for Linux environments.\n• **Career Growth** — Linux skills are highly valued in system administration, DevOps, cybersecurity, and software engineering roles.\n• **Free & Open Source** — No licensing costs, full access to source code, and a massive community.\n• **Customization** — Complete control over your system, from the kernel to the desktop environment.\n• **Security** — Strong permission model, frequent security patches, and inherently more resistant to malware.",
            },
            {
                heading: "Popular Linux Distributions",
                content:
                    "A Linux distribution (distro) bundles the Linux kernel with system utilities, a package manager, and often a desktop environment.\n\n• **Ubuntu** — Beginner-friendly, widely used for both desktop and servers.\n• **Debian** — Rock-solid stability, the foundation for Ubuntu.\n• **CentOS / Rocky Linux / AlmaLinux** — Enterprise-grade, RHEL-compatible.\n• **Fedora** — Cutting-edge features, backed by Red Hat.\n• **Arch Linux** — Rolling release, maximum customization for advanced users.\n• **Linux Mint** — Polished desktop experience, great for Windows migrants.",
            },
            {
                heading: "Checking Your Linux Version",
                content: "Once you have Linux installed, you can check your distribution and kernel version.",
                code: `# Display distribution info
cat /etc/os-release

# Check kernel version
uname -r

# Show all system info
uname -a`,
                codeTitle: "version_check.sh",
                output: "NAME=\"Ubuntu\"\nVERSION=\"22.04.3 LTS (Jammy Jellyfish)\"\n...\n5.15.0-91-generic\nLinux myhost 5.15.0-91-generic #101-Ubuntu SMP ...",
                note: "The output will vary depending on your distribution and kernel version."
            },
        ],
    },
    {
        id: 2,
        slug: "installation-setup",
        title: "Installation & Setup",
        description: "Installing Linux via dual-boot, virtual machine, or WSL on Windows.",
        sections: [
            {
                heading: "Option 1: Windows Subsystem for Linux (WSL)",
                content: "WSL is the fastest way to get started with Linux on a Windows machine. It runs a real Linux kernel inside Windows.",
                code: `# Open PowerShell as Administrator and run:
wsl --install

# This installs Ubuntu by default. To install a specific distro:
wsl --install -d Debian

# List available distributions:
wsl --list --online

# After installation, restart your computer
# Then open "Ubuntu" from the Start menu`,
                codeTitle: "wsl_install.ps1",
                note: "WSL 2 is recommended over WSL 1 for better performance and full system call compatibility."
            },
            {
                heading: "Option 2: Virtual Machine (VirtualBox)",
                content:
                    "A virtual machine lets you run Linux inside your current OS without modifying your disk.\n\n1. Download and install [VirtualBox](https://www.virtualbox.org/).\n2. Download the ISO file for your preferred distribution (e.g., Ubuntu from ubuntu.com).\n3. Create a new VM in VirtualBox — allocate at least 2 CPU cores, 4 GB RAM, and 25 GB disk.\n4. Mount the ISO and boot the VM.\n5. Follow the distribution's install wizard.",
            },
            {
                heading: "Option 3: Dual Boot",
                content:
                    "Dual booting lets you install Linux alongside Windows on separate disk partitions.\n\n1. **Back up your data** before proceeding.\n2. Create a bootable USB using tools like Rufus or balenaEtcher.\n3. Restart your computer, enter BIOS/UEFI (usually F2, F12, or Del).\n4. Boot from the USB drive.\n5. Choose 'Install alongside Windows' in the installer.\n6. Follow the installation prompts.",
                note: "Always back up important data before dual-booting. Partitioning errors can cause data loss."
            },
            {
                heading: "First Steps After Installation",
                content: "After installing Linux, run these essential commands to update your system.",
                code: `# Update package lists
sudo apt update

# Upgrade all installed packages
sudo apt upgrade -y

# Install common utilities
sudo apt install -y curl wget git vim htop`,
                codeTitle: "first_steps.sh",
                output: "Reading package lists... Done\nBuilding dependency tree... Done\n..."
            },
        ],
    },
    {
        id: 3,
        slug: "essential-commands",
        title: "Essential Commands",
        description: "Master fundamental commands: ls, cd, pwd, mkdir, rm, cp, mv, and more.",
        sections: [
            {
                heading: "Navigating the File System",
                content: "These are the most basic and frequently used commands for moving around the file system.",
                code: `# Print current working directory
pwd

# List files in current directory
ls

# List with details (permissions, size, date)
ls -la

# List with human-readable file sizes
ls -lh

# Change directory
cd /home/user/Documents

# Go to home directory
cd ~

# Go up one level
cd ..

# Go to previous directory
cd -`,
                codeTitle: "navigation.sh",
                output: "/home/user\ntotal 32\ndrwxr-xr-x 5 user user 4096 Feb 14 10:00 .\ndrwxr-xr-x 3 root root 4096 Jan 01 00:00 ..\n-rw-r--r-- 1 user user  220 Jan 01 00:00 .bash_logout\n..."
            },
            {
                heading: "Creating Files and Directories",
                content: "Create files and organize your directory structure.",
                code: `# Create a new empty file
touch myfile.txt

# Create a file with content
echo "Hello Linux" > greeting.txt

# Append content to a file
echo "More content" >> greeting.txt

# Create a single directory
mkdir projects

# Create nested directories (parent dirs included)
mkdir -p projects/webapp/src

# Create multiple directories at once
mkdir dir1 dir2 dir3`,
                codeTitle: "create_files.sh",
            },
            {
                heading: "Copying, Moving & Removing",
                content: "Essential operations for managing files and directories.",
                code: `# Copy a file
cp source.txt destination.txt

# Copy a directory recursively
cp -r source_dir/ destination_dir/

# Move or rename a file
mv oldname.txt newname.txt

# Move a file to another directory
mv file.txt /home/user/Documents/

# Remove a file
rm unwanted_file.txt

# Remove a directory and its contents
rm -r old_directory/

# Remove without confirmation prompt (use with caution!)
rm -rf directory_to_delete/`,
                codeTitle: "file_operations.sh",
                note: "Be extremely careful with `rm -rf` — it permanently deletes files without any confirmation or recovery option."
            },
            {
                heading: "Viewing File Contents",
                content: "Multiple ways to read file contents depending on your needs.",
                code: `# Display entire file
cat myfile.txt

# Display with line numbers
cat -n myfile.txt

# View file page by page
less large_file.log

# View first 10 lines
head myfile.txt

# View first 20 lines
head -n 20 myfile.txt

# View last 10 lines
tail myfile.txt

# Follow a log file in real-time
tail -f /var/log/syslog`,
                codeTitle: "view_files.sh",
            },
        ],
    },
    {
        id: 4,
        slug: "file-permissions",
        title: "File System & Permissions",
        description: "Linux directory structure, file permissions, chmod, chown, and links.",
        sections: [
            {
                heading: "Linux Directory Structure",
                content:
                    "Linux follows the Filesystem Hierarchy Standard (FHS). Everything starts from the root `/` directory.\n\n• `/` — Root directory, the top of the file system tree.\n• `/home` — User home directories (e.g., `/home/user`).\n• `/root` — Home directory for the root (admin) user.\n• `/etc` — System configuration files.\n• `/var` — Variable data (logs, databases, mail).\n• `/tmp` — Temporary files (cleared on reboot).\n• `/usr` — User programs and utilities.\n• `/bin` — Essential command binaries (ls, cp, mv).\n• `/sbin` — System binaries (for admin tasks).\n• `/opt` — Optional/third-party software.\n• `/dev` — Device files (hardware interfaces).\n• `/proc` — Virtual filesystem for process information.",
            },
            {
                heading: "Understanding Permissions",
                content: "Every file and directory has three permission categories: Owner (u), Group (g), and Others (o). Each category has three permission types: Read (r=4), Write (w=2), and Execute (x=1).",
                code: `# View permissions
ls -l myfile.txt
# Output: -rw-r--r-- 1 user group 1024 Feb 14 10:00 myfile.txt
#
# Breakdown:
# -        = file type (- = file, d = directory, l = link)
# rw-      = owner permissions (read, write, no execute)
# r--      = group permissions (read only)
# r--      = others permissions (read only)
# user     = owner
# group    = group`,
                codeTitle: "permissions.sh",
            },
            {
                heading: "Changing Permissions (chmod)",
                content: "Use `chmod` to modify file permissions. You can use symbolic or numeric (octal) notation.",
                code: `# Symbolic notation
chmod u+x script.sh          # Add execute for owner
chmod g+rw file.txt          # Add read+write for group
chmod o-r file.txt           # Remove read for others
chmod a+r file.txt           # Add read for all (a = all)

# Numeric (octal) notation
# r=4, w=2, x=1 → add values for each category
chmod 755 script.sh          # rwxr-xr-x (owner: all, group/others: read+execute)
chmod 644 config.txt         # rw-r--r-- (owner: read+write, group/others: read)
chmod 700 private_dir/       # rwx------ (owner only)
chmod 600 secret.key         # rw------- (owner read+write only)

# Apply recursively to directory
chmod -R 755 project_dir/`,
                codeTitle: "chmod.sh",
                note: "Common permission values: 755 for scripts/directories, 644 for regular files, 600 for sensitive files like SSH keys."
            },
            {
                heading: "Changing Ownership (chown)",
                content: "Use `chown` to change the owner and group of files and directories.",
                code: `# Change owner
sudo chown alice file.txt

# Change owner and group
sudo chown alice:developers file.txt

# Change group only
sudo chgrp developers file.txt

# Recursively change ownership
sudo chown -R www-data:www-data /var/www/html/`,
                codeTitle: "chown.sh",
            },
        ],
    },
    {
        id: 5,
        slug: "text-processing",
        title: "Text Processing",
        description: "Powerful text tools: cat, grep, sed, awk, sort, pipes, and redirection.",
        sections: [
            {
                heading: "Searching with grep",
                content: "`grep` searches for patterns in files. It is one of the most essential Linux tools.",
                code: `# Search for a word in a file
grep "error" logfile.txt

# Case-insensitive search
grep -i "warning" logfile.txt

# Search recursively in directories
grep -r "TODO" ./src/

# Show line numbers
grep -n "function" script.js

# Count matching lines
grep -c "404" access.log

# Invert match (show non-matching lines)
grep -v "debug" logfile.txt

# Use regex pattern
grep -E "^[0-9]{3}" codes.txt`,
                codeTitle: "grep.sh",
                output: "2023-02-14 10:15:23 ERROR: Connection timeout\n2023-02-14 10:16:45 ERROR: Database unreachable",
            },
            {
                heading: "Stream Editing with sed",
                content: "`sed` is a stream editor for filtering and transforming text.",
                code: `# Replace first occurrence on each line
sed 's/old/new/' file.txt

# Replace ALL occurrences on each line
sed 's/old/new/g' file.txt

# Edit file in-place
sed -i 's/http/https/g' config.txt

# Delete lines matching a pattern
sed '/^#/d' config.txt          # Remove comment lines

# Delete a specific line (line 5)
sed '5d' file.txt

# Print only lines 10-20
sed -n '10,20p' file.txt`,
                codeTitle: "sed.sh",
            },
            {
                heading: "Data Processing with awk",
                content: "`awk` is a powerful text processing tool for column-based data.",
                code: `# Print specific columns (space-separated)
awk '{print $1, $3}' data.txt

# Print with custom separator
awk -F',' '{print $1, $2}' data.csv

# Print lines where column 3 > 100
awk '$3 > 100' sales.txt

# Sum a column
awk '{sum += $2} END {print "Total:", sum}' numbers.txt

# Format output
awk '{printf "%-20s %s\\n", $1, $2}' file.txt`,
                codeTitle: "awk.sh",
                output: "Total: 1250",
            },
            {
                heading: "Pipes & Redirection",
                content: "Pipes (`|`) send the output of one command as input to another. Redirection (`>`, `>>`, `<`) controls where output goes.",
                code: `# Pipe: find all .log files and count them
ls /var/log/ | grep ".log" | wc -l

# Sort and remove duplicates
cat names.txt | sort | uniq

# Find top 5 largest files
du -sh /var/log/* | sort -rh | head -5

# Redirect output to a file (overwrite)
ls -la > filelist.txt

# Redirect output to a file (append)
echo "new entry" >> logfile.txt

# Redirect errors to a file
command_that_fails 2> errors.log

# Redirect both stdout and stderr
command 2>&1 > output.log`,
                codeTitle: "pipes.sh",
                note: "Pipes are the backbone of the Unix philosophy: 'Do one thing well, and combine tools together.'"
            },
        ],
    },
    {
        id: 6,
        slug: "users-groups",
        title: "Users & Groups",
        description: "Managing users, groups, sudo privileges, and password policies.",
        sections: [
            {
                heading: "User Management",
                content: "Linux is a multi-user system. Each user has a unique UID and belongs to at least one group.",
                code: `# View current user
whoami

# View user details
id

# View all users (from /etc/passwd)
cat /etc/passwd

# Add a new user
sudo useradd -m -s /bin/bash newuser

# Set password for user
sudo passwd newuser

# Modify a user (add to a supplementary group)
sudo usermod -aG docker newuser

# Delete a user and their home directory
sudo userdel -r olduser`,
                codeTitle: "users.sh",
                output: "user\nuid=1000(user) gid=1000(user) groups=1000(user),27(sudo),999(docker)",
            },
            {
                heading: "Group Management",
                content: "Groups allow you to manage permissions for multiple users at once.",
                code: `# View groups for current user
groups

# Create a new group
sudo groupadd developers

# Add user to group
sudo usermod -aG developers alice

# Remove user from group
sudo gpasswd -d alice developers

# View all groups
cat /etc/group

# Change primary group of user
sudo usermod -g developers alice`,
                codeTitle: "groups.sh",
            },
            {
                heading: "sudo & Root Access",
                content: "`sudo` allows permitted users to execute commands as the superuser (root). The configuration is managed in `/etc/sudoers`.",
                code: `# Run a command as root
sudo apt update

# Open a root shell
sudo -i

# Edit the sudoers file safely
sudo visudo

# Add a user to sudo group (Ubuntu/Debian)
sudo usermod -aG sudo username

# Add a user to wheel group (RHEL/CentOS)
sudo usermod -aG wheel username

# Run command as another user
sudo -u postgres psql`,
                codeTitle: "sudo.sh",
                note: "Never edit `/etc/sudoers` directly — always use `visudo` which validates the syntax before saving."
            },
        ],
    },
    {
        id: 7,
        slug: "process-management",
        title: "Process Management",
        description: "Viewing processes, killing tasks, background jobs, and systemd services.",
        sections: [
            {
                heading: "Viewing Processes",
                content: "Every running program in Linux is a process with a unique Process ID (PID).",
                code: `# List your running processes
ps aux

# Show process tree
ps auxf

# Real-time process monitor
top

# Enhanced process monitor (install with: sudo apt install htop)
htop

# Find a specific process
ps aux | grep nginx

# Show only PID of a process
pgrep nginx`,
                codeTitle: "processes.sh",
                output: "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1 169344 13200 ?        Ss   Feb14   0:02 /sbin/init\nwww-data  1234  0.5  1.2 234568 98765 ?        S    10:00   0:15 nginx: worker",
            },
            {
                heading: "Killing Processes",
                content: "You can send signals to processes to stop, pause, or terminate them.",
                code: `# Graceful termination (SIGTERM)
kill 1234

# Force kill (SIGKILL) — last resort
kill -9 1234

# Kill by process name
killall nginx

# Kill by pattern
pkill -f "python script.py"

# Common signals:
# SIGTERM (15) — Graceful shutdown (default)
# SIGKILL (9)  — Force kill (cannot be caught)
# SIGHUP (1)   — Reload configuration
# SIGSTOP (19) — Pause process
# SIGCONT (18) — Resume process`,
                codeTitle: "kill.sh",
                note: "Always try `kill` (SIGTERM) before `kill -9` (SIGKILL). SIGTERM allows the process to clean up resources gracefully."
            },
            {
                heading: "Background Jobs & Foreground",
                content: "Run long tasks in the background so you can continue using your terminal.",
                code: `# Run a command in the background
./long_task.sh &

# List background jobs
jobs

# Bring job to foreground
fg %1

# Send running process to background
# First press Ctrl+Z to suspend, then:
bg %1

# Run command immune to hangups (persists after logout)
nohup ./long_task.sh &

# Disown a background job
disown %1`,
                codeTitle: "jobs.sh",
            },
            {
                heading: "Managing Services with systemctl",
                content: "`systemctl` is the primary command for managing systemd services on modern Linux distributions.",
                code: `# Start a service
sudo systemctl start nginx

# Stop a service
sudo systemctl stop nginx

# Restart a service
sudo systemctl restart nginx

# Reload config without restart
sudo systemctl reload nginx

# Check service status
sudo systemctl status nginx

# Enable service to start on boot
sudo systemctl enable nginx

# Disable service from starting on boot
sudo systemctl disable nginx

# List all running services
systemctl list-units --type=service --state=running`,
                codeTitle: "systemctl.sh",
                output: "● nginx.service - A high performance web server\n   Loaded: loaded (/lib/systemd/system/nginx.service; enabled)\n   Active: active (running) since ...\n   Main PID: 1234 (nginx)",
            },
        ],
    },
    {
        id: 8,
        slug: "package-management",
        title: "Package Management",
        description: "Installing software with apt, yum/dnf, snap, and compiling from source.",
        sections: [
            {
                heading: "APT (Debian/Ubuntu)",
                content: "APT (Advanced Package Tool) is the default package manager for Debian-based distributions.",
                code: `# Update package index
sudo apt update

# Upgrade all packages
sudo apt upgrade -y

# Full upgrade (handles dependency changes)
sudo apt full-upgrade -y

# Install a package
sudo apt install nginx

# Remove a package
sudo apt remove nginx

# Remove package + config files
sudo apt purge nginx

# Search for a package
apt search nodejs

# Show package details
apt show nginx

# List installed packages
apt list --installed

# Clean up unused packages
sudo apt autoremove -y`,
                codeTitle: "apt.sh",
            },
            {
                heading: "YUM / DNF (RHEL/CentOS/Fedora)",
                content: "YUM and its successor DNF are used on Red Hat-based distributions.",
                code: `# Update all packages
sudo dnf update -y

# Install a package
sudo dnf install httpd

# Remove a package
sudo dnf remove httpd

# Search for a package
dnf search nodejs

# List installed packages
dnf list installed

# Show package info
dnf info httpd

# Install from a specific repository
sudo dnf install --enablerepo=epel package_name

# Clean cache
sudo dnf clean all`,
                codeTitle: "dnf.sh",
            },
            {
                heading: "Snap & Flatpak",
                content: "Universal package formats that work across distributions.",
                code: `# Install a snap package
sudo snap install code --classic    # VS Code
sudo snap install discord
sudo snap install postman

# List installed snaps
snap list

# Update all snaps
sudo snap refresh

# Remove a snap
sudo snap remove discord

# Flatpak (install Flatpak first)
flatpak install flathub org.gimp.GIMP
flatpak list
flatpak update`,
                codeTitle: "snap.sh",
            },
            {
                heading: "Compiling from Source",
                content: "Sometimes software is only available as source code. Here's the typical build process.",
                code: `# Install build essentials
sudo apt install build-essential

# Download source code
wget https://example.com/software-1.0.tar.gz
tar -xzvf software-1.0.tar.gz
cd software-1.0/

# The classic three-step build process
./configure              # Check dependencies, generate Makefile
make                     # Compile the source code
sudo make install        # Install to system

# Verify installation
which software
software --version`,
                codeTitle: "compile.sh",
                note: "Always check the project's README or INSTALL file for specific build instructions and required dependencies."
            },
        ],
    },
    {
        id: 9,
        slug: "shell-scripting",
        title: "Shell Scripting",
        description: "Writing bash scripts with variables, conditions, loops, and functions.",
        sections: [
            {
                heading: "Your First Shell Script",
                content: "A shell script is a file containing a series of commands. The first line (`shebang`) tells the system which interpreter to use.",
                code: `#!/bin/bash
# My first shell script

echo "Hello, World!"
echo "Today is: $(date)"
echo "Current user: $(whoami)"
echo "Working directory: $(pwd)"`,
                codeTitle: "hello.sh",
                output: "Hello, World!\nToday is: Fri Feb 14 15:30:00 IST 2026\nCurrent user: user\nWorking directory: /home/user",
                note: "Make the script executable with `chmod +x hello.sh`, then run it with `./hello.sh`."
            },
            {
                heading: "Variables & User Input",
                content: "Variables in bash do not require a type declaration. There must be no spaces around the `=` sign.",
                code: `#!/bin/bash

# Variable assignment (NO spaces around =)
NAME="Linux"
VERSION=22
PI=3.14

# Using variables
echo "Welcome to $NAME version $VERSION"

# Command substitution
CURRENT_DATE=$(date +%Y-%m-%d)
FILE_COUNT=$(ls | wc -l)
echo "Date: $CURRENT_DATE, Files: $FILE_COUNT"

# Read user input
echo -n "Enter your name: "
read USER_NAME
echo "Hello, $USER_NAME!"

# Read with prompt
read -p "Enter your age: " AGE
echo "You are $AGE years old."`,
                codeTitle: "variables.sh",
            },
            {
                heading: "Conditionals (if/else)",
                content: "Bash uses `if`, `elif`, and `else` for decision making. Conditions are enclosed in `[ ]` or `[[ ]]`.",
                code: `#!/bin/bash

read -p "Enter a number: " NUM

if [ $NUM -gt 0 ]; then
    echo "$NUM is positive"
elif [ $NUM -lt 0 ]; then
    echo "$NUM is negative"
else
    echo "It's zero"
fi

# String comparison
read -p "Enter OS name: " OS
if [[ "$OS" == "Linux" ]]; then
    echo "Great choice!"
elif [[ "$OS" == "Windows" ]]; then
    echo "Try WSL!"
else
    echo "Interesting OS: $OS"
fi

# File checks
FILE="/etc/hosts"
if [ -f "$FILE" ]; then
    echo "$FILE exists and is a regular file"
fi

if [ -d "/home" ]; then
    echo "/home is a directory"
fi`,
                codeTitle: "conditions.sh",
                note: "Common test operators: `-eq` (equal), `-ne` (not equal), `-gt` (greater than), `-lt` (less than), `-f` (file exists), `-d` (directory exists)."
            },
            {
                heading: "Loops",
                content: "Bash supports `for`, `while`, and `until` loops.",
                code: `#!/bin/bash

# For loop with range
for i in {1..5}; do
    echo "Count: $i"
done

# For loop with list
for lang in Python Java Go Linux; do
    echo "Tutorial: $lang"
done

# C-style for loop
for ((i=0; i<5; i++)); do
    echo "Index: $i"
done

# While loop
COUNT=1
while [ $COUNT -le 5 ]; do
    echo "While: $COUNT"
    ((COUNT++))
done

# Loop through files
for file in *.txt; do
    echo "Processing: $file"
    wc -l "$file"
done`,
                codeTitle: "loops.sh",
                output: "Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5\nTutorial: Python\nTutorial: Java\n...",
            },
            {
                heading: "Functions",
                content: "Functions let you organize and reuse code in your scripts.",
                code: `#!/bin/bash

# Define a function
greet() {
    echo "Hello, $1! Welcome to $2."
}

# Call the function with arguments
greet "Alice" "Linux"
greet "Bob" "Bash Scripting"

# Function with return value
is_even() {
    if (( $1 % 2 == 0 )); then
        return 0  # true in bash
    else
        return 1  # false in bash
    fi
}

is_even 42
if [ $? -eq 0 ]; then
    echo "42 is even"
fi

# Function capturing output
get_disk_usage() {
    df -h / | awk 'NR==2 {print $5}'
}

USAGE=$(get_disk_usage)
echo "Disk usage: $USAGE"`,
                codeTitle: "functions.sh",
                output: "Hello, Alice! Welcome to Linux.\nHello, Bob! Welcome to Bash Scripting.\n42 is even\nDisk usage: 45%",
            },
        ],
    },
    {
        id: 10,
        slug: "networking",
        title: "Networking Basics",
        description: "Network configuration, SSH, SCP, curl, wget, and firewall management.",
        sections: [
            {
                heading: "Network Information",
                content: "View and configure network interfaces and connections.",
                code: `# Show IP addresses (modern)
ip addr show

# Show IP addresses (legacy)
ifconfig

# Show routing table
ip route show

# Show DNS configuration
cat /etc/resolv.conf

# Test connectivity
ping -c 4 google.com

# Trace network path
traceroute google.com

# Show open ports and connections
ss -tulnp

# DNS lookup
nslookup example.com
dig example.com`,
                codeTitle: "network_info.sh",
                output: "PING google.com (142.250.67.206) 56(84) bytes of data.\n64 bytes from bom12s15-in-f14.1e100.net: icmp_seq=1 ttl=117 time=5.23 ms\n64 bytes from bom12s15-in-f14.1e100.net: icmp_seq=2 ttl=117 time=4.87 ms",
            },
            {
                heading: "SSH (Secure Shell)",
                content: "SSH provides a secure way to access remote Linux machines over an encrypted connection.",
                code: `# Connect to a remote server
ssh user@192.168.1.100

# Connect on a custom port
ssh -p 2222 user@server.com

# Generate SSH key pair
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key to remote server
ssh-copy-id user@192.168.1.100

# SSH with key-based authentication (no password needed)
ssh -i ~/.ssh/id_ed25519 user@server.com

# Run a command on remote server
ssh user@server.com "df -h && free -m"

# SSH config file (~/.ssh/config) for shortcuts
# Host myserver
#     HostName 192.168.1.100
#     User admin
#     Port 2222
#     IdentityFile ~/.ssh/id_ed25519`,
                codeTitle: "ssh.sh",
                note: "Always use SSH key-based authentication instead of passwords for better security. Disable password auth in `/etc/ssh/sshd_config`."
            },
            {
                heading: "File Transfer (SCP & rsync)",
                content: "Transfer files securely between local and remote machines.",
                code: `# Copy file to remote server
scp file.txt user@server:/home/user/

# Copy file from remote server
scp user@server:/var/log/app.log ./

# Copy directory recursively
scp -r project/ user@server:/home/user/

# rsync — better for large transfers and syncing
rsync -avz ./project/ user@server:/home/user/project/

# rsync with progress
rsync -avz --progress backup/ user@server:/backup/

# rsync dry run (preview changes)
rsync -avzn ./src/ user@server:/deploy/src/`,
                codeTitle: "file_transfer.sh",
            },
            {
                heading: "Downloading with curl & wget",
                content: "Download files and interact with web APIs from the command line.",
                code: `# Download a file with wget
wget https://example.com/file.zip

# Download and rename
wget -O myfile.zip https://example.com/file.zip

# Download in background
wget -b https://example.com/large-file.iso

# curl — fetch a URL
curl https://api.github.com

# curl — download a file
curl -O https://example.com/file.zip

# curl — POST request with JSON
curl -X POST https://api.example.com/data \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Linux", "type": "OS"}'

# curl — with authentication
curl -u username:password https://api.example.com/private`,
                codeTitle: "download.sh",
            },
            {
                heading: "Firewall (UFW)",
                content: "UFW (Uncomplicated Firewall) is a user-friendly interface for managing iptables firewall rules.",
                code: `# Enable firewall
sudo ufw enable

# Check status
sudo ufw status verbose

# Allow a port
sudo ufw allow 22        # SSH
sudo ufw allow 80        # HTTP
sudo ufw allow 443       # HTTPS

# Allow a specific service
sudo ufw allow OpenSSH

# Deny a port
sudo ufw deny 3306       # Block MySQL from outside

# Allow from specific IP
sudo ufw allow from 192.168.1.100

# Allow port range
sudo ufw allow 8000:8080/tcp

# Delete a rule
sudo ufw delete allow 80

# Reset all rules
sudo ufw reset`,
                codeTitle: "firewall.sh",
                note: "Always make sure SSH (port 22) is allowed before enabling UFW, or you may lock yourself out of a remote server!"
            },
        ],
    },
];
