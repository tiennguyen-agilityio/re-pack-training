#!/bin/sh
# Setup husky hooks from RepackApp directory to root .git

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
GIT_HOOKS_DIR="$ROOT_DIR/.git/hooks"
HUSKY_DIR="$ROOT_DIR/.husky"

if [ ! -d "$ROOT_DIR/.git" ]; then
  echo "Error: .git directory not found at $ROOT_DIR"
  exit 1
fi

if [ ! -d "$HUSKY_DIR" ]; then
  echo "Error: .husky directory not found at $HUSKY_DIR"
  exit 1
fi

# Create git hooks that point to husky hooks
for hook in pre-commit pre-push; do
  if [ -f "$HUSKY_DIR/$hook" ]; then
    cat > "$GIT_HOOKS_DIR/$hook" << EOF
#!/bin/sh
. "$HUSKY_DIR/$hook"
EOF
    chmod +x "$GIT_HOOKS_DIR/$hook"
    echo "Created $hook hook"
  fi
done

echo "Husky hooks setup complete!"
