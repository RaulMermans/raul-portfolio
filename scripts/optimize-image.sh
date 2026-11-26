#!/bin/bash

# Keep the original positional interface while using the project's Sharp dependency.
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ "$#" -eq 0 ]; then
  node "$SCRIPT_DIR/convert-image.mjs" --help
  exit 1
fi

INPUT="$1"
shift

ARGS=()
if [ "$#" -gt 0 ]; then
  ARGS+=(--output "$1")
  shift
fi
if [ "$#" -gt 0 ]; then
  ARGS+=(--quality "$1")
  shift
fi

node "$SCRIPT_DIR/convert-image.mjs" "$INPUT" "${ARGS[@]}" "$@"
