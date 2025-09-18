#!/bin/bash

# Update all Supabase queries to use the epub_ai schema

echo "Updating all database queries to use epub_ai schema..."

# List of files that contain database queries
FILES=(
  "app/api/checkout/route.ts"
  "app/api/webhooks/stripe/route.ts"
  "app/api/generate/route.ts"
  "app/api/generate/progress/route.ts"
  "app/api/scrape/route.ts"
  "app/api/orders/by-session/route.ts"
  "app/api/v1/generate/route.ts"
  "lib/generation/ebook-generator.ts"
)

# Update each file
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Updating $file..."

    # Replace table names with schema-prefixed versions
    sed -i '' "s/from('orders')/from('epub_ai.orders')/g" "$file"
    sed -i '' "s/from('users')/from('epub_ai.users')/g" "$file"
    sed -i '' "s/from('ebooks')/from('epub_ai.ebooks')/g" "$file"
    sed -i '' "s/from('generation_progress')/from('epub_ai.generation_progress')/g" "$file"
    sed -i '' "s/from('company_analysis')/from('epub_ai.company_analysis')/g" "$file"
    sed -i '' "s/from('api_keys')/from('epub_ai.api_keys')/g" "$file"

    # Also update with double quotes
    sed -i '' 's/from("orders")/from("epub_ai.orders")/g' "$file"
    sed -i '' 's/from("users")/from("epub_ai.users")/g' "$file"
    sed -i '' 's/from("ebooks")/from("epub_ai.ebooks")/g' "$file"
    sed -i '' 's/from("generation_progress")/from("epub_ai.generation_progress")/g' "$file"
    sed -i '' 's/from("company_analysis")/from("epub_ai.company_analysis")/g' "$file"
    sed -i '' 's/from("api_keys")/from("epub_ai.api_keys")/g' "$file"
  fi
done

echo "All files updated!"