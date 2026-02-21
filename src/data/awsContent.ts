import { Chapter } from "./javaContent";

export const awsChapters: Chapter[] = [
    {
        id: 1,
        slug: "cloud-fundamentals",
        title: "Cloud Computing Fundamentals",
        description: "What is cloud computing? IaaS, PaaS, SaaS models and AWS Global Infrastructure.",
        sections: [
            {
                heading: "What is Cloud Computing?",
                content: "Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical data centers, you rent access to technology services — such as computing power, storage, and databases — from a cloud provider like AWS.\n\n**Key Benefits:**\n• **Elasticity** — Scale resources up or down based on demand.\n• **Cost Efficiency** — Pay only for what you use (no upfront capital expense).\n• **Global Reach** — Deploy applications worldwide in minutes.\n• **Reliability** — Built-in redundancy and fault tolerance.\n• **Speed & Agility** — Provision resources in seconds instead of weeks.",
                note: "AWS is the world's most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services."
            },
            {
                heading: "Cloud Service Models: IaaS, PaaS, SaaS",
                content: "Cloud computing is categorized into three service models based on the level of control you have:\n\n**1. IaaS (Infrastructure as a Service)**\nYou manage: OS, middleware, runtime, data, applications.\nProvider manages: Networking, storage, servers, virtualization.\nExample: AWS EC2, Azure VMs, Google Compute Engine.\n\n**2. PaaS (Platform as a Service)**\nYou manage: Applications and data.\nProvider manages: OS, middleware, runtime, plus all infrastructure.\nExample: AWS Elastic Beanstalk, Google App Engine, Heroku.\n\n**3. SaaS (Software as a Service)**\nYou manage: Nothing — just use the software.\nProvider manages: Everything.\nExample: Gmail, Slack, Salesforce, Dropbox.",
                note: "Most DevOps engineers work primarily with IaaS services like EC2, VPC, and S3."
            },
            {
                heading: "AWS Global Infrastructure",
                content: "AWS Global Infrastructure is built around **Regions** and **Availability Zones (AZs)**.\n\n• **Regions**: Physical locations around the world where AWS clusters data centers (e.g., us-east-1, ap-south-1). There are 30+ Regions globally.\n• **Availability Zones (AZs)**: Each Region has 2-6 AZs. An AZ is one or more discrete data centers with redundant power, networking, and connectivity.\n• **Edge Locations**: CDN endpoints for Amazon CloudFront, used to cache content closer to users (400+ locations).\n\n**Choosing a Region:**\n1. **Compliance** — Data residency requirements.\n2. **Latency** — Choose nearest to your users.\n3. **Service Availability** — Not all services are in all Regions.\n4. **Pricing** — Costs vary by Region.",
                code: `# List available AWS Regions
aws ec2 describe-regions --output table

# Get current Region
aws configure get region

# List AZs in your Region
aws ec2 describe-availability-zones --output table`,
                codeTitle: "aws-regions.sh"
            },
            {
                heading: "The Shared Responsibility Model",
                content: "Security in AWS is a shared responsibility between AWS and the customer.\n\n**AWS is responsible for (Security OF the Cloud):**\n• Physical data center security\n• Hardware and networking infrastructure\n• Hypervisor management\n• Managed service patching (RDS, Lambda, etc.)\n\n**Customer is responsible for (Security IN the Cloud):**\n• Data encryption (at rest and in transit)\n• IAM user and access management\n• OS patching on EC2 instances\n• Firewall and Security Group configurations\n• Application-level security",
                note: "Remember: If you can configure it in the AWS Console, it's YOUR responsibility."
            }
        ]
    },
    {
        id: 2,
        slug: "aws-iam",
        title: "Identity and Access Management (IAM)",
        description: "Managing user access, roles, policies, MFA, and security best practices.",
        sections: [
            {
                heading: "What is IAM?",
                content: "AWS Identity and Access Management (IAM) lets you securely control access to AWS services and resources. With IAM, you can create and manage AWS users, groups, roles, and permissions.\n\n**Core Components:**\n• **Users** — Individual identity with long-term credentials.\n• **Groups** — Collection of users that share the same permissions.\n• **Roles** — Temporary credentials for AWS services or cross-account access.\n• **Policies** — JSON documents that define permissions (Allow/Deny).",
                note: "The root account has full access to everything — never use it for daily tasks. Create IAM users instead."
            },
            {
                heading: "IAM Policies",
                content: "IAM Policies are JSON documents that define what actions are allowed or denied on which resources.\n\nA policy consists of:\n• **Version** — Policy language version (always \"2012-10-17\").\n• **Statement** — One or more permission blocks.\n• **Effect** — \"Allow\" or \"Deny\".\n• **Action** — The API action(s) being allowed/denied.\n• **Resource** — The ARN of the resource the policy applies to.",
                code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-app-bucket",
        "arn:aws:s3:::my-app-bucket/*"
      ]
    },
    {
      "Effect": "Deny",
      "Action": "s3:DeleteBucket",
      "Resource": "*"
    }
  ]
}`,
                codeTitle: "iam-policy.json",
                note: "Always follow the Principle of Least Privilege (PoLP) — grant only the minimum permissions required."
            },
            {
                heading: "IAM Users & Groups",
                content: "Create individual IAM users for each person who needs access. Organize users into groups for easier permission management.",
                code: `# Create a new IAM user
aws iam create-user --user-name developer-joel

# Add user to a group
aws iam add-user-to-group \\
    --user-name developer-joel \\
    --group-name Developers

# Create access keys for CLI access
aws iam create-access-key --user-name developer-joel

# List all IAM users
aws iam list-users --output table

# Attach a managed policy to a group
aws iam attach-group-policy \\
    --group-name Developers \\
    --policy-arn arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess`,
                codeTitle: "iam-users.sh"
            },
            {
                heading: "IAM Roles & MFA",
                content: "**IAM Roles** provide temporary security credentials instead of long-term access keys. Roles are assumed by:\n• EC2 instances (instance profiles)\n• Lambda functions\n• Other AWS accounts (cross-account access)\n• Federated users (SAML/SSO)\n\n**Multi-Factor Authentication (MFA):**\nAdds an extra layer of security by requiring a code from a virtual device (Google Authenticator, Authy) or a hardware key.",
                code: `# Enable MFA for a user (via Console recommended)
# Or use CLI:
aws iam enable-mfa-device \\
    --user-name developer-joel \\
    --serial-number arn:aws:iam::123456789012:mfa/developer-joel \\
    --authentication-code1 123456 \\
    --authentication-code2 789012

# Create an IAM Role for EC2
aws iam create-role \\
    --role-name EC2-S3-Access \\
    --assume-role-policy-document file://trust-policy.json

# Attach policy to the role
aws iam attach-role-policy \\
    --role-name EC2-S3-Access \\
    --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess`,
                codeTitle: "iam-roles.sh",
                note: "Best Practice: Always use IAM Roles for EC2 instances instead of storing access keys on the instance."
            }
        ]
    },
    {
        id: 3,
        slug: "aws-ec2",
        title: "Amazon EC2 (Elastic Compute Cloud)",
        description: "Virtual servers in the cloud — Instance types, AMIs, Security Groups, and Key Pairs.",
        sections: [
            {
                heading: "EC2 Fundamentals",
                content: "Amazon EC2 provides resizable compute capacity in the cloud. You can launch virtual servers (instances) to run your applications.\n\n**Key Concepts:**\n• **Instance** — A virtual server running in the cloud.\n• **AMI (Amazon Machine Image)** — A template that contains the OS and software to launch an instance.\n• **Instance Type** — Defines CPU, memory, storage, and networking capacity.\n• **Key Pair** — SSH keys used to securely connect to your instance.\n• **Security Group** — Virtual firewall that controls inbound/outbound traffic.",
                note: "EC2 is the backbone of AWS compute — most workloads start here."
            },
            {
                heading: "Instance Types",
                content: "AWS offers a wide range of instance types optimized for different use cases:\n\n| Family | Purpose | Example |\n|---|---|---|\n| **t2/t3** | General Purpose (burstable) | t3.micro, t3.medium |\n| **m5/m6i** | General Purpose (steady) | m5.large, m6i.xlarge |\n| **c5/c6i** | Compute Optimized | c5.2xlarge |\n| **r5/r6i** | Memory Optimized | r5.xlarge |\n| **g4/p4** | GPU / ML Workloads | g4dn.xlarge |\n| **i3** | Storage Optimized | i3.large |\n\n**Naming Convention**: `m5.xlarge`\n• m = Family, 5 = Generation, xlarge = Size",
                note: "For learning and testing, the t2.micro or t3.micro instance types are eligible for the AWS Free Tier."
            },
            {
                heading: "Launching an EC2 Instance",
                content: "You can launch instances via the AWS Console, CLI, or Infrastructure as Code (Terraform, CloudFormation).",
                code: `# Launch an EC2 instance using AWS CLI
aws ec2 run-instances \\
    --image-id ami-0abcdef1234567890 \\
    --count 1 \\
    --instance-type t2.micro \\
    --key-name MyKeyPair \\
    --security-group-ids sg-0123456789abcdef0 \\
    --subnet-id subnet-0123456789abcdef0 \\
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=MyWebServer}]'

# List running instances
aws ec2 describe-instances \\
    --filters "Name=instance-state-name,Values=running" \\
    --query "Reservations[*].Instances[*].[InstanceId,InstanceType,PublicIpAddress,Tags[?Key=='Name'].Value|[0]]" \\
    --output table

# Stop an instance
aws ec2 stop-instances --instance-ids i-0abcdef1234567890

# Terminate an instance (permanently delete)
aws ec2 terminate-instances --instance-ids i-0abcdef1234567890`,
                codeTitle: "launch-ec2.sh"
            },
            {
                heading: "Security Groups",
                content: "Security Groups act as a virtual firewall for your EC2 instances. They control inbound (incoming) and outbound (outgoing) traffic.\n\n**Rules:**\n• **Inbound** — What traffic is allowed INTO the instance.\n• **Outbound** — What traffic is allowed OUT OF the instance (all allowed by default).\n• Security Groups are **stateful** — if you allow inbound traffic, the response is automatically allowed out.",
                code: `# Create a Security Group
aws ec2 create-security-group \\
    --group-name web-server-sg \\
    --description "Security group for web servers" \\
    --vpc-id vpc-0123456789abcdef0

# Allow SSH (port 22) from your IP
aws ec2 authorize-security-group-ingress \\
    --group-id sg-0123456789abcdef0 \\
    --protocol tcp --port 22 \\
    --cidr 203.0.113.0/32

# Allow HTTP (port 80) from anywhere
aws ec2 authorize-security-group-ingress \\
    --group-id sg-0123456789abcdef0 \\
    --protocol tcp --port 80 \\
    --cidr 0.0.0.0/0

# Allow HTTPS (port 443) from anywhere
aws ec2 authorize-security-group-ingress \\
    --group-id sg-0123456789abcdef0 \\
    --protocol tcp --port 443 \\
    --cidr 0.0.0.0/0`,
                codeTitle: "security-groups.sh",
                note: "Never open port 22 (SSH) to 0.0.0.0/0 in production — restrict it to your IP address."
            },
            {
                heading: "Connecting to EC2 via SSH",
                content: "After launching an instance, connect to it using SSH with your key pair.",
                code: `# Set correct permissions on key file
chmod 400 MyKeyPair.pem

# Connect to Ubuntu instance
ssh -i "MyKeyPair.pem" ubuntu@ec2-54-123-45-67.compute-1.amazonaws.com

# Connect to Amazon Linux instance
ssh -i "MyKeyPair.pem" ec2-user@ec2-54-123-45-67.compute-1.amazonaws.com

# Copy files to EC2 instance
scp -i "MyKeyPair.pem" app.zip ubuntu@ec2-ip:/home/ubuntu/

# Connect using Session Manager (no SSH key needed)
aws ssm start-session --target i-0abcdef1234567890`,
                codeTitle: "ssh-connect.sh",
                note: "AWS Session Manager is the recommended way to connect — it doesn't require opening port 22."
            }
        ]
    },
    {
        id: 4,
        slug: "aws-s3",
        title: "Amazon S3 (Simple Storage Service)",
        description: "Object storage — Buckets, Versioning, Lifecycle Policies, and Static Hosting.",
        sections: [
            {
                heading: "S3 Fundamentals",
                content: "Amazon S3 is object storage built to retrieve any amount of data from anywhere. It offers industry-leading durability (99.999999999% — 11 nines).\n\n**Key Concepts:**\n• **Bucket** — A container for objects (like a top-level folder). Bucket names must be globally unique.\n• **Object** — A file + metadata stored in a bucket. Max object size is 5 TB.\n• **Key** — The full path to an object within a bucket (e.g., `photos/2024/sunset.jpg`).\n• **Region** — Buckets are created in a specific AWS Region.",
                note: "S3 is not a file system — it's flat object storage. The 'folder' structure is just a logical prefix in the key name."
            },
            {
                heading: "S3 Operations with CLI",
                content: "Common S3 operations using the AWS CLI:",
                code: `# Create a bucket
aws s3 mb s3://my-unique-bucket-name-2024

# Upload a file
aws s3 cp myfile.txt s3://my-bucket/

# Upload a directory recursively
aws s3 cp ./build/ s3://my-bucket/static/ --recursive

# Download a file
aws s3 cp s3://my-bucket/myfile.txt ./downloads/

# List objects in a bucket
aws s3 ls s3://my-bucket/

# Sync local directory with S3 (uploads only changes)
aws s3 sync ./local-folder/ s3://my-bucket/backup/

# Delete an object
aws s3 rm s3://my-bucket/old-file.txt

# Delete all objects in a bucket
aws s3 rm s3://my-bucket/ --recursive

# Remove a bucket (must be empty)
aws s3 rb s3://my-bucket`,
                codeTitle: "s3-operations.sh"
            },
            {
                heading: "S3 Storage Classes",
                content: "AWS offers multiple storage classes to optimize costs based on access patterns:\n\n• **S3 Standard** — Frequently accessed data (default). Low latency, high throughput.\n• **S3 Intelligent-Tiering** — Automatically moves data between tiers based on usage.\n• **S3 Standard-IA (Infrequent Access)** — For data accessed less frequently but needs rapid access.\n• **S3 One Zone-IA** — Lower cost, stored in a single AZ.\n• **S3 Glacier Instant Retrieval** — Archive with millisecond retrieval.\n• **S3 Glacier Flexible Retrieval** — Archive with minutes-to-hours retrieval.\n• **S3 Glacier Deep Archive** — Lowest cost, 12-48 hour retrieval.",
                note: "Use S3 Lifecycle Policies to automatically transition objects to cheaper storage classes over time."
            },
            {
                heading: "Versioning & Static Website Hosting",
                content: "**Versioning** keeps multiple variants of an object in the same bucket. This protects against accidental deletions.\n\n**Static Website Hosting** lets you serve HTML, CSS, and JS files directly from an S3 bucket.",
                code: `# Enable versioning on a bucket
aws s3api put-bucket-versioning \\
    --bucket my-bucket \\
    --versioning-configuration Status=Enabled

# List object versions
aws s3api list-object-versions --bucket my-bucket

# Configure static website hosting
aws s3 website s3://my-website-bucket/ \\
    --index-document index.html \\
    --error-document error.html

# Bucket Policy for public read access (static website)
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-website-bucket/*"
  }]
}`,
                codeTitle: "s3-versioning.sh",
                note: "For production static websites, use CloudFront (CDN) in front of S3 for HTTPS support and caching."
            }
        ]
    },
    {
        id: 5,
        slug: "aws-vpc",
        title: "Amazon VPC (Virtual Private Cloud)",
        description: "Networking — Subnets, Route Tables, Internet Gateway, NAT Gateway, and NACLs.",
        sections: [
            {
                heading: "VPC Architecture",
                content: "A VPC is your own logically isolated section of the AWS Cloud where you can launch resources in a virtual network that you define.\n\n**Core Components:**\n• **VPC** — Your private network in AWS (e.g., CIDR: 10.0.0.0/16).\n• **Subnets** — Segments of a VPC, mapped to a single AZ.\n  - **Public Subnet** — Has a route to the Internet Gateway.\n  - **Private Subnet** — No direct route to the internet.\n• **Internet Gateway (IGW)** — Allows public subnets to communicate with the internet.\n• **NAT Gateway** — Allows private subnet instances to access the internet (outbound only).\n• **Route Tables** — Rules that determine where network traffic is directed.",
                note: "Every AWS account comes with a default VPC in each Region, but for production, always create a custom VPC."
            },
            {
                heading: "Creating a VPC with Subnets",
                content: "A typical production VPC has public subnets for load balancers and private subnets for application servers and databases.",
                code: `# Create a VPC
aws ec2 create-vpc \\
    --cidr-block 10.0.0.0/16 \\
    --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=Production-VPC}]'

# Create Public Subnet
aws ec2 create-subnet \\
    --vpc-id vpc-0123456789 \\
    --cidr-block 10.0.1.0/24 \\
    --availability-zone ap-south-1a \\
    --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Public-Subnet-1}]'

# Create Private Subnet
aws ec2 create-subnet \\
    --vpc-id vpc-0123456789 \\
    --cidr-block 10.0.2.0/24 \\
    --availability-zone ap-south-1a \\
    --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Private-Subnet-1}]'

# Create and Attach Internet Gateway
aws ec2 create-internet-gateway
aws ec2 attach-internet-gateway \\
    --internet-gateway-id igw-0123456789 \\
    --vpc-id vpc-0123456789`,
                codeTitle: "create-vpc.sh"
            },
            {
                heading: "Route Tables & NAT Gateway",
                content: "Route tables control how traffic flows within your VPC and to the internet.",
                code: `# Create Route Table for Public Subnet
aws ec2 create-route-table --vpc-id vpc-0123456789

# Add route to Internet Gateway (makes subnet public)
aws ec2 create-route \\
    --route-table-id rtb-0123456789 \\
    --destination-cidr-block 0.0.0.0/0 \\
    --gateway-id igw-0123456789

# Associate Route Table with Public Subnet
aws ec2 associate-route-table \\
    --route-table-id rtb-0123456789 \\
    --subnet-id subnet-public-123

# Create NAT Gateway (for private subnet internet access)
aws ec2 create-nat-gateway \\
    --subnet-id subnet-public-123 \\
    --allocation-id eipalloc-0123456789

# Add route from Private Subnet to NAT Gateway
aws ec2 create-route \\
    --route-table-id rtb-private-456 \\
    --destination-cidr-block 0.0.0.0/0 \\
    --nat-gateway-id nat-0123456789`,
                codeTitle: "routes-nat.sh",
                note: "NAT Gateways are charged per hour and per GB of data processed. Consider NAT instances for cost savings in non-production environments."
            },
            {
                heading: "Security Groups vs NACLs",
                content: "Both are firewalls but work at different levels:\n\n| Feature | Security Group | NACL |\n|---|---|---|\n| **Level** | Instance level | Subnet level |\n| **State** | Stateful (return traffic auto-allowed) | Stateless (must define both inbound & outbound) |\n| **Rules** | Allow rules only | Allow AND Deny rules |\n| **Evaluation** | All rules evaluated | Rules evaluated in order (lowest number first) |\n| **Default** | Denies all inbound, allows all outbound | Allows all inbound and outbound |",
                note: "In most architectures, Security Groups are your primary firewall. NACLs act as an additional layer of defense."
            }
        ]
    },
    {
        id: 6,
        slug: "aws-ebs",
        title: "Amazon EBS (Elastic Block Store)",
        description: "Persistent block storage for EC2 — Volume types, Snapshots, and Encryption.",
        sections: [
            {
                heading: "What is EBS?",
                content: "Amazon EBS provides persistent block-level storage volumes for use with EC2 instances. EBS volumes persist independently from the life of an EC2 instance.\n\n**Key Features:**\n• Data persists after instance stop/restart.\n• Volumes are replicated within their AZ.\n• Can be attached/detached from instances.\n• Support encryption at rest and in transit.",
                note: "EBS volumes are AZ-specific — you can't attach a volume from us-east-1a to an instance in us-east-1b."
            },
            {
                heading: "EBS Volume Types",
                content: "AWS offers different volume types for different workloads:\n\n| Type | Name | Use Case | Max IOPS |\n|---|---|---|---|\n| **gp3** | General Purpose SSD | Boot volumes, dev/test | 16,000 |\n| **gp2** | General Purpose SSD (legacy) | Default for most workloads | 16,000 |\n| **io1/io2** | Provisioned IOPS SSD | Databases, critical apps | 64,000 |\n| **st1** | Throughput Optimized HDD | Big data, log processing | 500 |\n| **sc1** | Cold HDD | Infrequent access | 250 |",
                note: "gp3 is the recommended default — it offers better performance and lower cost than gp2."
            },
            {
                heading: "EBS Snapshots",
                content: "Snapshots are incremental backups of EBS volumes stored in S3. You can use them to create new volumes or restore data.",
                code: `# Create a snapshot
aws ec2 create-snapshot \\
    --volume-id vol-0123456789abcdef0 \\
    --description "Daily backup - Production DB"

# List snapshots
aws ec2 describe-snapshots \\
    --owner-ids self \\
    --output table

# Create a volume from a snapshot
aws ec2 create-volume \\
    --snapshot-id snap-0123456789abcdef0 \\
    --volume-type gp3 \\
    --availability-zone ap-south-1a

# Copy snapshot to another region (disaster recovery)
aws ec2 copy-snapshot \\
    --source-region ap-south-1 \\
    --source-snapshot-id snap-0123456789 \\
    --destination-region us-east-1`,
                codeTitle: "ebs-snapshots.sh",
                note: "Schedule automated snapshots using AWS Backup or Amazon Data Lifecycle Manager (DLM)."
            }
        ]
    },
    {
        id: 7,
        slug: "aws-load-balancing-autoscaling",
        title: "Load Balancers & Auto Scaling",
        description: "Application Load Balancer, Network Load Balancer, Target Groups, and Auto Scaling Groups.",
        sections: [
            {
                heading: "Elastic Load Balancing (ELB)",
                content: "A load balancer distributes incoming traffic across multiple targets (EC2 instances, containers, or IPs).\n\n**Types of Load Balancers:**\n• **ALB (Application Load Balancer)** — Layer 7 (HTTP/HTTPS). Path-based and host-based routing. Best for web applications.\n• **NLB (Network Load Balancer)** — Layer 4 (TCP/UDP). Ultra-low latency, millions of requests/sec. Best for gaming, IoT.\n• **CLB (Classic Load Balancer)** — Legacy, not recommended for new applications.",
                note: "ALB is the most commonly used load balancer for web applications and microservices."
            },
            {
                heading: "Creating an Application Load Balancer",
                content: "An ALB needs a Target Group to route traffic to registered targets.",
                code: `# Create a Target Group
aws elbv2 create-target-group \\
    --name web-targets \\
    --protocol HTTP \\
    --port 80 \\
    --vpc-id vpc-0123456789 \\
    --health-check-path /health \\
    --health-check-interval-seconds 30

# Register EC2 instances with the Target Group
aws elbv2 register-targets \\
    --target-group-arn arn:aws:elasticloadbalancing:... \\
    --targets Id=i-instance1 Id=i-instance2

# Create ALB
aws elbv2 create-load-balancer \\
    --name production-alb \\
    --subnets subnet-public-1 subnet-public-2 \\
    --security-groups sg-alb-123

# Create a Listener (routes traffic to target group)
aws elbv2 create-listener \\
    --load-balancer-arn arn:aws:elasticloadbalancing:... \\
    --protocol HTTP --port 80 \\
    --default-actions Type=forward,TargetGroupArn=arn:...`,
                codeTitle: "create-alb.sh"
            },
            {
                heading: "Auto Scaling Groups (ASG)",
                content: "Auto Scaling automatically adjusts the number of EC2 instances based on demand. It ensures you have the right number of instances at all times.\n\n**Components:**\n• **Launch Template** — Defines the instance configuration (AMI, instance type, key pair, SG).\n• **Auto Scaling Group** — Defines min, max, and desired capacity.\n• **Scaling Policies** — Define when to scale (CPU > 70%, request count, schedule).",
                code: `# Create a Launch Template
aws ec2 create-launch-template \\
    --launch-template-name web-server-template \\
    --launch-template-data '{
      "ImageId": "ami-0abcdef1234567890",
      "InstanceType": "t3.micro",
      "KeyName": "MyKeyPair",
      "SecurityGroupIds": ["sg-0123456789"]
    }'

# Create Auto Scaling Group
aws autoscaling create-auto-scaling-group \\
    --auto-scaling-group-name web-asg \\
    --launch-template LaunchTemplateName=web-server-template \\
    --min-size 2 --max-size 6 --desired-capacity 2 \\
    --vpc-zone-identifier "subnet-1,subnet-2" \\
    --target-group-arns arn:aws:elasticloadbalancing:...

# Create Target Tracking Scaling Policy (scale at 70% CPU)
aws autoscaling put-scaling-policy \\
    --auto-scaling-group-name web-asg \\
    --policy-name cpu-target-tracking \\
    --policy-type TargetTrackingScaling \\
    --target-tracking-configuration '{
      "PredefinedMetricSpecification": {
        "PredefinedMetricType": "ASGAverageCPUUtilization"
      },
      "TargetValue": 70.0
    }'`,
                codeTitle: "autoscaling.sh",
                note: "Always spread your ASG across multiple AZs for high availability."
            }
        ]
    },
    {
        id: 8,
        slug: "aws-cloudwatch",
        title: "Amazon CloudWatch (Monitoring)",
        description: "Metrics, Alarms, Logs, Dashboards, and performance monitoring.",
        sections: [
            {
                heading: "What is CloudWatch?",
                content: "Amazon CloudWatch is AWS's monitoring and observability service. It collects metrics, logs, and events from almost every AWS service.\n\n**Core Features:**\n• **Metrics** — Numerical data points over time (CPU usage, network traffic, etc.).\n• **Alarms** — Trigger notifications or actions when metrics cross a threshold.\n• **Logs** — Collect, monitor, and store log files from AWS services.\n• **Dashboards** — Visualize metrics in real-time custom dashboards.\n• **Events/EventBridge** — Respond to state changes in AWS resources.",
                note: "CloudWatch automatically collects basic metrics (every 5 min) for free. Detailed monitoring (every 1 min) costs extra."
            },
            {
                heading: "CloudWatch Metrics & Alarms",
                content: "Create alarms to get notified when resources need attention.",
                code: `# List available metrics for EC2
aws cloudwatch list-metrics \\
    --namespace AWS/EC2 \\
    --dimensions Name=InstanceId,Value=i-0123456789

# Get CPU utilization for an instance
aws cloudwatch get-metric-statistics \\
    --namespace AWS/EC2 \\
    --metric-name CPUUtilization \\
    --dimensions Name=InstanceId,Value=i-0123456789 \\
    --start-time 2024-01-01T00:00:00Z \\
    --end-time 2024-01-01T23:59:59Z \\
    --period 300 \\
    --statistics Average

# Create an alarm (notify when CPU > 80%)
aws cloudwatch put-metric-alarm \\
    --alarm-name high-cpu-alarm \\
    --metric-name CPUUtilization \\
    --namespace AWS/EC2 \\
    --statistic Average \\
    --period 300 \\
    --threshold 80 \\
    --comparison-operator GreaterThanThreshold \\
    --evaluation-periods 2 \\
    --alarm-actions arn:aws:sns:ap-south-1:123456789012:alerts`,
                codeTitle: "cloudwatch-alarms.sh"
            },
            {
                heading: "CloudWatch Logs",
                content: "Centralize all your application and system logs into CloudWatch Logs for search and analysis.",
                code: `# Create a Log Group
aws logs create-log-group --log-group-name /app/web-server

# Create a Log Stream
aws logs create-log-stream \\
    --log-group-name /app/web-server \\
    --log-stream-name instance-1

# Search logs with filter pattern
aws logs filter-log-events \\
    --log-group-name /app/web-server \\
    --filter-pattern "ERROR" \\
    --start-time 1704067200000

# Set retention period (save cost)
aws logs put-retention-policy \\
    --log-group-name /app/web-server \\
    --retention-in-days 30`,
                codeTitle: "cloudwatch-logs.sh",
                note: "Install the CloudWatch Agent on EC2 to send custom metrics and application logs to CloudWatch."
            }
        ]
    },
    {
        id: 9,
        slug: "aws-route53",
        title: "Amazon Route 53 (DNS)",
        description: "DNS management — Hosted Zones, Record Types, Routing Policies, and Health Checks.",
        sections: [
            {
                heading: "What is Route 53?",
                content: "Amazon Route 53 is a highly available and scalable cloud DNS web service. It translates human-readable domain names (www.example.com) into IP addresses (192.0.2.1).\n\n**Key Features:**\n• Domain registration\n• DNS routing\n• Health checking\n• Traffic flow management\n\n**Common Record Types:**\n• **A** — Maps a domain to an IPv4 address.\n• **AAAA** — Maps a domain to an IPv6 address.\n• **CNAME** — Maps a domain to another domain name.\n• **Alias** — AWS-specific, maps to AWS resources (ELB, CloudFront, S3).\n• **MX** — Mail exchange records.\n• **TXT** — Text records (SPF, domain verification).",
                note: "Route 53 is named after port 53 — the standard port for DNS."
            },
            {
                heading: "Hosted Zones & Records",
                content: "A Hosted Zone is a container for DNS records for a specific domain.",
                code: `# Create a Hosted Zone
aws route53 create-hosted-zone \\
    --name example.com \\
    --caller-reference "unique-string-$(date +%s)"

# Create an A Record pointing to an EC2 instance
aws route53 change-resource-record-sets \\
    --hosted-zone-id Z0123456789 \\
    --change-batch '{
      "Changes": [{
        "Action": "CREATE",
        "ResourceRecordSet": {
          "Name": "www.example.com",
          "Type": "A",
          "TTL": 300,
          "ResourceRecords": [{"Value": "54.123.45.67"}]
        }
      }]
    }'

# Create an Alias Record pointing to an ALB
aws route53 change-resource-record-sets \\
    --hosted-zone-id Z0123456789 \\
    --change-batch '{
      "Changes": [{
        "Action": "CREATE",
        "ResourceRecordSet": {
          "Name": "app.example.com",
          "Type": "A",
          "AliasTarget": {
            "HostedZoneId": "Z1234ALBZONE",
            "DNSName": "my-alb-123456.ap-south-1.elb.amazonaws.com",
            "EvaluateTargetHealth": true
          }
        }
      }]
    }'`,
                codeTitle: "route53-records.sh"
            },
            {
                heading: "Health Checks & Routing Policies",
                content: "Route 53 health checks monitor the health of your endpoints and can automatically route traffic away from unhealthy resources.\n\n**Routing Policies:**\n• **Simple** — Single resource, no health checks.\n• **Weighted** — Split traffic by percentage (e.g., 70/30 for blue-green deployments).\n• **Latency-based** — Route to the lowest latency Region.\n• **Failover** — Active-passive setup with health checks.\n• **Geolocation** — Route based on user's geographic location.\n• **Multi-Value** — Return multiple healthy IPs (up to 8).",
                note: "Failover routing with health checks is excellent for disaster recovery architectures."
            }
        ]
    },
    {
        id: 10,
        slug: "aws-advanced",
        title: "Advanced AWS — ECS, CLI & Cost Optimization",
        description: "ECS/EKS basics, AWS CLI mastery, Infrastructure Automation, and cost management.",
        sections: [
            {
                heading: "Amazon ECS & EKS Overview",
                content: "**ECS (Elastic Container Service)** — AWS's native container orchestration service. Run Docker containers without managing servers.\n\n**EKS (Elastic Kubernetes Service)** — AWS's managed Kubernetes service. Use standard K8s tools and APIs.\n\n| Feature | ECS | EKS |\n|---|---|---|\n| **Orchestrator** | AWS Proprietary | Kubernetes |\n| **Learning Curve** | Lower | Higher |\n| **Portability** | AWS-only | Multi-cloud |\n| **Best For** | Simple containerized apps | Complex microservices |",
                note: "For most AWS-first teams, ECS with Fargate (serverless containers) is the simplest path."
            },
            {
                heading: "AWS CLI Mastery",
                content: "The AWS CLI is essential for automation and scripting. Here are advanced techniques:",
                code: `# Configure CLI with named profiles
aws configure --profile production
aws configure --profile staging

# Use a specific profile
aws s3 ls --profile production

# Output formatting
aws ec2 describe-instances --output json
aws ec2 describe-instances --output table
aws ec2 describe-instances --output yaml

# Powerful queries with --query (JMESPath)
aws ec2 describe-instances \\
    --query "Reservations[*].Instances[*].[InstanceId,State.Name,PublicIpAddress]" \\
    --output table

# Get account ID
aws sts get-caller-identity --query "Account" --output text

# Dry run (test without executing)
aws ec2 run-instances --dry-run \\
    --image-id ami-abc123 --instance-type t2.micro`,
                codeTitle: "aws-cli-tips.sh"
            },
            {
                heading: "Cost Optimization Strategies",
                content: "AWS costs can spiral quickly. Here are key strategies:\n\n**1. Right-Sizing:** Use CloudWatch metrics to identify underutilized instances and downsize.\n**2. Reserved Instances:** Commit to 1-3 years for up to 72% savings.\n**3. Spot Instances:** Use spare capacity for up to 90% savings (for fault-tolerant workloads).\n**4. Savings Plans:** Flexible pricing for consistent usage.\n**5. S3 Lifecycle Policies:** Automatically move old data to cheaper storage tiers.\n**6. Terminate Unused Resources:** Delete idle EBS volumes, old snapshots, and unused Elastic IPs.\n**7. Use Auto Scaling:** Scale down during off-peak hours.\n**8. Monitor with Cost Explorer:** Set budgets and alerts.",
                code: `# Check current estimated bill
aws ce get-cost-and-usage \\
    --time-period Start=2024-01-01,End=2024-01-31 \\
    --granularity MONTHLY \\
    --metrics "BlendedCost"

# Set a budget alert
aws budgets create-budget \\
    --account-id 123456789012 \\
    --budget '{
      "BudgetName": "Monthly-100USD",
      "BudgetLimit": {"Amount": "100", "Unit": "USD"},
      "TimeUnit": "MONTHLY",
      "BudgetType": "COST"
    }'`,
                codeTitle: "cost-optimization.sh",
                note: "Enable AWS Cost Explorer and set up billing alarms on Day 1 — it's free and prevents surprise bills."
            }
        ]
    }
];
