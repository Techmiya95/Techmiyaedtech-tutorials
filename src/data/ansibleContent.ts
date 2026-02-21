import { Chapter } from "./javaContent";

export const ansibleChapters: Chapter[] = [
    {
        id: 1,
        slug: "introduction-to-ansible",
        title: "Introduction to Ansible",
        description: "Agentless automation, inventory management, SSH, and Ansible architecture.",
        sections: [
            {
                heading: "What is Ansible?",
                content: "Ansible is an open-source automation tool for configuration management, application deployment, and orchestration. It's built on Python and uses SSH to communicate with remote servers.\n\n**Key Features:**\n• **Agentless** — No software to install on remote nodes (uses SSH).\n• **Idempotent** — Running the same task multiple times produces the same result.\n• **Declarative** — You describe the desired state, Ansible ensures it.\n• **Simple** — Uses YAML (no programming skills needed).\n\n**Ansible vs Other Tools:**\n\n| Feature | Ansible | Chef | Puppet |\n|---|---|---|---|\n| **Agent** | Agentless (SSH) | Agent required | Agent required |\n| **Language** | YAML | Ruby DSL | Puppet DSL |\n| **Architecture** | Push-based | Pull-based | Pull-based |\n| **Learning Curve** | Low | High | Medium |",
                note: "Ansible's agentless architecture is its biggest advantage — just SSH access and Python on the target machine."
            },
            {
                heading: "Installing Ansible",
                content: "Ansible runs on the control node (your laptop or a management server) and connects to managed nodes via SSH.",
                code: `# Install Ansible (Ubuntu/Debian)
sudo apt update
sudo apt install -y ansible

# OR install via pip (latest version)
pip install ansible

# Verify installation
ansible --version

# Check connectivity to a remote host
ansible all -m ping -i "192.168.1.100,"

# Ansible configuration file (priority order):
# 1. ANSIBLE_CONFIG environment variable
# 2. ./ansible.cfg (current directory)
# 3. ~/.ansible.cfg (home directory)
# 4. /etc/ansible/ansible.cfg (global)`,
                codeTitle: "install-ansible.sh"
            },
            {
                heading: "Inventory Management",
                content: "An inventory defines the hosts and groups that Ansible manages.",
                code: `# /etc/ansible/hosts OR ./inventory.ini

# Individual hosts
192.168.1.100
web-server-01 ansible_host=10.0.1.10

# Groups
[webservers]
web-01 ansible_host=10.0.1.10
web-02 ansible_host=10.0.1.11
web-03 ansible_host=10.0.1.12

[databases]
db-01 ansible_host=10.0.2.10
db-02 ansible_host=10.0.2.11

[cache]
redis-01 ansible_host=10.0.3.10

# Group of groups
[production:children]
webservers
databases
cache

# Group variables
[webservers:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=~/.ssh/production-key.pem
http_port=80

[databases:vars]
ansible_user=admin
db_port=5432`,
                codeTitle: "inventory.ini",
                note: "For dynamic infrastructure (cloud), use dynamic inventory scripts that auto-discover hosts from AWS, Azure, or GCP."
            },
            {
                heading: "Ansible Configuration",
                content: "Create an `ansible.cfg` file for project-specific settings.",
                code: `# ansible.cfg
[defaults]
inventory      = ./inventory.ini
remote_user    = ubuntu
private_key_file = ~/.ssh/my-key.pem
host_key_checking = False
retry_files_enabled = False
timeout        = 30

[privilege_escalation]
become = True
become_method = sudo
become_user = root
become_ask_pass = False

[ssh_connection]
pipelining = True
ssh_args = -o ControlMaster=auto -o ControlPersist=60s`,
                codeTitle: "ansible.cfg"
            }
        ]
    },
    {
        id: 2,
        slug: "ad-hoc-commands",
        title: "Ad-Hoc Commands & Modules",
        description: "Running quick commands across multiple servers without writing playbooks.",
        sections: [
            {
                heading: "Ad-Hoc Commands",
                content: "Ad-hoc commands are one-liner Ansible commands for quick tasks. They're perfect for tasks you don't need to repeat.\n\nSyntax: `ansible <hosts> -m <module> -a \"<arguments>\"`",
                code: `# Ping all hosts (connectivity check)
ansible all -m ping

# Ping specific group
ansible webservers -m ping

# Run shell command on all servers
ansible all -m shell -a "uptime"

# Check disk space
ansible all -m shell -a "df -h /"

# Get system info
ansible all -m setup -a "filter=ansible_os_family"

# Copy a file to all web servers
ansible webservers -m copy -a "src=./config.conf dest=/etc/app/config.conf"

# Install a package
ansible webservers -m apt -a "name=nginx state=present" --become

# Start/stop a service
ansible webservers -m service -a "name=nginx state=started enabled=yes" --become

# Create a user
ansible all -m user -a "name=deploy state=present groups=sudo" --become

# Reboot all servers in a group
ansible databases -m reboot --become

# Run on specific hosts
ansible web-01,web-02 -m shell -a "free -m"`,
                codeTitle: "ad-hoc-commands.sh",
                note: "Ad-hoc commands are great for one-time tasks. For anything you run repeatedly, write a playbook."
            },
            {
                heading: "Common Modules",
                content: "Ansible has 3,000+ modules. Here are the most important ones:\n\n| Module | Purpose | Example |\n|---|---|---|\n| **ping** | Test connectivity | `ansible all -m ping` |\n| **shell** | Run shell commands | `-m shell -a \"whoami\"` |\n| **command** | Run commands (no shell features) | `-m command -a \"ls -la\"` |\n| **copy** | Copy files to remote | `-m copy -a \"src=... dest=...\"` |\n| **file** | Manage files/directories | `-m file -a \"path=... state=directory\"` |\n| **apt/yum** | Package management | `-m apt -a \"name=nginx state=present\"` |\n| **service** | Manage services | `-m service -a \"name=nginx state=started\"` |\n| **user** | Manage users | `-m user -a \"name=deploy state=present\"` |\n| **template** | Deploy Jinja2 templates | Used in playbooks |\n| **git** | Clone repositories | `-m git -a \"repo=... dest=...\"` |\n| **lineinfile** | Manage single lines in files | Used in playbooks |\n| **cron** | Manage cron jobs | `-m cron -a \"name=... job=... minute=*/5\"` |",
                note: "The 'command' module is safer (no shell injection) but doesn't support pipes, redirects, or environment variables. Use 'shell' for those."
            }
        ]
    },
    {
        id: 3,
        slug: "ansible-playbooks",
        title: "Playbooks & Tasks",
        description: "Writing YAML playbooks to automate multi-step server configuration.",
        sections: [
            {
                heading: "Playbook Structure",
                content: "Playbooks are YAML files that define a series of tasks to execute on target hosts.\n\nStructure:\n• **Play** — Targets specific hosts and defines tasks.\n• **Task** — A single action using a module.\n• **Handler** — A task triggered by notifications (e.g., restart service after config change).",
                code: `# setup-webserver.yml
---
- name: Setup Web Server
  hosts: webservers
  become: yes
  
  vars:
    app_port: 3000
    app_user: appuser
    
  tasks:
    - name: Update apt cache
      apt:
        update_cache: yes
        cache_valid_time: 3600
        
    - name: Install required packages
      apt:
        name:
          - nginx
          - nodejs
          - npm
          - git
        state: present
        
    - name: Create application user
      user:
        name: "{{ app_user }}"
        shell: /bin/bash
        create_home: yes
        
    - name: Create application directory
      file:
        path: /opt/myapp
        state: directory
        owner: "{{ app_user }}"
        group: "{{ app_user }}"
        mode: '0755'
        
    - name: Clone application repository
      git:
        repo: https://github.com/techmiya/web-app.git
        dest: /opt/myapp
        version: main
      become_user: "{{ app_user }}"
      
    - name: Install npm dependencies
      npm:
        path: /opt/myapp
        production: yes
      become_user: "{{ app_user }}"
      
    - name: Deploy Nginx configuration
      template:
        src: templates/nginx.conf.j2
        dest: /etc/nginx/sites-available/myapp
      notify: Restart Nginx
      
    - name: Enable Nginx site
      file:
        src: /etc/nginx/sites-available/myapp
        dest: /etc/nginx/sites-enabled/myapp
        state: link
      notify: Restart Nginx
      
  handlers:
    - name: Restart Nginx
      service:
        name: nginx
        state: restarted`,
                codeTitle: "setup-webserver.yml"
            },
            {
                heading: "Running Playbooks",
                content: "Execute playbooks with various options:",
                code: `# Run a playbook
ansible-playbook setup-webserver.yml

# Run with specific inventory
ansible-playbook -i inventory.ini setup-webserver.yml

# Run with extra variables
ansible-playbook setup-webserver.yml -e "app_port=8080"

# Dry run (check mode — no changes made)
ansible-playbook setup-webserver.yml --check

# Show differences
ansible-playbook setup-webserver.yml --diff

# Limit to specific hosts
ansible-playbook setup-webserver.yml --limit web-01

# Start from a specific task
ansible-playbook setup-webserver.yml --start-at-task="Install npm dependencies"

# Step through tasks one by one
ansible-playbook setup-webserver.yml --step

# List all tasks without running
ansible-playbook setup-webserver.yml --list-tasks

# Verbose output (add more v's for more detail)
ansible-playbook setup-webserver.yml -v
ansible-playbook setup-webserver.yml -vvv`,
                codeTitle: "run-playbook.sh",
                note: "Always run with --check first in production to preview changes before applying them."
            },
            {
                heading: "Conditionals & Loops",
                content: "Control task execution with conditions and iterate over lists.",
                code: `# Conditionals with 'when'
- name: Install Apache on RedHat
  yum:
    name: httpd
    state: present
  when: ansible_os_family == "RedHat"

- name: Install Nginx on Debian
  apt:
    name: nginx
    state: present
  when: ansible_os_family == "Debian"

# Loop over a list
- name: Create multiple users
  user:
    name: "{{ item }}"
    state: present
    groups: developers
  loop:
    - alice
    - bob
    - charlie

# Loop with dictionaries
- name: Create users with specific UIDs
  user:
    name: "{{ item.name }}"
    uid: "{{ item.uid }}"
    groups: "{{ item.groups }}"
  loop:
    - { name: 'alice', uid: 1001, groups: 'admin' }
    - { name: 'bob', uid: 1002, groups: 'developers' }

# Register output and use in conditions
- name: Check if config file exists
  stat:
    path: /etc/app/config.yml
  register: config_file

- name: Create default config
  copy:
    src: default-config.yml
    dest: /etc/app/config.yml
  when: not config_file.stat.exists`,
                codeTitle: "conditionals-loops.yml"
            }
        ]
    },
    {
        id: 4,
        slug: "ansible-variables-templates",
        title: "Variables & Jinja2 Templates",
        description: "Managing configuration with variables, facts, and dynamic Jinja2 templates.",
        sections: [
            {
                heading: "Variable Types & Precedence",
                content: "Ansible variables can be defined in many places. The precedence order (highest to lowest):\n\n1. Extra vars (`-e` command line)\n2. Task vars\n3. Play vars\n4. Host vars / Group vars\n5. Inventory vars\n6. Role defaults\n\n**Variable Sources:**\n• **Inventory** — Per host or per group.\n• **Playbook** — `vars:` section.\n• **Files** — `vars_files:` or `group_vars/` and `host_vars/` folders.\n• **Facts** — Auto-gathered system information.\n• **Registered** — Output of previous tasks.",
                code: `# Variable definition methods

# 1. In playbook
- hosts: webservers
  vars:
    http_port: 80
    max_connections: 1000
    
# 2. In a separate file
- hosts: webservers
  vars_files:
    - vars/common.yml
    - vars/{{ environment }}.yml

# 3. Group variables (group_vars/webservers.yml)
# group_vars/webservers.yml
http_port: 80
app_pool_size: 5
deploy_user: www-data

# 4. Host variables (host_vars/web-01.yml)
# host_vars/web-01.yml
custom_port: 8080
is_primary: true

# 5. Ansible Facts (auto-gathered)
# Access with: ansible_hostname, ansible_os_family, etc.
- name: Show system facts
  debug:
    msg: |
      Hostname: {{ ansible_hostname }}
      OS: {{ ansible_distribution }} {{ ansible_distribution_version }}
      IP: {{ ansible_default_ipv4.address }}
      CPUs: {{ ansible_processor_vcpus }}
      RAM: {{ ansible_memtotal_mb }} MB`,
                codeTitle: "variables.yml"
            },
            {
                heading: "Jinja2 Templates",
                content: "Templates allow you to generate dynamic configuration files using variables.",
                code: `# templates/nginx.conf.j2
upstream app_backend {
{% for server in groups['webservers'] %}
    server {{ hostvars[server].ansible_host }}:{{ app_port }};
{% endfor %}
}

server {
    listen {{ http_port }};
    server_name {{ domain_name }};

    location / {
        proxy_pass http://app_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

{% if enable_ssl | default(false) %}
    listen 443 ssl;
    ssl_certificate /etc/ssl/{{ domain_name }}.crt;
    ssl_certificate_key /etc/ssl/{{ domain_name }}.key;
{% endif %}

    # Generated by Ansible on {{ ansible_date_time.iso8601 }}
    # Managed by: {{ ansible_user_id }}
}`,
                codeTitle: "templates/nginx.conf.j2"
            },
            {
                heading: "Using Templates in Playbooks",
                content: "Deploy templates with the template module.",
                code: `# playbook.yml
- name: Configure Nginx
  hosts: webservers
  become: yes
  
  vars:
    domain_name: app.techmiya.com
    app_port: 3000
    http_port: 80
    enable_ssl: true
    
  tasks:
    - name: Deploy Nginx config
      template:
        src: templates/nginx.conf.j2
        dest: /etc/nginx/sites-available/{{ domain_name }}
        owner: root
        group: root
        mode: '0644'
        validate: "nginx -t -c %s"    # Validate before applying
      notify: Reload Nginx

    - name: Deploy application config
      template:
        src: templates/app-config.yml.j2
        dest: /opt/myapp/config.yml
        owner: "{{ deploy_user }}"
        mode: '0600'    # Restrictive permissions for sensitive config
      notify: Restart Application

  handlers:
    - name: Reload Nginx
      service: name=nginx state=reloaded
      
    - name: Restart Application
      service: name=myapp state=restarted`,
                codeTitle: "template-playbook.yml",
                note: "The 'validate' parameter tests the generated config before deploying — preventing broken configurations."
            }
        ]
    },
    {
        id: 5,
        slug: "ansible-automation",
        title: "Server Configuration & Software Automation",
        description: "Automating complete server setups, software installation, and application deployment.",
        sections: [
            {
                heading: "Complete Server Setup Playbook",
                content: "Automate the full setup of a production web server from scratch.",
                code: `# server-setup.yml
---
- name: Complete Server Setup
  hosts: all
  become: yes
  
  vars:
    timezone: Asia/Kolkata
    swap_size: 2G
    ssh_port: 22
    allowed_ssh_users:
      - deploy
      - admin
    
  tasks:
    # System Configuration
    - name: Set timezone
      timezone:
        name: "{{ timezone }}"

    - name: Update all packages
      apt:
        upgrade: dist
        update_cache: yes
        cache_valid_time: 3600

    - name: Install essential packages
      apt:
        name:
          - curl
          - wget
          - git
          - vim
          - htop
          - unzip
          - ufw
          - fail2ban
          - logrotate
        state: present

    # Security Hardening
    - name: Configure UFW firewall
      ufw:
        rule: allow
        port: "{{ item }}"
        proto: tcp
      loop:
        - "{{ ssh_port }}"
        - '80'
        - '443'

    - name: Enable UFW
      ufw:
        state: enabled
        policy: deny

    - name: Harden SSH configuration
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: "{{ item.regexp }}"
        line: "{{ item.line }}"
      loop:
        - { regexp: '^#?PermitRootLogin', line: 'PermitRootLogin no' }
        - { regexp: '^#?PasswordAuthentication', line: 'PasswordAuthentication no' }
        - { regexp: '^#?MaxAuthTries', line: 'MaxAuthTries 3' }
      notify: Restart SSH

    # Swap Configuration
    - name: Create swap file
      command: fallocate -l {{ swap_size }} /swapfile
      args:
        creates: /swapfile

    - name: Set swap file permissions
      file:
        path: /swapfile
        mode: '0600'

    - name: Setup swap
      command: mkswap /swapfile
      when: ansible_swaptotal_mb == 0

    - name: Enable swap
      command: swapon /swapfile
      when: ansible_swaptotal_mb == 0

  handlers:
    - name: Restart SSH
      service:
        name: sshd
        state: restarted`,
                codeTitle: "server-setup.yml"
            },
            {
                heading: "Docker Installation Playbook",
                content: "Automate Docker installation across multiple servers.",
                code: `# install-docker.yml
---
- name: Install Docker on Ubuntu Servers
  hosts: all
  become: yes
  
  tasks:
    - name: Remove old Docker versions
      apt:
        name:
          - docker
          - docker-engine
          - docker.io
          - containerd
          - runc
        state: absent

    - name: Install prerequisites
      apt:
        name:
          - ca-certificates
          - curl
          - gnupg
          - lsb-release
        state: present
        update_cache: yes

    - name: Add Docker GPG key
      apt_key:
        url: https://download.docker.com/linux/ubuntu/gpg
        state: present

    - name: Add Docker repository
      apt_repository:
        repo: "deb https://download.docker.com/linux/ubuntu {{ ansible_distribution_release }} stable"
        state: present

    - name: Install Docker Engine
      apt:
        name:
          - docker-ce
          - docker-ce-cli
          - containerd.io
          - docker-compose-plugin
        state: present
        update_cache: yes

    - name: Add users to docker group
      user:
        name: "{{ item }}"
        groups: docker
        append: yes
      loop:
        - ubuntu
        - deploy

    - name: Start and enable Docker
      service:
        name: docker
        state: started
        enabled: yes

    - name: Verify Docker installation
      command: docker --version
      register: docker_version

    - name: Show Docker version
      debug:
        msg: "Docker installed: {{ docker_version.stdout }}"`,
                codeTitle: "install-docker.yml"
            }
        ]
    },
    {
        id: 6,
        slug: "ansible-roles",
        title: "Roles & Handlers",
        description: "Organizing playbooks into reusable roles with handlers for service management.",
        sections: [
            {
                heading: "What are Roles?",
                content: "Roles are a way to organize playbooks into reusable components. They follow a standard directory structure.\n\n```\nroles/\n└── webserver/\n    ├── tasks/\n    │   └── main.yml        # Core tasks\n    ├── handlers/\n    │   └── main.yml        # Service handlers\n    ├── templates/\n    │   └── nginx.conf.j2   # Config templates\n    ├── files/\n    │   └── ssl.crt         # Static files\n    ├── vars/\n    │   └── main.yml        # Role variables\n    ├── defaults/\n    │   └── main.yml        # Default variables (lowest priority)\n    ├── meta/\n    │   └── main.yml        # Role metadata & dependencies\n    └── README.md\n```",
                note: "Roles from Ansible Galaxy (galaxy.ansible.com) can save hours — community roles for Nginx, Docker, PostgreSQL, etc."
            },
            {
                heading: "Creating a Role",
                content: "Create a reusable Nginx role.",
                code: `# Create role skeleton
ansible-galaxy init roles/nginx

# roles/nginx/defaults/main.yml
---
nginx_port: 80
nginx_worker_processes: auto
nginx_worker_connections: 1024
server_name: localhost
app_backend_port: 3000

# roles/nginx/tasks/main.yml
---
- name: Install Nginx
  apt:
    name: nginx
    state: present
    update_cache: yes

- name: Deploy Nginx configuration
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/sites-available/default
    validate: "nginx -t -c /etc/nginx/nginx.conf"
  notify: Restart Nginx

- name: Ensure Nginx is running
  service:
    name: nginx
    state: started
    enabled: yes

# roles/nginx/handlers/main.yml
---
- name: Restart Nginx
  service:
    name: nginx
    state: restarted

- name: Reload Nginx
  service:
    name: nginx
    state: reloaded`,
                codeTitle: "nginx-role"
            },
            {
                heading: "Using Roles in Playbooks",
                content: "Reference roles from your main playbook.",
                code: `# site.yml — Main playbook using roles
---
- name: Setup Production Infrastructure
  hosts: all
  become: yes
  roles:
    - common      # Basic server setup

- name: Configure Web Servers
  hosts: webservers
  become: yes
  roles:
    - nginx
    - role: nodejs
      vars:
        nodejs_version: "18"
    - myapp

- name: Configure Database Servers
  hosts: databases
  become: yes
  roles:
    - role: postgresql
      vars:
        pg_version: "15"
        pg_max_connections: 200

# Install roles from Ansible Galaxy
# ansible-galaxy install geerlingguy.docker
# ansible-galaxy install geerlingguy.nginx

# requirements.yml — Define role dependencies
---
roles:
  - name: geerlingguy.docker
    version: "6.1.0"
  - name: geerlingguy.nginx
    version: "3.2.0"

# Install all roles from requirements
# ansible-galaxy install -r requirements.yml`,
                codeTitle: "site.yml",
                note: "This 'site.yml' pattern is the standard way to orchestrate your entire infrastructure setup."
            }
        ]
    },
    {
        id: 7,
        slug: "ansible-vault",
        title: "Ansible Vault & Best Practices",
        description: "Encrypting sensitive data, project structure, and production best practices.",
        sections: [
            {
                heading: "Ansible Vault",
                content: "Ansible Vault encrypts sensitive data (passwords, API keys, certificates) so they can be safely stored in Git.",
                code: `# Create an encrypted file
ansible-vault create secrets.yml

# Encrypt an existing file
ansible-vault encrypt vars/production.yml

# View encrypted file
ansible-vault view secrets.yml

# Edit encrypted file
ansible-vault edit secrets.yml

# Decrypt a file
ansible-vault decrypt secrets.yml

# Change vault password
ansible-vault rekey secrets.yml

# Encrypt a single string
ansible-vault encrypt_string 'SuperSecret123' --name 'db_password'
# Output:
# db_password: !vault |
#   $ANSIBLE_VAULT;1.1;AES256
#   3830636...

# Run playbook with vault
ansible-playbook site.yml --ask-vault-pass

# Pass vault password from file
ansible-playbook site.yml --vault-password-file ~/.vault_pass`,
                codeTitle: "vault-commands.sh"
            },
            {
                heading: "Using Vault in Playbooks",
                content: "Store sensitive variables in encrypted vault files.",
                code: `# group_vars/production/vault.yml (encrypted)
---
vault_db_password: SuperSecretPassword123
vault_api_key: abcdef123456
vault_ssl_private_key: |
  -----BEGIN PRIVATE KEY-----
  MIIEvQIBADANBgkqhki...
  -----END PRIVATE KEY-----

# group_vars/production/vars.yml (plain text — references vault)
---
db_password: "{{ vault_db_password }}"
api_key: "{{ vault_api_key }}"
ssl_private_key: "{{ vault_ssl_private_key }}"

# Usage in playbook
- name: Configure application
  template:
    src: app-config.yml.j2
    dest: /opt/myapp/config.yml
    mode: '0600'

# Best Practice: Prefix vault variables with 'vault_'
# and reference them from regular variables files.
# This makes it clear which values are encrypted.`,
                codeTitle: "vault-usage.yml",
                note: "Convention: Use vault_ prefix for encrypted variables, and reference them from non-encrypted vars files."
            },
            {
                heading: "Production Best Practices",
                content: "Follow these practices for production Ansible:\n\n**Project Structure:**\n```\nansible/\n├── ansible.cfg\n├── inventory/\n│   ├── production.ini\n│   └── staging.ini\n├── group_vars/\n│   ├── all/\n│   │   ├── vars.yml\n│   │   └── vault.yml\n│   ├── webservers.yml\n│   └── databases.yml\n├── host_vars/\n├── roles/\n├── playbooks/\n│   ├── deploy.yml\n│   └── setup.yml\n├── templates/\n├── files/\n└── site.yml\n```\n\n**Key Rules:**\n• ✅ Always use `--check` before applying changes in production.\n• ✅ Use roles for reusability.\n• ✅ Encrypt secrets with Ansible Vault.\n• ✅ Use tags to run specific tasks.\n• ✅ Pin role versions in `requirements.yml`.\n• ✅ Test playbooks in staging first.\n• ❌ Never hardcode passwords in playbooks.\n• ❌ Don't run playbooks as root unnecessarily.",
                note: "Treat Ansible code like application code — use Git, code review, and CI/CD."
            }
        ]
    }
];
