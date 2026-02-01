# 📁 Project Folder Structure

**Date:** February 1, 2026  
**Project:** JsonAndMore Platform (React + Vite)

---

## 🌳 Complete Directory Tree

```
toolProject/
│
├── 📄 Root Configuration Files
│   ├── package.json                    # Dependencies and scripts
│   ├── package-lock.json               # Locked dependency versions
│   ├── vite.config.js                  # Vite build configuration
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── postcss.config.js               # PostCSS configuration
│   ├── index.html                      # Entry HTML file
│   ├── .gitignore                      # Git ignore rules
│   └── README.md                       # Main project README
│
├── 📚 docs/                            # All Documentation (18 files)
│   ├── README.md                       # Documentation index/navigation
│   ├── DOCS_ORGANIZATION.md            # How docs are organized
│   │
│   ├── 🚀 Getting Started
│   │   ├── START_HERE.md               # Complete onboarding guide
│   │   ├── QUICKSTART.md               # Quick setup guide
│   │   └── GET_STARTED.md              # Additional getting started
│   │
│   ├── 🏗️ Architecture
│   │   ├── ARCHITECTURE.md             # System architecture
│   │   ├── PROJECT_STRUCTURE.md        # Folder structure details
│   │   ├── BEST_PRACTICES.md           # Coding standards
│   │   └── FILE_INVENTORY.md           # Complete file inventory
│   │
│   ├── 🎨 UI/UX
│   │   ├── LAYOUT_SYSTEM.md            # Layout patterns
│   │   ├── LAYOUT_CHANGES.md           # Layout improvements
│   │   └── TOOL_DETAILS_GUIDE.md       # Tool details guide
│   │
│   ├── 🚢 Deployment
│   │   └── DEPLOYMENT.md               # Deployment instructions
│   │
│   ├── 📝 History
│   │   ├── CLEANUP_SUMMARY.md          # Recent cleanup (Feb 2026)
│   │   ├── SUMMARY.md                  # Project summary
│   │   └── FINAL_SUMMARY.md            # Final state summary
│   │
│   └── ✅ Tracking
│       ├── CHECKLIST.md                # Project checklist
│       └── INDEX.md                    # Additional index
│
├── 🌐 public/                          # Static Assets
│   ├── vite.svg                        # Vite logo
│   └── _redirects                      # Netlify/deployment redirects
│
├── 💻 src/                             # Source Code
│   │
│   ├── 📄 Entry Files
│   │   ├── main.jsx                    # React app entry point
│   │   ├── App.jsx                     # Root app component
│   │   └── index.css                   # Global styles
│   │
│   ├── 📄 pages/                       # Page Components
│   │   ├── HomePage.jsx                # Landing page with tool grid
│   │   └── AboutPage.jsx               # About page
│   │
│   ├── 🧩 components/                  # Reusable UI Components
│   │   │
│   │   ├── layout/                     # Layout Components
│   │   │   ├── Layout.jsx              # Global app layout wrapper
│   │   │   ├── Header.jsx              # Site header with nav
│   │   │   └── Footer.jsx              # Site footer
│   │   │
│   │   └── shared/                     # Shared UI Components
│   │       ├── ToolCard.jsx            # Tool card for homepage
│   │       ├── ToolLayout.jsx          # Standard tool page layout
│   │       ├── ToolDetails.jsx         # Tool details/about section
│   │       ├── PinButton.jsx           # Pin/favorite button
│   │       └── ThemeToggle.jsx         # Theme switcher component
│   │
│   └── ⚙️ features/                    # Feature Modules (Domain Logic)
│       │
│       ├── pins/                       # Pin/Favorite Feature
│       │   ├── README.md               # Pin feature documentation
│       │   ├── PinContext.jsx          # Pin state management (React Context)
│       │   ├── pinStorage.js           # Pin storage abstraction (localStorage)
│       │   └── usePins.js              # Pin hooks (usePins, useToolPin)
│       │
│       ├── theme/                      # Theme System
│       │   └── ThemeContext.jsx        # Theme provider (Light/Dark/System)
│       │
│       └── tools/                      # ⭐ SINGLE SOURCE OF TRUTH FOR TOOLS
│           │
│           ├── registry.js             # 🎯 TOOL REGISTRY (main config)
│           │                           #    - TOOLS array
│           │                           #    - Helper functions
│           │                           #    - Tool imports
│           │
│           ├── json-formatter/         # JSON Formatter Tool
│           │   ├── JsonFormatter.jsx   # UI component
│           │   ├── logic.js            # Business logic
│           │   └── metadata.js         # Tool metadata & details
│           │
│           ├── image-converter/        # Image Converter Tool
│           │   ├── ImageConverter.jsx  # UI component
│           │   ├── logic.js            # Business logic
│           │   └── metadata.js         # Tool metadata & details
│           │
│           └── ToolTemplate/           # Template for New Tools
│               ├── ToolTemplate.jsx    # Template component
│               ├── logic.js            # Template logic
│               └── metadata.js         # Template metadata
│
├── 📦 node_modules/                    # Dependencies (auto-generated)
│
└── 🏗️ dist/                            # Production Build (auto-generated)
```

---

## 📊 Structure Statistics

| Category | Count |
|----------|-------|
| **Documentation Files** | 18 files in `/docs/` |
| **Tools** | 2 active (json-formatter, image-converter) + 1 template |
| **Page Components** | 2 (HomePage, AboutPage) |
| **Layout Components** | 3 (Layout, Header, Footer) |
| **Shared Components** | 5 (ToolCard, ToolLayout, ToolDetails, PinButton, ThemeToggle) |
| **Features** | 3 (pins, theme, tools) |
| **Configuration Files** | 6 (package.json, vite, tailwind, postcss, etc.) |

---

## 🎯 Key Directories Explained

### `/docs/` - Documentation Hub
**Purpose:** Centralized documentation for developers  
**Contents:** Architecture, guides, deployment, history  
**Access:** Read `docs/README.md` for navigation

### `/public/` - Static Assets
**Purpose:** Static files served as-is  
**Contents:** Favicons, images, redirect rules  
**Note:** Files here are copied to dist/ during build

### `/src/pages/` - Page Components
**Purpose:** Top-level page components  
**Contents:** One component per route  
**Pattern:** `PageName` + `Page.jsx`

### `/src/components/` - Reusable UI
**Purpose:** Presentational components  
**Subdirectories:**
- `layout/` - App-wide layout components
- `shared/` - Reusable UI components

### `/src/features/` - Domain Logic
**Purpose:** Feature modules with business logic  
**Pattern:** Each feature is self-contained  
**Current Features:**
- `pins/` - Pin/favorite functionality
- `theme/` - Theme system (light/dark/system)
- `tools/` - **Tool registry and all tools** ⭐

### `/src/features/tools/` - Tool Registry (CRITICAL)
**⭐ SINGLE SOURCE OF TRUTH FOR ALL TOOLS**

```
tools/
├── registry.js              ← Main registry (TOOLS array)
├── [tool-name]/             ← Each tool in own folder
│   ├── [ToolName].jsx       ← UI component
│   ├── logic.js             ← Business logic
│   └── metadata.js          ← Tool config & details
└── ToolTemplate/            ← Template for new tools
```

---

## 🔍 File Naming Conventions

### Components (`.jsx`)
- **Pages:** `PageName` + `Page.jsx` (e.g., `HomePage.jsx`)
- **Components:** `ComponentName.jsx` (PascalCase)
- **Layouts:** `Layout.jsx`, `Header.jsx`, `Footer.jsx`

### Logic & Config (`.js`)
- **Business Logic:** `logic.js`
- **Metadata:** `metadata.js`
- **Storage:** `pinStorage.js`
- **Hooks:** `usePins.js`
- **Config:** `registry.js`

### Documentation (`.md`)
- **Project docs:** `UPPERCASE_TITLE.md` in `/docs/`
- **Feature docs:** `README.md` in feature folder
- **Main README:** `README.md` in root

---

## 🚀 Adding New Content

### Adding a New Tool:
```bash
# 1. Create tool folder
mkdir src/features/tools/my-tool

# 2. Create files
touch src/features/tools/my-tool/MyTool.jsx
touch src/features/tools/my-tool/logic.js
touch src/features/tools/my-tool/metadata.js

# 3. Register in registry.js
# Edit: src/features/tools/registry.js
```

### Adding New Documentation:
```bash
# Project-wide docs
echo "# Title" > docs/NEW_GUIDE.md

# Update index
# Edit: docs/README.md

# Feature-specific docs
echo "# Feature Docs" > src/features/my-feature/README.md
```

### Adding a New Page:
```bash
# 1. Create page component
touch src/pages/NewPage.jsx

# 2. Add route in App.jsx
# Edit: src/App.jsx
```

---

## 📦 Build Output

### Development
```bash
npm run dev
# → Runs on http://localhost:5173
```

### Production Build
```bash
npm run build
# → Outputs to /dist/
```

**`/dist/` structure:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [component]-[hash].js
└── vite.svg
```

---

## 🎨 Feature-Based Architecture Benefits

### ✅ Scalability
- Each feature is self-contained
- Easy to add new tools/features
- Clear boundaries between modules

### ✅ Maintainability
- Related code grouped together
- Easy to find and update
- Reduced coupling

### ✅ Team Collaboration
- Multiple developers can work on different features
- Clear ownership of code
- Minimal conflicts

### ✅ Testing
- Features can be tested in isolation
- Clear dependencies
- Easy to mock external dependencies

---

## 🔗 Module Dependencies

```
main.jsx
  └── App.jsx
      ├── Layout.jsx
      │   ├── Header.jsx
      │   │   └── ThemeToggle.jsx
      │   └── Footer.jsx
      │
      ├── ThemeContext (Provider)
      ├── PinContext (Provider)
      │
      └── Pages
          ├── HomePage.jsx
          │   └── ToolCard.jsx
          │       └── PinButton.jsx
          │
          ├── AboutPage.jsx
          │
          └── Tool Pages (dynamic from registry)
              └── ToolLayout.jsx
                  └── ToolDetails.jsx
```

---

## 🎯 Design Principles

### 1. **Single Source of Truth**
- Tools: `src/features/tools/registry.js`
- Pins: `PinContext.jsx`
- Theme: `ThemeContext.jsx`

### 2. **Separation of Concerns**
- UI components in `/components/`
- Business logic in `/features/`
- Pages in `/pages/`

### 3. **Feature Modules**
- Self-contained features
- Clear dependencies
- Easy to test

### 4. **Configuration Over Code**
- Tools configured in metadata
- Routes generated from registry
- Minimal hardcoding

---

## ✅ Structure Validation

### Checklist:
- ✅ All docs in `/docs/` folder
- ✅ Feature-based organization in `/src/features/`
- ✅ Single tool registry in `tools/registry.js`
- ✅ Reusable components in `/components/shared/`
- ✅ Clear naming conventions
- ✅ No duplicate tool definitions
- ✅ Clean root directory

### Build Status:
```bash
✓ 56 modules transformed
✓ built in 1.26s
✓ No errors
```

---

## 📚 Related Documentation

- **Quick Start:** `docs/QUICKSTART.md`
- **Architecture:** `docs/ARCHITECTURE.md`
- **Adding Tools:** Use `src/features/tools/ToolTemplate/`
- **Deployment:** `docs/DEPLOYMENT.md`
- **Cleanup History:** `docs/CLEANUP_SUMMARY.md`

---

**Last Updated:** February 1, 2026  
**Structure Version:** 2.0 (Post-Cleanup & Organization)
