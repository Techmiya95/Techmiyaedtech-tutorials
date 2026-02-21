import { Chapter } from "./javaContent";

export const k8sChapters: Chapter[] = [
  {
    id: 1,
    slug: "introduction-to-k8s",
    title: "Introduction to Kubernetes",
    description: "Container orchestration, K8s architecture, and cluster components.",
    sections: [
      {
        heading: "Why Kubernetes?",
        content: "While Docker runs individual containers, you need an orchestrator when managing hundreds or thousands of containers in production.\n\n**Kubernetes solves:**\n• **Scaling** — Automatically scale containers based on load.\n• **Self-healing** — Restart crashed containers, replace unhealthy nodes.\n• **Load Balancing** — Distribute traffic across container replicas.\n• **Rolling Updates** — Deploy new versions with zero downtime.\n• **Service Discovery** — Containers find each other by name.\n• **Secret Management** — Securely manage sensitive configuration.",
        note: "Kubernetes (K8s) was originally designed by Google based on their internal system 'Borg', which manages billions of containers weekly."
      },
      {
        heading: "Kubernetes Architecture",
        content: "A K8s cluster has two types of nodes:\n\n**Control Plane (Master Node):**\n• **API Server (kube-apiserver)** — Front-end for the K8s control plane. All communication goes through it.\n• **etcd** — Key-value store that holds all cluster data.\n• **Scheduler** — Assigns pods to nodes based on resource requirements.\n• **Controller Manager** — Runs controllers (ReplicaSet, Deployment, Node controllers).\n\n**Worker Nodes:**\n• **kubelet** — Agent that ensures containers are running in pods.\n• **kube-proxy** — Manages networking rules for pod communication.\n• **Container Runtime** — Runs containers (containerd, CRI-O).",
      },
      {
        heading: "Setting Up a Local Cluster",
        content: "Use Minikube or kind for local development clusters.",
        code: `# Option 1: Minikube (single-node cluster)
# Install Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Start cluster
minikube start --driver=docker --cpus=2 --memory=4096

# Check status
minikube status

# Option 2: kind (Kubernetes IN Docker)
# Install kind
go install sigs.k8s.io/kind@latest

# Create cluster
kind create cluster --name dev-cluster

# Install kubectl (K8s CLI)
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install kubectl /usr/local/bin/kubectl

# Verify connection
kubectl cluster-info
kubectl get nodes`,
        codeTitle: "setup-k8s.sh",
        note: "For production, use managed K8s: AWS EKS, Google GKE, or Azure AKS."
      }
    ]
  },
  {
    id: 2,
    slug: "pods-namespaces",
    title: "Pods & Namespaces",
    description: "The smallest deployable unit in K8s and logical cluster partitioning.",
    sections: [
      {
        heading: "Understanding Pods",
        content: "A Pod is the smallest deployable unit in Kubernetes. It's a wrapper around one or more containers that share the same network namespace and storage.\n\n**Key Facts:**\n• A Pod usually runs a single container.\n• Multi-container pods are for tightly coupled helper containers (sidecar pattern).\n• Pods are ephemeral — they can be created, destroyed, and replaced.\n• Each Pod gets a unique IP address within the cluster.",
        code: `# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
    env: dev
spec:
  containers:
    - name: nginx
      image: nginx:1.25-alpine
      ports:
        - containerPort: 80
      resources:
        requests:
          cpu: "100m"
          memory: "128Mi"
        limits:
          cpu: "250m"
          memory: "256Mi"`,
        codeTitle: "pod.yaml"
      },
      {
        heading: "Pod Operations",
        content: "Essential kubectl commands for working with Pods:",
        code: `# Create a pod from YAML
kubectl apply -f pod.yaml

# Run a quick pod (imperative)
kubectl run test-nginx --image=nginx:alpine --port=80

# List pods
kubectl get pods
kubectl get pods -o wide          # Show IP and Node
kubectl get pods --all-namespaces  # All namespaces
kubectl get pods -w               # Watch for changes

# Describe a pod (detailed info + events)
kubectl describe pod nginx-pod

# View pod logs
kubectl logs nginx-pod
kubectl logs nginx-pod -f          # Follow logs
kubectl logs nginx-pod -c sidecar  # Specific container

# Execute command in a pod
kubectl exec -it nginx-pod -- bash
kubectl exec nginx-pod -- cat /etc/nginx/nginx.conf

# Port-forward for local access
kubectl port-forward nginx-pod 8080:80

# Delete a pod
kubectl delete pod nginx-pod
kubectl delete -f pod.yaml`,
        codeTitle: "pod-commands.sh"
      },
      {
        heading: "Namespaces",
        content: "Namespaces provide logical isolation within a cluster. They're useful for separating environments, teams, or applications.",
        code: `# List namespaces
kubectl get namespaces

# Default namespaces:
# default        - Default namespace for user resources
# kube-system    - K8s system components
# kube-public    - Publicly accessible resources
# kube-node-lease - Node heartbeat data

# Create a namespace
kubectl create namespace production
kubectl create namespace staging
kubectl create namespace development

# Run a pod in a specific namespace
kubectl run nginx --image=nginx --namespace=production

# List pods in a specific namespace
kubectl get pods -n production

# Set default namespace for kubectl
kubectl config set-context --current --namespace=production

# Namespace YAML
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    environment: production`,
        codeTitle: "namespaces.sh",
        note: "Use namespaces to separate environments (dev/staging/prod) or teams within the same cluster."
      }
    ]
  },
  {
    id: 3,
    slug: "deployments-replicasets",
    title: "Deployments & ReplicaSets",
    description: "Managing application replicas, rolling updates, and rollbacks.",
    sections: [
      {
        heading: "Why Deployments?",
        content: "You should never create Pods directly in production. Instead, use **Deployments** which manage Pods through **ReplicaSets**.\n\n**Deployment → ReplicaSet → Pods**\n\n• **ReplicaSet** — Ensures a specified number of pod replicas are running at all times.\n• **Deployment** — Manages ReplicaSets and provides rolling updates, rollbacks, and scaling.",
        note: "Always use Deployments — they handle the full lifecycle of your application pods."
      },
      {
        heading: "Creating a Deployment",
        content: "Define a Deployment with replicas, resource limits, and health checks.",
        code: `# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    metadata:
      labels:
        app: web-app
        version: v1
    spec:
      containers:
        - name: web
          image: techmiya/web-app:1.0
          ports:
            - containerPort: 3000
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 15
            periodSeconds: 20
          env:
            - name: NODE_ENV
              value: "production"`,
        codeTitle: "deployment.yaml"
      },
      {
        heading: "Deployment Operations",
        content: "Manage deployments with kubectl:",
        code: `# Create / Apply deployment
kubectl apply -f deployment.yaml

# List deployments
kubectl get deployments

# View deployment details
kubectl describe deployment web-app

# Scale the deployment
kubectl scale deployment web-app --replicas=5

# Update the image (triggers rolling update)
kubectl set image deployment/web-app web=techmiya/web-app:2.0

# Check rollout status
kubectl rollout status deployment/web-app

# View rollout history
kubectl rollout history deployment/web-app

# Rollback to previous version
kubectl rollout undo deployment/web-app

# Rollback to a specific revision
kubectl rollout undo deployment/web-app --to-revision=2

# Pause/Resume a rollout
kubectl rollout pause deployment/web-app
kubectl rollout resume deployment/web-app

# Delete a deployment
kubectl delete deployment web-app`,
        codeTitle: "deployment-commands.sh",
        note: "Rolling updates replace pods gradually — users experience zero downtime during deployment."
      }
    ]
  },
  {
    id: 4,
    slug: "services-networking",
    title: "Services & Networking",
    description: "Exposing pods with Services, DNS, and network communication patterns.",
    sections: [
      {
        heading: "Why Services?",
        content: "Pods are ephemeral — they get new IP addresses when recreated. Services provide a stable endpoint to access a group of pods.\n\n**Service Types:**\n• **ClusterIP** (default) — Internal only, accessible within the cluster.\n• **NodePort** — Exposes on each node's IP at a static port (30000-32767).\n• **LoadBalancer** — Creates an external load balancer (cloud providers).\n• **ExternalName** — Maps to an external DNS name.",
        code: `# ClusterIP Service (internal)
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  type: ClusterIP
  selector:
    app: web-app
  ports:
    - protocol: TCP
      port: 80          # Service port
      targetPort: 3000   # Pod port

---
# NodePort Service (external via node IP)
apiVersion: v1
kind: Service
metadata:
  name: web-nodeport
spec:
  type: NodePort
  selector:
    app: web-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
      nodePort: 30080    # Access via <NodeIP>:30080

---
# LoadBalancer Service (cloud)
apiVersion: v1
kind: Service
metadata:
  name: web-lb
spec:
  type: LoadBalancer
  selector:
    app: web-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000`,
        codeTitle: "services.yaml"
      },
      {
        heading: "Service Operations & DNS",
        content: "Kubernetes has built-in DNS. Services can be accessed by name.",
        code: `# Create a service
kubectl apply -f services.yaml

# List services
kubectl get services
kubectl get svc

# Describe a service
kubectl describe svc web-service

# Delete a service
kubectl delete svc web-service

# DNS Resolution within the cluster:
# <service-name>.<namespace>.svc.cluster.local
# Examples:
#   web-service.default.svc.cluster.local
#   db-service.production.svc.cluster.local
#
# Short form (same namespace):
#   web-service
#   db-service

# Quick expose a deployment as a service
kubectl expose deployment web-app \\
    --type=LoadBalancer \\
    --port=80 \\
    --target-port=3000

# Test connectivity
kubectl run test --rm -it --image=busybox -- wget -qO- web-service:80`,
        codeTitle: "service-commands.sh",
        note: "Within the same namespace, just use the service name (e.g., db-service) as the hostname."
      }
    ]
  },
  {
    id: 5,
    slug: "configmaps-secrets",
    title: "ConfigMaps & Secrets",
    description: "Externalizing configuration and securely managing sensitive data.",
    sections: [
      {
        heading: "ConfigMaps",
        content: "ConfigMaps store non-confidential configuration data as key-value pairs. They decouple configuration from container images.",
        code: `# ConfigMap from literal values
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: "production"
  APP_PORT: "3000"
  LOG_LEVEL: "info"
  DATABASE_URL: "postgres://db-service:5432/myapp"
  
---
# ConfigMap from a file
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
data:
  nginx.conf: |
    server {
        listen 80;
        server_name localhost;
        location / {
            proxy_pass http://web-service:3000;
        }
    }`,
        codeTitle: "configmap.yaml"
      },
      {
        heading: "Secrets",
        content: "Secrets are similar to ConfigMaps but for sensitive data. Values are base64-encoded (NOT encrypted by default).",
        code: `# Create secrets via kubectl
kubectl create secret generic db-credentials \\
    --from-literal=username=admin \\
    --from-literal=password=super-secret-123

# Secret YAML (values must be base64 encoded)
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  username: YWRtaW4=          # echo -n "admin" | base64
  password: c3VwZXItc2VjcmV0  # echo -n "super-secret" | base64

---
# Using in a Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
spec:
  replicas: 2
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: techmiya/api:1.0
          # Method 1: Environment variables from ConfigMap & Secret
          envFrom:
            - configMapRef:
                name: app-config
          env:
            - name: DB_USER
              valueFrom:
                secretKeyRef:
                  name: db-credentials
                  key: username
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: db-credentials
                  key: password
          # Method 2: Mount as files
          volumeMounts:
            - name: config-volume
              mountPath: /etc/config
      volumes:
        - name: config-volume
          configMap:
            name: nginx-config`,
        codeTitle: "secrets-deployment.yaml",
        note: "Kubernetes Secrets are base64-encoded, NOT encrypted. For production, use External Secrets Operator or HashiCorp Vault."
      }
    ]
  },
  {
    id: 6,
    slug: "ingress",
    title: "Ingress Controller & Load Balancing",
    description: "HTTP routing, TLS termination, and path-based routing with Ingress.",
    sections: [
      {
        heading: "What is Ingress?",
        content: "An Ingress manages external HTTP/HTTPS access to services in a cluster. It provides URL-based routing, SSL termination, and virtual hosting.\n\n**Without Ingress:** Each service needs its own LoadBalancer (expensive).\n**With Ingress:** One LoadBalancer routes to many services based on URLs.\n\n**Popular Ingress Controllers:**\n• NGINX Ingress Controller (most popular)\n• Traefik\n• HAProxy\n• AWS ALB Ingress Controller",
        note: "An Ingress resource alone does nothing — you need an Ingress Controller (like NGINX) to implement the rules."
      },
      {
        heading: "Ingress Configuration",
        content: "Define routing rules to direct traffic to different services based on URL paths or hostnames.",
        code: `# Install NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml

# Ingress resource with path-based routing
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - myapp.example.com
      secretName: tls-secret
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: api-service
                port:
                  number: 4000
          - path: /admin
            pathType: Prefix
            backend:
              service:
                name: admin-service
                port:
                  number: 8080`,
        codeTitle: "ingress.yaml"
      },
      {
        heading: "TLS Certificates with cert-manager",
        content: "Automatically provision and manage TLS certificates using cert-manager and Let's Encrypt.",
        code: `# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# ClusterIssuer for Let's Encrypt
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: admin@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx

---
# Ingress with automatic TLS
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: secure-app
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - app.example.com
      secretName: app-tls
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web-service
                port:
                  number: 80`,
        codeTitle: "cert-manager.yaml",
        note: "cert-manager handles certificate issuance, renewal, and revocation automatically."
      }
    ]
  },
  {
    id: 7,
    slug: "helm-charts",
    title: "Helm — The Kubernetes Package Manager",
    description: "Installing, creating, and managing Kubernetes applications with Helm charts.",
    sections: [
      {
        heading: "What is Helm?",
        content: "Helm is a package manager for Kubernetes. It packages multiple K8s resources (Deployments, Services, ConfigMaps, etc.) into a single unit called a **Chart**.\n\n**Why Helm?**\n• Deploy complex applications with a single command.\n• Templatize K8s manifests with variables.\n• Manage releases (install, upgrade, rollback).\n• Share applications via chart repositories.\n• Reduce YAML duplication across environments.",
        code: `# Install Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Verify
helm version

# Add popular chart repositories
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add prometheus https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Search for charts
helm search repo nginx
helm search hub wordpress`,
        codeTitle: "helm-setup.sh"
      },
      {
        heading: "Using Helm Charts",
        content: "Install, upgrade, and manage applications with Helm.",
        code: `# Install a chart (e.g., NGINX)
helm install my-nginx bitnami/nginx

# Install with custom values
helm install my-nginx bitnami/nginx \\
    --set service.type=ClusterIP \\
    --set replicaCount=3

# Install with a values file
helm install my-nginx bitnami/nginx -f values.yaml

# List installed releases
helm list

# Check release status
helm status my-nginx

# Upgrade a release
helm upgrade my-nginx bitnami/nginx \\
    --set replicaCount=5

# View release history
helm history my-nginx

# Rollback to a previous version
helm rollback my-nginx 1

# Uninstall a release
helm uninstall my-nginx

# Download chart for inspection
helm pull bitnami/nginx --untar`,
        codeTitle: "helm-commands.sh"
      },
      {
        heading: "Creating a Custom Helm Chart",
        content: "Create your own chart for your application.",
        code: `# Create a new chart scaffold
helm create my-web-app

# Chart structure:
# my-web-app/
# ├── Chart.yaml          # Chart metadata
# ├── values.yaml         # Default configuration values
# ├── templates/
# │   ├── deployment.yaml
# │   ├── service.yaml
# │   ├── ingress.yaml
# │   ├── configmap.yaml
# │   ├── _helpers.tpl    # Template helpers
# │   └── NOTES.txt       # Post-install instructions
# └── charts/             # Dependency charts

# values.yaml
replicaCount: 3

image:
  repository: techmiya/web-app
  tag: "1.0"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  host: app.example.com

resources:
  limits:
    cpu: "500m"
    memory: "512Mi"
  requests:
    cpu: "100m"
    memory: "128Mi"`,
        codeTitle: "helm-create.sh",
        note: "Helm uses Go templates. Values from values.yaml are accessed as {{ .Values.replicaCount }}."
      }
    ]
  },
  {
    id: 8,
    slug: "k8s-advanced",
    title: "Auto Scaling, RBAC & Persistent Volumes",
    description: "Horizontal Pod Autoscaler, storage management, and role-based access control.",
    sections: [
      {
        heading: "Horizontal Pod Autoscaler (HPA)",
        content: "HPA automatically scales the number of pods based on CPU/memory utilization or custom metrics.",
        code: `# HPA YAML
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80

# CLI commands
kubectl apply -f hpa.yaml
kubectl get hpa
kubectl describe hpa web-app-hpa

# Quick create HPA
kubectl autoscale deployment web-app \\
    --min=2 --max=10 --cpu-percent=70`,
        codeTitle: "hpa.yaml",
        note: "HPA requires the Metrics Server to be installed in the cluster."
      },
      {
        heading: "Persistent Volumes",
        content: "Persistent Volumes (PV) provide durable storage that persists beyond the lifecycle of pods.",
        code: `# PersistentVolume (provisioned by admin)
apiVersion: v1
kind: PersistentVolume
metadata:
  name: db-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: standard
  hostPath:
    path: /data/db

---
# PersistentVolumeClaim (requested by developer)
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: db-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard

---
# Using PVC in a Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:15
          ports:
            - containerPort: 5432
          volumeMounts:
            - name: db-storage
              mountPath: /var/lib/postgresql/data
          env:
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: db-credentials
                  key: password
      volumes:
        - name: db-storage
          persistentVolumeClaim:
            claimName: db-pvc`,
        codeTitle: "persistent-volumes.yaml"
      },
      {
        heading: "RBAC (Role-Based Access Control)",
        content: "RBAC controls who can do what within a Kubernetes cluster.\n\n**Components:**\n• **Role** — Defines permissions within a namespace.\n• **ClusterRole** — Defines cluster-wide permissions.\n• **RoleBinding** — Binds a Role to a user/group.\n• **ClusterRoleBinding** — Binds a ClusterRole to a user/group.",
        code: `# Role: Allow read-only access to pods in 'production' namespace
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: production
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]

---
# RoleBinding: Assign role to a user
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods-binding
  namespace: production
subjects:
  - kind: User
    name: developer-joel
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io

---
# ClusterRole: Cluster-wide admin for deployments
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: deployment-manager
rules:
  - apiGroups: ["apps"]
    resources: ["deployments", "replicasets"]
    verbs: ["get", "list", "watch", "create", "update", "delete"]`,
        codeTitle: "rbac.yaml",
        note: "Follow the Principle of Least Privilege — give users only the permissions they need."
      }
    ]
  }
];
