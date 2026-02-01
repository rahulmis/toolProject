# Tool Workspace Layout System

## Overview

All tool pages in the platform use a **consistent, focused workspace layout** designed for clarity, usability, and scalability. This ensures that whether you have 2 tools or 50 tools, the user experience remains uniform and professional.

---

## Design Philosophy

### Focused Workspace, Not Full-Width Landing Page

The layout creates a **"tool workspace"** feel rather than a sprawling full-width page:

- **Centered container** with optimal width (1024px max)
- **Balanced whitespace** - not cramped, not empty
- **Clear visual hierarchy** - title → workspace → details
- **Distraction-free** - focus on the tool itself

### Platform-Wide Consistency

Every tool page automatically inherits:
- Same width constraints
- Same spacing patterns
- Same section structure
- Same responsive behavior

---

## Layout Structure

Every tool page has three main sections:

```
┌─────────────────────────────────────────────┐
│  1. TOOL HEADER                             │
│     - Tool name (h1)                        │
│     - Short description                     │
│     - Pin button                            │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  2. TOOL WORKSPACE (Primary Focus)          │
│     - Input/output areas                    │
│     - Action buttons                        │
│     - Tool-specific UI                      │
│     - Error messages                        │
│     - Tips/helper text                      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  3. TOOL DETAILS (Optional)                 │
│     - What this tool does                   │
│     - How to use it                         │
│     - Key features                          │
│     - Privacy information                   │
└─────────────────────────────────────────────┘
```

---

## Implementation

### Using ToolLayout Component

**All tools** must wrap their content in the `ToolLayout` component:

```jsx
import React from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import metadata from './metadata';

const MyTool = () => {
  return (
    <ToolLayout
      toolId="my-tool"
      title="My Tool Name"
      description="Short description of what this tool does."
      toolDetails={metadata.toolDetails} // Optional
    >
      {/* Your tool UI goes here */}
      <div className="space-y-6">
        <button className="btn-primary">Process</button>
        <textarea className="textarea-field" />
        {/* ... more tool-specific UI ... */}
      </div>
    </ToolLayout>
  );
};

export default MyTool;
```

### ToolLayout Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | ✅ Yes | Tool name (shown as h1) |
| `description` | string | ✅ Yes | Short description (1-2 sentences) |
| `toolId` | string | ⚠️ Recommended | Tool ID for pin functionality |
| `toolDetails` | object | ❌ Optional | Structured content for details section |
| `children` | ReactNode | ✅ Yes | Your tool's UI (workspace content) |

---

## Width & Positioning

### Desktop (> 1024px)
- **Max width**: 1024px (80rem / max-w-5xl)
- **Horizontal**: Centered with `mx-auto`
- **Padding**: 24px (6 units) on each side
- **Result**: Focused workspace that doesn't stretch edge-to-edge

### Tablet (640px - 1024px)
- **Width**: Adapts naturally within max-width
- **Padding**: 24px maintained
- **Result**: Comfortable reading/working width

### Mobile (< 640px)
- **Width**: Full-width with padding
- **Padding**: 16px (4 units) on each side
- **Result**: No horizontal scrolling, touch-friendly

---

## Spacing System

### Vertical Spacing (Between Sections)

```
Tool Header
  ↓ 2rem (mb-8)
Tool Workspace
  ↓ 3rem (mb-12)
Tool Details
  ↓ 2rem (mb-8)
[End]
```

### Internal Workspace Spacing

Use `space-y-6` (1.5rem gap) for elements inside your tool:

```jsx
<div className="space-y-6">
  <div>{/* Action buttons */}</div>
  <div>{/* Input field */}</div>
  <div>{/* Output field */}</div>
  <div>{/* Tips section */}</div>
</div>
```

### Padding Inside Cards

- **Desktop**: 32px (p-8)
- **Mobile**: 24px (p-6)

---

## Visual Design

### Tool Workspace Card

The main workspace has:
- White background (dark: dark gray)
- Subtle border
- Slight shadow (not heavy)
- Rounded corners (lg)

```css
bg-white dark:bg-gray-800
border border-gray-200 dark:border-gray-700
shadow-md
rounded-lg
p-6 sm:p-8
```

### Tool Details Card

Similar styling but distinct from workspace:
- Same white/dark gray background
- Same border treatment
- Less prominent shadow
- Clearly separated from workspace

---

## Responsive Behavior

### Breakpoints

| Size | Width | Padding | Behavior |
|------|-------|---------|----------|
| **sm** (640px+) | Full with padding | 24px | Enhanced spacing |
| **md** (768px+) | Full with padding | 24px | - |
| **lg** (1024px+) | Max 1024px | 24px | Centered workspace |
| **xl** (1280px+) | Max 1024px | 24px | Same (constrained) |

### Mobile Optimizations

- Pin button wraps below title if needed
- Text sizes scale down slightly
- Padding reduces to 16px
- Buttons stack vertically if space constrained

---

## Architecture Benefits

### For Developers

1. **Zero Layout Code Per Tool**
   - No need to handle max-width, centering, or spacing
   - Focus 100% on tool-specific functionality

2. **Automatic Consistency**
   - New tools inherit layout instantly
   - No per-tool layout bugs or inconsistencies

3. **Easy Maintenance**
   - Change layout once, affects all tools
   - No hunting through 50 tool files

### For Users

1. **Predictable Experience**
   - Same structure across all tools
   - Muscle memory carries over

2. **Distraction-Free**
   - Focused workspace
   - No excessive whitespace on large screens

3. **Mobile-Friendly**
   - Responsive without horizontal scrolling
   - Touch-friendly controls

---

## Adding a New Tool

### Step 1: Create Tool Component

Use the ToolTemplate as a starting point:

```bash
cp -r src/features/tools/ToolTemplate src/features/tools/my-tool
```

### Step 2: Use ToolLayout

Your tool component structure:

```jsx
import ToolLayout from '../../../components/shared/ToolLayout';
import metadata from './metadata';

const MyTool = () => {
  // Your state and logic
  
  return (
    <ToolLayout
      toolId={metadata.id}
      title={metadata.name}
      description={metadata.description}
      toolDetails={metadata.toolDetails}
    >
      {/* Tool UI */}
    </ToolLayout>
  );
};
```

### Step 3: Register in Registry

Add to `src/features/tools/registry.js`:

```javascript
import myToolMeta from './my-tool/metadata';

export const TOOLS = [
  // ... existing tools
  myToolMeta,
];
```

**That's it!** Your tool automatically gets:
- ✅ Consistent layout and spacing
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Proper width constraints
- ✅ Pin functionality
- ✅ SEO structure

---

## Common Patterns

### Action Buttons

```jsx
<div className="flex flex-wrap gap-3">
  <button className="btn-primary">Primary Action</button>
  <button className="btn-secondary">Secondary</button>
  <button className="btn-secondary">Clear</button>
</div>
```

### Input/Output Pair

```jsx
<div className="space-y-6">
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Input
    </label>
    <textarea className="textarea-field" rows={8} />
  </div>
  
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Output
    </label>
    <textarea className="textarea-field bg-gray-50 dark:bg-gray-900" rows={8} readOnly />
  </div>
</div>
```

### Error Messages

```jsx
{error && (
  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
    text-red-800 dark:text-red-300 px-4 py-3 rounded-lg">
    <strong>Error:</strong> {error}
  </div>
)}
```

### Tips Section

```jsx
<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 
  rounded-lg p-4">
  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">💡 Tips:</h3>
  <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
    <li>• Helpful tip one</li>
    <li>• Helpful tip two</li>
  </ul>
</div>
```

---

## Don'ts (Anti-Patterns)

❌ **DON'T** add custom layout logic inside tool components:
```jsx
// BAD - Don't do this
const MyTool = () => (
  <div className="max-w-6xl mx-auto px-4">
    <h1>My Tool</h1>
    {/* ... */}
  </div>
);
```

❌ **DON'T** override ToolLayout's width constraints:
```jsx
// BAD - Breaks consistency
<ToolLayout>
  <div className="max-w-full"> {/* Don't override */}
    {/* ... */}
  </div>
</ToolLayout>
```

❌ **DON'T** create custom per-tool layouts:
```jsx
// BAD - Creates inconsistency
const CustomLayout = ({ children }) => (
  <div className="my-custom-layout">
    {children}
  </div>
);
```

✅ **DO** trust the ToolLayout system:
```jsx
// GOOD - Clean and consistent
const MyTool = () => (
  <ToolLayout title="..." description="...">
    {/* Just your tool UI */}
  </ToolLayout>
);
```

---

## Summary

### Key Principles

1. **One Layout System** - ToolLayout for all tools
2. **Focused Workspace** - 1024px max, centered
3. **Clear Structure** - Header → Workspace → Details
4. **Zero Per-Tool Layout** - All layout in ToolLayout
5. **Scales Beautifully** - 2 tools or 50 tools

### Developer Checklist

When creating a new tool:
- [ ] Import ToolLayout
- [ ] Pass title, description, toolId
- [ ] Wrap tool UI in ToolLayout children
- [ ] Use `space-y-6` for internal spacing
- [ ] Use standard button/input classes
- [ ] Test on mobile and desktop
- [ ] Verify in both light and dark mode

Your tool is now part of a consistent, professional platform! 🎉
