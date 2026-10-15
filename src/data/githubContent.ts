import { Chapter } from "./javaContent";

export const githubChapters: Chapter[] = [
    {
        id: 1,
        slug: "version-control-concepts",
        title: "Version Control & Git Fundamentals",
        description: "What is version control? Git architecture, installation, and configuration.",
        sections: [
            {
                heading: "What is Version Control?",
                content: "Version Control is a system that records changes to files over time so you can recall specific versions later. It's essential for:\n\n• **Collaboration** — Multiple developers can work on the same project simultaneously.\n• **History** — Every change is tracked with who made it, when, and why.\n• **Rollback** — Easily revert to a previous working version if something breaks.\n• **Branching** — Experiment with new features without affecting the main codebase.\n\n**Types:**\n• **Centralized VCS** (CVCS) — One central server (e.g., SVN). Single point of failure.\n• **Distributed VCS** (DVCS) — Every developer has a full copy of the repository (e.g., Git). No single point of failure.",
                note: "Git is a Distributed VCS — even if the server goes down, every developer has a complete backup."
            },
            {
                heading: "Git vs GitHub",
                content: "**Git** is a version control system — a tool you install on your computer to track changes.\n**GitHub** is a hosting platform for Git repositories — it adds collaboration features like Pull Requests, Issues, and Actions.\n\n| Feature | Git | GitHub |\n|---|---|---|\n| **Type** | CLI tool (local) | Cloud platform (remote) |\n| **Installed** | On your computer | Accessed via browser/API |\n| **Purpose** | Track changes | Collaborate & host code |\n| **Alternatives** | — | GitLab, Bitbucket |",
                note: "You can use Git without GitHub, but you can't use GitHub without Git."
            },
            {
                heading: "Installing & Configuring Git",
                content: "Install Git and set up your identity before making your first commit.",
                code: `# Install Git
# Ubuntu/Debian
sudo apt install git -y

# macOS
brew install git

# Windows: Download from https://git-scm.com/downloads

# Verify installation
git --version

# Configure your identity (required before first commit)
git config --global user.name "Joel Fernando"
git config --global user.email "joel@techmiya.com"

# Set default branch name to 'main'
git config --global init.defaultBranch main

# Set VS Code as default editor
git config --global core.editor "code --wait"

# View all configuration
git config --list`,
                codeTitle: "git-setup.sh"
            },
            {
                heading: "Creating a Repository",
                content: "A repository (repo) is a directory tracked by Git. You can initialize a new repo or clone an existing one.",
                code: `# Initialize a new Git repository
mkdir my-project && cd my-project
git init
# Output: Initialized empty Git repository in /home/user/my-project/.git/

# Clone an existing repository from GitHub
git clone https://github.com/username/repo-name.git

# Clone into a specific folder
git clone https://github.com/username/repo-name.git my-folder

# Clone a specific branch
git clone -b develop https://github.com/username/repo-name.git

# Check repo status
git status`,
                codeTitle: "create-repo.sh",
                note: "The .git folder contains all Git metadata and history. Never delete it unless you want to remove version control."
            }
        ]
    },
    {
        id: 2,
        slug: "git-workflow",
        title: "Git Workflow — Add, Commit, Push, Pull",
        description: "The daily Git workflow: staging, committing, pushing, and pulling changes.",
        sections: [
            {
                heading: "The Git Workflow",
                content: "Git has three main areas:\n\n1. **Working Directory** — Where you edit files.\n2. **Staging Area (Index)** — Where you prepare changes for a commit.\n3. **Repository (.git)** — Where committed snapshots are stored.\n\nThe typical workflow:\n`Edit → Stage (git add) → Commit (git commit) → Push (git push)`",
                note: "Think of staging as a 'draft' area — you choose exactly what goes into each commit."
            },
            {
                heading: "Staging & Committing",
                content: "Stage specific files or all changes, then save them with a descriptive commit message.",
                code: `# Check what files have changed
git status

# Show detailed differences
git diff

# Stage a specific file
git add index.html

# Stage multiple files
git add src/app.js src/styles.css

# Stage all changes (new, modified, deleted)
git add .

# Unstage a file (remove from staging)
git restore --staged index.html

# Commit with a message
git commit -m "feat: add user login form"

# Commit with detailed message (opens editor)
git commit

# Add and commit in one step (tracked files only)
git commit -am "fix: resolve button alignment"`,
                codeTitle: "stage-commit.sh",
                note: "Follow Conventional Commits: feat:, fix:, docs:, chore:, refactor:, test:, style:"
            },
            {
                heading: "Pushing & Pulling",
                content: "Sync your local repository with the remote repository on GitHub.",
                code: `# Add a remote repository (first time)
git remote add origin https://github.com/username/repo.git

# View remotes
git remote -v

# Push to remote (first time — set upstream)
git push -u origin main

# Push subsequent changes
git push

# Pull latest changes from remote
git pull origin main

# Fetch changes without merging
git fetch origin

# View commit history
git log --oneline --graph --all

# View last 5 commits
git log -5 --oneline`,
                codeTitle: "push-pull.sh"
            },
            {
                heading: "Undoing Changes",
                content: "Git provides multiple ways to undo mistakes at different stages.",
                code: `# Discard changes in working directory (revert to last commit)
git restore index.html

# Unstage a file
git restore --staged index.html

# Amend the last commit (fix message or add forgotten files)
git add forgotten-file.js
git commit --amend -m "feat: updated commit message"

# Revert a specific commit (creates a new undo commit)
git revert abc1234

# Reset to a previous commit (DANGEROUS — rewrites history)
git reset --soft HEAD~1    # Keep changes staged
git reset --mixed HEAD~1   # Keep changes unstaged (default)
git reset --hard HEAD~1    # Discard all changes

# View reflog (recover lost commits)
git reflog`,
                codeTitle: "undo-changes.sh",
                note: "Never use 'git reset --hard' on shared branches — it rewrites history and causes problems for other developers."
            }
        ]
    },
    {
        id: 3,
        slug: "branching-merging",
        title: "Branching & Merging Strategies",
        description: "Create branches, merge features, and follow professional branching strategies.",
        sections: [
            {
                heading: "Understanding Branches",
                content: "A branch is just a lightweight pointer to a commit. Branches let you work on features independently without affecting the main codebase.\n\n**Why Branch?**\n• Isolate work on new features.\n• Fix bugs without disrupting ongoing development.\n• Enable parallel workstreams across a team.",
                note: "In Git, creating a branch is nearly instant — it doesn't copy any files."
            },
            {
                heading: "Branch Operations",
                content: "Create, switch, and manage branches with these commands:",
                code: `# List all local branches
git branch

# List all branches (local + remote)
git branch -a

# Create a new branch
git branch feature/user-auth

# Switch to a branch
git checkout feature/user-auth
# OR (modern syntax)
git switch feature/user-auth

# Create AND switch in one command
git checkout -b feature/payment-gateway
# OR
git switch -c feature/payment-gateway

# Rename current branch
git branch -m new-branch-name

# Delete a local branch (after merging)
git branch -d feature/old-feature

# Force delete (even if not merged)
git branch -D feature/abandoned-feature

# Delete a remote branch
git push origin --delete feature/old-feature`,
                codeTitle: "branching.sh"
            },
            {
                heading: "Merging Branches",
                content: "Merge integrates changes from one branch into another.",
                code: `# Switch to the target branch first
git checkout main

# Merge feature branch into main
git merge feature/user-auth

# Merge with a commit message (no fast-forward)
git merge --no-ff feature/user-auth -m "Merge: user auth feature"

# Abort a merge (if conflicts are too complex)
git merge --abort

# Rebase (alternative to merge — rewrites history for a clean line)
git checkout feature/user-auth
git rebase main

# Interactive rebase (squash, reorder, edit commits)
git rebase -i HEAD~3`,
                codeTitle: "merging.sh",
                note: "git merge preserves history as-is. git rebase creates a linear history but rewrites commits — never rebase shared branches."
            },
            {
                heading: "Branching Strategies",
                content: "Professional teams follow structured branching models:\n\n**1. Git Flow:**\n• `main` — Production-ready code.\n• `develop` — Integration branch for features.\n• `feature/*` — New features.\n• `release/*` — Preparing for production.\n• `hotfix/*` — Emergency production fixes.\n\n**2. GitHub Flow (Simplified):**\n• `main` — Always deployable.\n• Feature branches — Created from main, merged via Pull Request.\n\n**3. Trunk-Based Development:**\n• All code goes directly to `main` (with feature flags).\n• Short-lived branches (< 1 day).",
                note: "GitHub Flow is the most popular for teams using CI/CD."
            }
        ]
    },
    {
        id: 4,
        slug: "pull-requests",
        title: "Pull Requests & Code Reviews",
        description: "Collaborating through PRs, reviewing code, and maintaining code quality.",
        sections: [
            {
                heading: "What is a Pull Request (PR)?",
                content: "A Pull Request lets you tell others about changes you've pushed to a branch in a GitHub repository. It is the primary mechanism for code review and collaboration.\n\n**PR Workflow:**\n1. Create a feature branch from `main`.\n2. Make changes and push to GitHub.\n3. Open a Pull Request.\n4. Team reviews the code, adds comments.\n5. Make requested changes (push new commits).\n6. PR is approved and merged.\n\n**PR Best Practices:**\n• Keep PRs small and focused (< 400 lines).\n• Write clear titles and descriptions.\n• Link to the related issue.\n• Add reviewers and labels.",
                note: "Pull Requests are the heart of collaboration on GitHub. They enforce code quality and knowledge sharing."
            },
            {
                heading: "Creating a Pull Request",
                content: "Step-by-step workflow from branch creation to PR merge:",
                code: `# 1. Create and switch to a feature branch
git checkout -b feature/add-search

# 2. Make changes and commit
git add .
git commit -m "feat: implement search functionality"

# 3. Push branch to GitHub
git push -u origin feature/add-search

# 4. Open PR on GitHub (browser) or use GitHub CLI
gh pr create \\
    --title "feat: Add search functionality" \\
    --body "Implements search with filtering and pagination.
    
Closes #42" \\
    --base main \\
    --reviewer teammate1,teammate2

# 5. After PR is approved and merged, clean up
git checkout main
git pull origin main
git branch -d feature/add-search`,
                codeTitle: "pr-workflow.sh"
            },
            {
                heading: "Code Review Best Practices",
                content: "Effective code reviews catch bugs, improve design, and share knowledge.\n\n**As a Reviewer:**\n• Be kind and constructive — critique the code, not the person.\n• Focus on: correctness, readability, performance, security.\n• Ask questions instead of making demands (\"Have you considered...?\").\n• Approve if it's good enough, even if not perfect.\n\n**As an Author:**\n• Self-review your PR before requesting review.\n• Respond to every comment.\n• Don't take feedback personally.\n• Keep commits atomic and well-described.",
                note: "A good code review catches bugs before they reach production and helps junior developers learn from senior ones."
            }
        ]
    },
    {
        id: 5,
        slug: "conflict-resolution",
        title: "Conflict Resolution, Tags & Releases",
        description: "Resolving merge conflicts, creating Git tags, and managing GitHub releases.",
        sections: [
            {
                heading: "Understanding Merge Conflicts",
                content: "Merge conflicts occur when two branches modify the same lines of code differently. Git cannot automatically determine which change to keep.\n\n**When Conflicts Happen:**\n• Two developers edit the same line in a file.\n• One branch deletes a file that another branch modifies.\n• Renaming a file in one branch while editing it in another.",
                note: "Conflicts are normal and expected in collaborative development — they're not errors!"
            },
            {
                heading: "Resolving Conflicts",
                content: "When a conflict occurs, Git marks the conflicting areas in the file.",
                code: `# Attempt to merge (conflicts detected)
git merge feature/new-ui
# CONFLICT (content): Merge conflict in src/app.js

# Open the conflicting file — you'll see markers:
<<<<<<< HEAD
const theme = "dark";    # Your current branch
=======
const theme = "light";   # The incoming branch
>>>>>>> feature/new-ui

# Resolution Steps:
# 1. Edit the file — choose the correct code (or combine both)
# 2. Remove the conflict markers (<<<<<<<, =======, >>>>>>>)
# 3. Stage the resolved file
git add src/app.js

# 4. Complete the merge
git commit -m "fix: resolve theme conflict"

# Tips: Use a visual merge tool
git mergetool

# Configure VS Code as merge tool
git config --global merge.tool vscode`,
                codeTitle: "conflict-resolution.sh"
            },
            {
                heading: "Git Tags & GitHub Releases",
                content: "Tags mark specific points in history — typically used for release versions.",
                code: `# Create a lightweight tag
git tag v1.0.0

# Create an annotated tag (recommended)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tag a specific commit
git tag -a v0.9.0 -m "Beta release" abc1234

# List all tags
git tag -l

# Push a tag to remote
git push origin v1.0.0

# Push all tags
git push origin --tags

# Delete a tag
git tag -d v0.9.0
git push origin --delete v0.9.0

# Create a GitHub Release (GitHub CLI)
gh release create v1.0.0 \\
    --title "Release v1.0.0" \\
    --notes "First stable release with auth and dashboard"`,
                codeTitle: "tags-releases.sh",
                note: "Follow Semantic Versioning: MAJOR.MINOR.PATCH (e.g., v2.1.3). Major = breaking changes, Minor = new features, Patch = bug fixes."
            }
        ]
    },
    {
        id: 6,
        slug: "github-actions",
        title: "CI/CD with GitHub Actions",
        description: "Automate builds, tests, and deployments directly in your GitHub repository.",
        sections: [
            {
                heading: "What are GitHub Actions?",
                content: "GitHub Actions is a CI/CD platform built into GitHub. It automates your software workflow — build, test, and deploy your code right from GitHub.\n\n**Core Concepts:**\n• **Workflow** — An automated process defined in a YAML file (`.github/workflows/`).\n• **Event** — Triggers the workflow (push, pull_request, schedule, etc.).\n• **Job** — A set of steps that execute on the same runner.\n• **Step** — An individual task (run a command or use an action).\n• **Action** — A reusable unit of code (e.g., `actions/checkout@v3`).\n• **Runner** — The machine where jobs execute (GitHub-hosted or self-hosted).",
                note: "GitHub provides 2,000 free CI/CD minutes per month for private repos."
            },
            {
                heading: "Building a CI Pipeline",
                content: "Create a workflow that runs tests on every push and pull request.",
                code: `# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build project
        run: npm run build`,
                codeTitle: ".github/workflows/ci.yml"
            },
            {
                heading: "Building a CD Pipeline (Deploy)",
                content: "Automatically deploy to production when code is merged to main.",
                code: `# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install & Build
        run: |
          npm ci
          npm run build

      - name: Deploy to S3
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 sync ./dist s3://my-production-bucket --delete
          aws cloudfront create-invalidation \\
            --distribution-id \${{ secrets.CF_DIST_ID }} \\
            --paths "/*"`,
                codeTitle: ".github/workflows/deploy.yml",
                note: "Never hardcode secrets in workflow files — use GitHub Secrets (Settings → Secrets and Variables)."
            }
        ]
    },
    {
        id: 7,
        slug: "github-security",
        title: "Repository Security & Collaboration",
        description: "Webhooks, Dependabot, Secret Scanning, branch protection, and team workflows.",
        sections: [
            {
                heading: "Branch Protection Rules",
                content: "Protect important branches from accidental pushes and enforce code review.\n\n**Recommended settings for `main`:**\n• ✅ Require pull request reviews (at least 1 approver).\n• ✅ Require status checks to pass (CI must succeed).\n• ✅ Require branches to be up to date before merging.\n• ✅ Restrict who can push directly.\n• ✅ Require signed commits (optional but recommended).",
                note: "Never allow anyone to push directly to main in a team environment — always go through PRs."
            },
            {
                heading: "Dependabot & Security Scanning",
                content: "GitHub provides automated security tools to keep your dependencies safe.\n\n**Dependabot:**\n• Automatically creates PRs to update vulnerable dependencies.\n• Configure update frequency (daily, weekly, monthly).\n\n**Secret Scanning:**\n• Detects accidentally committed secrets (API keys, passwords, tokens).\n• Alerts you or blocks the push.\n\n**Code Scanning (CodeQL):**\n• Finds vulnerabilities and coding errors in your code.",
                code: `# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
    reviewers:
      - "team-lead"`,
                codeTitle: ".github/dependabot.yml"
            },
            {
                heading: "Webhooks & Integrations",
                content: "Webhooks allow external services to be notified when events happen in your repository.\n\n**Common Uses:**\n• Notify Slack/Discord when a PR is merged.\n• Trigger a Jenkins build on push.\n• Update a project management tool (Jira, Trello) on issue changes.\n• Deploy to a server when code is pushed.\n\n**Setup:**\n1. Go to Repository → Settings → Webhooks.\n2. Add the Payload URL (your server's endpoint).\n3. Choose events (push, pull_request, issues, etc.).\n4. Set content type to `application/json`.",
                note: "Webhooks are HTTP POST requests — your server needs an endpoint to receive them."
            },
            {
                heading: "Team Collaboration Workflow",
                content: "A professional team workflow using GitHub:\n\n**1. Project Setup:**\n• Create a GitHub Organization for your team.\n• Set up teams with appropriate permissions (Admin, Write, Read).\n• Create issue templates and PR templates.\n\n**2. Feature Development:**\n• Create an Issue describing the feature/bug.\n• Assign it to a developer.\n• Developer creates a feature branch.\n• Opens a PR linking the Issue.\n• Code review and CI checks.\n• Merge and auto-close the Issue.\n\n**3. Documentation:**\n• Use README.md for project overview.\n• Use Wiki for detailed documentation.\n• Use GitHub Pages for public docs.\n• Use CONTRIBUTING.md for contribution guidelines.",
                code: `# .github/PULL_REQUEST_TEMPLATE.md
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing done

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings`,
                codeTitle: ".github/PULL_REQUEST_TEMPLATE.md"
            }
        ]
    }
];
