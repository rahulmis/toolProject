/**
 * JWT Decoder - Metadata
 * 
 * This file contains all the metadata for the JWT Decoder tool.
 * It's imported by the tools registry for routing, navigation, and SEO.
 */

import { lazy } from 'react';

// Lazy load the component for code splitting
const JwtDecoderComponent = lazy(() => import('./JwtDecoder'));

const metadata = {
  // Core identifiers
  id: 'jwt-decoder',
  slug: 'jwt-decoder', // Used in URL: /jwt-decoder
  
  // Display information
  name: 'JWT Decoder',
  description: 'Decode JWT tokens to view header and payload without verifying the signature. Perfect for debugging and inspecting JWTs.',
  longDescription: 'A free online JWT (JSON Web Token) decoder that decodes and displays the header and payload in readable JSON format. Perfect for developers debugging authentication, inspecting token claims, and understanding JWT structure. All processing happens in your browser for maximum privacy - no tokens are sent to any server.',
  
  // Organization
  category: 'Developer Tools',
  icon: '🔑',
  tags: ['jwt', 'json web token', 'decode', 'token', 'auth', 'authentication', 'developer', 'security'],
  
  // Component (lazy loaded)
  component: JwtDecoderComponent,
  
  // Features
  featured: true,
  premium: false,
  
  // SEO metadata
  seo: {
    title: 'Free JWT Decoder | JSON Web Token Decoder Online',
    description: 'Decode JWT tokens online to view header and payload. Free JWT decoder with expiration check, algorithm info, and copy to clipboard. All processing happens in your browser.',
    keywords: ['jwt decoder', 'json web token decoder', 'jwt decode online', 'decode jwt', 'jwt debugger', 'jwt viewer', 'token decoder'],
    ogTitle: 'JWT Decoder - Decode JSON Web Tokens Online',
    ogDescription: 'Decode and inspect JWT tokens with our free online tool. Privacy-focused with in-browser processing.',
    ogImage: '/og-images/jwt-decoder.png',
  },

  faqs: [
    {
      question: 'What is a JWT (JSON Web Token)?',
      answer:
        'JWT is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object. It consists of three parts: header, payload, and signature, separated by dots.',
    },
    {
      question: 'Does this tool verify the JWT signature?',
      answer:
        'No, this is a decode-only tool. It displays the header and payload but does not verify the signature. Signature verification requires the secret key and should be done server-side.',
    },
    {
      question: 'Is it safe to paste my JWT token here?',
      answer:
        'Yes. All JWT decoding happens directly in your browser. Your tokens are never uploaded to any server, stored in any database, or transmitted over the network.',
    },
    {
      question: 'What information can I see in a JWT?',
      answer:
        'You can see the algorithm and token type in the header, and claims (like user ID, expiration time, roles) in the payload. The signature is shown as-is without verification.',
    },
    {
      question: 'Why does my JWT have three parts?',
      answer:
        'JWTs have three Base64URL-encoded parts separated by dots: header (algorithm and type), payload (claims/data), and signature (for verification). This tool decodes the first two parts.',
    },
    {
      question: 'Can this tool decode expired tokens?',
      answer:
        'Yes, this tool can decode any structurally valid JWT regardless of expiration. It will also show you if the token is expired based on the "exp" claim.',
    },
  ],
  
  // Analytics (future)
  analytics: {
    category: 'developer-tools',
    action: 'use-jwt-decoder',
  },
  
  // Related tools (future feature)
  relatedTools: ['base64-encode-decode', 'json-formatter', 'url-encode-decode'],
  
  // Tool-specific settings
  settings: {
    hasBackend: false, // Pure frontend tool
    browserOnly: true,
    offlineCapable: true,
  },
  
  // Tool Details for "About This Tool" section
  toolDetails: {
    what: 'This JWT Decoder is a free online tool designed for developers working with JSON Web Tokens (JWTs). It decodes JWT tokens to display the header and payload in readable JSON format, making it easy to inspect token contents, check expiration times, view claims, and understand token structure. This is a decode-only tool that does not verify signatures - perfect for debugging and development.',
    
    howToUse: [
      'Paste your JWT token into the input field',
      'The tool automatically decodes and displays the header and payload',
      'View the decoded header (algorithm, token type)',
      'View the decoded payload (claims, user data, expiration)',
      'Check if the token is expired using the expiration indicator',
      'Use "Copy to Clipboard" buttons to copy individual sections',
      'Click "Load Sample" to see an example JWT token',
      'Click "Clear" to reset and start fresh'
    ],
    
    features: [
      'Instant JWT decoding with automatic parsing',
      'Displays header (algorithm, type) in formatted JSON',
      'Displays payload (claims, data) in formatted JSON',
      'Shows signature as raw string',
      'Automatic expiration checking and countdown',
      'Human-readable timestamps for iat, exp, nbf claims',
      'Algorithm information and type (symmetric/asymmetric)',
      'Copy to clipboard for each section',
      'Input validation with helpful error messages',
      'Sample JWT token for testing',
      'Works offline once loaded',
      'No signature verification (decode-only)'
    ],
    
    privacy: {
      browserBased: true,
      note: 'All JWT decoding happens directly in your browser using JavaScript. Your tokens are never uploaded to any server, stored in any database, or transmitted over the network. This tool only decodes and displays the token structure - it does not verify signatures or store any data. You can even use this tool offline once the page has loaded.'
    }
  },
};

export default metadata;
