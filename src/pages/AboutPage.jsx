/**
 * About Page
 * 
 * Provides information about the platform, its features, and privacy policy.
 * SEO-friendly structure with clear messaging about free tools and privacy.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About JsonAndMore
          </h1>
          <p className="text-xl text-primary-100 dark:text-primary-200">
            Free, fast, and privacy-focused utilities for everyone
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Statement */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            JsonAndMore is a platform dedicated to providing high-quality, free online utilities for developers, 
            creators, and anyone who needs quick access to essential tools. We believe that powerful tools 
            should be accessible to everyone, without hidden costs or compromising privacy.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our collection is continuously growing, with new tools added regularly based on user needs and 
            feedback. Every tool is designed with simplicity, speed, and privacy in mind.
          </p>
        </div>

        {/* Privacy First */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-start gap-4">
            <div className="text-4xl flex-shrink-0">🔒</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Privacy-First Approach
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Your privacy is our top priority. All our tools process data directly in your browser using 
                client-side JavaScript. This means:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                <li>Your files and data <strong>never leave your device</strong></li>
                <li>No server uploads or cloud processing</li>
                <li>No tracking or analytics on your data</li>
                <li>No account creation required</li>
                <li>100% secure and private</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You can even use our tools offline once the page has loaded. We respect your privacy 
                and will never collect, store, or share your personal data or files.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Free Forever */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="text-3xl mb-3">🆓</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              100% Free Forever
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No subscriptions, no hidden fees, no premium tiers. All tools are completely free 
              to use, with no limitations.
            </p>
          </div>

          {/* Lightning Fast */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Browser-based processing means instant results. No waiting for uploads, downloads, 
              or server processing.
            </p>
          </div>

          {/* No Sign-up */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              No Sign-up Required
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start using tools immediately. No registration, no email verification, 
              no personal information needed.
            </p>
          </div>

          {/* Open Source */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Cross-Platform
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Works on any device with a modern browser. Desktop, tablet, or mobile - 
              all tools are fully responsive.
            </p>
          </div>
        </div>

        {/* Growing Collection */}
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8 mb-8 border border-primary-100 dark:border-primary-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            🛠️ Growing Collection
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            We're constantly expanding our toolkit with new utilities based on user needs and requests. 
            Our goal is to become your go-to platform for JSON and more.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Have a suggestion for a new tool? We'd love to hear from you! Your feedback helps us 
            prioritize which tools to build next.
          </p>
        </div>

        {/* Technology Stack */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Built with Modern Technology
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            JsonAndMore is built using modern web technologies to ensure fast performance, 
            security, and reliability:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>React</strong> - For fast, interactive user interfaces</li>
            <li><strong>Browser APIs</strong> - Client-side processing with no backend</li>
            <li><strong>Responsive Design</strong> - Works perfectly on all screen sizes</li>
            <li><strong>Modern JavaScript</strong> - Latest standards for best performance</li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-100 dark:text-primary-200 mb-6">
            Explore our collection of free tools and start being more productive today.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-white text-primary-600 dark:bg-gray-100 dark:text-primary-700 
              font-semibold px-8 py-3 rounded-lg 
              hover:bg-gray-100 dark:hover:bg-gray-200 
              transition-colors duration-200 
              shadow-lg hover:shadow-xl"
          >
            Browse All Tools
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
