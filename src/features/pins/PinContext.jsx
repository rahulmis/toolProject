/**
 * Pin Context - Global State Management
 * 
 * Provides centralized pin state management across the entire app.
 * When one component updates pins, all other components automatically sync.
 * 
 * BENEFITS:
 * - Single source of truth for pin state
 * - Automatic synchronization across components
 * - No redundant API/storage calls
 * - Easy to add global pin-related features
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getPinnedTools, pinTool, unpinTool, togglePin as storeTogglePin } from './pinStorage';

const PinContext = createContext(null);

/**
 * Pin Provider Component
 * Wrap your app with this to enable pin management
 */
export const PinProvider = ({ children }) => {
  const [pinnedTools, setPinnedTools] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load pins on mount
  useEffect(() => {
    loadPins();
  }, []);

  // Load pins from storage
  const loadPins = async () => {
    setLoading(true);
    try {
      const pinned = await getPinnedTools();
      setPinnedTools(pinned);
    } catch (err) {
      console.error('Error loading pins:', err);
      setPinnedTools([]);
    } finally {
      setLoading(false);
    }
  };

  // Check if tool is pinned
  const isPinned = useCallback((toolId) => {
    return pinnedTools.includes(toolId);
  }, [pinnedTools]);

  // Pin a tool
  const pin = useCallback(async (toolId) => {
    const success = await pinTool(toolId);
    if (success) {
      await loadPins(); // Reload to sync state
    }
    return success;
  }, []);

  // Unpin a tool
  const unpin = useCallback(async (toolId) => {
    const success = await unpinTool(toolId);
    if (success) {
      await loadPins(); // Reload to sync state
    }
    return success;
  }, []);

  // Toggle pin
  const toggle = useCallback(async (toolId) => {
    const newStatus = await storeTogglePin(toolId);
    await loadPins(); // Reload to sync state
    return newStatus;
  }, []);

  const value = {
    pinnedTools,
    loading,
    isPinned,
    pin,
    unpin,
    toggle,
    refresh: loadPins,
    pinnedCount: pinnedTools.length,
  };

  return <PinContext.Provider value={value}>{children}</PinContext.Provider>;
};

/**
 * Hook to use pin context
 * Must be used within PinProvider
 */
export const usePinContext = () => {
  const context = useContext(PinContext);
  if (!context) {
    throw new Error('usePinContext must be used within PinProvider');
  }
  return context;
};

export default PinContext;
