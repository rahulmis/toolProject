# JSON Diff Checker - Quick Reference Guide

## 🚀 Quick Start (30 seconds)

1. Click **"📄 Sample"** button to load example data
2. Click **"🔍 Compare JSON"** (or press `Ctrl+Enter`)
3. Press **`N`** to jump to the next change
4. Press **`Ctrl+F`** and type "age" to search
5. Click **"💾 Download"** to save the diff report

**Congratulations!** You've just used all the main features. 🎉

---

## ⌨️ Keyboard Shortcuts

| Shortcut | What it does |
|----------|--------------|
| `Ctrl + Enter` | Compare the two JSONs |
| `Ctrl + F` | Search within diff results |
| `N` | Jump to **N**ext change |
| `P` | Jump to **P**revious change |
| `↑` | Previous search result |
| `↓` | Next search result |
| `Esc` | Clear search (when focused) |

💡 **Pro Tip:** Use `Cmd` instead of `Ctrl` on Mac

---

## 🎨 Color Guide

| Color | Meaning | Example |
|-------|---------|---------|
| 🟢 **Green** | Added in modified JSON | New property or value |
| 🔴 **Red** | Removed from original | Deleted property |
| 🟡 **Yellow** | Value changed | Same key, different value |
| 🔵 **Blue** | Unchanged | Identical in both JSONs |
| 🟠 **Orange** | Current search result | Your active search match |

---

## 🛠️ Button Guide

### Main Actions
- **🔍 Compare JSON** - Run the comparison
- **🔄 Swap** - Switch left ↔ right
- **🗑️ Clear** - Remove all text
- **📄 Sample** - Load example data

### After Comparing
- **📋 Copy** - Copy to clipboard
- **💾 Download** - Save as .txt file
- **← Back to Edit** - Return to editing

### Advanced
- **⚙️ Options** - Show/hide advanced settings

---

## 📋 Common Workflows

### Workflow 1: Quick Comparison
```
1. Paste first JSON
2. Paste second JSON
3. Ctrl+Enter
4. Review with N/P keys
```
⏱️ **Time:** 10 seconds

---

### Workflow 2: Find Specific Changes
```
1. Compare JSONs
2. Ctrl+F
3. Type field name (e.g., "email")
4. Navigate with ↑/↓
```
⏱️ **Time:** 15 seconds

---

### Workflow 3: Professional Report
```
1. Compare JSONs
2. Review changes (use N/P)
3. Download report
4. Share with team
```
⏱️ **Time:** 30 seconds

---

### Workflow 4: Code Review
```
1. Load "before" and "after" configs
2. Click Options → Ignore whitespace
3. Compare
4. Navigate changes with N/P
5. Copy diff for PR comments
```
⏱️ **Time:** 1 minute

---

## ⚙️ Advanced Options Explained

### Indentation Size
- **2 spaces** (default) - Most common, compact
- **4 spaces** - Traditional, very readable
- **Compact** - Minimized, single-line where possible

**When to use:**
- Match your team's coding standard
- 2-space: Modern web development
- 4-space: Python, Java projects
- Compact: Minimize visual clutter

---

### Show Whitespace
- **ON** - See all spaces, tabs, line breaks
- **OFF** - Hide trailing whitespace

**When to use:**
- ON: Debugging formatting issues
- OFF: Focus on content only

---

### Ignore Whitespace Differences
- **OFF** (default) - All changes shown
- **ON** - Only content changes

**When to use:**
- ON: Comparing formatted vs minified
- ON: Different formatter outputs
- OFF: Exact comparison needed

---

## 🎯 Tips & Tricks

### Tip 1: Use Filters
After comparing, uncheck "missing" or "modified" to focus on specific change types.

### Tip 2: Combine Search + Navigation
Search for a field, then use N/P to jump between its occurrences across the entire file.

### Tip 3: Download for Records
Always download important comparisons for documentation or audit trails.

### Tip 4: Sample Data
Load sample data to test features before using with real data.

### Tip 5: Keyboard First
Learn the 5 keyboard shortcuts to work 3x faster.

---

## ❓ FAQs

**Q: How big can my JSON files be?**
A: Tested up to 1MB. Performance depends on your device, but most real-world files work great.

**Q: Is my data safe?**
A: 100% safe. Everything happens in your browser. Nothing is uploaded to any server.

**Q: Can I compare more than 2 JSONs?**
A: Currently no, but you can do multiple pairwise comparisons.

**Q: What if my JSON is invalid?**
A: You'll see a clear error message with line and column number.

**Q: Can I undo a comparison?**
A: Click "← Back to Edit" to return to editing mode with your original text preserved.

**Q: Does this work offline?**
A: Yes! Once loaded, it works without internet.

---

## 🐛 Troubleshooting

### Problem: Compare button doesn't work
**Solution:** Check that both text areas have valid JSON. Look for error message in red.

### Problem: Search finds nothing
**Solution:** Make sure you've compared the JSONs first. Search only works on diff results.

### Problem: Keyboard shortcuts don't work
**Solution:** Click inside the diff area first, or try refreshing the page.

### Problem: Download button missing
**Solution:** Compare JSONs first. Download only appears after comparison.

### Problem: Lines don't align
**Solution:** Refresh the page. This was a bug that's been fixed in the latest version.

---

## 📱 Mobile Usage

On mobile devices:
- Use **touch scrolling** instead of keyboard navigation
- **Tap** buttons instead of keyboard shortcuts
- **Long press** for context menus
- Use **landscape mode** for better side-by-side view

---

## 🎓 Learning Path

### Beginner (Day 1)
- Load sample data
- Basic comparison
- Understand colors

### Intermediate (Week 1)
- Use keyboard shortcuts
- Search in diffs
- Export reports

### Advanced (Month 1)
- Advanced options
- Workflow optimization
- All shortcuts memorized

---

## 📊 Feature Checklist

Try all features to become a pro:

- [ ] Loaded sample data
- [ ] Compared two JSONs
- [ ] Used side-by-side view
- [ ] Tried unified view
- [ ] Pressed N to navigate changes
- [ ] Pressed P to go back
- [ ] Searched with Ctrl+F
- [ ] Copied diff to clipboard
- [ ] Downloaded a diff report
- [ ] Changed indentation size
- [ ] Enabled ignore whitespace
- [ ] Used swap button
- [ ] Filtered by change type
- [ ] Used all keyboard shortcuts

---

## 🏆 Power User Checklist

Unlock these achievements:

- [ ] Compared 10+ JSON files
- [ ] Used only keyboard for entire workflow
- [ ] Found bug using search feature
- [ ] Shared diff with team
- [ ] Used ignore whitespace to reduce noise
- [ ] Navigated 100+ changes efficiently
- [ ] Customized indentation for team standard
- [ ] Used in a code review
- [ ] Taught someone else to use it
- [ ] Provided feedback for improvements

---

## 💡 Real-World Examples

### Example 1: API Version Migration
```json
Before: { "status": "ok", "data": {...} }
After:  { "success": true, "result": {...} }

Use Case: Track breaking changes in API responses
```

### Example 2: Configuration Audit
```json
Dev:  { "debug": true, "timeout": 5000 }
Prod: { "debug": false, "timeout": 30000 }

Use Case: Verify environment-specific settings
```

### Example 3: Data Validation
```json
Source: { "users": [100 records] }
Target: { "users": [100 records] }

Use Case: Ensure data migration accuracy
```

---

## 🔗 Related Resources

- **Documentation:** See `/docs/JSON_DIFF_NEW_FEATURES.md`
- **Enhancement Summary:** See `/docs/JSON_DIFF_ENHANCEMENT_SUMMARY.md`
- **UI Fixes:** See `/docs/JSON_DIFF_IMPROVEMENTS.md`

---

## 📞 Need Help?

1. Try the sample data first
2. Read the tooltips (hover over buttons)
3. Check the FAQs above
4. Review error messages carefully
5. Refresh the page if something seems stuck

---

**Last Updated:** February 2, 2026  
**Version:** 2.0  
**Print-friendly:** Yes - This guide is designed to be printed as a desk reference
