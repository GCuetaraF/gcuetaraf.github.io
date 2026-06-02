#!/bin/bash

# Script to convert blog posts from index.md to en.md format
# This prepares them for internationalization

BLOG_DIR="src/blog"

echo "Converting blog posts to internationalized format..."
echo ""

# Find all index.md files in blog subdirectories
for post_dir in "$BLOG_DIR"/*/; do
  if [ -f "${post_dir}index.md" ]; then
    post_name=$(basename "$post_dir")
    
    echo "Processing: $post_name"
    
    # Rename index.md to en.md
    mv "${post_dir}index.md" "${post_dir}en.md"
    echo "  ✓ Renamed index.md to en.md"
    
    # Create a placeholder es.md file
    cat > "${post_dir}es.md" << 'EOF'
---
title: [Add Spanish Title Here]
date: [Copy date from en.md]
tags: []
description: [Add Spanish description here]
---

[Add Spanish content here]
EOF
    echo "  ✓ Created es.md placeholder"
    echo ""
  fi
done

echo "Conversion complete!"
echo ""
echo "Next steps:"
echo "1. Edit each es.md file to add Spanish content"
echo "2. Make sure to copy the date and tags from en.md to es.md"
echo "3. Translate the title, description, and content"
