/**
 * Password Generator - Metadata
 * 
 * This file contains all the metadata for the Password Generator tool.
 * It's imported by the tools registry for routing, navigation, and SEO.
 */

import { lazy } from 'react';

// Lazy load the component for code splitting
const PasswordGeneratorComponent = lazy(() => import('./PasswordGenerator'));

const metadata = {
  // Core identifiers
  id: 'password-generator',
  slug: 'password-generator', // Used in URL: /password-generator
  
  // Display information
  name: 'Password Generator',
  description: 'Generate strong, secure passwords instantly in your browser. Customizable length and character types with copy-to-clipboard.',
  longDescription: 'A free online password generator that creates strong, secure passwords using cryptographically secure randomness. Customize password length (6-64 characters) and choose which character types to include: uppercase, lowercase, numbers, and symbols. All generation happens in your browser - passwords are never sent to any server or stored anywhere. Perfect for creating secure passwords for accounts, applications, and services.',
  
  // Organization
  category: 'Security Tools',
  icon: '🔒',
  tags: ['password generator', 'secure password', 'random password', 'strong password', 'password creator', 'security', 'crypto'],
  
  // Component (lazy loaded)
  component: PasswordGeneratorComponent,
  
  // Features
  featured: true,
  premium: false,
  
  // SEO metadata
  seo: {
    title: 'Free Password Generator | Create Strong Secure Passwords Online',
    description: 'Generate strong, secure passwords online with customizable length and character types. Free password generator using cryptographically secure randomness. Browser-based for maximum privacy.',
    keywords: ['password generator', 'secure password generator', 'random password', 'strong password creator', 'password maker', 'generate password online'],
    ogTitle: 'Password Generator - Create Secure Passwords Online',
    ogDescription: 'Generate strong, secure passwords with our free online tool. Cryptographically secure, browser-based, and private.',
    ogImage: '/og-images/password-generator.png',
  },

  faqs: [
    {
      question: 'How secure are the generated passwords?',
      answer:
        'Very secure! This tool uses crypto.getRandomValues(), which provides cryptographically secure random numbers. Passwords are generated entirely in your browser and never sent to any server.',
    },
    {
      question: 'Are my generated passwords stored anywhere?',
      answer:
        'No. Passwords are generated locally in your browser and are not stored, logged, or transmitted anywhere. Once you close the page, they\'re gone unless you\'ve copied them.',
    },
    {
      question: 'What makes a strong password?',
      answer:
        'A strong password is long (at least 12-16 characters), uses a mix of uppercase and lowercase letters, numbers, and symbols, and is unique for each account. Our generator creates passwords that meet all these criteria.',
    },
    {
      question: 'How long should my password be?',
      answer:
        'We recommend at least 16 characters for most accounts. For highly sensitive accounts (banking, email), consider 20+ characters. Longer passwords are exponentially harder to crack.',
    },
    {
      question: 'Should I include special symbols?',
      answer:
        'Yes, if the service allows it. Special symbols significantly increase password strength. However, some systems have restrictions, so adjust the options accordingly.',
    },
    {
      question: 'Can I trust this password generator?',
      answer:
        'Yes. The tool is open source, runs entirely in your browser, and uses the browser\'s built-in crypto.getRandomValues() API for secure randomness. No data is sent to any server.',
    },
  ],
  
  // Analytics (future)
  analytics: {
    category: 'security-tools',
    action: 'use-password-generator',
  },
  
  // Related tools (future feature)
  relatedTools: ['base64-encode-decode', 'jwt-decoder', 'url-encode-decode'],
  
  // Tool-specific settings
  settings: {
    hasBackend: false, // Pure frontend tool
    browserOnly: true,
    offlineCapable: true,
  },
  
  // Tool Details for "About This Tool" section
  toolDetails: {
    what: 'This Password Generator is a free online tool that creates strong, secure passwords using cryptographically secure randomness. You can customize the password length (6-64 characters) and choose which character types to include: uppercase letters, lowercase letters, numbers, and special symbols. All password generation happens entirely in your browser using the crypto.getRandomValues() API, ensuring maximum security and privacy. Generated passwords are never sent to any server or stored anywhere.',
    
    howToUse: [
      'Set your desired password length using the slider (6-64 characters)',
      'Select which character types to include (uppercase, lowercase, numbers, symbols)',
      'Click "Generate Password" to create a new secure password',
      'View the password strength indicator and entropy information',
      'Use "Copy to Clipboard" to copy the password',
      'Click "Generate New" to create another password',
      'Adjust settings and regenerate as needed'
    ],
    
    features: [
      'Cryptographically secure random generation using crypto.getRandomValues()',
      'Customizable password length (6-64 characters)',
      'Uppercase letters (A-Z) option',
      'Lowercase letters (a-z) option',
      'Numbers (0-9) option',
      'Special symbols (!@#$%^&*) option',
      'Password strength indicator (Weak to Very Strong)',
      'Entropy calculation in bits',
      'Time-to-crack estimate',
      'Copy to clipboard functionality',
      'Real-time validation',
      'No server communication - 100% browser-based',
      'No password storage or logging',
      'Works offline once loaded',
      'Mobile-friendly interface'
    ],
    
    privacy: {
      browserBased: true,
      note: 'All password generation happens directly in your browser using the crypto.getRandomValues() API, which provides cryptographically secure random numbers. Generated passwords are never uploaded to any server, stored in any database, logged, or transmitted over the network. They exist only in your browser\'s memory until you close the page or generate a new one. You can even use this tool offline once the page has loaded.'
    }
  },
};

export default metadata;
