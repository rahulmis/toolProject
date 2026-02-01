# Best Practices & Common Patterns

Guidelines for building high-quality tools that follow project conventions.

## 🎯 Tool Development Best Practices

### 1. Tool Component Structure

**Follow this pattern for consistency:**

```jsx
import React, { useState } from 'react';
import ToolLayout from '../../components/shared/ToolLayout';

const YourTool = () => {
  // 1. State declarations
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // 2. Processing functions
  const handleProcess = async () => {
    // Clear previous errors
    setError('');
    setIsProcessing(true);

    try {
      // Your logic here
      const result = await processData(input);
      setOutput(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // 3. Helper functions
  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  // 4. Render
  return (
    <ToolLayout title="..." description="...">
      {/* Error handling */}
      {error && <ErrorMessage message={error} />}
      
      {/* Action buttons */}
      <div className="flex gap-3">
        <button onClick={handleProcess} className="btn-primary">
          Process
        </button>
      </div>

      {/* Input/Output areas */}
      {/* ... */}
    </ToolLayout>
  );
};

export default YourTool;
```

### 2. Error Handling

**Always handle errors gracefully:**

```jsx
// ✅ GOOD: Clear error messages
try {
  const result = JSON.parse(input);
  setOutput(result);
  setError(''); // Clear previous errors
} catch (err) {
  setError(`Invalid JSON: ${err.message}`);
  setOutput('');
}

// ❌ BAD: Silent failures
try {
  const result = JSON.parse(input);
  setOutput(result);
} catch (err) {
  // Nothing happens - user confused
}
```

**Error Display Pattern:**

```jsx
{error && (
  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
    <strong>Error:</strong> {error}
  </div>
)}
```

### 3. Loading States

**Show feedback during processing:**

```jsx
const [isProcessing, setIsProcessing] = useState(false);

<button 
  onClick={handleProcess}
  disabled={isProcessing}
  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isProcessing ? '⏳ Processing...' : '▶️ Process'}
</button>
```

### 4. Input Validation

**Validate before processing:**

```jsx
const handleProcess = () => {
  // Input validation
  if (!input.trim()) {
    setError('Please enter some text');
    return;
  }

  if (input.length > 1000000) {
    setError('Input too large (max 1MB)');
    return;
  }

  // Clear error and proceed
  setError('');
  // ... processing logic
};
```

### 5. User Feedback

**Provide clear success messages:**

```jsx
const [copySuccess, setCopySuccess] = useState(false);

const handleCopy = async () => {
  await navigator.clipboard.writeText(output);
  setCopySuccess(true);
  
  // Auto-hide after 2 seconds
  setTimeout(() => setCopySuccess(false), 2000);
};

<button onClick={handleCopy}>
  {copySuccess ? '✓ Copied!' : '📋 Copy'}
</button>
```

---

## 🎨 UI/UX Patterns

### Button Styles

```jsx
// Primary action (main action user should take)
<button className="btn-primary">Convert</button>

// Secondary action (supporting actions)
<button className="btn-secondary">Clear</button>

// With disabled state
<button 
  className="btn-primary disabled:opacity-50" 
  disabled={isProcessing}
>
  Process
</button>
```

### Input Fields

```jsx
// Single-line input
<input 
  type="text"
  className="input-field"
  placeholder="Enter text..."
  value={input}
  onChange={(e) => setInput(e.target.value)}
/>

// Multi-line input (code/text)
<textarea
  className="textarea-field"
  rows={10}
  placeholder="Paste your content..."
  value={input}
  onChange={(e) => setInput(e.target.value)}
/>

// Read-only output
<textarea
  className="textarea-field bg-gray-50"
  readOnly
  value={output}
/>
```

### File Upload

```jsx
const fileInputRef = useRef(null);
const [selectedFile, setSelectedFile] = useState(null);

const handleFileSelect = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  // Validate
  if (file.size > 10 * 1024 * 1024) {
    alert('File too large (max 10MB)');
    return;
  }
  
  setSelectedFile(file);
};

return (
  <>
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={handleFileSelect}
      className="hidden"
      id="file-upload"
    />
    <label htmlFor="file-upload" className="btn-primary cursor-pointer">
      Choose File
    </label>
  </>
);
```

### Info Boxes

```jsx
// Tips/Info
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  <h3 className="font-semibold text-blue-900 mb-2">💡 Tips:</h3>
  <ul className="text-sm text-blue-800 space-y-1">
    <li>• Tip 1</li>
    <li>• Tip 2</li>
  </ul>
</div>

// Warning
<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
  <strong className="text-yellow-900">⚠️ Warning:</strong>
  <p className="text-yellow-800">Warning message</p>
</div>

// Success
<div className="bg-green-50 border border-green-200 rounded-lg p-4">
  <strong className="text-green-900">✓ Success:</strong>
  <p className="text-green-800">Success message</p>
</div>
```

---

## 🧩 Common Tool Patterns

### Pattern 1: Text Processing Tool

```jsx
const TextTool = () => {
  const [input, setInput] = useState('');
  const output = processText(input); // Real-time processing

  return (
    <ToolLayout title="..." description="...">
      <textarea value={input} onChange={e => setInput(e.target.value)} />
      <textarea value={output} readOnly />
    </ToolLayout>
  );
};
```

**Use for**: Case converters, text counters, formatters

### Pattern 2: File Processing Tool

```jsx
const FileTool = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleProcess = async () => {
    const processed = await processFile(file);
    setResult(processed);
  };

  return (
    <ToolLayout title="..." description="...">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleProcess}>Process</button>
      {result && <ResultDisplay result={result} />}
    </ToolLayout>
  );
};
```

**Use for**: Image converters, PDF tools, file analyzers

### Pattern 3: API-Based Tool

```jsx
const ApiTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        body: JSON.stringify({ input }),
      });
      const data = await response.json();
      setOutput(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout title="..." description="...">
      {/* UI */}
    </ToolLayout>
  );
};
```

**Use for**: Tools requiring heavy computation, external APIs

### Pattern 4: Multi-Step Tool

```jsx
const MultiStepTool = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});

  const renderStep = () => {
    switch(step) {
      case 1: return <Step1 onNext={data => { setData(data); setStep(2); }} />;
      case 2: return <Step2 data={data} onNext={() => setStep(3)} />;
      case 3: return <Step3 data={data} />;
    }
  };

  return (
    <ToolLayout title="..." description="...">
      {/* Step indicator */}
      <div>Step {step} of 3</div>
      {renderStep()}
    </ToolLayout>
  );
};
```

**Use for**: Wizards, complex workflows

---

## 🔒 Security Best Practices

### Client-Side Security

```jsx
// ✅ GOOD: Sanitize output
const SafeDisplay = ({ content }) => (
  <div>{content}</div> // React auto-escapes
);

// ❌ BAD: Dangerous HTML injection
const UnsafeDisplay = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);

// File size limits
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

if (file.size > MAX_FILE_SIZE) {
  setError('File too large');
  return;
}

// Validate file types
const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

if (!ALLOWED_TYPES.includes(file.type)) {
  setError('Invalid file type');
  return;
}
```

### Privacy Best Practices

```jsx
// ✅ GOOD: Process in browser
const result = processLocally(data);

// ✅ GOOD: Clear sensitive data
const handleClear = () => {
  setInput('');
  setOutput('');
  // If file URLs exist, revoke them
  if (fileUrl) URL.revokeObjectURL(fileUrl);
};

// Add privacy notice
<div className="text-sm text-gray-500">
  🔒 All processing happens in your browser. 
  Your data never leaves your device.
</div>
```

---

## ⚡ Performance Best Practices

### Debounce Expensive Operations

```jsx
import { useState, useEffect } from 'react';

const ExpensiveTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    // Debounce: wait 500ms after user stops typing
    const timer = setTimeout(() => {
      const result = expensiveOperation(input);
      setOutput(result);
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  return <textarea value={input} onChange={e => setInput(e.target.value)} />;
};
```

### Lazy Loading for Large Tools

```jsx
// In tools.js
import { lazy } from 'react';

const HeavyTool = lazy(() => import('../tools/heavy-tool/HeavyTool'));

export const TOOLS = [
  {
    id: 'heavy-tool',
    component: HeavyTool, // Will be loaded only when needed
    // ...
  },
];
```

### Memory Management

```jsx
useEffect(() => {
  // Create resources
  const url = URL.createObjectURL(blob);
  setImageUrl(url);

  // Cleanup when component unmounts
  return () => {
    URL.revokeObjectURL(url);
  };
}, [blob]);
```

---

## 📱 Mobile-First Responsive Design

### Responsive Grid

```jsx
// Automatically adjusts for mobile/tablet/desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <ToolCard />
  <ToolCard />
  <ToolCard />
</div>
```

### Mobile-Friendly Buttons

```jsx
// Stack buttons on mobile, row on desktop
<div className="flex flex-col sm:flex-row gap-3">
  <button className="btn-primary w-full sm:w-auto">Action 1</button>
  <button className="btn-secondary w-full sm:w-auto">Action 2</button>
</div>
```

### Touch-Friendly Inputs

```jsx
// Large touch targets (minimum 44x44px)
<button className="py-3 px-6 text-lg"> {/* Larger for mobile */}
  Submit
</button>

// Larger text inputs
<input className="text-base p-4" /> {/* Not text-sm on mobile */}
```

---

## 🧪 Testing Your Tool

### Manual Testing Checklist

```
□ Empty input handling
□ Very large input (1MB+)
□ Invalid input
□ Valid input (happy path)
□ Error messages display correctly
□ Loading states work
□ Success feedback shown
□ Mobile responsive
□ Button states (disabled, loading)
□ Copy to clipboard works
□ Clear/reset works
□ File upload (if applicable)
  □ Large files
  □ Invalid file types
  □ Multiple uploads
```

### Browser Testing

```
□ Chrome (latest)
□ Firefox (latest)
□ Safari (latest)
□ Edge (latest)
□ Mobile Safari (iOS)
□ Chrome Mobile (Android)
```

---

## 📝 Documentation Standards

### Component Documentation

```jsx
/**
 * ToolName Component
 * 
 * Description: What this tool does
 * 
 * Features:
 * - Feature 1
 * - Feature 2
 * 
 * Future enhancements:
 * - Backend API integration point
 * - Batch processing capability
 */
const ToolName = () => {
  // ...
};
```

### Function Documentation

```jsx
/**
 * Converts image to specified format using Canvas API
 * 
 * @param {File} file - Source image file
 * @param {string} format - Target format (png/jpeg/webp)
 * @param {number} quality - Quality (0.0-1.0) for lossy formats
 * @returns {Promise<Blob>} Converted image blob
 */
const convertImage = async (file, format, quality) => {
  // ...
};
```

---

## 🎯 Code Review Checklist

Before committing a new tool:

```
□ Component follows structure pattern
□ Error handling implemented
□ Loading states for async operations
□ User feedback (success/error messages)
□ Clear/reset functionality
□ Mobile responsive
□ Proper spacing/styling (Tailwind classes)
□ Tool registered in tools.js
□ No console.log statements left
□ Privacy-focused (browser processing when possible)
□ Performance optimized (debounce if needed)
□ Accessible (labels, ARIA attributes)
□ Cross-browser tested
```

---

## 💡 Pro Tips

1. **Start Simple**: Get basic functionality working first
2. **Copy Existing Tools**: Use JSON Formatter as reference
3. **Use Dev Tools**: React DevTools helps debug state
4. **Test Edge Cases**: Empty, huge, invalid inputs
5. **Think Mobile-First**: Design for small screens first
6. **Document As You Go**: Add comments explaining complex logic
7. **Keep It Fast**: Process data efficiently, use Web Workers for heavy tasks
8. **Be Privacy-Conscious**: Process locally when possible

---

**Follow these patterns for consistent, high-quality tools!** ✨
