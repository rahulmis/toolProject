/**
 * Pin Storage Layer
 * 
 * Abstraction layer for storing pinned tools.
 * Currently uses localStorage, but designed to be easily replaced with:
 * - Backend API calls
 * - User account storage
 * - Cross-device sync
 * 
 * FUTURE MIGRATION PATH:
 * Replace functions in this file with API calls without changing
 * any other part of the application.
 */

const STORAGE_KEY = 'online-tools-pinned';

/**
 * Storage Interface
 * All functions return Promises for easy API migration
 */

/**
 * Get all pinned tool IDs
 * @returns {Promise<string[]>} Array of pinned tool IDs
 */
export const getPinnedTools = async () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error('Error reading pinned tools:', err);
    return [];
  }
};

/**
 * Pin a tool
 * @param {string} toolId - Tool ID to pin
 * @returns {Promise<boolean>} Success status
 */
export const pinTool = async (toolId) => {
  try {
    const pinned = await getPinnedTools();
    
    // Avoid duplicates
    if (pinned.includes(toolId)) {
      return true;
    }
    
    // Add to beginning (most recent pin appears first)
    const updated = [toolId, ...pinned];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    
    return true;
  } catch (err) {
    console.error('Error pinning tool:', err);
    return false;
  }
};

/**
 * Unpin a tool
 * @param {string} toolId - Tool ID to unpin
 * @returns {Promise<boolean>} Success status
 */
export const unpinTool = async (toolId) => {
  try {
    const pinned = await getPinnedTools();
    const updated = pinned.filter(id => id !== toolId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    
    return true;
  } catch (err) {
    console.error('Error unpinning tool:', err);
    return false;
  }
};

/**
 * Toggle pin status
 * @param {string} toolId - Tool ID to toggle
 * @returns {Promise<boolean>} New pin status (true = pinned, false = unpinned)
 */
export const togglePin = async (toolId) => {
  const pinned = await getPinnedTools();
  
  if (pinned.includes(toolId)) {
    await unpinTool(toolId);
    return false;
  } else {
    await pinTool(toolId);
    return true;
  }
};

/**
 * Check if a tool is pinned
 * @param {string} toolId - Tool ID to check
 * @returns {Promise<boolean>} Pin status
 */
export const isToolPinned = async (toolId) => {
  const pinned = await getPinnedTools();
  return pinned.includes(toolId);
};

/**
 * Reorder pinned tools
 * @param {string[]} orderedIds - New order of pinned tool IDs
 * @returns {Promise<boolean>} Success status
 */
export const reorderPinnedTools = async (orderedIds) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orderedIds));
    return true;
  } catch (err) {
    console.error('Error reordering pinned tools:', err);
    return false;
  }
};

/**
 * Clear all pins (useful for testing or user preference)
 * @returns {Promise<boolean>} Success status
 */
export const clearAllPins = async () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.error('Error clearing pins:', err);
    return false;
  }
};

// ========================================
// FUTURE: Backend API Implementation
// ========================================

/**
 * Example of how to migrate to backend API:
 * 
 * 1. Replace localStorage with API calls:
 * 
 * export const getPinnedTools = async () => {
 *   const response = await fetch('/api/user/pinned-tools', {
 *     headers: { 'Authorization': `Bearer ${getAuthToken()}` }
 *   });
 *   const data = await response.json();
 *   return data.pinnedTools;
 * };
 * 
 * 2. Add authentication:
 * 
 * export const pinTool = async (toolId) => {
 *   const response = await fetch('/api/user/pin-tool', {
 *     method: 'POST',
 *     headers: {
 *       'Authorization': `Bearer ${getAuthToken()}`,
 *       'Content-Type': 'application/json'
 *     },
 *     body: JSON.stringify({ toolId })
 *   });
 *   return response.ok;
 * };
 * 
 * 3. No other code changes needed! The hook and components
 *    will continue to work because they use async/await.
 */
