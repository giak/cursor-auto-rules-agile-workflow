
// Custom markdownlint rule to check for required sections in agile docs
'use strict';

module.exports = {
  names: ['agile-required-sections'],
  description: 'Agile documentation must contain required sections',
  tags: ['agile'],
  function: function rule(params, onError) {
    // Helper to convert heading to plain text
    const headingPlainText = (heading) => {
      return heading.replace(/[#\*_\[\]()]/g, '').trim();
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
          detail: `Required section "${required}" not found in ${docType} document`
        });
      }
    });
  }
};
