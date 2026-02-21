import { Chapter } from "./javaContent";

export const dockerChapters: Chapter[] = [
    {
        id: 1,
        slug: "introduction-to-docker",
        title: "Introduction to Docker & Containers",
        description: "Virtualization vs Containerization, Docker architecture, and installation.",
        sections: [
            {
                heading: "What Are Containers?",
                content: "Containers are lightweight, portable, and self-sufficient units that package an application with all its dependencies (libraries, config files, binaries) into a single image.\n\n**VM vs Container:**\n\n| Feature | Virtual Machine | Container |\n|---|---|---|\n| **Size** | Gigabytes | Megabytes |\n| **Boot Time** | Minutes | Seconds |\n| **OS** | Full OS per VM | Shares host kernel |\n| **Isolation** | Hardware-level | Process-level |\n| **Resource Usage** | Heavy | Minimal |\n| **Performance** | Near-native (with hypervisor overhead) | Near-native |",
                note: "Containers solve the 'it works on my machine' problem by packaging everything together."
            },
            {
                heading: "Docker Architecture",
                content: "Docker uses a client-server architecture:\n\n**Docker Client** — The CLI tool (`docker` command) that users interact with.\n**Docker Daemon (dockerd)** — Background service that manages images, containers, networks, and volumes.\n**Docker Registry** — Stores Docker images (Docker Hub is the default public registry).\n\n**Key Concepts:**\n• **Image** — A read-only template used to create containers (like a class in OOP).\n• **Container** — A running instance of an image (like an object).\n• **Dockerfile** — A text file with instructions to build an image.\n• **Docker Hub** — Public registry with 100,000+ pre-built images.",
                note: "Think of an image as a recipe and a container as the meal prepared from that recipe."
            },
            {
                heading: "Installing Docker",
                content: "Install Docker Engine on Ubuntu/Debian:",
                code: `# Remove old versions
sudo apt remove docker docker-engine docker.io containerd runc

# Install prerequisites
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \\
    sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up the repository
echo "deb [arch=$(dpkg --print-architecture) \\
    signed-by=/etc/apt/keyrings/docker.gpg] \\
    https://download.docker.com/linux/ubuntu \\
    $(lsb_release -cs) stable" | \\
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add your user to the docker group (no sudo for docker commands)
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker run hello-world`,
                codeTitle: "install-docker.sh"
            }
        ]
    },
    {
        id: 2,
        slug: "docker-images-containers",
        title: "Images & Container Management",
        description: "Pulling images, running containers, managing lifecycle, and inspecting resources.",
        sections: [
            {
                heading: "Working with Images",
                content: "Docker images are the building blocks. You pull them from registries or build your own.",
                code: `# Search for images on Docker Hub
docker search nginx

# Pull an image
docker pull nginx:latest
docker pull ubuntu:22.04
docker pull node:18-alpine    # Alpine = minimal size

# List downloaded images
docker images

# Remove an image
docker rmi nginx:latest

# Remove all unused images
docker image prune -a

# View image details
docker inspect nginx:latest

# View image history (layers)
docker history nginx:latest

# Tag an image (for pushing to registry)
docker tag nginx:latest myregistry/nginx:v1.0

# Save image to file (backup)
docker save -o nginx-backup.tar nginx:latest

# Load image from file
docker load -i nginx-backup.tar`,
                codeTitle: "docker-images.sh",
                note: "Always use specific version tags (node:18-alpine) instead of :latest in production for reproducibility."
            },
            {
                heading: "Running Containers",
                content: "Containers are running instances of images. Here are the essential commands:",
                code: `# Run a container (foreground)
docker run nginx

# Run in detached mode (background)
docker run -d --name web-server nginx

# Run with port mapping (host:container)
docker run -d -p 8080:80 --name web nginx

# Run with environment variables
docker run -d \\
    -p 5432:5432 \\
    -e POSTGRES_USER=admin \\
    -e POSTGRES_PASSWORD=secret123 \\
    -e POSTGRES_DB=myapp \\
    --name postgres \\
    postgres:15

# Run with automatic removal after exit
docker run --rm -it ubuntu:22.04 bash

# Run with resource limits
docker run -d \\
    --memory="512m" \\
    --cpus="1.0" \\
    --name limited-app \\
    my-app:latest

# Run with restart policy
docker run -d --restart=unless-stopped --name web nginx`,
                codeTitle: "run-containers.sh"
            },
            {
                heading: "Container Management",
                content: "Manage running, stopped, and exited containers:",
                code: `# List running containers
docker ps

# List ALL containers (including stopped)
docker ps -a

# Stop a container
docker stop web-server

# Start a stopped container
docker start web-server

# Restart a container
docker restart web-server

# View container logs
docker logs web-server
docker logs -f web-server           # Follow (real-time)
docker logs --tail 100 web-server   # Last 100 lines

# Execute a command inside a running container
docker exec -it web-server bash
docker exec web-server cat /etc/nginx/nginx.conf

# View resource usage (live)
docker stats

# Copy files to/from container
docker cp ./config.conf web-server:/etc/nginx/
docker cp web-server:/var/log/nginx/access.log ./

# Remove a container
docker rm web-server           # Must be stopped
docker rm -f web-server        # Force remove (even if running)

# Remove all stopped containers
docker container prune`,
                codeTitle: "manage-containers.sh",
                note: "docker exec -it lets you 'SSH into' a running container for debugging."
            }
        ]
    },
    {
        id: 3,
        slug: "docker-volumes-networks",
        title: "Volumes & Networking",
        description: "Persistent data with volumes and container communication with networks.",
        sections: [
            {
                heading: "Docker Volumes",
                content: "Containers are ephemeral — data is lost when a container is removed. Volumes provide persistent storage.\n\n**Storage Types:**\n• **Volumes** — Managed by Docker, stored in /var/lib/docker/volumes/. Best for persistent data.\n• **Bind Mounts** — Map a host directory to a container path. Good for development.\n• **tmpfs** — Stored in memory only. Good for sensitive data.",
                code: `# Create a named volume
docker volume create app-data

# List volumes
docker volume ls

# Inspect a volume
docker volume inspect app-data

# Run container with a named volume
docker run -d \\
    -v app-data:/var/lib/postgresql/data \\
    -e POSTGRES_PASSWORD=secret \\
    --name db \\
    postgres:15

# Run with a bind mount (host directory mapped)
docker run -d \\
    -v $(pwd)/src:/app/src \\
    -v $(pwd)/public:/app/public \\
    -p 3000:3000 \\
    --name dev-app \\
    node:18

# Read-only volume
docker run -d \\
    -v /host/config:/app/config:ro \\
    my-app

# Remove unused volumes
docker volume prune

# Remove a specific volume
docker volume rm app-data`,
                codeTitle: "docker-volumes.sh",
                note: "Always use named volumes for databases and critical data — they persist even when containers are removed."
            },
            {
                heading: "Docker Networking",
                content: "Docker networking allows containers to communicate with each other and the outside world.\n\n**Network Drivers:**\n• **bridge** — Default. Containers on the same bridge can communicate.\n• **host** — Container shares the host's network stack.\n• **none** — Completely isolated (no network).\n• **overlay** — For multi-host communication (Docker Swarm).",
                code: `# List networks
docker network ls

# Create a custom bridge network
docker network create app-network

# Run containers on the same network
docker run -d \\
    --name api \\
    --network app-network \\
    my-api:latest

docker run -d \\
    --name db \\
    --network app-network \\
    -e POSTGRES_PASSWORD=secret \\
    postgres:15

# Containers on the same network can communicate by name!
# Inside the 'api' container:
# postgres://db:5432/myapp   (use container name as hostname)

# Connect a running container to a network
docker network connect app-network existing-container

# Disconnect from a network
docker network disconnect app-network existing-container

# Inspect a network (see connected containers)
docker network inspect app-network

# Remove a network
docker network rm app-network`,
                codeTitle: "docker-networks.sh",
                note: "With custom bridge networks, containers can discover each other by name (DNS). The default bridge network requires IP addresses."
            }
        ]
    },
    {
        id: 4,
        slug: "dockerfile-mastery",
        title: "Dockerfile & Multi-Stage Builds",
        description: "Writing optimized Dockerfiles, layering, caching, and multi-stage builds.",
        sections: [
            {
                heading: "Dockerfile Basics",
                content: "A Dockerfile is a text file with instructions to build a Docker image. Each instruction creates a layer.",
                code: `# Node.js Application Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --production

# Copy application source code
COPY . .

# Expose the port
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
    CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["node", "server.js"]`,
                codeTitle: "Dockerfile",
                note: "Order matters! Copy package.json before source code so dependency layer is cached when only code changes."
            },
            {
                heading: "Dockerfile Instructions Reference",
                content: "Key Dockerfile instructions:\n\n• **FROM** — Base image (required first instruction).\n• **WORKDIR** — Set the working directory.\n• **COPY** — Copy files from host to image.\n• **ADD** — Like COPY but can extract archives and download URLs.\n• **RUN** — Execute a command during build.\n• **CMD** — Default command when container starts (overridable).\n• **ENTRYPOINT** — Fixed command (not easily overridable).\n• **ENV** — Set environment variables.\n• **EXPOSE** — Document which ports are used.\n• **VOLUME** — Create a mount point.\n• **ARG** — Build-time variables.\n• **HEALTHCHECK** — Define health check command.\n• **LABEL** — Add metadata to the image.",
                code: `# Python Flask Application
FROM python:3.11-slim

LABEL maintainer="techmiya@email.com"
LABEL version="1.0"

# Build-time argument
ARG APP_VERSION=1.0.0

WORKDIR /app

# Install system dependencies
RUN apt-get update && \\
    apt-get install -y --no-install-recommends gcc && \\
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV APP_VERSION=\${APP_VERSION}
ENV FLASK_APP=app.py

EXPOSE 5000

ENTRYPOINT ["python"]
CMD ["-m", "flask", "run", "--host=0.0.0.0"]`,
                codeTitle: "Dockerfile (Python)"
            },
            {
                heading: "Multi-Stage Builds",
                content: "Multi-stage builds let you use multiple FROM statements to create smaller, more secure production images.",
                code: `# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production (only copy built artifacts)
FROM nginx:alpine AS production

# Copy built React/Vue/Angular app to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# ============================================
# Result:
# Builder stage: ~400MB (Node.js + node_modules + source)
# Production stage: ~25MB (Nginx + static files only)
# ============================================`,
                codeTitle: "Dockerfile (Multi-stage)",
                note: "Multi-stage builds can reduce your image size by 90%+ by excluding build tools and dev dependencies."
            },
            {
                heading: "Building Images",
                content: "Build Docker images from your Dockerfile:",
                code: `# Build from current directory
docker build -t my-app:1.0 .

# Build with build arguments
docker build \\
    --build-arg APP_VERSION=2.0.0 \\
    -t my-app:2.0 .

# Build with a specific Dockerfile
docker build -f Dockerfile.prod -t my-app:prod .

# Build without cache (fresh build)
docker build --no-cache -t my-app:1.0 .

# View build history (see layer sizes)
docker history my-app:1.0

# Scan image for vulnerabilities
docker scout cves my-app:1.0`,
                codeTitle: "build-commands.sh"
            }
        ]
    },
    {
        id: 5,
        slug: "docker-env-dockerignore",
        title: "Environment Variables & .dockerignore",
        description: "Managing configuration with env vars, env files, and excluding files from builds.",
        sections: [
            {
                heading: "Environment Variables",
                content: "Environment variables are the standard way to configure containerized applications.",
                code: `# Pass individual env vars
docker run -d \\
    -e DB_HOST=localhost \\
    -e DB_PORT=5432 \\
    -e DB_NAME=myapp \\
    -e DB_USER=admin \\
    -e DB_PASSWORD=secret \\
    my-app:latest

# Use an env file (recommended for many variables)
# Create .env file:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=myapp
# DB_USER=admin
# DB_PASSWORD=secret

docker run -d --env-file .env my-app:latest

# Pass host environment variable to container
export API_KEY="abc123"
docker run -d -e API_KEY my-app:latest

# Override ENV from Dockerfile
docker run -d -e NODE_ENV=development my-app:latest

# View environment variables in running container
docker exec my-container env`,
                codeTitle: "env-variables.sh",
                note: "Never bake secrets into the Docker image — always pass them at runtime via environment variables or secrets management."
            },
            {
                heading: ".dockerignore",
                content: "The `.dockerignore` file tells Docker which files to exclude from the build context. This speeds up builds and keeps images smaller.",
                code: `# .dockerignore

# Dependencies (will be installed in container)
node_modules/
vendor/
.venv/

# Version control
.git
.gitignore

# IDE/Editor files
.vscode/
.idea/
*.swp
*.swo

# Build artifacts
dist/
build/
*.log

# Docker files
Dockerfile*
docker-compose*.yml
.dockerignore

# Environment files (secrets!)
.env
.env.local
.env.production

# Documentation
README.md
LICENSE
docs/

# Test files
__tests__/
coverage/
*.test.js
*.spec.js`,
                codeTitle: ".dockerignore",
                note: "A good .dockerignore can reduce build context from 500MB to 5MB, drastically speeding up builds."
            }
        ]
    },
    {
        id: 6,
        slug: "docker-compose",
        title: "Docker Compose",
        description: "Define and run multi-container applications with Docker Compose.",
        sections: [
            {
                heading: "What is Docker Compose?",
                content: "Docker Compose lets you define and manage multi-container applications using a YAML file. Instead of running multiple `docker run` commands, you define everything in `docker-compose.yml`.\n\n**When to Use:**\n• Multi-container applications (web app + database + cache).\n• Development environments.\n• Testing and CI/CD pipelines.\n• Simple orchestration for small deployments.",
                note: "Docker Compose is for single-host orchestration. For multi-host, use Kubernetes."
            },
            {
                heading: "Compose File Structure",
                content: "A full-stack application with React frontend, Node.js API, PostgreSQL database, and Redis cache.",
                code: `# docker-compose.yml
version: '3.8'

services:
  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:4000
    depends_on:
      - api
    volumes:
      - ./frontend/src:/app/src   # Hot reload in dev

  # Backend API
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=development
      - DB_HOST=db
      - DB_PORT=5432
      - DB_NAME=myapp
      - DB_USER=admin
      - DB_PASSWORD=secret123
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    restart: unless-stopped

  # Database
  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret123
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Cache
  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:`,
                codeTitle: "docker-compose.yml"
            },
            {
                heading: "Docker Compose Commands",
                content: "Essential commands for managing your Compose application:",
                code: `# Start all services (build if needed)
docker compose up

# Start in detached mode (background)
docker compose up -d

# Start with rebuild
docker compose up -d --build

# Start specific service
docker compose up -d api

# Stop all services
docker compose down

# Stop and remove volumes (DELETES DATA!)
docker compose down -v

# View running services
docker compose ps

# View logs
docker compose logs
docker compose logs -f api        # Follow specific service

# Execute command in a service
docker compose exec api bash
docker compose exec db psql -U admin myapp

# Scale a service (run multiple instances)
docker compose up -d --scale api=3

# View resource usage
docker compose top`,
                codeTitle: "compose-commands.sh",
                note: "Use docker compose up -d --build after code changes to rebuild images."
            }
        ]
    },
    {
        id: 7,
        slug: "docker-advanced",
        title: "Private Registry, Optimization & Security",
        description: "Push to private registries, optimize image size, and follow security best practices.",
        sections: [
            {
                heading: "Pushing to Docker Hub",
                content: "Share your images by pushing them to Docker Hub or a private registry.",
                code: `# Login to Docker Hub
docker login

# Tag your image for Docker Hub
docker tag my-app:latest username/my-app:1.0
docker tag my-app:latest username/my-app:latest

# Push to Docker Hub
docker push username/my-app:1.0
docker push username/my-app:latest

# Push to AWS ECR (Elastic Container Registry)
aws ecr get-login-password --region ap-south-1 | \\
    docker login --username AWS --password-stdin \\
    123456789012.dkr.ecr.ap-south-1.amazonaws.com

docker tag my-app:latest \\
    123456789012.dkr.ecr.ap-south-1.amazonaws.com/my-app:latest

docker push \\
    123456789012.dkr.ecr.ap-south-1.amazonaws.com/my-app:latest`,
                codeTitle: "docker-push.sh"
            },
            {
                heading: "Image Optimization",
                content: "Smaller images build faster, deploy faster, and have fewer vulnerabilities.\n\n**Optimization Techniques:**\n\n1. **Use Alpine/Slim base images:**\n   • `node:18` = ~900MB → `node:18-alpine` = ~170MB\n   • `python:3.11` = ~900MB → `python:3.11-slim` = ~150MB\n\n2. **Multi-stage builds** — Separate build and runtime.\n\n3. **Minimize layers** — Combine RUN commands.\n\n4. **Order instructions wisely** — Put frequently-changing instructions last.\n\n5. **Clean up in the same layer:**",
                code: `# BAD: Multiple layers, large image
RUN apt-get update
RUN apt-get install -y gcc
RUN apt-get install -y make
RUN rm -rf /var/lib/apt/lists/*

# GOOD: Single layer, clean up included
RUN apt-get update && \\
    apt-get install -y --no-install-recommends \\
        gcc \\
        make && \\
    rm -rf /var/lib/apt/lists/*

# GOOD: Use specific versions
FROM node:18.19.0-alpine3.19

# GOOD: Copy only what's needed
COPY package*.json ./
RUN npm ci --production
COPY src/ ./src/
COPY public/ ./public/`,
                codeTitle: "optimization.Dockerfile"
            },
            {
                heading: "Docker Security Best Practices",
                content: "Secure your Docker environment in production:\n\n**1. Don't run as root:**\n```dockerfile\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\nUSER appuser\n```\n\n**2. Use read-only filesystem:**\n```bash\ndocker run --read-only --tmpfs /tmp my-app\n```\n\n**3. Scan images for vulnerabilities:**\n```bash\ndocker scout cves my-app:latest\n```\n\n**4. Use trusted base images** — Official images from Docker Hub.\n\n**5. Don't store secrets in images** — Use environment variables or Docker secrets.\n\n**6. Keep images updated** — Patch base images regularly.\n\n**7. Limit resources:**\n```bash\ndocker run --memory=512m --cpus=1.0 my-app\n```\n\n**8. Use Docker Content Trust:**\n```bash\nexport DOCKER_CONTENT_TRUST=1\n```",
                note: "Security is not optional in production. Always run as non-root, scan images, and limit resources."
            }
        ]
    }
];
