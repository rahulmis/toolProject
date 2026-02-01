/**
 * usePins Hook
 * 
 * Custom React hook for managing pinned tools.
 * Now uses React Context for global state synchronization.
 * 
 * FEATURES:
 * - Subscribe to pin changes globally
 * - Pin/unpin tools
 * - Check pin status
 * - Get pinned tools list
 * - Auto-syncs across all components
 * 
 * USAGE:
 * const { pinnedTools, isPinned, toggle, pin, unpin } = usePins();
 */

import { usePinContext } from './PinContext';

/**
 * Custom hook for pin management
 * Uses global context for state synchronization
 * 
 * @returns {Object} Pin management interface
 */
export const usePins = () => {
  return usePinContext();
};

/**
 * Hook for checking if a specific tool is pinned
 * Lighter version when you only need to check one tool
 * 
 * @param {string} toolId - Tool ID to check
 * @returns {Object} Pin status and toggle function
 */
export const useToolPin = (toolId) => {
  const { isPinned, toggle, loading } = usePinContext();

  const toggleThis = async () => {
    return await toggle(toolId);
  };

  return {
    isPinned: isPinned(toolId),
    loading,
    toggle: toggleThis,
  };
};

export default usePins;
