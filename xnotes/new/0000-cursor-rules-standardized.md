---
title: "Standard Format for Cursor Rules"
version: "3.0.0"
description: "ALWAYS USE when CREATING or MODIFYING a RULE to ENSURE consistency and efficiency"
globs: ".cursor/rules/*.mdc"
alwaysApply: true
priority: 100
compatibility: ">=0.45"
lastUpdated: "2025-03-22"
tags: ["meta", "standard", "rules"]
---

# 📏 Standard Format for Cursor Rules

## Template Structure for Rules Files

```mdc
---
title: "Descriptive Rule Title"
version: "X.Y.Z"
description: "ACTION when TRIGGER to OUTCOME"
globs: "glob/pattern/*.ext"
alwaysApply: false
priority: 50
compatibility: ">=0.45"
lastUpdated: "YYYY-MM-DD"
tags: ["tag1", "tag2", "tag3"]
---

# Rule Title

## Context
- When to apply this rule
- Prerequisites or conditions

## Requirements
- Concise, actionable items
- Each requirement must be testable

## Examples
<example>
Good concise example with explanation
</example>

<example type="invalid">
Invalid concise example with explanation
</example>

## Critical Points
<critical>
- ALWAYS do X
- NEVER do Y
- ENSURE Z
</critical>

<version>X.Y.Z</version>
```

## File Organization

### Location

- Path: `.cursor/rules/`
- Extension: `.mdc`

### Naming Convention

Follow the naming convention detailed in `1000-meta-rules-naming-convention.mdc`:

```
XXXX-type-domain[-specificity][@version][-name].mdc
```

Where:

- `XXXX`: Four-digit numeric prefix for categorization (mandatory)
- `type`: Rule type identifier (mandatory) - see comprehensive list in `1001-meta-rules-naming-reference.mdc`
- `domain`: Primary domain of application (mandatory)
- `specificity`: Additional precision on domain (optional)
- `@version`: Version specification when necessary (optional)
- `name`: Descriptive name using kebab-case (mandatory)
- `.mdc`: File extension for markdown cursor rules (mandatory)

### Glob Pattern Examples

Common glob patterns for different rule types:

- Core standards: .cursor/rules/\*.mdc
- Language rules: src/\*_/_.{js,ts}
- Testing standards: \*_/_.test.{js,ts}
- React components: src/components/\*_/_.tsx
- Documentation: docs/\*_/_.md
- Configuration files: \*.config.{js,json}
- Build artifacts: dist/\*_/_
- Multiple extensions: src/\*_/_.{js,jsx,ts,tsx}
- Multiple files: dist/**/\*, docs/**/\*.md

## Required Fields

### Frontmatter

- `title`: Descriptive rule title
- `version`: X.Y.Z version number (SemVer format)
- `description`: ACTION when TRIGGER to OUTCOME format
- `globs`: Glob pattern for files and folders
- `alwaysApply`: Boolean for unconditional injection
- `priority`: Numeric value (1-100) defining importance
- `compatibility`: Minimum compatible Cursor version
- `lastUpdated`: Last update date (YYYY-MM-DD)
- `tags`: List of tags for categorization

### Body

- Context: Usage conditions
- Requirements: Actionable items
- Examples: Both valid and invalid
- Critical Points: Key rules to follow

## Description Structure

For effective conditional activation, use:

- Format: "ACTION when TRIGGER to OUTCOME"
- ACTION: Imperative verb (ALWAYS, VERIFY, APPLY...)
- TRIGGER: Precise context (CREATION, WRITING...)
- OUTCOME: Expected benefit (ENSURE, GUARANTEE...)

Examples:

- "ALWAYS USE when CREATING JavaScript files to ENSURE consistency"
- "VERIFY before COMMIT to PREVENT quality issues"

## Formatting Guidelines

- Use concise Markdown primarily
- XML tags limited to: `<example>`, `<danger>`, `<required>`, `<critical>`, `<version>`, `<requires>`
- Indent content within XML tags by 2 spaces
- Emojis and Mermaid diagrams allowed when they improve clarity
- Avoid quotes around glob patterns

## Related Rules

For a complete understanding of the rules system:

- `1000-meta-rules-naming-convention.mdc`: Complete naming convention structure and categories
- `1001-meta-rules-naming-reference.mdc`: Detailed reference for rule types and practical examples
- `1010-meta-rules-format-standard.mdc`: Comprehensive format standard (latest version)

## Critical Points

<critical>
  - Keep frontmatter description under 120 characters (or less) while maintaining clear intent for rule selection by AI Agent
  - Keep the rule DRY - do not repeat or be redundant or overly explanatory
  - Use succinct markdown the agent can easily understand
  - The front matter MUST ALWAYS have description, globs, and alwaysApply, even if the value is null
  - Use standard glob patterns without quotes (e.g., *.js, src/**/*.ts)
  - TRY to keep the total rule line count under 50, better under 25, lines (unless there are diagrams or longer required examples, as that will increase the overall line count)
  - Always include a valid and invalid example
  - Quotes are not needed around glob patterns
</critical>

<version>3.0.0</version>
