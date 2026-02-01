/**
 * Image Format Converter - Business Logic
 * 
 * All image conversion logic separated from UI for testability.
 */

/**
 * Validate if file is a valid image type
 * @param {File} file - File to validate
 * @returns {Object} { valid: boolean, error?: string }
 */
export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Please select a valid image file (PNG, JPG, or WebP)' };
  }

  // Check file size (max 10MB for browser processing)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'File too large. Maximum size is 10MB.' };
  }

  return { valid: true };
};

/**
 * Convert image to data URL for preview
 * @param {File} file - Image file
 * @returns {Promise<string>} Data URL
 */
export const fileToDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Convert image to different format using Canvas API
 * @param {string} imageDataUrl - Source image data URL
 * @param {string} outputFormat - Target format ('png', 'jpeg', 'webp')
 * @param {number} quality - Quality (0-1) for lossy formats
 * @returns {Promise<Blob>} Converted image blob
 */
export const convertImage = (imageDataUrl, outputFormat, quality = 0.9) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      try {
        // Create canvas and draw image
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Convert to desired format
        const mimeType = `image/${outputFormat}`;
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert image'));
            }
          },
          mimeType,
          quality
        );
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = imageDataUrl;
  });
};

/**
 * Get recommended quality for format
 * @param {string} format - Image format
 * @returns {number} Recommended quality (0-1)
 */
export const getRecommendedQuality = (format) => {
  switch (format) {
    case 'png':
      return 1.0; // PNG is lossless
    case 'jpeg':
      return 0.9; // High quality for JPEG
    case 'webp':
      return 0.9; // High quality for WebP
    default:
      return 0.9;
  }
};

/**
 * Get format display name
 * @param {string} format - Format identifier
 * @returns {string} Display name
 */
export const getFormatDisplayName = (format) => {
  const names = {
    'png': 'PNG (Lossless)',
    'jpeg': 'JPG (Compressed)',
    'webp': 'WebP (Modern)',
  };
  return names[format] || format.toUpperCase();
};

/**
 * Calculate file size reduction percentage
 * @param {number} originalSize - Original file size in bytes
 * @param {number} convertedSize - Converted file size in bytes
 * @returns {number} Percentage reduction
 */
export const calculateSizeReduction = (originalSize, convertedSize) => {
  if (!originalSize || !convertedSize) return 0;
  const reduction = ((originalSize - convertedSize) / originalSize) * 100;
  return Math.round(reduction);
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};
