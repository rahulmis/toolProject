/**
 * Date Calculator - Metadata
 * 
 * This file contains all the metadata for the Date Calculator tool.
 * It's imported by the tools registry for routing, navigation, and SEO.
 */

import { lazy } from 'react';

// Lazy load the component for code splitting
const DateCalculatorComponent = lazy(() => import('./DateCalculator'));

const metadata = {
  // Core identifiers
  id: 'date-calculator',
  slug: 'date-calculator',
  
  // Display information
  name: 'Date Calculator',
  description: 'Calculate days between dates or add/subtract days easily. Simple date calculations for everyday use.',
  longDescription: 'A free online date calculator that helps you calculate the number of days between two dates, add or subtract days from a date, and more. Perfect for planning events, tracking project timelines, calculating age, or any date-related calculations. All processing happens in your browser using native JavaScript - no external libraries required.',
  
  // Organization
  category: 'Date & Time Tools',
  icon: '📅',
  tags: ['date calculator', 'days between dates', 'add days', 'subtract days', 'date difference', 'time calculator', 'date math'],
  
  // Component (lazy loaded)
  component: DateCalculatorComponent,
  
  // Features
  featured: true,
  premium: false,
  
  // SEO metadata
  seo: {
    title: 'Free Date Calculator | Calculate Days Between Dates Online',
    description: 'Free online date calculator. Calculate days between two dates, add or subtract days from a date. Fast, accurate, and easy to use.',
    keywords: ['date calculator', 'days between dates', 'date difference', 'add days to date', 'subtract days from date', 'calculate days'],
    ogTitle: 'Date Calculator - Free Online Tool',
    ogDescription: 'Calculate days between dates or add/subtract days easily. Perfect for planning and date calculations.',
    ogImage: '/og-images/date-calculator.png',
  },

  faqs: [
    {
      question: 'How do I calculate days between two dates?',
      answer:
        'Select the "Days Between Dates" tab, choose your start date and end date using the date pickers, and the calculator will instantly show you the number of days between them. The result can be positive (if end date is after start date) or negative (if end date is before start date).',
    },
    {
      question: 'How do I add or subtract days from a date?',
      answer:
        'Select the "Add/Subtract Days" tab, choose your base date, enter the number of days you want to add or subtract, click the appropriate button, and see the resulting date instantly. You can also see the result formatted with the day of the week.',
    },
    {
      question: 'Does this calculator account for leap years?',
      answer:
        'Yes! The calculator uses JavaScript\'s native Date API which automatically handles leap years, different month lengths, and all calendar complexities correctly.',
    },
    {
      question: 'Can I calculate business days (excluding weekends)?',
      answer:
        'Currently, this calculator counts all calendar days including weekends and holidays. For business day calculations, you would need to manually account for non-working days.',
    },
    {
      question: 'What date format should I use?',
      answer:
        'The calculator uses standard date picker inputs, so you can click to select dates from a calendar. The format follows your browser\'s locale settings (typically MM/DD/YYYY in the US or DD/MM/YYYY in other regions).',
    },
    {
      question: 'Is my data stored or sent anywhere?',
      answer:
        'No. All date calculations are performed entirely in your browser using JavaScript. No dates or data are uploaded to any server, stored in any database, or transmitted over the network. Everything stays private on your device.',
    },
  ],
  
  // Analytics (future)
  analytics: {
    category: 'date-time-tools',
    action: 'use-date-calculator',
  },
  
  // Related tools
  relatedTools: ['timestamp-converter', 'percentage-calculator', 'word-counter'],
  
  // Tool-specific settings
  settings: {
    hasBackend: false,
    browserOnly: true,
    offlineCapable: true,
  },
  
  // Tool Details for "About This Tool" section
  toolDetails: {
    what: 'This Date Calculator is a free online tool that helps you perform common date calculations quickly and accurately. Calculate the number of days between two dates, add days to a date, or subtract days from a date. Perfect for event planning, project management, age calculation, deadline tracking, or any situation where you need to work with dates. All calculations use native JavaScript Date APIs and happen entirely in your browser with no data sent to any server.',
    
    howToUse: [
      'Choose the calculation type using the tabs (Days Between or Add/Subtract)',
      'For "Days Between": Select start date and end date',
      'For "Add/Subtract": Select base date, enter number of days, choose operation',
      'Results appear instantly as you make selections',
      'View detailed breakdowns including weeks, months, and years',
      'Use the examples provided for guidance'
    ],
    
    features: [
      'Calculate days between two dates',
      'Add days to a date',
      'Subtract days from a date',
      'Instant real-time calculations',
      'Handles leap years automatically',
      'Accounts for different month lengths',
      'Shows results with day of week',
      'Breakdown into years, months, weeks',
      'Clean date picker interface',
      'Mobile-friendly responsive design',
      'No data sent to servers',
      'Works offline once loaded',
      'Browser timezone handling',
      'Accurate to the day'
    ],
    
    privacy: {
      browserBased: true,
      note: 'All date calculations are performed directly in your browser using JavaScript\'s native Date API. No dates or data are uploaded to any server, stored in any database, or transmitted over the network. Your inputs and calculations remain completely private on your device.'
    }
  },
};

export default metadata;
