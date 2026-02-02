/**
 * JSON Diff Checker - Business Logic
 * 
 * This file contains all the business logic for JSON comparison operations.
 * Separated from UI for testability and reusability.
 */

/**
 * Validate JSON syntax
 * @param {string} jsonString - JSON string to validate
 * @returns {Object} { valid: boolean, error?: string, line?: number }
 */
export const validateJSON = (jsonString) => {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (err) {
    let message = err.message;
    if (err.message && /position \d+/.test(err.message)) {
      const match = err.message.match(/position (\d+)/);
      if (match) {
        const pos = parseInt(match[1], 10);
        const before = jsonString.slice(0, pos);
        const line = (before.match(/\n/g) || []).length + 1;
        const col = pos - before.lastIndexOf('\n');
        message = `Line ${line}, column ${col}: ${err.message.split('\n')[0]}`;
      }
    }
    return { valid: false, error: message };
  }
};

/**
 * Compare two JSON objects and find differences with line-by-line analysis
 * @param {string} jsonString1 - First JSON string
 * @param {string} jsonString2 - Second JSON string
 * @param {string} viewMode - 'side-by-side' or 'unified'
 * @param {Object} options - Comparison options { indentSize: number, ignoreWhitespace: boolean }
 * @returns {Object} { success: boolean, leftLines?: Array, rightLines?: Array, unifiedLines?: Array, stats?: Object, changeIndices?: Array, error?: string }
 */
export const diffJSON = (jsonString1, jsonString2, viewMode = 'side-by-side', options = {}) => {
  try {
    const { indentSize = 2, ignoreWhitespace = false } = options;
    
    const obj1 = JSON.parse(jsonString1);
    const obj2 = JSON.parse(jsonString2);
    
    // Format both JSONs with consistent indentation
    const formatted1 = JSON.stringify(obj1, null, indentSize);
    const formatted2 = JSON.stringify(obj2, null, indentSize);
    
    // Split into lines
    const lines1 = formatted1.split('\n');
    const lines2 = formatted2.split('\n');
    
    // Perform line-by-line comparison
    const { leftLines, rightLines } = compareLinesSideBySide(lines1, lines2, ignoreWhitespace);
    const unifiedLines = compareLinesUnified(lines1, lines2, ignoreWhitespace);
    
    // Find detailed differences for statistics
    const differences = findDetailedDifferences(obj1, obj2);
    const stats = countDifferences(differences);
    stats.unchanged = leftLines.filter((l) => l.type === 'unchanged').length;
    
    // Track indices of changes for navigation
    const changeIndices = [];
    leftLines.forEach((line, index) => {
      if (line.type === 'added' || line.type === 'removed' || line.type === 'modified') {
        changeIndices.push(index);
      }
    });
    
    return {
      success: true,
      leftLines,
      rightLines,
      unifiedLines,
      stats,
      changeIndices,
      formatted1,
      formatted2
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

/**
 * Compute longest common subsequence (LCS) of two line arrays (by trimmed content).
 * Returns array of { i, j } indices that form the LCS.
 */
const computeLCS = (lines1, lines2) => {
  const n = lines1.length;
  const m = lines2.length;
  const trim1 = lines1.map((l) => l.trim());
  const trim2 = lines2.map((l) => l.trim());
  // dp[i][j] = length of LCS of lines1[0..i-1], lines2[0..j-1]
  const dp = Array(n + 1)
    .fill(0)
    .map(() => Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (trim1[i - 1] === trim2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  const pairs = [];
  let i = n,
    j = m;
  while (i > 0 && j > 0) {
    if (trim1[i - 1] === trim2[j - 1]) {
      pairs.push({ i: i - 1, j: j - 1 });
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  return pairs.reverse();
};

/**
 * Extract JSON key from a line like `  "key": value` (for modified detection)
 */
const getJsonKeyFromLine = (line) => {
  const m = (line || '').match(/^\s*"([^"]+)":\s*/);
  return m ? m[1] : null;
};

/**
 * Compare two sets of lines for side-by-side view using LCS alignment.
 * Post-process: when removed (left) + added (right) share the same JSON key, mark as 'modified'.
 */
const compareLinesSideBySide = (lines1, lines2, ignoreWhitespace = false) => {
  const leftLines = [];
  const rightLines = [];
  const lcs = computeLCS(lines1, lines2);
  let idx1 = 0,
    idx2 = 0;
  let lineNum1 = 1,
    lineNum2 = 1;
  for (const { i, j } of lcs) {
    while (idx1 < i) {
      leftLines.push({
        lineNumber: lineNum1++,
        content: lines1[idx1],
        type: 'removed'
      });
      rightLines.push({ lineNumber: null, content: '', type: 'empty' });
      idx1++;
    }
    while (idx2 < j) {
      leftLines.push({ lineNumber: null, content: '', type: 'empty' });
      rightLines.push({
        lineNumber: lineNum2++,
        content: lines2[idx2],
        type: 'added'
      });
      idx2++;
    }
    leftLines.push({
      lineNumber: lineNum1++,
      content: lines1[i],
      type: 'unchanged'
    });
    rightLines.push({
      lineNumber: lineNum2++,
      content: lines2[j],
      type: 'unchanged'
    });
    idx1 = i + 1;
    idx2 = j + 1;
  }
  while (idx1 < lines1.length) {
    leftLines.push({
      lineNumber: lineNum1++,
      content: lines1[idx1],
      type: 'removed'
    });
    rightLines.push({ lineNumber: null, content: '', type: 'empty' });
    idx1++;
  }
  while (idx2 < lines2.length) {
    leftLines.push({ lineNumber: null, content: '', type: 'empty' });
    rightLines.push({
      lineNumber: lineNum2++,
      content: lines2[idx2],
      type: 'added'
    });
    idx2++;
  }
  // Mark "modified" when same key, different value (removed left + added right)
  for (let k = 0; k < leftLines.length; k++) {
    const left = leftLines[k];
    const right = rightLines[k];
    if (left.type === 'removed' && right.type === 'added') {
      const keyL = getJsonKeyFromLine(left.content);
      const keyR = getJsonKeyFromLine(right.content);
      if (keyL && keyR && keyL === keyR) {
        left.type = 'modified';
        right.type = 'modified';
      }
    }
  }
  return { leftLines, rightLines };
};

/**
 * Compare lines for unified view using same LCS alignment
 */
const compareLinesUnified = (lines1, lines2, ignoreWhitespace = false) => {
  const unifiedLines = [];
  const lcs = computeLCS(lines1, lines2);
  let idx1 = 0,
    idx2 = 0;
  let lineNumber = 1;
  for (const { i, j } of lcs) {
    while (idx1 < i) {
      unifiedLines.push({
        lineNumber: null,
        content: `- ${lines1[idx1]}`,
        type: 'removed'
      });
      idx1++;
    }
    while (idx2 < j) {
      unifiedLines.push({
        lineNumber: null,
        content: `+ ${lines2[idx2]}`,
        type: 'added'
      });
      idx2++;
    }
    unifiedLines.push({
      lineNumber: lineNumber++,
      content: `  ${lines1[i]}`,
      type: 'unchanged'
    });
    idx1 = i + 1;
    idx2 = j + 1;
  }
  while (idx1 < lines1.length) {
    unifiedLines.push({
      lineNumber: null,
      content: `- ${lines1[idx1]}`,
      type: 'removed'
    });
    idx1++;
  }
  while (idx2 < lines2.length) {
    unifiedLines.push({
      lineNumber: null,
      content: `+ ${lines2[idx2]}`,
      type: 'added'
    });
    idx2++;
  }
  return unifiedLines;
};

/**
 * Find detailed differences between two objects
 */
const findDetailedDifferences = (obj1, obj2, path = '') => {
  const differences = [];
  
  // Handle null/undefined cases
  if (obj1 === undefined && obj2 !== undefined) {
    differences.push({ path, type: 'added', value: obj2 });
    return differences;
  }
  if (obj1 !== undefined && obj2 === undefined) {
    differences.push({ path, type: 'removed', value: obj1 });
    return differences;
  }
  if (obj1 === null && obj2 !== null) {
    differences.push({ path, type: 'modified', oldValue: null, newValue: obj2 });
    return differences;
  }
  if (obj1 !== null && obj2 === null) {
    differences.push({ path, type: 'modified', oldValue: obj1, newValue: null });
    return differences;
  }
  
  // Check if both are primitive values
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    if (obj1 !== obj2) {
      differences.push({
        path: path || 'root',
        type: 'modified',
        oldValue: obj1,
        newValue: obj2
      });
    }
    return differences;
  }
  
  // Check if both are arrays
  const isArray1 = Array.isArray(obj1);
  const isArray2 = Array.isArray(obj2);
  
  if (isArray1 !== isArray2) {
    differences.push({
      path: path || 'root',
      type: 'type-changed',
      oldValue: obj1,
      newValue: obj2
    });
    return differences;
  }
  
  if (isArray1 && isArray2) {
    // Compare arrays
    const maxLength = Math.max(obj1.length, obj2.length);
    for (let i = 0; i < maxLength; i++) {
      const currentPath = path ? `${path}[${i}]` : `[${i}]`;
      if (i >= obj1.length) {
        differences.push({
          path: currentPath,
          type: 'added',
          value: obj2[i]
        });
      } else if (i >= obj2.length) {
        differences.push({
          path: currentPath,
          type: 'removed',
          value: obj1[i]
        });
      } else {
        differences.push(...findDetailedDifferences(obj1[i], obj2[i], currentPath));
      }
    }
  } else {
    // Compare objects
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    
    for (const key of allKeys) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (!(key in obj1)) {
        differences.push({
          path: currentPath,
          type: 'added',
          value: obj2[key]
        });
      } else if (!(key in obj2)) {
        differences.push({
          path: currentPath,
          type: 'removed',
          value: obj1[key]
        });
      } else {
        differences.push(...findDetailedDifferences(obj1[key], obj2[key], currentPath));
      }
    }
  }
  
  return differences;
};

/**
 * Count differences by type
 */
const countDifferences = (differences) => {
  const stats = {
    totalChanges: 0,
    added: 0,
    removed: 0,
    modified: 0,
    unchanged: 0,
    typeChanged: 0
  };
  differences.forEach((diff) => {
    stats.totalChanges++;
    switch (diff.type) {
      case 'added':
        stats.added++;
        break;
      case 'removed':
        stats.removed++;
        break;
      case 'modified':
        stats.modified++;
        break;
      case 'type-changed':
        stats.typeChanged++;
        break;
    }
  });
  return stats;
};

/**
 * Generate sample JSONs for demonstration
 */
export const generateSampleJSONs = () => {
  const original = {
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "country": "USA"
    },
    "hobbies": ["reading", "coding"],
    "active": true,
    "balance": 1250.50
  };
  
  const modified = {
    "name": "John Doe",
    "age": 31,
    "email": "john.doe@example.com",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "country": "USA",
      "zip": "10001"
    },
    "hobbies": ["reading", "coding", "travel"],
    "active": true,
    "status": "premium",
    "balance": 1300.50
  };
  
  return {
    original: JSON.stringify(original, null, 2),
    modified: JSON.stringify(modified, null, 2)
  };
};

/**
 * Get detailed statistics about the diff
 */
export const getDiffStats = (jsonString1, jsonString2) => {
  try {
    const obj1 = JSON.parse(jsonString1);
    const obj2 = JSON.parse(jsonString2);
    const differences = findDetailedDifferences(obj1, obj2);
    
    return {
      ...countDifferences(differences),
      json1Size: jsonString1.length,
      json2Size: jsonString2.length,
      json1Lines: jsonString1.split('\n').length,
      json2Lines: jsonString2.split('\n').length,
      deepEqual: JSON.stringify(obj1) === JSON.stringify(obj2)
    };
  } catch (err) {
    return { error: err.message };
  }
};

/**
 * Export diff as formatted text
 */
export const exportDiffAsText = (diffResult, viewMode) => {
  const lines = [];
  lines.push('JSON DIFF COMPARISON REPORT');
  lines.push('=' .repeat(60));
  lines.push('');
  
  if (diffResult.stats) {
    lines.push('STATISTICS:');
    lines.push(`  Total Changes: ${diffResult.stats.totalChanges}`);
    lines.push(`  Added: ${diffResult.stats.added}`);
    lines.push(`  Removed: ${diffResult.stats.removed}`);
    lines.push(`  Modified: ${diffResult.stats.modified}`);
    lines.push(`  Unchanged: ${diffResult.stats.unchanged}`);
    lines.push('');
    lines.push('-'.repeat(60));
    lines.push('');
  }
  
  if (viewMode === 'unified' && diffResult.unifiedLines) {
    lines.push('UNIFIED DIFF:');
    lines.push('');
    diffResult.unifiedLines.forEach((line) => {
      const prefix = line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  ';
      lines.push(`${prefix}${line.content}`);
    });
  } else if (diffResult.leftLines && diffResult.rightLines) {
    lines.push('SIDE-BY-SIDE DIFF:');
    lines.push('');
    lines.push('ORIGINAL (LEFT)                    | MODIFIED (RIGHT)');
    lines.push('-'.repeat(60));
    const maxLen = Math.max(diffResult.leftLines.length, diffResult.rightLines.length);
    for (let i = 0; i < maxLen; i++) {
      const left = diffResult.leftLines[i];
      const right = diffResult.rightLines[i];
      const leftContent = left ? left.content : '';
      const rightContent = right ? right.content : '';
      lines.push(`${leftContent.padEnd(30)} | ${rightContent}`);
    }
  }
  
  return lines.join('\n');
};

/**
 * Search within diff lines
 */
export const searchInDiff = (diffResult, searchTerm, viewMode) => {
  if (!searchTerm) return [];
  
  const results = [];
  const term = searchTerm.toLowerCase();
  
  if (viewMode === 'unified' && diffResult.unifiedLines) {
    diffResult.unifiedLines.forEach((line, index) => {
      if (line.content.toLowerCase().includes(term)) {
        results.push({ index, line: line.content, type: line.type });
      }
    });
  } else if (diffResult.leftLines && diffResult.rightLines) {
    diffResult.leftLines.forEach((line, index) => {
      if (line.content.toLowerCase().includes(term)) {
        results.push({ index, line: line.content, type: line.type, side: 'left' });
      }
    });
    diffResult.rightLines.forEach((line, index) => {
      if (line.content.toLowerCase().includes(term)) {
        results.push({ index, line: line.content, type: line.type, side: 'right' });
      }
    });
  }
  
  return results;
};