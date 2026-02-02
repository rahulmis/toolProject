/**
 * Word & Character Counter - Metadata
 * 
 * This file contains all the metadata for the Word & Character Counter tool.
 * It's imported by the tools registry for routing, navigation, and SEO.
 */

import { lazy } from 'react';

// Lazy load the component for code splitting
const WordCounterComponent = lazy(() => import('./WordCounter'));

const metadata = {
  // Core identifiers
  id: 'word-counter',
  slug: 'word-counter', // Used in URL: /word-counter
  
  // Display information
  name: 'Word & Character Counter',
  description: 'Count words, characters, sentences, and paragraphs instantly. Includes reading and speaking time estimates.',
  longDescription: 'A free online word and character counter that provides real-time statistics as you type. Count words, characters (with and without spaces), sentences, paragraphs, and lines. Also estimates reading and speaking times. Perfect for writers, students, bloggers, and content creators. All processing happens in your browser for maximum privacy.',
  
  // Organization
  category: 'Text Tools',
  icon: '📊',
  tags: ['word count', 'character count', 'text counter', 'word counter', 'text statistics', 'writing', 'content', 'text analysis'],
  
  // Component (lazy loaded)
  component: WordCounterComponent,
  
  // Features
  featured: true,
  premium: false,
  
  // SEO metadata
  seo: {
    title: 'Free Word Counter | Character Counter & Text Statistics',
    description: 'Count words, characters, sentences, and paragraphs online. Free word counter with reading time estimates and live updates. Perfect for writers and content creators.',
    keywords: ['word counter', 'character counter', 'word count online', 'character count', 'text counter', 'sentence counter', 'paragraph counter', 'reading time calculator'],
    ogTitle: 'Word & Character Counter - Free Online Text Counter',
    ogDescription: 'Count words, characters, sentences and more with our free online tool. Real-time updates and reading time estimates.',
    ogImage: '/og-images/word-counter.png',
  },

  faqs: [
    {
      question: 'How does the word counter work?',
      answer:
        'The word counter analyzes your text in real-time as you type or paste content. It counts words by splitting the text by whitespace and filtering empty strings, providing accurate word counts.',
    },
    {
      question: 'Does it count characters with or without spaces?',
      answer:
        'Both! The tool shows characters with spaces (total length) and characters without spaces (excluding all whitespace). This gives you complete flexibility for different requirements.',
    },
    {
      question: 'How is reading time calculated?',
      answer:
        'Reading time is estimated based on an average reading speed of 200 words per minute. Speaking time uses 130 words per minute. These are industry-standard averages.',
    },
    {
      question: 'Is my text data safe?',
      answer:
        'Yes. All counting and analysis happens directly in your browser. Your text is never uploaded to any server or stored anywhere.',
    },
    {
      question: 'Can I use this for essays or blog posts?',
      answer:
        'Absolutely! This tool is perfect for essays, blog posts, articles, social media posts, or any written content. It helps you meet word count requirements and understand your content length.',
    },
  ],
  
  // Analytics (future)
  analytics: {
    category: 'text-tools',
    action: 'use-word-counter',
  },
  
  // Related tools (future feature)
  relatedTools: ['text-case-converter', 'json-formatter', 'base64-encode-decode'],
  
  // Tool-specific settings
  settings: {
    hasBackend: false, // Pure frontend tool
    browserOnly: true,
    offlineCapable: true,
  },
  
  // Tool Details for "About This Tool" section
  toolDetails: {
    what: 'This Word & Character Counter is a free online tool designed for writers, students, bloggers, content creators, and anyone who needs to analyze text statistics. It provides real-time counts of words, characters (with and without spaces), sentences, paragraphs, and lines. Additionally, it estimates reading and speaking times based on industry-standard averages, helping you understand how long your content will take to consume.',
    
    howToUse: [
      'Type or paste your text into the large textarea',
      'Statistics update automatically as you type',
      'View word count, character count, sentences, and paragraphs',
      'Check reading time estimate (based on 200 words/minute)',
      'Check speaking time estimate (based on 130 words/minute)',
      'See average word length for vocabulary analysis',
      'Click "Load Sample" to see example statistics',
      'Click "Clear" to reset and start fresh'
    ],
    
    features: [
      'Real-time counting as you type',
      'Word count - total number of words',
      'Character count with spaces - total length including spaces',
      'Character count without spaces - excluding all whitespace',
      'Sentence count - based on punctuation',
      'Paragraph count - separated by double line breaks',
      'Line count - total number of lines',
      'Average word length - for vocabulary analysis',
      'Reading time estimate - at 200 words per minute',
      'Speaking time estimate - at 130 words per minute',
      'Clean, easy-to-read statistics panel',
      'Sample text for testing',
      'Works offline once loaded',
      'No character limits'
    ],
    
    privacy: {
      browserBased: true,
      note: 'All text counting and analysis happens directly in your browser using JavaScript. Your text is never uploaded to any server, stored in any database, or transmitted over the network. You can even use this tool offline once the page has loaded.'
    }
  },
};

export default metadata;
