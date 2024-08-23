# ec2 instance configuration
resource "aws_instance" "tf_server" {
  ami                         = "ami-0e86e20dae9224db8"
  instance_type               = "t2.micro"
  vpc_security_group_ids      = [aws_security_group.tf_security_group.id] # associate security group
  associate_public_ip_address = true
  key_name                    = "kverma-aws-01" # private aws key
  user_data                   = file("userdata.tpl")

  tags = {
    Name = "nodejs-server"
  }
}

# reference public key pair
# resource "aws_key_pair" "tf_key_pair" {
#   key_name   = "kverma-aws-01"
#   public_key = file("~/.ssh/kverma-aws-01.pub") # convert/copy .pem to .pub

# }

# create new security group
resource "aws_security_group" "tf_security_group" {
  name        = "nodejs-server-sg"
  description = "Allow TLS inbound traffic"
  vpc_id      = "vpc-00ec4841e453b1748" # default VPC  

  ingress {
    description = "TLS from VPC"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # allow from all IPs
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "TCP"
    from_port   = 3000 # for nodejs app
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "TCP"
    from_port   = 3306 # for mySQL 
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "nodejs-server-sg"
  }
}