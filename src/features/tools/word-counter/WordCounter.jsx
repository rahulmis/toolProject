/**
 * Word & Character Counter - UI Component
 * 
 * This component handles the UI and user interactions.
 * Business logic is imported from logic.js for separation of concerns.
 */

import React, { useState } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import { getAllStats, generateSampleText, formatTime } from './logic';
import metadata from './metadata';

const WordCounter = () => {
  // UI State
  const [text, setText] = useState('');

  // Calculate statistics
  const stats = getAllStats(text);

  // Clear all
  const handleClear = () => {
    setText('');
  };

  // Load sample
  const handleLoadSample = () => {
    setText(generateSampleText());
  };

  return (
    <ToolLayout
      toolId="word-counter"
      title="Word & Character Counter"
      description="Count words, characters, sentences, and paragraphs instantly. Includes reading and speaking time estimates."
      toolDetails={metadata.toolDetails}
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button onClick={handleClear} className="btn-secondary">
            🗑️ Clear
          </button>
          <button onClick={handleLoadSample} className="btn-secondary">
            📄 Load Sample
          </button>
        </div>

        {/* Statistics Panel */}
        <div className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4">
            📊 Text Statistics
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Words */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {stats.words.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Words
              </div>
            </div>

            {/* Characters (with spaces) */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.charactersWithSpaces.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Characters
              </div>
            </div>

            {/* Characters (without spaces) */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {stats.charactersWithoutSpaces.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Chars (no spaces)
              </div>
            </div>

            {/* Sentences */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.sentences.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Sentences
              </div>
            </div>

            {/* Paragraphs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {stats.paragraphs.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Paragraphs
              </div>
            </div>

            {/* Lines */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                {stats.lines.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Lines
              </div>
            </div>

            {/* Average Word Length */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {stats.averageWordLength}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Avg Word Length
              </div>
            </div>

            {/* Reading Time */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                {formatTime(stats.readingTime)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Reading Time
              </div>
            </div>
          </div>

          {/* Speaking Time (separate row) */}
          <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  {formatTime(stats.speakingTime)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Speaking Time (at 130 words/min)
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Reading: {formatTime(stats.readingTime)} (at 200 words/min)
              </div>
            </div>
          </div>
        </div>

        {/* Text Input Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here... Statistics will update automatically as you type!"
            className="textarea-field"
            rows={16}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            💡 Tip: Statistics update in real-time as you type. Try pasting an article, essay, or blog post to analyze it!
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Reading Time Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              📖 Reading Time
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Based on an average reading speed of <strong>200 words per minute</strong>. 
              This is the typical silent reading speed for adults.
            </p>
          </div>

          {/* Speaking Time Info */}
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
              🎤 Speaking Time
            </h3>
            <p className="text-sm text-purple-800 dark:text-purple-200">
              Based on an average speaking speed of <strong>130 words per minute</strong>. 
              This is the typical conversational speaking pace.
            </p>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            🎯 Perfect For:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
            <div>• Essays and academic papers</div>
            <div>• Blog posts and articles</div>
            <div>• Social media posts</div>
            <div>• Content marketing</div>
            <div>• SEO content optimization</div>
            <div>• Speech and presentation scripts</div>
            <div>• Email campaigns</div>
            <div>• Product descriptions</div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
            💡 Tips for Better Writing:
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
            <li>• <strong>Blog posts</strong>: Aim for 300-800 words for optimal engagement</li>
            <li>• <strong>Social media</strong>: Twitter (280 chars), Facebook (40-80 words), LinkedIn (150-300 words)</li>
            <li>• <strong>Meta descriptions</strong>: Keep under 160 characters for SEO</li>
            <li>• <strong>Average word length</strong>: 4-5 characters is typical for readable content</li>
            <li>• <strong>Readability</strong>: Shorter sentences and paragraphs improve readability</li>
          </ul>
        </div>
      </div>

      {/* 🔍 SEO CONTENT — MUST BE AFTER TOOL UI */}
      <section className="mt-20 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">
          What is a Word Counter?
        </h2>

        <p className="mb-4">
          A word counter is a tool that analyzes text and provides statistics such as word count,
          character count, sentence count, and more. It's an essential tool for writers, students,
          bloggers, and content creators who need to meet specific length requirements or understand
          their content's scope.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Why Count Words and Characters?
        </h3>

        <p className="mb-4">
          Word and character counts are important for various reasons:
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>Academic essays often have word count requirements</li>
          <li>Blog posts benefit from optimal length for SEO and engagement</li>
          <li>Social media platforms have character limits</li>
          <li>Content briefs specify target word counts</li>
          <li>Meta descriptions need to stay under 160 characters</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          Reading and Speaking Time Estimates
        </h3>

        <p className="mb-4">
          Our tool estimates reading time based on 200 words per minute (average silent reading speed)
          and speaking time based on 130 words per minute (average conversational pace). These
          estimates help you understand how long your content will take to consume, which is valuable
          for presentations, speeches, podcasts, and video scripts.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Who Should Use This Tool?
        </h3>

        <p>
          This word counter is perfect for writers, students, bloggers, content marketers, copywriters,
          journalists, authors, SEO specialists, social media managers, and anyone who works with
          written content. It's also great for tracking writing progress and ensuring you meet
          specific length requirements.
        </p>
      </section>
    </ToolLayout>
  );
};

export default WordCounter;
