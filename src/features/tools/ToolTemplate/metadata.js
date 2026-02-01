/**
 * TOOL TEMPLATE - Metadata
 * 
 * Copy this file when creating a new tool.
 * Follow this structure for consistency across all tools.
 * 
 * INSTRUCTIONS:
 * 1. Copy this entire folder to: src/features/tools/[your-tool-slug]/
 * 2. Rename files to match your tool name
 * 3. Update all metadata fields below
 * 4. Implement your logic in logic.js
 * 5. Build your UI in [YourTool].jsx
 * 6. Import this metadata in src/features/tools/registry.js
 * 
 * That's it! The platform handles routing, navigation, and SEO automatically.
 */

import { lazy } from 'react';

// Lazy load your component for code splitting
const ToolTemplateComponent = lazy(() => import('./ToolTemplate'));

const metadata = {
  // ========================================
  // CORE IDENTIFIERS (Required)
  // ========================================
  
  /**
   * Unique identifier for this tool
   * Must be unique across all tools
   * Used internally and in URLs
   */
  id: 'tool-template',
  
  /**
   * URL-friendly slug (usually same as id)
   * This will be used in the URL: /tool-template
   */
  slug: 'tool-template',
  
  // ========================================
  // DISPLAY INFORMATION (Required)
  // ========================================
  
  /**
   * Display name shown in UI
   * Keep it short and descriptive (2-5 words)
   */
  name: 'Tool Template',
  
  /**
   * Short description for tool cards (1-2 sentences)
   * Shown on homepage and in search results
   */
  description: 'A template for creating new tools in the platform.',
  
  /**
   * Detailed description for SEO and tool pages (2-3 sentences)
   * More comprehensive than description
   */
  longDescription: 'This is a comprehensive template that shows you how to create new tools in the platform. It includes all the necessary files, structure, and patterns for building scalable, maintainable tools.',
  
  // ========================================
  // ORGANIZATION (Required)
  // ========================================
  
  /**
   * Tool category from TOOL_CATEGORIES
   * Used for grouping on homepage
   */
  category: 'Developer Tools', // Change to appropriate category
  
  /**
   * Icon/emoji representing this tool
   * Use emoji or icon identifier
   */
  icon: '🛠️',
  
  /**
   * Search tags (array of strings)
   * Used for search and SEO keywords
   * Include: tool type, actions, formats, use cases
   */
  tags: ['template', 'example', 'developer', 'boilerplate'],
  
  // ========================================
  // COMPONENT (Required)
  // ========================================
  
  /**
   * Lazy-loaded React component
   * Keep the lazy import at the top of this file
   */
  component: ToolTemplateComponent,
  
  // ========================================
  // FEATURES (Optional)
  // ========================================
  
  /**
   * Show prominently on homepage?
   */
  featured: false, // Set to true for important tools
  
  /**
   * Is this a premium/paid tool?
   */
  premium: false, // For future monetization
  
  // ========================================
  // SEO METADATA (Recommended)
  // ========================================
  
  seo: {
    /**
     * Page title for SEO (50-60 chars)
     * Format: "[Tool Name] | [Key Benefit] | [Brand]"
     */
    title: 'Tool Template | Create New Tools | OnlineTools',
    
    /**
     * Meta description (150-160 chars)
     * Should include: what it does, key benefits, unique value
     */
    metaDescription: 'Use this template to create new tools for the platform. Includes structure, patterns, and best practices for building scalable tools.',
    
    /**
     * SEO keywords (array)
     * Focus on long-tail keywords users might search
     */
    keywords: [
      'tool template',
      'create tool',
      'online tool builder',
      'tool boilerplate',
    ],
    
    /**
     * Open Graph title (for social sharing)
     */
    ogTitle: 'Tool Template - Create New Tools',
    
    /**
     * Open Graph description (for social sharing)
     */
    ogDescription: 'A comprehensive template for creating new tools in the platform.',
    
    /**
     * Open Graph image (for social sharing)
     * Path to image file (1200x630px recommended)
     */
    ogImage: '/og-images/tool-template.png',
  },
  
  // ========================================
  // ANALYTICS (Optional)
  // ========================================
  
  analytics: {
    /**
     * Category for analytics tracking
     */
    category: 'developer-tools',
    
    /**
     * Action name for analytics events
     */
    action: 'use-tool-template',
  },
  
  // ========================================
  // RELATED TOOLS (Optional)
  // ========================================
  
  /**
   * Array of related tool IDs
   * Used for "Related Tools" section (future feature)
   */
  relatedTools: [], // e.g., ['json-formatter', 'base64-encoder']
  
  // ========================================
  // TOOL SETTINGS (Optional)
  // ========================================
  
  settings: {
    /**
     * Does this tool require a backend API?
     */
    hasBackend: false,
    
    /**
     * Is this tool browser-only (no server needed)?
     */
    browserOnly: true,
    
    /**
     * Can this tool work offline?
     */
    offlineCapable: true,
    
    /**
     * Maximum file size for uploads (in bytes)
     * null = no limit
     */
    maxFileSize: null,
    
    /**
     * Supported file types (array)
     * null = no file upload
     */
    supportedFileTypes: null, // e.g., ['image/png', 'image/jpeg']
  },
  
  // ========================================
  // VERSIONING (Optional)
  // ========================================
  
  /**
   * Tool version
   * Use semantic versioning: MAJOR.MINOR.PATCH
   */
  version: '1.0.0',
  
  /**
   * Last updated date
   */
  lastUpdated: '2026-02-01',
};

export default metadata;
