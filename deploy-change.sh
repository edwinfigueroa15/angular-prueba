#!/usr/bin/env bash
set -euo pipefail

STACK_NAME="angular-prueba"

echo ">>> Obteniendo valores del stack..."
BUCKET=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text)

DISTRIBUTION_ID=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" --output text)

echo ">>> Bucket: $BUCKET"
echo ">>> Distribution: $DISTRIBUTION_ID"

# 1. Build Angular
echo ">>> Construyendo Angular..."
ng build --configuration production
DIST_DIR="dist/Prueba-Amaris/browser"

# 2. Subir assets con caché largo (todos menos index.html)
echo ">>> Subiendo assets (sin index.html)..."
aws s3 sync "$DIST_DIR/" "s3://$BUCKET/" \
  --delete --exact-timestamps \
  --cache-control "max-age=31536000,public" \
  --exclude "index.html"

# 3. Subir index.html sin caché
echo ">>> Subiendo index.html..."
aws s3 cp "$DIST_DIR/index.html" "s3://$BUCKET/index.html" \
  --cache-control "no-cache" \
  --content-type "text/html" \
  --metadata-directive REPLACE

# 4. Invalidar caché en CloudFront
echo ">>> Invalidando caché de CloudFront..."
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*"

echo ">>> Despliegue de cambios completado 🎉"
