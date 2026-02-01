# Tool Details Documentation

## Overview
Each tool can include a structured "Tool Details" section that appears below the tool UI. This section provides users with helpful information about what the tool does, how to use it, key features, and privacy information.

## How to Add Tool Details

### Step 1: Add `toolDetails` to Metadata

In your tool's `metadata.js` file, add a `toolDetails` object:

```javascript
const metadata = {
  // ... other metadata fields ...
  
  toolDetails: {
    what: 'A clear description of what the tool does (1-2 sentences)',
    
    howToUse: [
      'Step 1: First action',
      'Step 2: Second action',
      'Step 3: Third action',
      // ... more steps
    ],
    
    features: [
      'First key feature',
      'Second key feature',
      'Third key feature',
      // ... more features
    ],
    
    privacy: {
      browserBased: true, // or false if backend processing
      note: 'Custom privacy note (optional). If not provided, a default note will be shown.'
    }
  },
};
```

### Step 2: Import Metadata in Component

In your tool component (e.g., `MyTool.jsx`):

```javascript
import React from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import metadata from './metadata';

const MyTool = () => {
  return (
    <ToolLayout
      toolId="my-tool"
      title="My Tool"
      description="Short description"
      toolDetails={metadata.toolDetails} // Pass toolDetails here
    >
      {/* Your tool UI */}
    </ToolLayout>
  );
};
```

That's it! The ToolDetails component will automatically render the structured information.

## Content Guidelines

### What Section
- **Purpose**: Explain what the tool does and who it's for
- **Length**: 2-3 sentences maximum
- **Tone**: Professional, informative, not marketing-heavy
- **Example**: "This JSON Formatter is a free online tool designed for developers working with JSON data. It helps you beautify messy JSON, validate syntax, and minify files for production."

### How to Use Section
- **Format**: Numbered list of clear, actionable steps
- **Steps**: 4-7 steps typically (not too short, not too long)
- **Style**: Start each step with an action verb
- **Example**: 
  1. "Paste your JSON into the input field"
  2. "Click 'Format' to beautify the code"

### Features Section
- **Format**: Bulleted list
- **Count**: 6-10 features
- **Style**: Brief, feature-focused (not full sentences)
- **Order**: Most important features first
- **Example**: 
  - "Real-time syntax validation"
  - "One-click copy to clipboard"

### Privacy Section
- **browserBased**: Set to `true` for client-side tools, `false` for backend tools
- **note**: Optional custom privacy explanation
  - If omitted, a default privacy note will be shown
  - Customize for tools with unique processing (e.g., API calls, temporary storage)
- **Emphasis**: Reassure users about data privacy and security

## SEO Benefits

The Tool Details section is SEO-friendly and helps with:
- **Keyword density**: Naturally includes relevant keywords
- **Content richness**: Provides substantial, useful content
- **User engagement**: Reduces bounce rate by answering questions
- **Semantic HTML**: Uses proper heading hierarchy (h2, h3)
- **Structured data**: Ready for future schema.org markup

## Design Features

- **Responsive**: Works on all screen sizes
- **Dark mode**: Full support for light and dark themes
- **Scannable**: Clear headings and short paragraphs
- **Visual hierarchy**: Uses spacing and typography effectively
- **Privacy highlight**: Special styled box for privacy information
- **Ad placeholder**: Reserved space for future monetization

## Example: JSON Formatter

```javascript
toolDetails: {
  what: 'This JSON Formatter is a free online tool for developers working with JSON. It beautifies messy JSON, validates syntax, and minifies files for production.',
  
  howToUse: [
    'Paste your JSON into the input field',
    'Click "Format" to beautify with proper indentation',
    'Click "Minify" to compress to a single line',
    'Use "Validate" to check for syntax errors',
    'Copy the result with one click'
  ],
  
  features: [
    'Instant JSON formatting',
    'Real-time syntax validation',
    'One-click minification',
    'Character counter',
    'Copy to clipboard',
    'Works offline'
  ],
  
  privacy: {
    browserBased: true,
    note: 'All processing happens in your browser. Your JSON data never leaves your device.'
  }
}
```

## Optional: Omitting Tool Details

If a tool doesn't need detailed information, simply don't pass `toolDetails` to ToolLayout:

```javascript
<ToolLayout
  toolId="simple-tool"
  title="Simple Tool"
  description="A basic tool"
  // No toolDetails prop
>
  {/* Tool UI */}
</ToolLayout>
```

The Tool Details section will not render, and no placeholder will appear.

## Future Enhancements

The tool details system is designed to be extensible. Future additions might include:

- **FAQ section**: Common questions and answers
- **Related tools**: Automatic linking to similar tools
- **Examples**: Code snippets or sample use cases
- **Video tutorials**: Embedded how-to videos
- **User ratings**: Community feedback and ratings
- **Analytics**: Usage tips based on popular features
