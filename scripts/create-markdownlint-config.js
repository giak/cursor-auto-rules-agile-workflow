#!/usr/bin/env node

/**
 * Creates a configuration file for markdownlint tailored for agile documentation
 * 
 * This script generates a .markdownlint.json file with rules specifically
 * configured for the structure and requirements of agile documentation.
 */

const fs = require('fs');
const path = require('path');

// Define the markdownlint configuration
const markdownlintConfig = {
  // Default state for all rules
  "default": true,
  
  // MD013/line-length - Line length
  "MD013": {
    "line_length": 120,
    "heading_line_length": 80,
    "code_blocks": false,
    "tables": false
  },
  
  // MD024/no-duplicate-heading - Multiple headings with the same content
  "MD024": {
    "allow_different_nesting": true
  },
  
  // MD033/no-inline-html - Inline HTML
  "MD033": {
    "allowed_elements": ["version", "critical", "example"]
  },
  
  // MD041/first-line-heading - First line in a file should be a top-level heading
  "MD041": true,
  
  // MD007/ul-indent - Unordered list indentation
  "MD007": {
    "indent": 2
  },
  
  // MD029/ol-prefix - Ordered list item prefix
  "MD029": {
    "style": "ordered"
  },
  
  // Required headings for agile documentation files
  // (Not standard markdownlint rules, but useful to document here)
  "required_headings": {
    "story": ["Contexte", "Critères d'Acceptation", "Tâches"],
    "prd": ["Vue d'Ensemble", "Objectifs", "Fonctionnalités", "Exigences Techniques", "Risques et Hypothèses"],
    "arch": ["Vue d'Ensemble", "Architecture", "Composants", "Flux de Données", "Risques Techniques"],
    "workflow": ["Vue d'Ensemble", "Processus Étape par Étape", "Points Critiques", "Bonnes Pratiques"]
  }
};

// Path for the configuration file (root of the project)
const configFilePath = path.join(process.cwd(), '..', '.markdownlint.json');

// Write the configuration file
fs.writeFileSync(
  configFilePath,
  JSON.stringify(markdownlintConfig, null, 2),
  'utf8'
);

console.log(`Markdownlint configuration created at ${configFilePath}`);

// Create a sample custom rule file for markdownlint-cli
const customRulesDir = path.join(process.cwd(), '..', '.markdownlint-rules');

// Ensure the directory exists
if (!fs.existsSync(customRulesDir)) {
  fs.mkdirSync(customRulesDir, { recursive: true });
}

// Create a custom rule for required sections in agile docs
const requiredSectionsRulePath = path.join(customRulesDir, 'required-sections.js');
const requiredSectionsRule = `
// Custom markdownlint rule to check for required sections in agile docs
'use strict';

module.exports = {
  names: ['agile-required-sections'],
  description: 'Agile documentation must contain required sections',
  tags: ['agile'],
  function: function rule(params, onError) {
    // Helper to convert heading to plain text
    const headingPlainText = (heading) => {
      return heading.replace(/[#\\*_\\[\\]()]/g, '').trim();
    };
    
    // Extract all headings from the document
    const headings = [];
    params.tokens.forEach(token => {
      if (token.type === 'heading_open') {
        const contentToken = params.tokens[params.tokens.indexOf(token) + 1];
        if (contentToken && contentToken.type === 'inline') {
          headings.push({
            level: token.markup.length,
            text: headingPlainText(contentToken.content)
          });
        }
      }
    });
    
    // Determine document type based on filename or content
    const filename = params.name.toLowerCase();
    let docType = null;
    
    if (filename.includes('story') || filename.includes('task')) {
      docType = 'story';
    } else if (filename.includes('prd') || filename.includes('product-requirements')) {
      docType = 'prd';
    } else if (filename.includes('arch') || filename.includes('architecture')) {
      docType = 'arch';
    } else if (filename.includes('workflow')) {
      docType = 'workflow';
    }
    
    // Return if document type couldn't be determined
    if (!docType) {
      return;
    }
    
    // Get required headings for the document type
    const requiredConfig = JSON.parse(require('fs').readFileSync(
      require('path').join(process.cwd(), '.markdownlint.json'), 'utf8'
    ));
    
    const requiredHeadings = requiredConfig.required_headings[docType] || [];
    
    // Check if all required headings are present
    const foundHeadings = headings.map(h => h.text.toLowerCase());
    
    requiredHeadings.forEach(required => {
      const found = foundHeadings.some(heading => 
        heading.includes(required.toLowerCase())
      );
      
      if (!found) {
        onError({
          lineNumber: 1,
          detail: \`Required section "\${required}" not found in \${docType} document\`
        });
      }
    });
  }
};
`;

fs.writeFileSync(requiredSectionsRulePath, requiredSectionsRule, 'utf8');
console.log(`Custom rule for required sections created at ${requiredSectionsRulePath}`);

// Create README with usage instructions
const readmePath = path.join(customRulesDir, 'README.md');
const readmeContent = `# Custom Markdownlint Rules for Agile Documentation

This directory contains custom rules for validating agile documentation with markdownlint.

## Required Sections Rule

The \`required-sections.js\` rule checks that agile documents contain all the mandatory sections
for their document type. This helps ensure that the documentation follows the standardized
agile workflow structure.

## Usage

Run markdownlint with these custom rules:

\`\`\`bash
markdownlint ./path/to/docs --rules=./.markdownlint-rules/required-sections.js
\`\`\`

## Configuration

The required sections for each document type are defined in the \`.markdownlint.json\` file
under the \`required_headings\` property.
`;

fs.writeFileSync(readmePath, readmeContent, 'utf8');
console.log(`README for custom rules created at ${readmePath}`);

console.log('Markdownlint configuration completed successfully!'); 