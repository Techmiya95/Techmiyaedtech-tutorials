import { Chapter } from "./javaContent";

export const jenkinsChapters: Chapter[] = [
    {
        id: 1,
        slug: "introduction-to-jenkins",
        title: "Introduction to Jenkins & CI/CD",
        description: "Understanding CI/CD concepts, Jenkins architecture, and installation methods.",
        sections: [
            {
                heading: "What is CI/CD?",
                content: "**Continuous Integration (CI)** is the practice of frequently merging code changes into a shared repository, followed by automated builds and tests.\n\n**Continuous Delivery (CD)** extends CI by automatically deploying all code changes to a staging or production environment after the build stage.\n\n**CI/CD Pipeline Stages:**\n1. **Source** — Developer pushes code to Git.\n2. **Build** — Compile, resolve dependencies.\n3. **Test** — Run unit, integration, and end-to-end tests.\n4. **Deploy** — Push to staging or production.\n5. **Monitor** — Track application health.\n\n**Benefits:**\n• Faster bug detection.\n• Smaller, easier-to-debug code changes.\n• Automated quality gates.\n• Faster time to market.",
                note: "Jenkins is the industry standard for self-hosted CI/CD orchestration, with over 1,800 plugins."
            },
            {
                heading: "Jenkins Architecture",
                content: "Jenkins follows a **Controller-Agent** architecture:\n\n**Controller (Master):**\n• Manages the Jenkins configuration and UI.\n• Schedules and distributes jobs to agents.\n• Monitors agent health.\n• Stores build results and artifacts.\n\n**Agent (Slave / Node):**\n• Executes build jobs delegated by the Controller.\n• Can run on different operating systems.\n• Can be static VMs, Docker containers, or cloud instances.\n• Multiple agents can run in parallel.",
                note: "Never run heavy build jobs on the Controller — always distribute them to Agents."
            },
            {
                heading: "Installing Jenkins",
                content: "Jenkins can be installed via Docker (recommended), WAR file, or native packages.",
                code: `# Method 1: Docker (Recommended)
docker run -d \\
    --name jenkins \\
    -p 8080:8080 \\
    -p 50000:50000 \\
    -v jenkins_home:/var/jenkins_home \\
    jenkins/jenkins:lts

# Get initial admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# Method 2: Ubuntu/Debian native install
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \\
    https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key

echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \\
    https://pkg.jenkins.io/debian-stable binary/" | \\
    sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
sudo apt install jenkins -y

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Check status
sudo systemctl status jenkins

# Get initial admin password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword`,
                codeTitle: "install-jenkins.sh",
                note: "After installation, open http://localhost:8080 in your browser to complete the setup wizard."
            }
        ]
    },
    {
        id: 2,
        slug: "jenkins-jobs",
        title: "Jenkins Jobs — Freestyle & Pipeline",
        description: "Creating Freestyle jobs, understanding build triggers, and introduction to Pipeline jobs.",
        sections: [
            {
                heading: "Freestyle Jobs",
                content: "Freestyle jobs are the simplest type of Jenkins job. They are configured through the web UI.\n\n**Common Configuration:**\n1. **Source Code Management** — Connect to Git repository.\n2. **Build Triggers** — When to build (poll SCM, webhook, schedule).\n3. **Build Environment** — Set up environment variables.\n4. **Build Steps** — Execute shell commands or scripts.\n5. **Post-Build Actions** — Archive artifacts, send emails, trigger other jobs.",
                note: "Freestyle jobs are easy to set up but hard to version control. Use Pipeline jobs for anything beyond simple tasks."
            },
            {
                heading: "Build Triggers",
                content: "Jenkins supports multiple ways to trigger builds:\n\n• **Poll SCM** — Jenkins checks the repository at regular intervals.\n• **GitHub Webhook** — GitHub notifies Jenkins on push events (preferred).\n• **Build Periodically** — Run on a cron schedule.\n• **Trigger from another job** — Chain jobs together.\n• **Manual** — Click 'Build Now' manually.",
                code: `# Poll SCM schedule (cron syntax)
# Check for changes every 5 minutes
H/5 * * * *

# Build every night at midnight
H 0 * * *

# Build every Monday and Friday at 9 AM
H 9 * * 1,5

# GitHub Webhook URL (add to GitHub repository settings):
# http://your-jenkins-url/github-webhook/`,
                codeTitle: "build-triggers"
            },
            {
                heading: "Pipeline Jobs Overview",
                content: "Pipeline jobs define the entire build process as code in a `Jenkinsfile`. This file is stored alongside your source code in version control.\n\n**Advantages over Freestyle:**\n• **Version controlled** — Jenkinsfile is committed to Git.\n• **Code review** — Pipeline changes go through PRs.\n• **Reusable** — Share pipeline logic across projects.\n• **Durable** — Survives Jenkins restarts.\n• **Visualized** — Stage view shows progress.",
                code: `// Jenkinsfile — Minimal Pipeline
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh './deploy.sh'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}`,
                codeTitle: "Jenkinsfile"
            }
        ]
    },
    {
        id: 3,
        slug: "jenkins-pipeline-as-code",
        title: "Jenkinsfile & Pipeline as Code",
        description: "Writing Declarative Pipelines, Scripted Pipelines, and advanced Pipeline syntax.",
        sections: [
            {
                heading: "Declarative Pipeline",
                content: "The modern, structured way to define pipelines. It uses a predefined structure with specific sections.",
                code: `pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-18'    // Configured in Jenkins Global Tool Config
    }
    
    environment {
        APP_NAME    = 'my-web-app'
        DEPLOY_ENV  = 'staging'
        NODE_ENV    = 'production'
    }
    
    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Building branch: \${env.BRANCH_NAME}"
            }
        }
        
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Lint & Test') {
            parallel {
                stage('Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                stage('Unit Tests') {
                    steps {
                        sh 'npm test -- --coverage'
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                sh './scripts/deploy.sh staging'
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            input {
                message "Deploy to production?"
                ok "Yes, deploy!"
            }
            steps {
                sh './scripts/deploy.sh production'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            slackSend(color: 'good', message: "✅ Build #\${env.BUILD_NUMBER} succeeded")
        }
        failure {
            slackSend(color: 'danger', message: "❌ Build #\${env.BUILD_NUMBER} failed")
        }
    }
}`,
                codeTitle: "Jenkinsfile (Declarative)"
            },
            {
                heading: "Scripted Pipeline",
                content: "Scripted Pipelines offer more flexibility but are more complex. They use Groovy syntax directly.",
                code: `// Jenkinsfile — Scripted Pipeline
node('linux') {
    try {
        stage('Checkout') {
            checkout scm
        }
        
        stage('Build') {
            sh 'npm ci'
            sh 'npm run build'
        }
        
        stage('Test') {
            sh 'npm test'
        }
        
        if (env.BRANCH_NAME == 'main') {
            stage('Deploy') {
                withCredentials([
                    string(credentialsId: 'deploy-token', variable: 'TOKEN')
                ]) {
                    sh "deploy --token=\${TOKEN}"
                }
            }
        }
        
        currentBuild.result = 'SUCCESS'
    } catch (Exception e) {
        currentBuild.result = 'FAILURE'
        throw e
    } finally {
        cleanWs()
        echo "Build result: \${currentBuild.result}"
    }
}`,
                codeTitle: "Jenkinsfile (Scripted)",
                note: "Use Declarative for most pipelines. Use Scripted only when you need advanced Groovy logic."
            }
        ]
    },
    {
        id: 4,
        slug: "jenkins-github-docker",
        title: "GitHub & Docker Integration",
        description: "Integrating Jenkins with GitHub for automated builds and Docker for containerized pipelines.",
        sections: [
            {
                heading: "GitHub Integration",
                content: "Connect Jenkins to GitHub for automatic build triggers on push events.\n\n**Setup Steps:**\n1. Install the **GitHub** plugin in Jenkins.\n2. Create a **GitHub Personal Access Token** (Settings → Developer Settings).\n3. Add the token as a **Jenkins Credential** (Kind: Secret text).\n4. In your Jenkins job, select **GitHub project** and enter the URL.\n5. Under **Build Triggers**, check **GitHub hook trigger for GITScm polling**.\n6. In GitHub, add a Webhook: `http://your-jenkins:8080/github-webhook/`.",
                code: `// Jenkinsfile with GitHub integration
pipeline {
    agent any
    
    triggers {
        githubPush()   // Trigger on GitHub push events
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/techmiya/my-app.git',
                    credentialsId: 'github-credentials'
            }
        }
        
        stage('Build & Test') {
            steps {
                sh 'npm ci && npm test && npm run build'
            }
        }
    }
    
    post {
        success {
            // Update GitHub commit status
            githubNotify(status: 'SUCCESS', description: 'Build passed')
        }
        failure {
            githubNotify(status: 'FAILURE', description: 'Build failed')
        }
    }
}`,
                codeTitle: "Jenkinsfile (GitHub)"
            },
            {
                heading: "Docker Integration",
                content: "Use Docker in Jenkins to build images, run tests in containers, and push to registries.",
                code: `// Jenkinsfile with Docker
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE  = 'techmiya/web-app'
        DOCKER_TAG    = "\${env.BUILD_NUMBER}"
        REGISTRY_CRED = 'dockerhub-credentials'
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("\${DOCKER_IMAGE}:\${DOCKER_TAG}")
                }
            }
        }
        
        stage('Test in Container') {
            steps {
                script {
                    docker.image("\${DOCKER_IMAGE}:\${DOCKER_TAG}").inside {
                        sh 'npm test'
                    }
                }
            }
        }
        
        stage('Push to Registry') {
            when { branch 'main' }
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', REGISTRY_CRED) {
                        docker.image("\${DOCKER_IMAGE}:\${DOCKER_TAG}").push()
                        docker.image("\${DOCKER_IMAGE}:\${DOCKER_TAG}").push('latest')
                    }
                }
            }
        }
        
        stage('Deploy') {
            when { branch 'main' }
            steps {
                sh """
                    ssh deploy@production \\
                    "docker pull \${DOCKER_IMAGE}:latest && \\
                     docker-compose up -d"
                """
            }
        }
    }
}`,
                codeTitle: "Jenkinsfile (Docker)",
                note: "Make sure the Jenkins user has Docker permissions: sudo usermod -aG docker jenkins"
            },
            {
                heading: "Docker Agent Pipelines",
                content: "Run entire pipeline stages inside Docker containers for clean, reproducible builds.",
                code: `pipeline {
    agent none   // No global agent

    stages {
        stage('Build Frontend') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-v npm-cache:/root/.npm'
                }
            }
            steps {
                sh 'npm ci && npm run build'
                stash includes: 'dist/**', name: 'frontend-build'
            }
        }

        stage('Build Backend') {
            agent {
                docker {
                    image 'maven:3.8-openjdk-17'
                }
            }
            steps {
                sh 'mvn clean package -DskipTests'
                stash includes: 'target/*.jar', name: 'backend-build'
            }
        }

        stage('Integration Tests') {
            agent {
                docker {
                    image 'cypress/included:latest'
                }
            }
            steps {
                unstash 'frontend-build'
                sh 'npx cypress run'
            }
        }
    }
}`,
                codeTitle: "Jenkinsfile (Docker Agent)"
            }
        ]
    },
    {
        id: 5,
        slug: "jenkins-multibranch",
        title: "Multi-branch Pipelines & Build Automation",
        description: "Automatically discover, build, and test all branches in a repository.",
        sections: [
            {
                heading: "What are Multi-branch Pipelines?",
                content: "Multi-branch Pipelines automatically create a sub-project for each branch in your repository that contains a Jenkinsfile.\n\n**How it works:**\n1. Jenkins scans the repository for branches.\n2. Any branch with a Jenkinsfile gets its own pipeline.\n3. PRs also get their own pipeline.\n4. Branches without a Jenkinsfile are ignored.\n5. Dead branches are automatically cleaned up.\n\n**Benefits:**\n• No manual job creation per branch.\n• PRs are automatically tested.\n• Feature branches get CI immediately.\n• Clean separation of builds per branch.",
                note: "Multi-branch Pipelines are the recommended approach for most projects."
            },
            {
                heading: "Branch-Specific Logic",
                content: "Use the `when` directive to execute stages conditionally based on the branch.",
                code: `pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'npm ci && npm run build'
            }
        }
        
        stage('Unit Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Deploy to Dev') {
            when {
                branch 'develop'
            }
            steps {
                sh './deploy.sh dev'
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'release/*'
            }
            steps {
                sh './deploy.sh staging'
            }
        }
        
        stage('Deploy to Production') {
            when {
                allOf {
                    branch 'main'
                    not { changeRequest() }
                }
            }
            input {
                message "Approve production deployment?"
                submitter "admin,lead-dev"
            }
            steps {
                sh './deploy.sh production'
            }
        }
    }
    
    post {
        always {
            junit '**/test-results/*.xml'
            publishHTML(target: [
                reportDir: 'coverage',
                reportFiles: 'index.html',
                reportName: 'Coverage Report'
            ])
        }
    }
}`,
                codeTitle: "Jenkinsfile (Multi-branch)"
            }
        ]
    },
    {
        id: 6,
        slug: "jenkins-credentials",
        title: "Credentials Management & Security",
        description: "Securely managing API keys, passwords, SSH keys, and RBAC in Jenkins.",
        sections: [
            {
                heading: "Credentials Store",
                content: "Jenkins has a built-in credentials store to securely manage sensitive data.\n\n**Credential Types:**\n• **Username & Password** — For Git repositories, APIs.\n• **Secret Text** — API tokens, webhook secrets.\n• **Secret File** — kubeconfig, certificates.\n• **SSH Username with Private Key** — SSH access to servers.\n• **Certificate** — PKCS#12 certificates.\n\n**Scopes:**\n• **Global** — Available everywhere.\n• **System** — Only available to Jenkins internals.\n• **Folder** — Scoped to a specific folder/project.",
                note: "Never hardcode secrets in your Jenkinsfile — always use the Credentials store."
            },
            {
                heading: "Using Credentials in Pipelines",
                content: "Access credentials securely in your pipeline code.",
                code: `pipeline {
    agent any
    
    environment {
        // Bind credentials to environment variables
        DOCKER_CREDS = credentials('dockerhub-credentials')  // username + password
        AWS_CREDS    = credentials('aws-access-key')
        DEPLOY_TOKEN = credentials('deploy-api-token')        // secret text
    }
    
    stages {
        stage('Docker Login') {
            steps {
                sh 'echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin'
            }
        }
        
        stage('Deploy with Token') {
            steps {
                // Using withCredentials block (more explicit)
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    ),
                    string(
                        credentialsId: 'slack-webhook',
                        variable: 'SLACK_URL'
                    ),
                    sshUserPrivateKey(
                        credentialsId: 'deploy-ssh-key',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    sh '''
                        ssh -i $SSH_KEY $SSH_USER@production \\
                            "docker pull $DOCKER_USER/app:latest && \\
                             docker-compose up -d"
                    '''
                }
            }
        }
    }
}`,
                codeTitle: "Jenkinsfile (Credentials)"
            },
            {
                heading: "Role-Based Access Control (RBAC)",
                content: "Secure Jenkins by giving users only the permissions they need.\n\n**Setup RBAC:**\n1. Install the **Role-Based Authorization Strategy** plugin.\n2. Go to **Manage Jenkins → Security → Authorization**.\n3. Select **Role-Based Strategy**.\n4. Define roles:\n   - **Admin** — Full access.\n   - **Developer** — Build, view, cancel jobs.\n   - **Viewer** — Read-only access.\n5. Assign users/groups to roles.\n\n**Best Practices:**\n• ✅ Enable RBAC on Day 1.\n• ✅ Use Matrix-based or Project-based security.\n• ✅ Restrict who can configure jobs and manage Jenkins.\n• ✅ Use LDAP or Active Directory for authentication.\n• ❌ Never leave Jenkins unsecured or with anonymous access.",
                note: "For enterprise Jenkins, integrate with your company's SSO/LDAP for centralized authentication."
            }
        ]
    },
    {
        id: 7,
        slug: "jenkins-shared-libraries",
        title: "Shared Libraries & CI/CD Design",
        description: "Reusing pipeline code across projects and designing professional CI/CD architectures.",
        sections: [
            {
                heading: "Why Shared Libraries?",
                content: "Shared Libraries allow you to DRY (Don't Repeat Yourself) your pipeline code. Instead of copying the same Jenkinsfile across 50 repositories, create a shared library and reference it.\n\n**Library Structure:**\n```\n(jenkins-shared-library/)\n├── vars/           # Global pipeline functions\n│   ├── standardPipeline.groovy\n│   └── notifySlack.groovy\n├── src/            # Groovy classes\n│   └── com/techmiya/\n│       └── Utils.groovy\n└── resources/      # Non-Groovy files\n    └── templates/\n```",
                note: "Store your shared library in a separate Git repository and configure it in Jenkins → Manage Jenkins → System → Global Pipeline Libraries."
            },
            {
                heading: "Creating a Shared Library",
                content: "Define reusable pipeline steps that can be called from any Jenkinsfile.",
                code: `// vars/standardPipeline.groovy
def call(Map config) {
    pipeline {
        agent any
        
        stages {
            stage('Checkout') {
                steps { checkout scm }
            }
            stage('Build') {
                steps {
                    sh config.buildCommand ?: 'npm ci && npm run build'
                }
            }
            stage('Test') {
                steps {
                    sh config.testCommand ?: 'npm test'
                }
            }
            stage('Deploy') {
                when { branch 'main' }
                steps {
                    sh config.deployCommand ?: './deploy.sh'
                }
            }
        }
        
        post {
            failure {
                notifySlack(
                    channel: config.slackChannel ?: '#ci-alerts',
                    status: 'FAILED'
                )
            }
        }
    }
}

// vars/notifySlack.groovy
def call(Map params) {
    def color = params.status == 'SUCCESS' ? 'good' : 'danger'
    def emoji = params.status == 'SUCCESS' ? '✅' : '❌'
    
    slackSend(
        channel: params.channel,
        color: color,
        message: "\${emoji} *\${env.JOB_NAME}* #\${env.BUILD_NUMBER} - \${params.status}"
    )
}`,
                codeTitle: "shared-library.groovy"
            },
            {
                heading: "Using the Shared Library",
                content: "Reference the shared library in any project's Jenkinsfile to adopt the standard CI/CD pipeline.",
                code: `// Jenkinsfile in any project — just 1 line!
@Library('techmiya-pipeline-library') _

standardPipeline(
    buildCommand: 'npm ci && npm run build',
    testCommand: 'npm test -- --coverage',
    deployCommand: './scripts/deploy.sh production',
    slackChannel: '#deployments'
)`,
                codeTitle: "Jenkinsfile (using library)",
                note: "This is how enterprise teams manage hundreds of repositories — one shared library, hundreds of 5-line Jenkinsfiles."
            },
            {
                heading: "CI/CD Pipeline Design Patterns",
                content: "Common CI/CD architectures used in production:\n\n**1. Build Once, Deploy Many:**\nBuild the artifact once → Deploy to Dev → Staging → Production with the same artifact.\n\n**2. Blue-Green Deployment:**\nMaintain two identical environments (Blue/Green). Deploy to the inactive one, then switch traffic.\n\n**3. Canary Deployment:**\nDeploy to a small percentage of users first. Monitor, then gradually roll out to all.\n\n**4. GitOps:**\nGit is the single source of truth. Changes to infrastructure/deployments are made through Git commits.\n\n**5. Trunk-Based with Feature Flags:**\nEveryone commits to main. Features are hidden behind feature flags until ready.",
                note: "Start with the simplest pattern (Build Once, Deploy Many) and evolve to more complex patterns as your team grows."
            }
        ]
    }
];
