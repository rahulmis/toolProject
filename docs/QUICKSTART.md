# Quick Start Guide

Get your online tools website running in 5 minutes! 🚀

## 📋 Prerequisites

- Node.js 18+ installed ([Download](https://nodejs.org/))
- npm or yarn package manager
- Code editor (VS Code recommended)
- Git (optional, for deployment)

## ⚡ Quick Start

### 1. Install Dependencies

```bash
cd toolProject
npm install
```

This installs:
- React
- React Router
- Vite
- Tailwind CSS
- All dev dependencies

**Expected time**: 1-2 minutes

### 2. Start Development Server

```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 3. Open in Browser

Visit: **http://localhost:5173**

You should see:
- ✅ Homepage with 2 tool cards
- ✅ Search bar
- ✅ Hero section
- ✅ Responsive design

### 4. Test the Tools

**JSON Formatter**:
1. Click "JSON Formatter & Validator" card
2. Click "Load Sample" button
3. Click "Format / Beautify"
4. See formatted JSON in output

**Image Converter**:
1. Click "Image Format Converter" card
2. Click to select an image
3. Choose output format
4. Click "Convert Image"
5. Download converted image

## 🎉 Success!

If all tools work, you're ready to:
- Add new tools
- Customize the UI
- Deploy to production

---

## 🛠️ Adding Your First Tool

Let's add a simple "Text to Uppercase" tool as an example.

### Step 1: Create Tool Component

Create file: `src/tools/text-uppercase/TextUppercase.jsx`

```jsx
import React, { useState } from 'react';
import ToolLayout from '../../components/shared/ToolLayout';

const TextUppercase = () => {
  const [input, setInput] = useState('');

  const output = input.toUpperCase();

  return (
    <ToolLayout
      title="Text to Uppercase"
      description="Convert any text to UPPERCASE letters instantly."
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Input Text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your text here..."
            className="textarea-field"
            rows={8}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Uppercase Output
          </label>
          <textarea
            value={output}
            readOnly
            className="textarea-field bg-gray-50"
            rows={8}
          />
        </div>
      </div>
    </ToolLayout>
  );
};

export default TextUppercase;
```

### Step 2: Register in Config

Edit: `src/config/tools.js`

1. Add import at the top:
```javascript
import TextUppercase from '../tools/text-uppercase/TextUppercase';
```

2. Add to TOOLS array:
```javascript
{
  id: 'text-uppercase',
  name: 'Text to Uppercase',
  description: 'Convert any text to UPPERCASE letters instantly.',
  category: TOOL_CATEGORIES.TEXT,
  path: '/text-uppercase',
  component: TextUppercase,
  icon: '🔠',
  tags: ['text', 'uppercase', 'convert'],
  featured: true,
},
```

### Step 3: Test

1. Save files
2. Go to homepage (http://localhost:5173)
3. You'll see the new tool card!
4. Click it and test

**That's it!** You've added a new tool in 3 steps.

---

## 🎨 Customizing the UI

### Change Theme Colors

Edit: `tailwind.config.js`

```javascript
colors: {
  primary: {
    // Change these values:
    500: '#10b981', // Green instead of blue
    600: '#059669',
    700: '#047857',
  },
}
```

### Change Site Name

Edit: `src/components/layout/Header.jsx`

```jsx
<span className="text-xl font-bold text-gray-900">
  Your<span className="text-primary-600">Tools</span>
</span>
```

### Change Homepage Hero

Edit: `src/pages/HomePage.jsx`

```jsx
<h1 className="text-4xl md:text-5xl font-bold mb-6">
  Your Custom Headline Here
</h1>
```

---

## 📦 Building for Production

### Build

```bash
npm run build
```

Output: `dist/` folder

### Preview Production Build

```bash
npm run preview
```

Visit: http://localhost:4173

### Deploy to Cloudflare Pages

See: [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

Quick version:
```bash
# Install Wrangler
npm install -g wrangler

# Deploy
wrangler pages deploy dist --project-name=online-tools
```

---

## 🐛 Troubleshooting

### Port 5173 Already in Use

Kill the process or change port:
```bash
npm run dev -- --port 3000
```

### Dependencies Not Installing

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Styles Not Loading

1. Check `tailwind.config.js` exists
2. Check `postcss.config.js` exists
3. Restart dev server

### Tool Not Showing on Homepage

1. Check import path in `tools.js`
2. Check component is exported as default
3. Check no syntax errors in config

---

## 📚 Next Steps

1. **Read Documentation**:
   - [README.md](./README.md) - Overview and features
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Hosting guide

2. **Add More Tools**:
   - Use [TOOL_TEMPLATE.jsx](./TOOL_TEMPLATE.jsx) as starting point
   - Browse ideas: PDF tools, text tools, calculators, converters

3. **Customize Design**:
   - Modify Tailwind config
   - Update component styles
   - Add your branding

4. **Deploy**:
   - Push to GitHub
   - Connect to Cloudflare Pages
   - Go live!

---

## 🤝 Getting Help

- Check documentation files in project root
- Review example tools: JsonFormatter, ImageConverter
- Use TOOL_TEMPLATE.jsx for new tools

---

## ✅ Checklist

- [ ] Dependencies installed
- [ ] Dev server running
- [ ] Both tools tested
- [ ] Added a custom tool
- [ ] Customized theme/branding
- [ ] Built for production
- [ ] Deployed (optional)

**Congratulations! You're ready to build amazing tools!** 🎉
