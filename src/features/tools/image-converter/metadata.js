/**
 * Image Format Converter - Metadata
 */

import { lazy } from 'react';

const ImageConverterComponent = lazy(() => import('./ImageConverter'));

const metadata = {
  // Core identifiers
  id: 'image-converter',
  slug: 'image-converter',
  
  // Display information
  name: 'Image Format Converter',
  description: 'Convert images between PNG, JPG, and WebP formats instantly in your browser.',
  longDescription: 'A powerful browser-based image converter that supports PNG, JPG, and WebP formats. Convert images with quality control, preview before/after, and download results instantly. All processing happens in your browser for maximum privacy.',
  
  // Organization
  category: 'Image Tools',
  icon: '🖼️',
  tags: ['image', 'convert', 'png', 'jpg', 'jpeg', 'webp', 'format', 'converter', 'quality'],
  
  // Component
  component: ImageConverterComponent,
  
  // Features
  featured: true,
  premium: false,
  
  // SEO metadata
  seo: {
    title: 'Free Image Format Converter | PNG, JPG, WebP Converter',
    metaDescription: 'Convert images between PNG, JPG, and WebP formats online. Free image converter with quality control and instant preview. Browser-based for privacy.',
    keywords: ['image converter', 'png to jpg', 'jpg to png', 'webp converter', 'image format', 'convert image online', 'image tool'],
    ogTitle: 'Image Format Converter - Convert PNG, JPG, WebP',
    ogDescription: 'Convert images between PNG, JPG, and WebP formats instantly in your browser.',
    ogImage: '/og-images/image-converter.png',
  },
  
  faqs: [
    {
      question: 'What is an Image Format Converter?',
      answer:
        'An image format converter is an online tool that allows you to convert images between formats such as PNG, JPG, and WebP directly in your browser.',
    },
    {
      question: 'Is this Image Converter free to use?',
      answer:
        'Yes. This image format converter is completely free and does not require registration or uploads.',
    },
    {
      question: 'Are my images uploaded to a server?',
      answer:
        'No. All image processing happens locally in your browser. Your images are never uploaded or stored.',
    },
    {
      question: 'Which image formats are supported?',
      answer:
        'This tool supports PNG, JPG (JPEG), and WebP formats, including quality control for JPG and WebP.',
    },
    {
      question: 'Can I reduce image file size?',
      answer:
        'Yes. You can convert images to JPG or WebP and adjust quality to significantly reduce file size.',
    },
  ],
  // Analytics
  analytics: {
    category: 'image-tools',
    action: 'use-image-converter',
  },
  
  // Related tools
  relatedTools: ['image-compressor', 'image-resizer', 'pdf-to-image'],
  
  // Settings
  settings: {
    hasBackend: false,
    browserOnly: true,
    offlineCapable: true,
  },
  
  // Tool Details for "About This Tool" section
  toolDetails: {
    what: 'This Image Format Converter is a free online tool that lets you convert images between popular formats including PNG, JPG (JPEG), and WebP. Whether you need to convert PNG to JPG for smaller file sizes, JPG to PNG for transparency support, or convert to modern WebP format for optimal web performance, this tool handles it all directly in your browser with no uploads required.',
    
    howToUse: [
      'Click "Select Image" or drag and drop an image file (PNG, JPG, or WebP)',
      'Preview your original image in the preview area',
      'Select your desired output format from the dropdown (PNG, JPG, or WebP)',
      'For JPG and WebP, adjust the quality slider (1-100) to balance quality vs file size',
      'Click "Convert Image" to process the conversion',
      'Preview the converted image and compare with the original',
      'Click "Download" to save the converted image to your device'
    ],
    
    features: [
      'Convert between PNG, JPG, and WebP formats',
      'Adjustable quality control for lossy formats',
      'Before/after image preview',
      'No file size limitations',
      'Instant conversion with no upload delays',
      'Preserve image dimensions and aspect ratio',
      'Support for transparency (PNG and WebP)',
      'Batch conversion ready (future feature)'
    ],
    
    privacy: {
      browserBased: true,
      note: 'All image processing is done locally in your browser using the HTML5 Canvas API. Your images are never uploaded to any server or cloud service. They remain completely private on your device and are processed in real-time without any data transmission.'
    }
  },
};

export default metadata;
