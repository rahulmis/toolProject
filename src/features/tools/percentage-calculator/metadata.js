/**
 * Percentage Calculator - Metadata
 * 
 * This file contains all the metadata for the Percentage Calculator tool.
 * It's imported by the tools registry for routing, navigation, and SEO.
 */

import { lazy } from 'react';

// Lazy load the component for code splitting
const PercentageCalculatorComponent = lazy(() => import('./PercentageCalculator'));

const metadata = {
  // Core identifiers
  id: 'percentage-calculator',
  slug: 'percentage-calculator',
  
  // Display information
  name: 'Percentage Calculator',
  description: 'Calculate percentages, increases, decreases, and more. Simple and fast percentage calculations for everyday use.',
  longDescription: 'A free online percentage calculator that helps you solve common percentage problems quickly. Calculate what percentage one number is of another, find percentage increases or decreases, add or subtract percentages from values, and more. Perfect for students, shoppers, business professionals, or anyone who needs to work with percentages. All calculations happen instantly in your browser.',
  
  // Organization
  category: 'Math Tools',
  icon: '%',
  tags: ['percentage calculator', 'percent', 'percentage increase', 'percentage decrease', 'percentage of', 'math', 'calculator'],
  
  // Component (lazy loaded)
  component: PercentageCalculatorComponent,
  
  // Features
  featured: true,
  premium: false,
  
  // SEO metadata
  seo: {
    title: 'Free Percentage Calculator | Calculate Percentages Online',
    description: 'Free online percentage calculator. Calculate what is X% of Y, percentage increases/decreases, and more. Fast, accurate, and easy to use.',
    keywords: ['percentage calculator', 'percent calculator', 'calculate percentage', 'percentage increase', 'percentage decrease', 'percentage of number'],
    ogTitle: 'Percentage Calculator - Free Online Tool',
    ogDescription: 'Calculate percentages easily with our free online calculator. Perfect for students, shoppers, and professionals.',
    ogImage: '/og-images/percentage-calculator.png',
  },

  faqs: [
    {
      question: 'How do I calculate what is X% of Y?',
      answer:
        'To find what X% of Y is, divide the percentage by 100 and multiply by the value. For example, 20% of 150 is (20/100) × 150 = 30. Use the "What is X% of Y?" calculator for instant results.',
    },
    {
      question: 'How do I calculate percentage increase?',
      answer:
        'To calculate percentage increase, subtract the original value from the new value, divide by the original value, then multiply by 100. Formula: ((New - Old) / Old) × 100. For example, from 50 to 75: ((75-50)/50) × 100 = 50% increase.',
    },
    {
      question: 'How do I find what percentage one number is of another?',
      answer:
        'To find what percentage X is of Y, divide X by Y and multiply by 100. Formula: (X / Y) × 100. For example, 30 is what percent of 150? (30/150) × 100 = 20%.',
    },
    {
      question: 'What\'s the difference between percentage increase and decrease?',
      answer:
        'Percentage increase shows how much a value has grown, while percentage decrease shows how much it has reduced. Both use the original value as the base. A 50% increase from 100 is 150, while a 50% decrease from 100 is 50.',
    },
    {
      question: 'Can I use this for calculating discounts?',
      answer:
        'Yes! To calculate a discount, use the "Subtract X% from value" calculator. For example, a 25% discount on $80 means you subtract 25% from 80, resulting in $60. The calculator will show both the discount amount ($20) and final price ($60).',
    },
    {
      question: 'Is this calculator accurate for financial calculations?',
      answer:
        'Yes, this calculator uses precise mathematical formulas and is suitable for financial calculations, budgeting, and business use. However, for critical financial decisions, always verify results and consult with financial professionals.',
    },
  ],
  
  // Analytics (future)
  analytics: {
    category: 'math-tools',
    action: 'use-percentage-calculator',
  },
  
  // Related tools
  relatedTools: ['word-counter', 'timestamp-converter', 'base64-encode-decode'],
  
  // Tool-specific settings
  settings: {
    hasBackend: false,
    browserOnly: true,
    offlineCapable: true,
  },
  
  // Tool Details for "About This Tool" section
  toolDetails: {
    what: 'This Percentage Calculator is a free online tool that helps you solve common percentage problems quickly and accurately. Whether you need to calculate what percentage one number is of another, find percentage increases or decreases, or add/subtract percentages from values, this calculator handles it all. Perfect for students solving math problems, shoppers calculating discounts, professionals analyzing data, or anyone working with percentages in daily life. All calculations are performed instantly in your browser with no data sent to any server.',
    
    howToUse: [
      'Select the type of calculation you need (tabs at the top)',
      'Enter your numbers in the input fields',
      'Results are calculated instantly as you type',
      'View detailed breakdowns for each calculation',
      'Use the examples provided for guidance',
      'Switch between different calculation types as needed'
    ],
    
    features: [
      'Multiple calculation types in one tool',
      'What is X% of Y? calculator',
      'X is what percentage of Y? calculator',
      'Percentage increase/decrease calculator',
      'Add percentage to a value',
      'Subtract percentage from a value',
      'Live calculation as you type',
      'Clear, formatted results with explanations',
      'Handles edge cases gracefully',
      'Mobile-friendly responsive design',
      'No data sent to servers',
      'Works offline once loaded',
      'Example values for each calculation type',
      'Formatted numbers for readability'
    ],
    
    privacy: {
      browserBased: true,
      note: 'All percentage calculations are performed directly in your browser using JavaScript. No data is uploaded to any server, stored in any database, or transmitted over the network. Your inputs and results remain completely private on your device.'
    }
  },
};

export default metadata;
