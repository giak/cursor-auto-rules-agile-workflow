#!/usr/bin/env node

/**
 * Document Validation System for Agile Workflow
 * 
 * This script orchestrates multiple validation processes:
 * 1. Markdown linting - Structure, formatting, and required sections
 * 2. Mermaid diagram validation - Syntax checking for all Mermaid diagrams
 * 3. Acceptance criteria validation - Format verification (Given/When/Then)
 * 4. Risk and assumption tables - Format and required fields checking
 * 
 * Usage: node validate-docs.js [options] <file-patterns>
 * Options:
 *   --fix            Attempt to fix common issues automatically
 *   --report         Generate a validation report (JSON)
 *   --verbose        Show detailed validation output
 *   --ci             Run in CI mode (exits with error code on validation failures)
 * 
 * Example: node validate-docs.js --verbose .ai/*.md
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk'); // For colored console output

// Configuration
const config = {
  verbose: process.argv.includes('--verbose'),
  fix: process.argv.includes('--fix'),
  report: process.argv.includes('--report'),
  ci: process.argv.includes('--ci'),
  files: process.argv.slice(2).filter(arg => !arg.startsWith('--')),
  packageManager: 'pnpm', // Spécification du gestionnaire de paquets
};

// Initialize validation statistics
const stats = {
  total: 0,
  passed: 0,
  failed: 0,
  fileResults: {},
  startTime: Date.now(),
  errorCategories: {
    markdownLint: 0,
    mermaidDiagrams: 0,
    acceptanceCriteria: 0,
    risksAndAssumptions: 0
  },
  totalErrors: 0
};

/**
 * Main validation orchestrator
 */
async function validateDocuments() {
  console.log(chalk.blue.bold('🔍 Starting Document Validation'));

  // If no files specified, use default patterns
  if (config.files.length === 0) {
    config.files = ['.ai/*.md', 'templates/*.md'];
  }

  const filePaths = expandFilePaths(config.files);
  stats.total = filePaths.length;

  console.log(chalk.blue(`Found ${filePaths.length} documents to validate`));

  // Process each file
  for (const filePath of filePaths) {
    await validateSingleDocument(filePath);
  }

  // Generate report if requested
  if (config.report) {
    generateReport();
  }

  // Display summary
  displaySummary();

  // Exit with appropriate code in CI mode
  if (config.ci && stats.failed > 0) {
    process.exit(1);
  }
}

/**
 * Expands glob patterns to file paths
 */
function expandFilePaths(patterns) {
  try {
    // Use glob to expand file patterns
    return patterns.flatMap(pattern => {
      // Simple implementation - in production use a proper glob library
      if (pattern.includes('*')) {
        const dir = pattern.split('*')[0];
        const ext = pattern.split('*')[1];
        try {
          return fs.readdirSync(dir)
            .filter(file => file.endsWith(ext))
            .map(file => path.join(dir, file));
        } catch (err) {
          return [];
        }
      }
      return fs.existsSync(pattern) ? [pattern] : [];
    });
  } catch (error) {
    console.error(chalk.red(`Error expanding file paths: ${error.message}`));
    return [];
  }
}

/**
 * Validates a single document
 */
async function validateSingleDocument(filePath) {
  console.log(chalk.cyan(`\nValidating ${filePath}`));
  
  stats.fileResults[filePath] = {
    markdownLint: { success: false, messages: [] },
    mermaidDiagrams: { success: false, messages: [] },
    acceptanceCriteria: { success: false, messages: [] },
    risksAndAssumptions: { success: false, messages: [] }
  };

  try {
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');
    let isSuccess = true;
    const issues = {
      markdown: 0,
      mermaid: 0,
      criteria: 0,
      risks: 0
    };

    // 1. Validate Markdown format
    const markdownResult = validateMarkdown(filePath);
    stats.fileResults[filePath].markdownLint = markdownResult;
    isSuccess = isSuccess && markdownResult.success;
    if (!markdownResult.success) {
      issues.markdown = markdownResult.messages.length;
      stats.errorCategories.markdownLint++;
      stats.totalErrors += issues.markdown;
    }

    // 2. Validate Mermaid diagrams
    const mermaidResult = validateMermaidDiagrams(content, filePath);
    stats.fileResults[filePath].mermaidDiagrams = mermaidResult;
    isSuccess = isSuccess && mermaidResult.success;
    if (!mermaidResult.success) {
      issues.mermaid = mermaidResult.messages.filter(msg => msg.includes('error') || msg.includes('syntax errors')).length;
      stats.errorCategories.mermaidDiagrams++;
      stats.totalErrors += issues.mermaid;
    }

    // 3. Validate acceptance criteria if this is a story file
    if (filePath.includes('story') || isStoryDocument(content)) {
      const criteriaResult = validateAcceptanceCriteria(content);
      stats.fileResults[filePath].acceptanceCriteria = criteriaResult;
      isSuccess = isSuccess && criteriaResult.success;
      if (!criteriaResult.success) {
        issues.criteria = criteriaResult.messages.filter(msg => !msg.includes('validated successfully')).length;
        stats.errorCategories.acceptanceCriteria++;
        stats.totalErrors += issues.criteria;
      }
    }

    // 4. Validate risks and assumptions tables
    const risksResult = validateRisksAndAssumptions(content);
    stats.fileResults[filePath].risksAndAssumptions = risksResult;
    isSuccess = isSuccess && risksResult.success;
    if (!risksResult.success) {
      issues.risks = risksResult.messages.filter(msg => !msg.includes('valid')).length;
      stats.errorCategories.risksAndAssumptions++;
      stats.totalErrors += issues.risks;
    }

    // Update stats
    if (isSuccess) {
      stats.passed++;
      console.log(chalk.green('✅ Document passed all validations'));
    } else {
      stats.failed++;
      
      // Afficher un résumé des problèmes même en mode non-verbose
      console.log(chalk.red('❌ Document has validation issues:'));
      
      // Afficher le nombre de problèmes par catégorie
      if (issues.markdown > 0) {
        console.log(chalk.yellow(`  • Markdown: ${issues.markdown} issues`));
        // Afficher le premier problème comme exemple
        if (!config.verbose && markdownResult.messages.length > 0) {
          const sample = markdownResult.messages[0];
          console.log(chalk.yellow(`    - Example: ${sample}`));
        }
      }
      
      if (issues.mermaid > 0) {
        console.log(chalk.yellow(`  • Mermaid Diagrams: ${issues.mermaid} issues`));
        // Afficher le premier problème comme exemple
        if (!config.verbose && mermaidResult.messages.some(msg => msg.includes('syntax errors'))) {
          const sample = mermaidResult.messages.find(msg => msg.includes('syntax errors'));
          console.log(chalk.yellow(`    - Example: ${sample}`));
        }
      }
      
      if (issues.criteria > 0) {
        console.log(chalk.yellow(`  • Acceptance Criteria: ${issues.criteria} issues`));
      }
      
      if (issues.risks > 0) {
        console.log(chalk.yellow(`  • Risks & Assumptions: ${issues.risks} issues`));
      }
      
      // Suggestion pour plus de détails
      if (!config.verbose) {
        console.log(chalk.blue(`\nUtilisez l'option --verbose pour voir tous les détails des problèmes:`));
        console.log(chalk.blue(`  ./validate-docs.js --verbose ${filePath}`));
      }
    }
  } catch (error) {
    console.error(chalk.red(`Error validating ${filePath}: ${error.message}`));
    stats.failed++;
  }
}

/**
 * Validates markdown using markdownlint-cli if available
 */
function validateMarkdown(filePath) {
  const result = { success: false, messages: [] };
  
  try {
    // Check if markdownlint is installed
    try {
      execSync('markdownlint --version', { stdio: 'ignore' });
    } catch (error) {
      result.messages.push(`markdownlint-cli not found. Install with: ${config.packageManager} add -g markdownlint-cli`);
      return result;
    }

    // Run markdownlint
    try {
      execSync(`markdownlint "${filePath}"`, { stdio: 'pipe' });
      result.success = true;
      result.messages.push('Markdown structure and formatting is valid');
    } catch (error) {
      const output = error.stdout.toString();
      result.messages = output.split('\n').filter(line => line.trim() !== '');
      if (config.verbose) {
        console.log(chalk.yellow('Markdown validation issues:'));
        result.messages.forEach(msg => console.log(chalk.yellow(`  - ${msg}`)));
      }
    }
  } catch (error) {
    result.messages.push(`Error running markdown validation: ${error.message}`);
  }
  
  return result;
}

/**
 * Extracts and validates all Mermaid diagrams in the document
 */
function validateMermaidDiagrams(content, filePath) {
  const result = { success: true, messages: [] };
  
  // Find all Mermaid code blocks
  const mermaidPattern = /```mermaid\n([\s\S]*?)\n```/g;
  const mermaidBlocks = [];
  let match;
  
  while ((match = mermaidPattern.exec(content)) !== null) {
    mermaidBlocks.push(match[1]);
  }
  
  if (mermaidBlocks.length === 0) {
    result.messages.push('No Mermaid diagrams found');
    return result;
  }
  
  // Validate each Mermaid diagram
  try {
    // Check if mmdc (Mermaid CLI) is installed
    try {
      execSync('mmdc --version', { stdio: 'ignore' });
    } catch (error) {
      result.messages.push(`Mermaid CLI not found. Install with: ${config.packageManager} add -g @mermaid-js/mermaid-cli`);
      result.success = false;
      return result;
    }
    
    let diagramIndex = 0;
    for (const diagram of mermaidBlocks) {
      diagramIndex++;
      const tempFile = path.join(path.dirname(filePath), `._temp_diagram_${diagramIndex}.mmd`);
      
      try {
        // Write diagram to temporary file
        fs.writeFileSync(tempFile, diagram);
        
        // Validate with Mermaid CLI
        execSync(`mmdc -i "${tempFile}" -o /dev/null`, { stdio: 'ignore' });
        result.messages.push(`Diagram #${diagramIndex} is valid`);
      } catch (error) {
        result.success = false;
        const errorMsg = `Diagram #${diagramIndex} has syntax errors: ${error.message.split('\n')[0]}`;
        result.messages.push(errorMsg);
        
        if (config.verbose) {
          console.log(chalk.yellow(errorMsg));
        }
      } finally {
        // Clean up temporary file
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      }
    }
  } catch (error) {
    result.success = false;
    result.messages.push(`Error validating Mermaid diagrams: ${error.message}`);
  }
  
  return result;
}

/**
 * Validates acceptance criteria format in story documents
 */
function validateAcceptanceCriteria(content) {
  const result = { success: true, messages: [] };
  
  // Find the acceptance criteria section
  const criteriaSection = extractSection(content, '## Critères d\'Acceptation', '##');
  
  if (!criteriaSection) {
    result.success = false;
    result.messages.push('No acceptance criteria section found');
    return result;
  }
  
  // Validate the format of each criterion (Given/When/Then)
  const criteriaPattern = /^\d+\.\s+Étant donné\s+.+,\s+quand\s+.+,\s+alors\s+.+$/i;
  
  const criteriaLines = criteriaSection
    .split('\n')
    .filter(line => line.trim().match(/^\d+\./)); // Only lines starting with a number and period
  
  if (criteriaLines.length === 0) {
    result.success = false;
    result.messages.push('No acceptance criteria found in the section');
    return result;
  }
  
  const invalidCriteria = criteriaLines.filter(line => !criteriaPattern.test(line));
  
  if (invalidCriteria.length > 0) {
    result.success = false;
    result.messages.push('Some acceptance criteria do not follow the "Given/When/Then" format:');
    invalidCriteria.forEach(line => {
      result.messages.push(`  - ${line}`);
      if (config.verbose) {
        console.log(chalk.yellow(`Invalid acceptance criterion: ${line}`));
      }
    });
  } else {
    result.messages.push(`${criteriaLines.length} acceptance criteria validated successfully`);
  }
  
  return result;
}

/**
 * Validates risks and assumptions tables
 */
function validateRisksAndAssumptions(content) {
  const result = { success: true, messages: [] };
  
  // Check for risks section
  const risksSection = extractSection(content, '## Risques', '##');
  if (risksSection) {
    // Validate risks table structure
    if (!validateTableStructure(risksSection, ['Risque', 'Impact', 'Probabilité', 'Stratégie d\'atténuation'])) {
      result.success = false;
      result.messages.push('Risks table is missing required columns (Risque, Impact, Probabilité, Stratégie d\'atténuation)');
      if (config.verbose) {
        console.log(chalk.yellow('Invalid risks table structure'));
      }
    } else {
      result.messages.push('Risks table structure is valid');
    }
  }
  
  // Check for assumptions section
  const assumptionsSection = extractSection(content, '## Hypothèses', '##');
  if (assumptionsSection) {
    // Validate assumptions table structure
    if (!validateTableStructure(assumptionsSection, ['Hypothèse', 'Impact si invalidée', 'Méthode de validation'])) {
      result.success = false;
      result.messages.push('Assumptions table is missing required columns (Hypothèse, Impact si invalidée, Méthode de validation)');
      if (config.verbose) {
        console.log(chalk.yellow('Invalid assumptions table structure'));
      }
    } else {
      result.messages.push('Assumptions table structure is valid');
    }
  }
  
  // If neither section is found, this might be a document type that doesn't require them
  if (!risksSection && !assumptionsSection) {
    result.messages.push('No risks or assumptions sections found');
  }
  
  return result;
}

/**
 * Validates markdown table structure
 */
function validateTableStructure(content, requiredColumns) {
  // Look for a markdown table header
  const tableHeaderMatch = content.match(/\|([^|]+\|)+\s*\n\s*\|(\s*:?-+:?\s*\|)+/);
  if (!tableHeaderMatch) {
    return false;
  }
  
  // Extract header row
  const headerRow = tableHeaderMatch[0].split('\n')[0];
  const columns = headerRow.split('|')
    .map(col => col.trim())
    .filter(col => col !== '');
  
  // Check if all required columns are present
  return requiredColumns.every(reqCol => 
    columns.some(col => col.toLowerCase().includes(reqCol.toLowerCase()))
  );
}

/**
 * Extracts a section from markdown content
 */
function extractSection(content, sectionStart, sectionEnd) {
  const startIndex = content.indexOf(sectionStart);
  if (startIndex === -1) return null;
  
  let endIndex = content.indexOf(sectionEnd, startIndex + sectionStart.length);
  if (endIndex === -1) endIndex = content.length;
  
  return content.substring(startIndex, endIndex);
}

/**
 * Determines if a document is a story based on content
 */
function isStoryDocument(content) {
  return content.includes('## Critères d\'Acceptation') || 
         content.includes('## Tâches') ||
         content.includes('## Tasks');
}

/**
 * Generates JSON validation report
 */
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: stats.total,
      passed: stats.passed,
      failed: stats.failed,
      duration: Date.now() - stats.startTime,
      errorCategories: stats.errorCategories,
      totalErrors: stats.totalErrors
    },
    results: stats.fileResults
  };
  
  const reportPath = 'docs-validation-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(chalk.blue(`\nValidation report written to ${reportPath}`));
}

/**
 * Displays validation summary
 */
function displaySummary() {
  const duration = ((Date.now() - stats.startTime) / 1000).toFixed(2);
  console.log(chalk.blue.bold('\n📊 Validation Summary'));
  console.log(chalk.blue(`Duration: ${duration} seconds`));
  console.log(chalk.blue(`Total documents: ${stats.total}`));
  
  if (stats.passed > 0) {
    console.log(chalk.green(`Passed: ${stats.passed}`));
  }
  
  if (stats.failed > 0) {
    console.log(chalk.red(`Failed: ${stats.failed}`));
    
    // Afficher un résumé des types d'erreurs
    console.log(chalk.yellow('\nProblèmes par catégorie:'));
    if (stats.errorCategories.markdownLint > 0) {
      console.log(chalk.yellow(`  • Markdown: ${stats.errorCategories.markdownLint} documents avec problèmes de formatage`));
    }
    if (stats.errorCategories.mermaidDiagrams > 0) {
      console.log(chalk.yellow(`  • Mermaid: ${stats.errorCategories.mermaidDiagrams} documents avec erreurs de diagrammes`));
    }
    if (stats.errorCategories.acceptanceCriteria > 0) {
      console.log(chalk.yellow(`  • Critères d'Acceptation: ${stats.errorCategories.acceptanceCriteria} documents non conformes`));
    }
    if (stats.errorCategories.risksAndAssumptions > 0) {
      console.log(chalk.yellow(`  • Risques et Hypothèses: ${stats.errorCategories.risksAndAssumptions} documents avec tables incorrectes`));
    }
    
    // Indiquer comment obtenir plus de détails
    console.log(chalk.blue('\nPour plus de détails sur les problèmes:'));
    console.log(chalk.blue('  ./validate-docs.js --verbose'));
    console.log(chalk.blue('  ./validate-docs.js --report  # Génère un rapport détaillé au format JSON'));
  }
  
  if (stats.failed === 0) {
    console.log(chalk.green.bold('✅ All documents passed validation'));
  } else {
    console.log(chalk.red.bold('\n❌ Some documents have validation issues'));
  }
}

// Execute the validation process
validateDocuments().catch(error => {
  console.error(chalk.red(`Fatal error: ${error.message}`));
  process.exit(1);
}); 