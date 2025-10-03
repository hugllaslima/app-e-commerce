variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "vpc_id" {
  description = "Existing VPC ID"
  type        = string
  default     = "vpc-0a0887b66e5c7c764"
}

variable "subnet_id" {
  description = "Existing subnet ID"
  type        = string
  default     = "subnet-0219d85f27667657e"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "ecommerce"
}
