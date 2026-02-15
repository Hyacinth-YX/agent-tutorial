# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chinese-language AI Agent tutorial documentation project built with **mdBook** (a Rust-based static site generator for Markdown documentation). The site is automatically deployed to GitHub Pages via GitHub Actions.

## Development Commands

```bash
# Prerequisites: Install mdBook
cargo install mdbook

# Local preview with hot reload (http://localhost:3000)
mdbook serve

# Build static site (output to book/)
mdbook build
```

## Architecture

```
agent-tutorial/
├── src/                    # Markdown source files
│   ├── SUMMARY.md          # Table of contents (navigation structure)
│   ├── intro.md            # Introduction page
│   └── <topic>/            # Each topic has its own folder
│       ├── index.md        # Topic main document
│       └── assets/fig/     # Screenshots and diagrams
├── theme/                  # Custom mdBook theme
│   ├── custom.css          # Custom styles
│   └── head.hbs            # Custom HTML head
├── book.toml               # mdBook configuration
└── .github/workflows/
    └── deploy.yml          # Auto-deploy to GitHub Pages
```

## Writing Guidelines

### File Organization
- Topic folders use `kebab-case` naming (e.g., `windows-wsl/`, `claudecode/`)
- Main document typically named `index.md` or matches folder name
- Images stored in topic's `assets/fig/` directory
- Configuration templates use `.jsonc` format (JSON with comments) in `assets/`

### Markdown Style
- Use ATX headers (`#`, `##`, `###`)
- Always specify language for code blocks
- Use relative paths for internal links and images
- Include descriptive alt text for images

Example image reference:
```markdown
![Description](./assets/fig/screenshot.png)
```

### Document Structure
1. Title & brief introduction
2. Prerequisites (tools, versions)
3. Main content (logical sections)
4. FAQ (optional)
5. Related resources (optional)

### Writing Style
- Language: Chinese for content, English for code/commands
- Use second person ("你", "你的")
- Provide executable commands and real configuration examples
- Based on actual usage experience

## Deployment

Push to `main` or `master` branch triggers automatic deployment via GitHub Actions:
- mdBook version: 0.5.2
- Output directory: `book/`
- Deployed to: `https://<username>.github.io/<repo-name>/`

## Key Files

- `book.toml` - mdBook configuration (title, theme, features)
- `src/SUMMARY.md` - Defines navigation structure and chapter order
- `AGENTS.md` - Detailed writing guidelines and quality checklist
