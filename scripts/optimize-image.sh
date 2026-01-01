#!/bin/bash

# Image Optimization Script
# Converts images to WebP format and optimizes them

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🖼️  Image Optimization Script${NC}\n"

# Check if ImageMagick or cwebp is installed
if ! command -v convert &> /dev/null && ! command -v cwebp &> /dev/null; then
    echo -e "${YELLOW}⚠️  ImageMagick or cwebp not found${NC}"
    echo "Install one of these to optimize images:"
    echo "  - ImageMagick: brew install imagemagick"
    echo "  - WebP tools: brew install webp"
    echo ""
    echo "Or use online tools:"
    echo "  - https://squoosh.app/"
    echo "  - https://convertio.co/jpg-webp/"
    exit 1
fi

# Function to convert to WebP
convert_to_webp() {
    local input=$1
    local output=$2
    local quality=${3:-90}
    
    if command -v cwebp &> /dev/null; then
        cwebp -q $quality "$input" -o "$output"
    elif command -v convert &> /dev/null; then
        convert "$input" -quality $quality "$output"
    fi
    
    if [ -f "$output" ]; then
        local original_size=$(stat -f%z "$input" 2>/dev/null || stat -c%s "$input" 2>/dev/null)
        local new_size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
        local savings=$(echo "scale=1; (1 - $new_size / $original_size) * 100" | bc)
        
        echo -e "${GREEN}✅ Converted:${NC} $input → $output"
        echo "   Original: $(numfmt --to=iec-i --suffix=B $original_size 2>/dev/null || echo "${original_size} bytes")"
        echo "   Optimized: $(numfmt --to=iec-i --suffix=B $new_size 2>/dev/null || echo "${new_size} bytes")"
        echo "   Savings: ${savings}%"
    fi
}

# Main execution
if [ $# -eq 0 ]; then
    echo "Usage: ./scripts/optimize-image.sh <input-image> [output-path] [quality]"
    echo ""
    echo "Examples:"
    echo "  ./scripts/optimize-image.sh ~/Downloads/portrait.jpg public/images/about/profile.webp"
    echo "  ./scripts/optimize-image.sh image.png public/images/about/profile.webp 85"
    exit 1
fi

INPUT=$1
OUTPUT=${2:-"${INPUT%.*}.webp"}
QUALITY=${3:-90}

if [ ! -f "$INPUT" ]; then
    echo -e "${RED}❌ Error: Input file not found: $INPUT${NC}"
    exit 1
fi

# Create output directory if it doesn't exist
OUTPUT_DIR=$(dirname "$OUTPUT")
mkdir -p "$OUTPUT_DIR"

echo "Converting: $INPUT"
echo "Output: $OUTPUT"
echo "Quality: $QUALITY"
echo ""

convert_to_webp "$INPUT" "$OUTPUT" "$QUALITY"

echo -e "\n${GREEN}✨ Done!${NC}"

