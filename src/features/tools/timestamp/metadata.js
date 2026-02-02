/**
 * Timestamp Converter - Metadata
 * 
 * This file contains all the metadata for the Timestamp Converter tool.
 * It's imported by the tools registry for routing, navigation, and SEO.
 */

import { lazy } from 'react';

// Lazy load the component for code splitting
const TimestampConverterComponent = lazy(() => import('./TimestampConverter'));

const metadata = {
  // Core identifiers
  id: 'timestamp-converter',
  slug: 'timestamp-converter', // Used in URL: /timestamp-converter
  
  // Display information
  name: 'Timestamp Converter',
  description: 'Convert Unix timestamps to dates and dates to timestamps. Supports seconds, milliseconds, UTC, and local timezones.',
  longDescription: 'A free online timestamp converter tool that converts Unix timestamps to human-readable dates and vice versa. Supports both seconds and milliseconds, UTC and local timezones, with detailed date breakdowns and relative time calculations. All processing happens in your browser for maximum privacy.',
  
  // Organization
  category: 'Developer Tools',
  icon: '🕐',
  tags: ['timestamp', 'unix', 'epoch', 'date', 'time', 'converter', 'timezone', 'utc', 'developer'],
  
  // Component (lazy loaded)
  component: TimestampConverterComponent,
  
  // Features
  featured: true,
  premium: false,
  
  // SEO metadata
  seo: {
    title: 'Free Timestamp Converter | Unix Time to Date Converter',
    description: 'Convert Unix timestamps to dates and dates to timestamps online. Free timestamp converter with UTC/local timezone support, seconds/milliseconds, and detailed breakdowns. All processing happens in your browser.',
    keywords: ['timestamp converter', 'unix timestamp', 'epoch converter', 'unix time', 'timestamp to date', 'date to timestamp', 'utc converter'],
    ogTitle: 'Timestamp Converter - Unix Time & Date Converter',
    ogDescription: 'Convert between Unix timestamps and human-readable dates with our free online tool. Privacy-focused with in-browser processing.',
    ogImage: '/og-images/timestamp-converter.png',
  },

  faqs: [
    {
      question: 'What is a Unix timestamp?',
      answer:
        'A Unix timestamp (also called Epoch time) is the number of seconds or milliseconds since January 1, 1970, 00:00:00 UTC. It\'s a standard way to represent dates/times in programming.',
    },
    {
      question: 'What\'s the difference between seconds and milliseconds?',
      answer:
        'Unix timestamps can be in seconds (10 digits, e.g., 1609459200) or milliseconds (13 digits, e.g., 1609459200000). Milliseconds provide more precision. JavaScript Date.now() returns milliseconds.',
    },
    {
      question: 'Is this Timestamp Converter free to use?',
      answer:
        'Yes, this timestamp converter is completely free and can be used without any registration or limitations.',
    },
    {
      question: 'Is my data safe?',
      answer:
        'Yes. All timestamp conversions happen directly in your browser. Your data is never uploaded to any server.',
    },
    {
      question: 'What date formats are supported for input?',
      answer:
        'The tool supports ISO 8601 format (YYYY-MM-DD HH:MM:SS), ISO strings, and any date format that JavaScript Date can parse.',
    },
    {
      question: 'What\'s the difference between UTC and Local time?',
      answer:
        'UTC (Coordinated Universal Time) is the global time standard. Local time is your browser\'s timezone. Use UTC for consistent timestamps across timezones.',
    },
  ],
  
  // Analytics (future)
  analytics: {
    category: 'developer-tools',
    action: 'use-timestamp-converter',
  },
  
  // Related tools (future feature)
  relatedTools: ['base64-encode-decode', 'json-formatter', 'url-encoder'],
  
  // Tool-specific settings
  settings: {
    hasBackend: false, // Pure frontend tool
    browserOnly: true,
    offlineCapable: true,
  },
  
  // Tool Details for "About This Tool" section
  toolDetails: {
    what: 'This Timestamp Converter is a free online tool designed for developers and anyone working with Unix timestamps (Epoch time). It converts Unix timestamps to human-readable dates and dates to Unix timestamps. Supports both seconds and milliseconds formats, UTC and local timezones, and provides detailed date breakdowns including relative time (e.g., "2 hours ago").',
    
    howToUse: [
      'To convert timestamp to date: Enter a Unix timestamp (seconds or milliseconds) and click "Convert to Date"',
      'To convert date to timestamp: Enter a date/time string (e.g., 2024-01-01 12:00:00) and click "Convert to Timestamp"',
      'Toggle between seconds/milliseconds using the unit selector',
      'Toggle between UTC/Local timezone using the timezone selector',
      'Click "Use Current Time" to load the current timestamp',
      'Use "Copy to Clipboard" to quickly copy results',
      'View detailed breakdown including day of week, timezone, and relative time'
    ],
    
    features: [
      'Convert Unix timestamp to human-readable date',
      'Convert date/time to Unix timestamp',
      'Support for both seconds (10 digits) and milliseconds (13 digits)',
      'UTC and local timezone support',
      'Detailed date breakdown (year, month, day, time components)',
      'Relative time calculations (e.g., "2 hours ago")',
      'Copy to clipboard functionality',
      'Current timestamp button for quick access',
      'Input validation with helpful error messages',
      'Works offline once loaded'
    ],
    
    privacy: {
      browserBased: true,
      note: 'All timestamp conversions happen directly in your browser using the native JavaScript Date API. Your data is never uploaded to any server, stored in any database, or transmitted over the network. You can even use this tool offline once the page has loaded.'
    }
  },
};

export default metadata;
