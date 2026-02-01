/**
 * TOOLS REGISTRY - Platform Core
 * 
 * This is the central registry that drives the entire tools platform.
 * It provides a single source of truth for:
 * - Routing (automatic route generation)
 * - Navigation (tool discovery and linking)
 * - SEO metadata (titles, descriptions, tags)
 * - Search (tool indexing)
 * - Analytics (future: usage tracking)
 * 
 * HOW TO ADD A NEW TOOL:
 * 1. Create a new folder under src/features/tools/[tool-slug]/
 * 2. Import the tool's metadata from its folder
 * 3. Add the metadata to the TOOLS array below
 * 
 * The platform automatically handles:
 * ✓ Route creation
 * ✓ Navigation updates
 * ✓ Search indexing
 * ✓ SEO optimization
 */

import jsonFormatterMeta from './json-formatter/metadata';
import imageConverterMeta from './image-converter/metadata';
import jsonDiffMeta from './json-diff/metadata';
/**
 * Tool Categories
 * Organize tools into logical groups for better UX
 */
export const TOOL_CATEGORIES = {
  DEVELOPER: 'Developer Tools',
  IMAGE: 'Image Tools',
  PDF: 'PDF Tools',
  TEXT: 'Text Tools',
  CONVERTER: 'Converters',
  CRYPTO: 'Crypto & Security',
  DATA: 'Data Tools',
};

/**
 * Tools Registry
 * 
 * Each tool exports its metadata from its own folder.
 * This keeps tools self-contained and easy to manage.
 * 
 * Tool metadata schema:
 * - id: string (unique identifier, used in URLs)
 * - slug: string (URL-friendly version of id)
 * - name: string (display name)
 * - description: string (short description for cards)
 * - longDescription: string (detailed description for SEO)
 * - category: string (from TOOL_CATEGORIES)
 * - icon: string (emoji or icon identifier)
 * - tags: string[] (for search and SEO)
 * - component: React.Component (lazy-loaded)
 * - featured: boolean (show on homepage prominently)
 * - seo: object (meta tags, og tags, etc.)
 */
export const TOOLS = [
  jsonFormatterMeta,
  imageConverterMeta,
  jsonDiffMeta,
  
  // Future tools: Just import and add to array
  // import pdfMergerMeta from './pdf-merger/metadata';
  // pdfMergerMeta,
];

/**
 * Registry Helper Functions
 * Utility functions for working with the tools registry
 */

/**
 * Get a tool by its ID
 */
export const getToolById = (id) => {
  return TOOLS.find(tool => tool.id === id);
};

/**
 * Get a tool by its slug (URL path)
 */
export const getToolBySlug = (slug) => {
  // Remove leading slash if present
  const cleanSlug = slug.startsWith('/') ? slug.substring(1) : slug;
  return TOOLS.find(tool => tool.slug === cleanSlug);
};

/**
 * Get all featured tools
 */
export const getFeaturedTools = () => {
  return TOOLS.filter(tool => tool.featured);
};

/**
 * Get tools by category
 */
export const getToolsByCategory = (category) => {
  return TOOLS.filter(tool => tool.category === category);
};

/**
 * Get all categories that have tools
 */
export const getActiveCategories = () => {
  const categories = new Set(TOOLS.map(tool => tool.category));
  return Array.from(categories);
};

/**
 * Search tools by query
 * Searches in: name, description, tags
 */
export const searchTools = (query) => {
  if (!query || query.trim() === '') return TOOLS;
  
  const lowerQuery = query.toLowerCase();
  return TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Get tools grouped by category
 * Returns: { categoryName: [tools], ... }
 */
export const getToolsGroupedByCategory = () => {
  const grouped = {};
  TOOLS.forEach(tool => {
    if (!grouped[tool.category]) {
      grouped[tool.category] = [];
    }
    grouped[tool.category].push(tool);
  });
  return grouped;
};

/**
 * Get total tool count
 */
export const getToolCount = () => TOOLS.length;

/**
 * Validate tool metadata
 * Use this during development to ensure all tools have required fields
 */
export const validateToolMetadata = (toolMeta) => {
  const required = ['id', 'slug', 'name', 'description', 'category', 'component'];
  const missing = required.filter(field => !toolMeta[field]);
  
  if (missing.length > 0) {
    console.error(`Tool metadata validation failed. Missing fields: ${missing.join(', ')}`);
    return false;
  }
  
  return true;
};

// Development mode: Validate all tools
if (process.env.NODE_ENV === 'development') {
  TOOLS.forEach(tool => {
    if (!validateToolMetadata(tool)) {
      console.error(`Invalid metadata for tool: ${tool.name || 'Unknown'}`);
    }
  });
}

export default TOOLS;
