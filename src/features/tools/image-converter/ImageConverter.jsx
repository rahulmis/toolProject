/**
 * Image Format Converter - UI Component
 */

import React, { useState, useRef, useEffect } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import metadata from './metadata';
import {
  validateImageFile,
  fileToDataURL,
  convertImage,
  getFormatDisplayName,
  formatFileSize,
} from './logic';

const ImageConverter = () => {
  // State
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [outputFormat, setOutputFormat] = useState('png');
  const [quality, setQuality] = useState(0.9);
  const [convertedUrl, setConvertedUrl] = useState('');
  const [convertedBlob, setConvertedBlob] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
  }, [previewUrl, convertedUrl]);

  // Handle file selection
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setError('');
    setSelectedFile(file);
    setConvertedUrl('');
    setConvertedBlob(null);

    // Create preview
    try {
      const dataUrl = await fileToDataURL(file);
      setPreviewUrl(dataUrl);
    } catch (err) {
      setError('Failed to load image preview');
    }
  };

  // Convert image
  const handleConvert = async () => {
    if (!selectedFile || !previewUrl) {
      setError('Please select an image first');
      return;
    }

    setIsConverting(true);
    setError('');

    try {
      const blob = await convertImage(previewUrl, outputFormat, quality);
      const url = URL.createObjectURL(blob);
      setConvertedUrl(url);
      setConvertedBlob(blob);
    } catch (err) {
      setError(`Conversion failed: ${err.message}`);
    } finally {
      setIsConverting(false);
    }
  };

  // Download converted image
  const handleDownload = () => {
    if (!convertedUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.href = convertedUrl;
    const originalName = selectedFile.name.split('.').slice(0, -1).join('.');
    link.download = `${originalName}_converted.${outputFormat}`;
    link.click();
  };

  // Clear all
  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setConvertedUrl('');
    setConvertedBlob(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <ToolLayout
      toolId="image-converter"
      title="Image Format Converter"
      description="Convert images between PNG, JPG, and WebP formats instantly in your browser."
      toolDetails={metadata.toolDetails}
    >
      <div className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="text-5xl mb-4">📁</div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Click to select an image
            </p>
            <p className="text-sm text-gray-500">
              Supports PNG, JPG, and WebP formats (max 10MB)
            </p>
          </label>
          {selectedFile && (
            <div className="mt-4 text-sm text-gray-600">
              Selected: <strong>{selectedFile.name}</strong> ({formatFileSize(selectedFile.size)})
            </div>
          )}
        </div>

        {/* Conversion Options */}
        {selectedFile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Format
              </label>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="input-field"
              >
                <option value="png">{getFormatDisplayName('png')}</option>
                <option value="jpeg">{getFormatDisplayName('jpeg')}</option>
                <option value="webp">{getFormatDisplayName('webp')}</option>
              </select>
            </div>

            {/* Quality Slider */}
            {(outputFormat === 'jpeg' || outputFormat === 'webp') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality: {Math.round(quality * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Higher quality = larger file size
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {selectedFile && (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleConvert}
              disabled={isConverting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConverting ? '🔄 Converting...' : '🔄 Convert Image'}
            </button>
            {convertedUrl && (
              <button onClick={handleDownload} className="btn-primary">
                ⬇️ Download Converted
              </button>
            )}
            <button onClick={handleClear} className="btn-secondary">
              🗑️ Clear
            </button>
          </div>
        )}

        {/* Preview Section */}
        {previewUrl && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Preview */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Original Image</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <img
                  src={previewUrl}
                  alt="Original"
                  className="max-w-full h-auto mx-auto"
                  style={{ maxHeight: '300px' }}
                />
              </div>
              {selectedFile && (
                <p className="text-xs text-gray-500 mt-2">
                  Size: {formatFileSize(selectedFile.size)}
                </p>
              )}
            </div>

            {/* Converted Preview */}
            {convertedUrl && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Converted Image ({outputFormat.toUpperCase()})
                </h3>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <img
                    src={convertedUrl}
                    alt="Converted"
                    className="max-w-full h-auto mx-auto"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
                {convertedBlob && (
                  <p className="text-xs text-gray-500 mt-2">
                    Size: {formatFileSize(convertedBlob.size)}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Format Guide:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>PNG:</strong> Lossless quality, supports transparency, larger file size</li>
            <li>• <strong>JPG:</strong> Compressed, smaller file size, no transparency, best for photos</li>
            <li>• <strong>WebP:</strong> Modern format, better compression, smaller size, good quality</li>
            <li>• All conversions happen in your browser - your images stay private</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ImageConverter;
