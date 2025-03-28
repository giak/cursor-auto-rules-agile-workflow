---
title: "Standard Format for Cursor Rules"
description: "ALWAYS USE when CREATING or MODIFYING a RULE to ENSURE consistency and efficiency"
globs: ".cursor/rules/*.mdc"
alwaysApply: true
tags: ["meta", "standard", "rules"]
---

# 📏 Standard Format for Cursor Rules

## Template Structure for Rules Files

```mdc
---
title: "Descriptive Rule Title"
description: "ACTION when TRIGGER to OUTCOME"
globs: "glob/pattern/*.ext"
alwaysApply: false
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
```

## File Organization

### Location

- Path: `.cursor/rules/`
- Extension: `.mdc`

### Naming Convention

Follow the naming convention detailed in @meta-rules-naming-convention.md:

```
type-domain[-specificity][@version][-name].mdc
```

Where:

- `type`: Rule type identifier (mandatory) - see comprehensive list in @meta-rules-naming-reference.md
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
- `description`: ACTION when TRIGGER to OUTCOME format
- `globs`: Glob pattern for files and folders
- `alwaysApply`: Boolean for unconditional injection
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
- XML tags limited to: `<example>`, `<danger>`, `<required>`, `<critical>`, `<requires>`
- Indent content within XML tags by 2 spaces
- Emojis and Mermaid diagrams allowed when they improve clarity
- Avoid quotes around glob patterns

## Related Rules

For a complete understanding of the rules system and naming convention:

- @meta-rules-naming-convention.md: Complete naming convention structure and categories
- @meta-rules-naming-reference.md: Detailed reference for rule types and practical examples

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
