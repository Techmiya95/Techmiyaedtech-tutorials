import { Chapter } from "./javaContent";

export const terraformChapters: Chapter[] = [
    {
        id: 1,
        slug: "introduction-to-terraform",
        title: "Introduction to Infrastructure as Code (IaC)",
        description: "What is IaC? Declarative vs Imperative approaches. Terraform basics and installation.",
        sections: [
            {
                heading: "What is Infrastructure as Code?",
                content: "Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure through machine-readable definition files rather than manual processes.\n\n**Benefits of IaC:**\n• **Version Controlled** — Track infrastructure changes in Git.\n• **Reproducible** — Create identical environments (dev/staging/prod).\n• **Automated** — No manual clicking in cloud consoles.\n• **Self-Documenting** — The code IS the documentation.\n• **Auditable** — Every change is tracked.\n\n**IaC Tools:**\n• **Terraform** — Cloud-agnostic, declarative (HCL). Most popular.\n• **AWS CloudFormation** — AWS-only, JSON/YAML.\n• **Pulumi** — Uses general-purpose programming languages.\n• **Ansible** — Primarily configuration management, also IaC.",
                note: "Terraform is cloud-agnostic — the same tool can provision AWS, Azure, GCP, and hundreds of other providers."
            },
            {
                heading: "Declarative vs Imperative",
                content: "**Declarative (Terraform):**\nYou describe the DESIRED state. Terraform figures out how to get there.\n\"I want 3 EC2 instances with this configuration.\"\n\n**Imperative (Scripts, Ansible):**\nYou describe the STEPS to reach the desired state.\n\"Create an instance, then attach a volume, then configure the network.\"\n\n**Terraform Workflow:**\n1. **Write** — Define infrastructure in `.tf` files.\n2. **Plan** — Preview what Terraform will change (`terraform plan`).\n3. **Apply** — Execute the changes (`terraform apply`).\n4. **Destroy** — Tear down infrastructure (`terraform destroy`).",
            },
            {
                heading: "Installing Terraform",
                content: "Install Terraform and set up your first project.",
                code: `# Install Terraform (Ubuntu/Debian)
wget -O- https://apt.releases.hashicorp.com/gpg | \\
    sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \\
    https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \\
    sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

# Verify
terraform --version

# Initialize a new project
mkdir my-infra && cd my-infra

# Configure AWS provider
cat > main.tf << 'EOF'
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.0"
}

provider "aws" {
  region = "ap-south-1"
}
EOF

# Initialize (downloads provider plugins)
terraform init`,
                codeTitle: "install-terraform.sh"
            }
        ]
    },
    {
        id: 2,
        slug: "terraform-resources",
        title: "Resources & HCL Syntax",
        description: "Creating AWS resources with HashiCorp Configuration Language (HCL).",
        sections: [
            {
                heading: "HCL Basics",
                content: "HashiCorp Configuration Language (HCL) is Terraform's domain-specific language.\n\n**Syntax Elements:**\n• **Blocks** — Containers for configuration (`resource`, `variable`, `output`).\n• **Arguments** — Key-value pairs within blocks.\n• **Expressions** — Values, references, and computations.\n• **Comments** — `#` for single-line, `/* */` for multi-line.",
                code: `# Block syntax
resource "aws_instance" "web" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "t3.micro"

  tags = {
    Name        = "WebServer"
    Environment = "production"
  }
}

# Data source (read existing resources)
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]  # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-*-22.04-amd64-server-*"]
  }
}

# Reference the data source
resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
}`,
                codeTitle: "hcl-basics.tf"
            },
            {
                heading: "Creating Resources",
                content: "Create a complete infrastructure with EC2, Security Group, and Key Pair.",
                code: `# Provider configuration
provider "aws" {
  region = "ap-south-1"
}

# Security Group
resource "aws_security_group" "web_sg" {
  name        = "web-server-sg"
  description = "Allow HTTP and SSH"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["203.0.113.0/32"]  # Your IP only
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "web-server-sg"
  }
}

# EC2 Instance
resource "aws_instance" "web" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t3.micro"
  key_name               = "my-key-pair"
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  user_data = <<-EOF
    #!/bin/bash
    apt update -y
    apt install -y nginx
    systemctl start nginx
    echo "Hello from Terraform!" > /var/www/html/index.html
  EOF

  tags = {
    Name        = "web-server"
    ManagedBy   = "terraform"
  }
}

# Output the public IP
output "public_ip" {
  value = aws_instance.web.public_ip
}`,
                codeTitle: "main.tf"
            },
            {
                heading: "Terraform Commands",
                content: "The essential Terraform CLI commands:",
                code: `# Initialize project (download providers)
terraform init

# Format code
terraform fmt

# Validate configuration
terraform validate

# Preview changes (dry run)
terraform plan

# Apply changes (create/update resources)
terraform apply

# Apply without confirmation prompt
terraform apply -auto-approve

# Show current state
terraform show

# List resources in state
terraform state list

# Destroy all resources
terraform destroy

# Destroy specific resource
terraform destroy -target=aws_instance.web

# Import existing resource into Terraform
terraform import aws_instance.web i-0123456789

# View dependency graph
terraform graph | dot -Tpng > graph.png`,
                codeTitle: "terraform-commands.sh",
                note: "Always run 'terraform plan' before 'terraform apply' to review changes before they're made."
            }
        ]
    },
    {
        id: 3,
        slug: "terraform-variables",
        title: "Variables & Outputs",
        description: "Input variables, output values, local values, and variable validation.",
        sections: [
            {
                heading: "Input Variables",
                content: "Variables make your Terraform code reusable and configurable.",
                code: `# variables.tf
variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "ap-south-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"

  validation {
    condition     = contains(["t3.micro", "t3.small", "t3.medium"], var.instance_type)
    error_message = "Instance type must be t3.micro, t3.small, or t3.medium."
  }
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "allowed_cidrs" {
  description = "CIDR blocks for SSH access"
  type        = list(string)
  default     = ["10.0.0.0/8"]
}

variable "tags" {
  description = "Common tags for all resources"
  type        = map(string)
  default = {
    ManagedBy = "terraform"
    Team      = "devops"
  }
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true   # Won't show in logs/output
}`,
                codeTitle: "variables.tf"
            },
            {
                heading: "Using Variables & Outputs",
                content: "Reference variables in resources and expose outputs.",
                code: `# main.tf — Using variables
provider "aws" {
  region = var.aws_region
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type

  tags = merge(var.tags, {
    Name        = "web-\${var.environment}"
    Environment = var.environment
  })
}

# outputs.tf
output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.web.id
}

output "public_ip" {
  description = "Public IP address"
  value       = aws_instance.web.public_ip
}

output "public_url" {
  description = "Public URL"
  value       = "http://\${aws_instance.web.public_ip}"
}

# Local values (computed constants)
locals {
  name_prefix = "\${var.environment}-web"
  common_tags = merge(var.tags, {
    Environment = var.environment
    CreatedAt   = timestamp()
  })
}`,
                codeTitle: "main.tf"
            },
            {
                heading: "Setting Variable Values",
                content: "Multiple ways to provide variable values:",
                code: `# Method 1: terraform.tfvars file (auto-loaded)
# terraform.tfvars
aws_region    = "ap-south-1"
environment   = "production"
instance_type = "t3.small"
allowed_cidrs = ["203.0.113.0/32", "10.0.0.0/8"]

# Method 2: Named .tfvars file
terraform apply -var-file="prod.tfvars"

# Method 3: Command-line flags
terraform apply -var="environment=staging" -var="instance_type=t3.micro"

# Method 4: Environment variables (TF_VAR_ prefix)
export TF_VAR_environment="production"
export TF_VAR_db_password="super-secret"
terraform apply

# Priority (highest to lowest):
# 1. -var command line flag
# 2. -var-file flag
# 3. *.auto.tfvars files
# 4. terraform.tfvars
# 5. Environment variables (TF_VAR_)
# 6. Variable defaults`,
                codeTitle: "variable-values.sh",
                note: "Never commit terraform.tfvars with secrets to Git. Use environment variables or a secrets manager for sensitive values."
            }
        ]
    },
    {
        id: 4,
        slug: "terraform-state",
        title: "State Management & Remote Backend",
        description: "Understanding Terraform state, remote backends, and state locking.",
        sections: [
            {
                heading: "Terraform State",
                content: "Terraform state (`terraform.tfstate`) maps your configuration to real-world resources. It's the source of truth for what Terraform manages.\n\n**Why State Matters:**\n• Maps `.tf` config to actual cloud resources.\n• Tracks dependencies between resources.\n• Stores resource metadata and attributes.\n• Enables `terraform plan` to show differences.\n\n**Dangers of Local State:**\n• ❌ Lost if your laptop crashes.\n• ❌ Can't collaborate with team members.\n• ❌ No locking — concurrent runs can corrupt state.\n• ❌ Secrets stored in plain text.",
                note: "NEVER commit terraform.tfstate to Git — it contains sensitive data like passwords and API keys."
            },
            {
                heading: "Remote Backend (S3 + DynamoDB)",
                content: "Store state remotely in S3 with DynamoDB for state locking.",
                code: `# backend.tf — Remote state configuration
terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "production/terraform.tfstate"
    region         = "ap-south-1"
    encrypt        = true
    dynamodb_table = "terraform-lock"
  }
}

# First, create the S3 bucket and DynamoDB table:
# bootstrap.tf
resource "aws_s3_bucket" "tf_state" {
  bucket = "my-terraform-state-bucket"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "tf_state" {
  bucket = aws_s3_bucket.tf_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "tf_state" {
  bucket = aws_s3_bucket.tf_state.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "aws:kms"
    }
  }
}

resource "aws_dynamodb_table" "tf_lock" {
  name         = "terraform-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}`,
                codeTitle: "backend.tf",
                note: "State locking via DynamoDB prevents two team members from running terraform apply simultaneously."
            },
            {
                heading: "State Commands",
                content: "Manage and inspect the Terraform state:",
                code: `# List resources in state
terraform state list

# Show details of a specific resource
terraform state show aws_instance.web

# Move a resource (rename)
terraform state mv aws_instance.web aws_instance.app_server

# Remove a resource from state (stop managing it)
terraform state rm aws_instance.old_server

# Pull remote state to local file
terraform state pull > backup.tfstate

# Push local state to remote
terraform state push backup.tfstate

# Refresh state (sync with real resources)
terraform refresh

# Replace a resource (force recreation)
terraform apply -replace=aws_instance.web`,
                codeTitle: "state-commands.sh"
            }
        ]
    },
    {
        id: 5,
        slug: "terraform-ec2-vpc",
        title: "EC2 & VPC Automation",
        description: "Automating complete network infrastructure with VPC, subnets, and EC2.",
        sections: [
            {
                heading: "Full VPC Setup",
                content: "Create a production-ready VPC with public and private subnets.",
                code: `# vpc.tf — Production VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "\${var.environment}-vpc"
  }
}

# Public Subnets (for ALB, NAT Gateway)
resource "aws_subnet" "public" {
  count                   = 2
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.\${count.index + 1}.0/24"
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "\${var.environment}-public-\${count.index + 1}"
    Type = "public"
  }
}

# Private Subnets (for EC2, RDS)
resource "aws_subnet" "private" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.\${count.index + 10}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "\${var.environment}-private-\${count.index + 1}"
    Type = "private"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "\${var.environment}-igw" }
}

# NAT Gateway (for private subnet internet access)
resource "aws_eip" "nat" {
  domain = "vpc"
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public[0].id
  tags          = { Name = "\${var.environment}-nat" }
}

# Route Tables
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = { Name = "\${var.environment}-public-rt" }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }
  tags = { Name = "\${var.environment}-private-rt" }
}

# Associate subnets with route tables
resource "aws_route_table_association" "public" {
  count          = 2
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count          = 2
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private.id
}

data "aws_availability_zones" "available" {}`,
                codeTitle: "vpc.tf",
                note: "This creates a best-practice VPC with redundancy across 2 Availability Zones."
            }
        ]
    },
    {
        id: 6,
        slug: "terraform-security-groups",
        title: "Security Groups & IAM Automation",
        description: "Automating security groups, IAM roles, and policies with Terraform.",
        sections: [
            {
                heading: "Security Group Automation",
                content: "Create modular and reusable security groups for different application tiers.",
                code: `# security.tf

# Web Server Security Group
resource "aws_security_group" "web" {
  name        = "\${var.environment}-web-sg"
  description = "Security group for web servers"
  vpc_id      = aws_vpc.main.id

  dynamic "ingress" {
    for_each = [80, 443]
    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "\${var.environment}-web-sg"
  }
}

# Database Security Group (only from web servers)
resource "aws_security_group" "db" {
  name        = "\${var.environment}-db-sg"
  description = "Security group for database"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.web.id]
    description     = "PostgreSQL from web servers only"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "\${var.environment}-db-sg"
  }
}`,
                codeTitle: "security.tf"
            },
            {
                heading: "IAM Role Automation",
                content: "Create IAM roles and policies for EC2 instances and Lambda functions.",
                code: `# iam.tf

# IAM Role for EC2 instances
resource "aws_iam_role" "ec2_role" {
  name = "\${var.environment}-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

# Custom policy for S3 access
resource "aws_iam_role_policy" "s3_access" {
  name = "s3-access"
  role = aws_iam_role.ec2_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListBucket"
      ]
      Resource = [
        aws_s3_bucket.app_data.arn,
        "\${aws_s3_bucket.app_data.arn}/*"
      ]
    }]
  })
}

# Instance Profile (attach role to EC2)
resource "aws_iam_instance_profile" "ec2_profile" {
  name = "\${var.environment}-ec2-profile"
  role = aws_iam_role.ec2_role.name
}

# Use in EC2 instance
resource "aws_instance" "app" {
  ami                  = data.aws_ami.ubuntu.id
  instance_type        = var.instance_type
  iam_instance_profile = aws_iam_instance_profile.ec2_profile.name
  # ...
}`,
                codeTitle: "iam.tf",
                note: "Always use IAM roles with instance profiles for EC2 — never store access keys on instances."
            }
        ]
    },
    {
        id: 7,
        slug: "terraform-modules",
        title: "Modules & Workspaces",
        description: "Creating reusable modules, using the Terraform Registry, and managing environments with workspaces.",
        sections: [
            {
                heading: "Terraform Modules",
                content: "Modules are reusable packages of Terraform configuration. They are like functions in programming — define once, use many times.\n\n**Module Structure:**\n```\nmodules/\n└── ec2-web-server/\n    ├── main.tf        # Resources\n    ├── variables.tf   # Input variables\n    ├── outputs.tf     # Output values\n    └── README.md      # Documentation\n```",
                code: `# modules/ec2-web-server/main.tf
resource "aws_instance" "web" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = var.subnet_id
  vpc_security_group_ids = var.security_group_ids

  tags = merge(var.tags, {
    Name = var.instance_name
  })
}

# modules/ec2-web-server/variables.tf
variable "ami_id"             { type = string }
variable "instance_type"      { type = string; default = "t3.micro" }
variable "subnet_id"          { type = string }
variable "security_group_ids" { type = list(string) }
variable "instance_name"      { type = string }
variable "tags"               { type = map(string); default = {} }

# modules/ec2-web-server/outputs.tf
output "instance_id" { value = aws_instance.web.id }
output "public_ip"   { value = aws_instance.web.public_ip }`,
                codeTitle: "module-definition.tf"
            },
            {
                heading: "Using Modules",
                content: "Call modules from your main configuration:",
                code: `# main.tf — Using your custom module
module "web_server_1" {
  source = "./modules/ec2-web-server"

  ami_id             = data.aws_ami.ubuntu.id
  instance_type      = "t3.micro"
  subnet_id          = aws_subnet.public[0].id
  security_group_ids = [aws_security_group.web.id]
  instance_name      = "web-01"
  tags               = local.common_tags
}

module "web_server_2" {
  source = "./modules/ec2-web-server"

  ami_id             = data.aws_ami.ubuntu.id
  instance_type      = "t3.small"
  subnet_id          = aws_subnet.public[1].id
  security_group_ids = [aws_security_group.web.id]
  instance_name      = "web-02"
  tags               = local.common_tags
}

# Using Terraform Registry modules
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "production-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["ap-south-1a", "ap-south-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true
}`,
                codeTitle: "using-modules.tf",
                note: "The Terraform Registry (registry.terraform.io) has thousands of community modules for common infrastructure patterns."
            },
            {
                heading: "Workspaces",
                content: "Workspaces let you manage multiple environments (dev/staging/prod) with the same configuration.",
                code: `# List workspaces
terraform workspace list

# Create workspaces
terraform workspace new development
terraform workspace new staging
terraform workspace new production

# Switch workspace
terraform workspace select production

# Show current workspace
terraform workspace show

# Use workspace name in configuration
resource "aws_instance" "web" {
  instance_type = terraform.workspace == "production" ? "t3.medium" : "t3.micro"

  tags = {
    Environment = terraform.workspace
    Name        = "\${terraform.workspace}-web-server"
  }
}

# Delete a workspace
terraform workspace select default
terraform workspace delete development`,
                codeTitle: "workspaces.sh",
                note: "Each workspace has its own state file. Use workspaces for lightweight environment separation."
            }
        ]
    },
    {
        id: 8,
        slug: "terraform-best-practices",
        title: "Terraform Best Practices",
        description: "Project structure, DRY patterns, lifecycle management, and CI/CD integration.",
        sections: [
            {
                heading: "Project Structure",
                content: "Organize Terraform projects for maintainability:\n\n```\ninfrastructure/\n├── environments/\n│   ├── dev/\n│   │   ├── main.tf\n│   │   ├── variables.tf\n│   │   ├── terraform.tfvars\n│   │   └── backend.tf\n│   ├── staging/\n│   └── production/\n├── modules/\n│   ├── vpc/\n│   ├── ec2/\n│   ├── rds/\n│   └── alb/\n└── global/\n    ├── iam/\n    └── s3/\n```",
                note: "Separate environment configs allow independent state management and deployment."
            },
            {
                heading: "Essential Best Practices",
                content: "Follow these rules for production Terraform:\n\n**1. Version Lock Everything:**\n```hcl\nterraform { required_version = \"~> 1.5\" }\nprovider \"aws\" { version = \"~> 5.0\" }\n```\n\n**2. Use Remote State** from Day 1.\n\n**3. format and validate before commits:**\n```bash\nterraform fmt -recursive\nterraform validate\n```\n\n**4. Use -var-file for environment-specific values.**\n\n**5. Tag everything** for cost tracking and governance.\n\n**6. Use lifecycle blocks** to prevent accidental deletion:\n```hcl\nresource \"aws_rds_instance\" \"db\" {\n  lifecycle {\n    prevent_destroy = true\n  }\n}\n```\n\n**7. Run plan in CI, apply manually** (or with approval gates).\n\n**8. Use tflint and tfsec** for linting and security scanning.",
                code: `# .github/workflows/terraform.yml — CI/CD for Terraform
name: Terraform CI

on:
  pull_request:
    paths: ['infrastructure/**']

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "1.5.7"

      - name: Terraform Init
        run: terraform init
        working-directory: infrastructure/environments/production

      - name: Terraform Format Check
        run: terraform fmt -check -recursive

      - name: Terraform Validate
        run: terraform validate

      - name: Terraform Plan
        run: terraform plan -no-color
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}`,
                codeTitle: "terraform-ci.yml"
            }
        ]
    }
];
