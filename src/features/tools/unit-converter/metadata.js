/**
 * Unit Converter - Metadata
 * 
 * This file contains all metadata for the Unit Converter tool including
 * descriptions, SEO information, and FAQ content.
 */

import { lazy } from 'react';

// Lazy load the component for code splitting
const UnitConverterComponent = lazy(() => import('./UnitConverter'));

const metadata = {
  // Core identifiers
  id: 'unit-converter',
  slug: 'unit-converter',
  
  // Display information
  name: 'Unit Converter',
  description: 'Convert length, weight, temperature, area, and volume units easily.',
  longDescription: 'A comprehensive unit converter for everyday use. Convert between different units of length, weight, temperature, area, and volume instantly in your browser.',
  
  // Organization
  category: 'Utility Tools',
  icon: '🔄',
  tags: ['unit converter', 'convert units', 'length converter', 'weight converter', 'temperature converter', 'area converter', 'volume converter', 'metric to imperial', 'imperial to metric'],
  
  // Component (lazy loaded)
  component: UnitConverterComponent,
  
  // Features
  featured: false,
  premium: false,
  
  // SEO metadata
  seo: {
    title: 'Unit Converter - Convert Length, Weight, Temperature & More | Free Online Tool',
    description: 'Free online unit converter for length, weight, temperature, area, and volume. Convert meters to feet, kilograms to pounds, Celsius to Fahrenheit, and more instantly.',
    keywords: ['unit converter', 'convert units', 'length converter', 'weight converter', 'temperature converter', 'area converter', 'volume converter', 'metric to imperial', 'imperial to metric', 'meters to feet', 'kg to lbs', 'celsius to fahrenheit', 'online converter', 'free converter'],
    ogTitle: 'Unit Converter - Free Online Tool',
    ogDescription: 'Convert between metric and imperial units instantly. Length, weight, temperature, area, and volume conversions.',
    ogImage: '/og-images/unit-converter.png',
  },

  faqs: [
    {
      question: 'How accurate are the conversions?',
      answer: 'All conversions use standard conversion factors and are accurate to 8 decimal places. For example, 1 inch = 0.0254 meters exactly, 1 pound = 453.59237 grams.'
    },
    {
      question: 'Can I convert between metric and imperial units?',
      answer: 'Yes! The converter seamlessly handles conversions between metric units (meters, kilograms, Celsius) and imperial units (feet, pounds, Fahrenheit).'
    },
    {
      question: 'Why do I see exponential notation for some results?',
      answer: 'Very large numbers (>1 billion) or very small numbers (<0.000001) are displayed in exponential notation (e.g., 1.23e+6) for clarity and readability.'
    },
    {
      question: 'How do I convert temperature?',
      answer: 'Select "Temperature" category, enter your value, choose your source unit (Celsius, Fahrenheit, or Kelvin), and select your target unit. The result updates instantly.'
    },
    {
      question: 'What\'s the difference between weight and mass?',
      answer: 'In everyday use, they\'re the same. This converter uses "weight" for simplicity, but technically converts mass units (grams, kilograms, pounds).'
    },
    {
      question: 'Is my data stored or sent anywhere?',
      answer: 'No. All conversions are performed entirely in your browser using JavaScript. No data is uploaded to any server, stored in any database, or transmitted over the network. Everything stays private on your device.'
    }
  ],
  
  // Analytics (future)
  analytics: {
    category: 'utility-tools',
    action: 'use-unit-converter',
  },
  
  // Related tools
  relatedTools: ['percentage-calculator', 'date-calculator', 'text-case-converter'],
  
  // Tool-specific settings
  settings: {
    hasBackend: false,
    browserOnly: true,
    offlineCapable: true,
  },
  
  // Tool Details for "About This Tool" section
  toolDetails: {
    what: 'This Unit Converter is a comprehensive online tool for converting between different units of measurement. Convert length, weight, temperature, area, and volume units instantly with support for both metric and imperial systems. Perfect for students, travelers, cooks, fitness enthusiasts, and professionals who need quick and accurate unit conversions.',
    
    howToUse: [
      'Select the conversion category (Length, Weight, Temperature, Area, or Volume)',
      'Enter the value you want to convert in the "From" field',
      'Choose the unit you\'re converting from',
      'Select the unit you want to convert to',
      'Results are calculated instantly as you type',
      'Use the Swap button to quickly reverse the conversion'
    ],
    
    features: [
      '5 conversion categories (Length, Weight, Temperature, Area, Volume)',
      '34 different units across all categories',
      'Live conversion - results update as you type',
      'Swap button for quick unit reversal',
      'High precision calculations (8 decimal places)',
      'Smart number formatting with exponential notation',
      'Common conversions reference for each category',
      'Support for metric and imperial systems',
      'Mobile-friendly responsive design',
      'Works entirely in your browser',
      'No data sent to servers',
      'Example values for quick testing'
    ],
    
    privacy: {
      browserBased: true,
      note: 'All unit conversions are performed directly in your browser using JavaScript. No data is uploaded to any server, stored in any database, or transmitted over the network. Your conversions remain completely private on your device.'
    }
  },
};

export default metadata;
