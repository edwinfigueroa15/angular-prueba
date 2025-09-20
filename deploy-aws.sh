#!/usr/bin/env bash
set -euo pipefail

# Nombre del stack y bucket único
STACK_NAME="angular-prueba"
BUCKET_NAME="angular-app-edwin-$(date +%Y%m%d-%H%M%S)"
TEMPLATE_FILE=angular-cloudfront-s3.yml

echo ">>> Creando stack en CloudFormation..."
aws cloudformation create-stack \
  --stack-name $STACK_NAME \
  --template-body file://$TEMPLATE_FILE \
  --parameters ParameterKey=BucketName,ParameterValue=$BUCKET_NAME

echo ">>> Esperando a que se cree el stack..."
aws cloudformation wait stack-create-complete --stack-name $STACK_NAME

echo ">>> Stack creado con éxito ✅"

echo ">>> Outputs del stack:"
aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query "Stacks[0].Outputs" \
  --output table
