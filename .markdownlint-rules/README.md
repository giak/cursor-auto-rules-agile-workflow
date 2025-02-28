# Custom Markdownlint Rules for Agile Documentation

This directory contains custom rules for validating agile documentation with markdownlint.

## Required Sections Rule

The `required-sections.js` rule checks that agile documents contain all the mandatory sections
for their document type. This helps ensure that the documentation follows the standardized
agile workflow structure.

## Usage

Run markdownlint with these custom rules:

```bash
markdownlint ./path/to/docs --rules=./.markdownlint-rules/required-sections.js
```

## Configuration

The required sections for each document type are defined in the `.markdownlint.json` file
under the `required_headings` property.
