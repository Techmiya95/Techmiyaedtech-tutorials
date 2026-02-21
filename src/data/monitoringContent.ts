import { Chapter } from "./javaContent";

export const monitoringChapters: Chapter[] = [
    {
        id: 1,
        slug: "introduction-to-monitoring",
        title: "Introduction to Monitoring & Observability",
        description: "The Three Pillars of Observability — Metrics, Logs, and Traces. Why monitoring matters.",
        sections: [
            {
                heading: "What is Observability?",
                content: "Observability is the ability to measure the internal states of a system by examining its outputs. In DevOps, this is achieved through three pillars:\n\n**1. Metrics** — Numerical measurements over time (CPU usage, request count, error rate).\n**2. Logs** — Timestamped text records of events (application errors, access logs).\n**3. Traces** — End-to-end tracking of a request through distributed systems.\n\n**Monitoring vs Observability:**\n• **Monitoring** tells you \"what\" is wrong (high CPU, disk full).\n• **Observability** helps you understand \"why\" it is wrong (root cause analysis).",
                note: "Monitoring is a subset of observability. Modern systems need all three pillars for effective operations."
            },
            {
                heading: "Why Monitoring Matters",
                content: "Without monitoring, you're flying blind in production.\n\n**Key Benefits:**\n• **Detect Issues Early** — Catch problems before users notice.\n• **Reduce Downtime** — MTTR (Mean Time To Recovery) drops significantly.\n• **Capacity Planning** — Know when to scale before you run out of resources.\n• **SLA Compliance** — Prove uptime and performance guarantees.\n• **Security** — Detect anomalies and intrusion attempts.\n\n**Golden Signals (Google SRE):**\n• **Latency** — Response time of requests.\n• **Traffic** — Demand on the system (requests/sec).\n• **Errors** — Rate of failed requests.\n• **Saturation** — How full/utilized the system is.",
                note: "The Four Golden Signals from Google's SRE book are the most important metrics to monitor for any service."
            },
            {
                heading: "Monitoring Architecture",
                content: "A typical monitoring stack includes:\n\n**Data Collection:**\n• Prometheus — Metrics collection and storage.\n• Fluentd/Loki — Log aggregation.\n• Jaeger/Zipkin — Distributed tracing.\n\n**Visualization:**\n• Grafana — Dashboards for metrics, logs, and traces.\n\n**Alerting:**\n• Prometheus Alertmanager — Send alerts via email, Slack, PagerDuty.\n• Grafana Alerts — Built-in alerting with notification channels.\n\n**Common Stack:**\n```\nPrometheus + Grafana + Alertmanager + Loki\n```\nThis combination covers metrics, visualization, alerting, and log aggregation.",
            }
        ]
    },
    {
        id: 2,
        slug: "prometheus-fundamentals",
        title: "Prometheus Fundamentals",
        description: "Architecture, installation, targets, and exporters.",
        sections: [
            {
                heading: "What is Prometheus?",
                content: "Prometheus is an open-source monitoring and alerting toolkit originally built at SoundCloud. It's now a CNCF graduated project.\n\n**Key Features:**\n• **Pull-based model** — Prometheus scrapes metrics from targets.\n• **Time-series database** — Stores metrics with timestamps.\n• **PromQL** — Powerful query language for metrics.\n• **Service Discovery** — Auto-discover targets (Kubernetes, AWS, etc.).\n• **Alerting** — Define alert rules and route to Alertmanager.\n\n**Architecture:**\n• **Prometheus Server** — Scrapes and stores metrics.\n• **Exporters** — Expose metrics in Prometheus format.\n• **Alertmanager** — Handles alerts (dedup, grouping, routing).\n• **Pushgateway** — For short-lived batch jobs.",
                note: "Prometheus uses a PULL model — it actively scrapes metrics from targets, unlike push-based systems."
            },
            {
                heading: "Installing Prometheus",
                content: "Deploy Prometheus using Docker or Docker Compose.",
                code: `# Docker Compose — Prometheus Stack
# docker-compose.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.retention.time=15d'
      - '--web.enable-lifecycle'
    ports:
      - "9090:9090"
    restart: unless-stopped

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9100:9100"
    restart: unless-stopped

volumes:
  prometheus_data:`,
                codeTitle: "docker-compose.yml"
            },
            {
                heading: "Prometheus Configuration",
                content: "Configure Prometheus to scrape targets.",
                code: `# prometheus.yml
global:
  scrape_interval: 15s       # How often to scrape targets
  evaluation_interval: 15s   # How often to evaluate rules
  scrape_timeout: 10s        # Timeout for scrapes

# Alerting configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

# Alert rules files
rule_files:
  - "alert_rules.yml"

# Scrape targets
scrape_configs:
  # Prometheus itself
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Node Exporter (Linux system metrics)
  - job_name: 'node-exporter'
    static_configs:
      - targets:
          - 'node-exporter:9100'
          - '10.0.1.10:9100'
          - '10.0.1.11:9100'

  # Application metrics
  - job_name: 'web-app'
    metrics_path: '/metrics'
    static_configs:
      - targets: ['app:3000']
        labels:
          environment: 'production'
          team: 'backend'

  # Kubernetes service discovery
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true`,
                codeTitle: "prometheus.yml",
                note: "After editing prometheus.yml, reload the config: curl -X POST http://localhost:9090/-/reload"
            }
        ]
    },
    {
        id: 3,
        slug: "prometheus-metrics",
        title: "Metric Types & Scraping",
        description: "Counter, Gauge, Histogram, Summary — understanding and exposing metrics.",
        sections: [
            {
                heading: "Prometheus Metric Types",
                content: "Prometheus has four core metric types:\n\n**1. Counter** — Only goes up (never decreases). Resets on restart.\nExamples: Total HTTP requests, total errors, bytes transmitted.\n\n**2. Gauge** — Can go up or down. Represents a current value.\nExamples: Current temperature, memory usage, active connections.\n\n**3. Histogram** — Samples observations and counts them in configurable buckets.\nExamples: Request latency distribution, response size distribution.\n\n**4. Summary** — Similar to histogram but calculates quantiles on the client side.\nExamples: Request duration at p50, p90, p99.",
                note: "Use Counters for things you count, Gauges for things you measure, and Histograms for distributions."
            },
            {
                heading: "Exposing Custom Metrics (Node.js)",
                content: "Add Prometheus metrics to your Node.js application.",
                code: `// metrics.js — Node.js Express application
const express = require('express');
const client = require('prom-client');

const app = express();

// Create a Registry
const register = new client.Registry();

// Add default metrics (CPU, memory, event loop, etc.)
client.collectDefaultMetrics({ register });

// Counter: Total HTTP requests
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

// Gauge: Active connections
const activeConnections = new client.Gauge({
  name: 'active_connections',
  help: 'Number of active connections',
  registers: [register]
});

// Histogram: Request duration
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
  registers: [register]
});

// Middleware to track metrics
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  activeConnections.inc();
  
  res.on('finish', () => {
    httpRequestsTotal.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode
    });
    end({
      method: req.method,
      route: req.path,
      status_code: res.statusCode
    });
    activeConnections.dec();
  });
  next();
});

// Metrics endpoint (Prometheus scrapes this)
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(3000);`,
                codeTitle: "metrics.js"
            },
            {
                heading: "Exposing Metrics (Python)",
                content: "Add Prometheus metrics to a Python Flask application.",
                code: `# app.py — Python Flask with Prometheus
from flask import Flask, request
from prometheus_client import (
    Counter, Gauge, Histogram, 
    generate_latest, CONTENT_TYPE_LATEST
)
import time

app = Flask(__name__)

# Metrics
REQUEST_COUNT = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

REQUEST_LATENCY = Histogram(
    'http_request_duration_seconds',
    'HTTP request latency',
    ['method', 'endpoint'],
    buckets=[.01, .05, .1, .25, .5, 1.0, 2.5, 5.0]
)

IN_PROGRESS = Gauge(
    'http_requests_in_progress',
    'Number of requests in progress'
)

@app.before_request
def before_request():
    request.start_time = time.time()
    IN_PROGRESS.inc()

@app.after_request
def after_request(response):
    latency = time.time() - request.start_time
    REQUEST_COUNT.labels(
        method=request.method,
        endpoint=request.path,
        status=response.status_code
    ).inc()
    REQUEST_LATENCY.labels(
        method=request.method,
        endpoint=request.path
    ).observe(latency)
    IN_PROGRESS.dec()
    return response

@app.route('/metrics')
def metrics():
    return generate_latest(), 200, {
        'Content-Type': CONTENT_TYPE_LATEST
    }

if __name__ == '__main__':
    app.run(port=5000)`,
                codeTitle: "app.py",
                note: "Both Node.js (prom-client) and Python (prometheus_client) have official Prometheus client libraries."
            }
        ]
    },
    {
        id: 4,
        slug: "promql",
        title: "PromQL — Querying Metrics",
        description: "Writing PromQL queries for dashboards, alerts, and analysis.",
        sections: [
            {
                heading: "PromQL Basics",
                content: "PromQL (Prometheus Query Language) is used to query metrics data. You'll use it in Prometheus UI, Grafana dashboards, and alert rules.",
                code: `# Basic Queries (Instant Vectors)
# Get all values for a metric
http_requests_total

# Filter by label
http_requests_total{method="GET"}
http_requests_total{status_code="500"}
http_requests_total{job="web-app", method="POST"}

# Label matchers
http_requests_total{status_code=~"5.."}     # Regex match (5xx errors)
http_requests_total{method!="OPTIONS"}      # Not equal
http_requests_total{route=~"/api/.*"}       # Regex: starts with /api/

# Range Vectors (time series over a period)
http_requests_total[5m]     # Last 5 minutes of data
http_requests_total[1h]     # Last 1 hour`,
                codeTitle: "promql-basics"
            },
            {
                heading: "PromQL Functions & Operators",
                content: "Common PromQL functions for real-world use cases.",
                code: `# ============================================
# RATES & INCREASES
# ============================================

# Request rate (requests per second)
rate(http_requests_total[5m])

# Request rate filtered
rate(http_requests_total{status_code="200"}[5m])

# Increase in the last hour
increase(http_requests_total[1h])

# ============================================
# AGGREGATIONS
# ============================================

# Sum of all request rates
sum(rate(http_requests_total[5m]))

# Sum grouped by status code
sum by (status_code) (rate(http_requests_total[5m]))

# Average CPU usage across all instances
avg(node_cpu_seconds_total{mode="idle"})

# Top 5 instances by memory usage
topk(5, node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes)

# ============================================
# HISTOGRAM QUERIES (Latency)
# ============================================

# 95th percentile request latency
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# 99th percentile
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))

# Average request duration
rate(http_request_duration_seconds_sum[5m])
/ rate(http_request_duration_seconds_count[5m])

# ============================================
# PRACTICAL EXAMPLES
# ============================================

# Error rate (percentage of 5xx responses)
sum(rate(http_requests_total{status_code=~"5.."}[5m]))
/ sum(rate(http_requests_total[5m])) * 100

# CPU usage percentage
100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory usage percentage
(1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100

# Disk usage percentage
(1 - node_filesystem_avail_bytes{mountpoint="/"} 
/ node_filesystem_size_bytes{mountpoint="/"}) * 100`,
                codeTitle: "promql-functions",
                note: "rate() is for counters, avg/min/max are for gauges. Never use rate() on a gauge."
            }
        ]
    },
    {
        id: 5,
        slug: "alertmanager",
        title: "Alertmanager & Alert Rules",
        description: "Defining alert rules, routing alerts, and integrating with Slack/PagerDuty.",
        sections: [
            {
                heading: "Alert Rules",
                content: "Define rules in Prometheus to fire alerts when conditions are met.",
                code: `# alert_rules.yml
groups:
  - name: instance_alerts
    rules:
      # Instance down for more than 2 minutes
      - alert: InstanceDown
        expr: up == 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Instance {{ $labels.instance }} is down"
          description: "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 2 minutes."

      # High CPU usage (> 80% for 5 minutes)
      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage on {{ $labels.instance }}"
          description: "CPU usage is above 80% (current: {{ $value | printf \"%.1f\" }}%)"

      # Low disk space (< 10% free)
      - alert: LowDiskSpace
        expr: (node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}) * 100 < 10
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Low disk space on {{ $labels.instance }}"
          description: "Disk space is below 10% (current: {{ $value | printf \"%.1f\" }}%)"

  - name: application_alerts
    rules:
      # High error rate (> 5% of requests are 5xx)
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status_code=~"5.."}[5m]))
          / sum(rate(http_requests_total[5m])) * 100 > 5
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value | printf \"%.1f\" }}%"

      # High latency (p95 > 1 second)
      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High latency detected"
          description: "95th percentile latency is {{ $value | printf \"%.2f\" }}s"`,
                codeTitle: "alert_rules.yml"
            },
            {
                heading: "Alertmanager Configuration",
                content: "Configure how alerts are routed and where notifications are sent.",
                code: `# alertmanager.yml
global:
  resolve_timeout: 5m
  slack_api_url: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL'

# Notification templates
templates:
  - '/etc/alertmanager/templates/*.tmpl'

# Routing tree
route:
  receiver: 'slack-default'
  group_by: ['alertname', 'job']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  
  routes:
    # Critical alerts → PagerDuty
    - match:
        severity: critical
      receiver: 'pagerduty-critical'
      repeat_interval: 1h
    
    # Warning alerts → Slack
    - match:
        severity: warning
      receiver: 'slack-warnings'
      repeat_interval: 4h

# Notification receivers
receivers:
  - name: 'slack-default'
    slack_configs:
      - channel: '#monitoring'
        title: '{{ .GroupLabels.alertname }}'
        text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'
        send_resolved: true

  - name: 'slack-warnings'
    slack_configs:
      - channel: '#warnings'
        send_resolved: true

  - name: 'pagerduty-critical'
    pagerduty_configs:
      - service_key: 'your-pagerduty-service-key'
        severity: critical

# Silencing and inhibition
inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'instance']`,
                codeTitle: "alertmanager.yml",
                note: "Inhibition rules prevent warning alerts from firing when a critical alert for the same instance is already active."
            }
        ]
    },
    {
        id: 6,
        slug: "grafana-setup",
        title: "Grafana Setup & Data Sources",
        description: "Installing Grafana, connecting data sources, and understanding the UI.",
        sections: [
            {
                heading: "What is Grafana?",
                content: "Grafana is an open-source visualization and analytics platform. It connects to data sources like Prometheus, InfluxDB, Elasticsearch, and more to create beautiful dashboards.\n\n**Key Features:**\n• Rich, interactive dashboards.\n• 100+ data source integrations.\n• Built-in alerting.\n• RBAC (access control).\n• Templates & variables for dynamic dashboards.\n• Sharing & embedding.",
                note: "While Prometheus stores and queries metrics, Grafana beautifully visualizes them."
            },
            {
                heading: "Installing Grafana",
                content: "Deploy Grafana alongside Prometheus using Docker Compose.",
                code: `# Add to your docker-compose.yml
services:
  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin123
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
    depends_on:
      - prometheus
    restart: unless-stopped

volumes:
  grafana_data:

# Provisioning data sources automatically
# grafana/provisioning/datasources/prometheus.yml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: true`,
                codeTitle: "grafana-setup.yml",
                note: "Default login: admin/admin. You'll be prompted to change the password on first login."
            },
            {
                heading: "Connecting Data Sources",
                content: "Add Prometheus as a data source through the Grafana UI or provisioning.\n\n**UI Steps:**\n1. Login to Grafana (http://localhost:3000).\n2. Go to **Configuration → Data Sources → Add data source**.\n3. Select **Prometheus**.\n4. Enter URL: `http://prometheus:9090` (Docker) or `http://localhost:9090`.\n5. Click **Save & Test**.\n\n**Other Popular Data Sources:**\n• **Loki** — For logs.\n• **InfluxDB** — Alternative TSDB.\n• **Elasticsearch** — For logs and search.\n• **CloudWatch** — AWS metrics.\n• **PostgreSQL/MySQL** — Direct database queries.",
                note: "In Docker Compose, use the service name (prometheus) instead of localhost for the data source URL."
            }
        ]
    },
    {
        id: 7,
        slug: "grafana-dashboards",
        title: "Dashboards, Panels & Queries",
        description: "Building professional dashboards with panels, visualizations, and variables.",
        sections: [
            {
                heading: "Creating Dashboards",
                content: "Dashboards are collections of panels that visualize your metrics.\n\n**Panel Types:**\n• **Time Series** — Line/area charts for metrics over time.\n• **Stat** — Single value with optional sparkline.\n• **Gauge** — Circular gauge for thresholds (CPU, disk).\n• **Bar Gauge** — Horizontal bar for comparisons.\n• **Table** — Tabular data.\n• **Heatmap** — Distribution visualization.\n• **Logs** — Log viewer (with Loki).\n• **Alert List** — Active alerts.\n\n**Steps to Create:**\n1. Click **+** → **New Dashboard**.\n2. Click **Add Panel**.\n3. Select visualization type.\n4. Write PromQL query.\n5. Configure thresholds and display options.\n6. Save the dashboard.",
                note: "Import community dashboards from grafana.com/grafana/dashboards — search by data source and exporter."
            },
            {
                heading: "Essential PromQL Queries for Dashboards",
                content: "Ready-to-use PromQL queries for common Grafana panels.",
                code: `# ============================================
# SYSTEM DASHBOARDS
# ============================================

# CPU Usage (%) — Time Series
100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory Usage (%) — Gauge
(1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100

# Disk Usage (%) — Gauge
(1 - node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}) * 100

# Network Traffic (bytes/sec) — Time Series
rate(node_network_receive_bytes_total{device="eth0"}[5m])  # Inbound
rate(node_network_transmit_bytes_total{device="eth0"}[5m]) # Outbound

# System Uptime — Stat
time() - node_boot_time_seconds

# ============================================
# APPLICATION DASHBOARDS
# ============================================

# Requests Per Second — Time Series
sum(rate(http_requests_total[1m]))

# Request Rate by Status — Time Series (stacked)
sum by (status_code) (rate(http_requests_total[5m]))

# Error Rate (%) — Stat with thresholds
sum(rate(http_requests_total{status_code=~"5.."}[5m]))
/ sum(rate(http_requests_total[5m])) * 100

# p50 / p95 / p99 Latency — Time Series (overlaid)
histogram_quantile(0.50, rate(http_request_duration_seconds_bucket[5m]))
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))

# Active Connections — Stat
active_connections`,
                codeTitle: "dashboard-queries"
            },
            {
                heading: "Dashboard Variables",
                content: "Variables make dashboards dynamic — users can filter data without editing queries.\n\n**Common Variable Types:**\n• **Query** — Pull values from Prometheus (e.g., list of instances).\n• **Custom** — Static list of values.\n• **Interval** — Time intervals.\n\n**Creating Variables:**\n1. Go to **Dashboard Settings → Variables → New**.\n2. Name: `instance`, Type: Query.\n3. Query: `label_values(up, instance)`.\n4. Use in panels: `up{instance=\"$instance\"}`.\n\n**Multi-Value Variables:**\n• Enable multi-value selection.\n• Enable \"All\" option.\n• Use regex to format: `/.*:9100/`",
                note: "Variables transform a static dashboard into an interactive tool. Always add instance and environment variables."
            },
            {
                heading: "Importing Community Dashboards",
                content: "Don't build everything from scratch — import proven community dashboards.\n\n**Popular Dashboard IDs (from grafana.com/dashboards):**\n• **1860** — Node Exporter Full (Linux system metrics).\n• **3662** — Prometheus 2.0 Stats.\n• **7587** — Kubernetes Cluster Monitoring.\n• **12006** — Kubernetes Pods.\n• **14282** — Node Exporter Quickstart.\n• **11159** — Docker and Container Metrics.\n\n**Import Steps:**\n1. Go to **+** → **Import**.\n2. Enter the Dashboard ID (e.g., 1860).\n3. Click **Load**.\n4. Select your Prometheus data source.\n5. Click **Import**.",
                note: "Dashboard ID 1860 (Node Exporter Full) is the most popular Grafana dashboard with millions of downloads."
            }
        ]
    },
    {
        id: 8,
        slug: "grafana-alerts-sharing",
        title: "Grafana Alerts, Sharing & Role Management",
        description: "Built-in alerting, dashboard sharing, and user/team management.",
        sections: [
            {
                heading: "Grafana Alerts",
                content: "Grafana has built-in alerting that can send notifications via email, Slack, PagerDuty, and more.\n\n**Alert Components:**\n• **Alert Rule** — PromQL condition that triggers the alert.\n• **Contact Point** — Where to send notifications (Slack, email).\n• **Notification Policy** — Routing rules for alerts.\n• **Silences** — Temporarily mute alerts.",
                code: `# Grafana Provisioning — Alert Contact Points
# grafana/provisioning/alerting/contactpoints.yml
apiVersion: 1

contactPoints:
  - orgId: 1
    name: slack-notifications
    receivers:
      - uid: slack-1
        type: slack
        settings:
          url: "https://hooks.slack.com/services/YOUR/WEBHOOK"
          recipient: "#monitoring-alerts"
          title: |
            {{ "{{" }} .Status {{ "}}" }} - {{ "{{" }} .CommonLabels.alertname {{ "}}" }}
          text: |
            {{ "{{" }} range .Alerts {{ "}}" }}
            *{{ "{{" }} .Labels.alertname {{ "}}" }}*
            {{ "{{" }} .Annotations.description {{ "}}" }}
            {{ "{{" }} end {{ "}}" }}

  - orgId: 1
    name: email-notifications
    receivers:
      - uid: email-1
        type: email
        settings:
          addresses: "admin@techmiya.com"`,
                codeTitle: "contactpoints.yml"
            },
            {
                heading: "Dashboard Sharing",
                content: "Share dashboards with your team or externally.\n\n**Sharing Methods:**\n\n**1. Direct Link:**\n• Click the share icon on any dashboard.\n• Copy the URL — anyone with access can view it.\n\n**2. Snapshot:**\n• Creates a static snapshot of the dashboard at a point in time.\n• Can be shared publicly (no login required).\n• No live data — just a frozen view.\n\n**3. Embed:**\n• Generate an iframe embed code.\n• Embed dashboards in wikis, documentation, or internal portals.\n\n**4. Export/Import:**\n• Export dashboard as JSON.\n• Import on another Grafana instance.\n• Store in Git for version control.",
                note: "Export dashboards as JSON and store them in Git for version control and disaster recovery."
            },
            {
                heading: "User & Role Management",
                content: "Grafana supports role-based access control for team management.\n\n**Built-in Roles:**\n• **Admin** — Full access, manage users, data sources, plugins.\n• **Editor** — Create and edit dashboards, cannot manage users.\n• **Viewer** — View-only access to dashboards.\n\n**Teams & Permissions:**\n1. Create teams (DevOps, Backend, Frontend).\n2. Assign users to teams.\n3. Set dashboard folder permissions per team.\n4. Editors can only edit dashboards in their team's folder.\n\n**Authentication Options:**\n• Built-in username/password.\n• OAuth (Google, GitHub, Azure AD).\n• LDAP / Active Directory.\n• SAML (Enterprise).",
                code: `# Grafana environment variables for auth
# docker-compose.yml
environment:
  # Basic Auth
  - GF_SECURITY_ADMIN_USER=admin
  - GF_SECURITY_ADMIN_PASSWORD=\${GRAFANA_ADMIN_PASSWORD}
  
  # GitHub OAuth
  - GF_AUTH_GITHUB_ENABLED=true
  - GF_AUTH_GITHUB_CLIENT_ID=your-client-id
  - GF_AUTH_GITHUB_CLIENT_SECRET=your-client-secret
  - GF_AUTH_GITHUB_ALLOWED_ORGANIZATIONS=your-org
  
  # Disable public signup
  - GF_USERS_ALLOW_SIGN_UP=false
  - GF_USERS_ALLOW_ORG_CREATE=false
  
  # Anonymous access (for public dashboards)
  - GF_AUTH_ANONYMOUS_ENABLED=true
  - GF_AUTH_ANONYMOUS_ORG_ROLE=Viewer`,
                codeTitle: "grafana-auth.yml",
                note: "For production, always disable anonymous access and use OAuth or LDAP for authentication."
            }
        ]
    }
];
