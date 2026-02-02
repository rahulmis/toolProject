/**
 * JWT Decoder - Business Logic
 * 
 * This file contains all the business logic for JWT decoding.
 * Manual implementation without external JWT libraries.
 */

/**
 * Base64URL decode (JWT uses Base64URL encoding, not standard Base64)
 * @param {string} base64Url - Base64URL encoded string
 * @returns {string} Decoded string
 */
const base64UrlDecode = (base64Url) => {
  // Replace URL-safe characters with standard Base64 characters
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  
  // Add padding if necessary
  const padding = base64.length % 4;
  if (padding === 2) {
    base64 += '==';
  } else if (padding === 3) {
    base64 += '=';
  }
  
  // Decode Base64
  try {
    const decoded = atob(base64);
    // Convert to UTF-8 properly
    return decodeURIComponent(escape(decoded));
  } catch (err) {
    throw new Error('Invalid Base64URL encoding');
  }
};

/**
 * Decode JWT token
 * @param {string} token - JWT token string
 * @returns {Object} { success: boolean, result?: Object, error?: string }
 */
export const decodeJWT = (token) => {
  try {
    // Validate input
    if (!token || typeof token !== 'string') {
      return { success: false, error: 'Please enter a JWT token' };
    }

    // Remove whitespace
    const cleanToken = token.trim();

    // Validate token structure (must have exactly 3 parts)
    const parts = cleanToken.split('.');
    if (parts.length !== 3) {
      return { 
        success: false, 
        error: `Invalid JWT structure. Expected 3 parts (header.payload.signature), found ${parts.length} part${parts.length !== 1 ? 's' : ''}.` 
      };
    }

    const [headerB64, payloadB64, signature] = parts;

    // Validate parts are not empty
    if (!headerB64 || !payloadB64 || !signature) {
      return { success: false, error: 'JWT token has empty parts' };
    }

    // Decode header
    let header;
    try {
      const headerStr = base64UrlDecode(headerB64);
      header = JSON.parse(headerStr);
    } catch (err) {
      return { success: false, error: `Failed to decode header: ${err.message}` };
    }

    // Decode payload
    let payload;
    try {
      const payloadStr = base64UrlDecode(payloadB64);
      payload = JSON.parse(payloadStr);
    } catch (err) {
      return { success: false, error: `Failed to decode payload: ${err.message}` };
    }

    // Parse timestamps in payload for better display
    const parsedPayload = parseTimestamps(payload);

    return {
      success: true,
      result: {
        header,
        payload: parsedPayload,
        signature,
        headerRaw: headerB64,
        payloadRaw: payloadB64,
        isValid: true
      }
    };
  } catch (err) {
    return { success: false, error: `Decoding failed: ${err.message}` };
  }
};

/**
 * Parse and enhance timestamp fields in JWT payload
 * @param {Object} payload - JWT payload
 * @returns {Object} Payload with parsed timestamps
 */
const parseTimestamps = (payload) => {
  const timestampFields = ['iat', 'exp', 'nbf'];
  const enhanced = { ...payload };

  timestampFields.forEach(field => {
    if (payload[field]) {
      const timestamp = payload[field];
      if (typeof timestamp === 'number') {
        try {
          const date = new Date(timestamp * 1000);
          enhanced[`${field}_readable`] = date.toISOString() + ' (' + date.toLocaleString() + ')';
        } catch (err) {
          // Ignore timestamp parsing errors
        }
      }
    }
  });

  return enhanced;
};

/**
 * Validate JWT token structure (without verifying signature)
 * @param {string} token - JWT token string
 * @returns {Object} { valid: boolean, error?: string }
 */
export const validateJWTStructure = (token) => {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Token is empty or not a string' };
  }

  const cleanToken = token.trim();
  const parts = cleanToken.split('.');

  if (parts.length !== 3) {
    return { 
      valid: false, 
      error: `JWT must have exactly 3 parts separated by dots, found ${parts.length}` 
    };
  }

  const [header, payload, signature] = parts;

  if (!header || !payload || !signature) {
    return { valid: false, error: 'One or more JWT parts are empty' };
  }

  return { valid: true };
};

/**
 * Check if token is expired
 * @param {Object} payload - Decoded JWT payload
 * @returns {Object} { expired: boolean, expiresAt?: string, message: string }
 */
export const checkExpiration = (payload) => {
  if (!payload.exp) {
    return { expired: false, message: 'No expiration time (exp) found in token' };
  }

  const now = Math.floor(Date.now() / 1000);
  const expiresAt = new Date(payload.exp * 1000);

  if (payload.exp < now) {
    const expiredAgo = now - payload.exp;
    return {
      expired: true,
      expiresAt: expiresAt.toLocaleString(),
      message: `Token expired ${formatDuration(expiredAgo)} ago`
    };
  } else {
    const expiresIn = payload.exp - now;
    return {
      expired: false,
      expiresAt: expiresAt.toLocaleString(),
      message: `Token expires in ${formatDuration(expiresIn)}`
    };
  }
};

/**
 * Format duration in seconds to human-readable string
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration
 */
const formatDuration = (seconds) => {
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  const days = Math.floor(seconds / 86400);
  return `${days} day${days !== 1 ? 's' : ''}`;
};

/**
 * Generate sample JWT for demo purposes
 * @returns {string} Sample JWT token
 */
export const generateSampleJWT = () => {
  // Sample JWT with typical structure
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjIsInJvbGUiOiJhZG1pbiJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
};

/**
 * Pretty print JSON with indentation
 * @param {Object} obj - Object to stringify
 * @returns {string} Pretty-printed JSON
 */
export const prettyPrintJSON = (obj) => {
  return JSON.stringify(obj, null, 2);
};

/**
 * Get algorithm information
 * @param {string} alg - Algorithm name from JWT header
 * @returns {Object} Algorithm information
 */
export const getAlgorithmInfo = (alg) => {
  const algorithms = {
    'HS256': { name: 'HMAC SHA-256', type: 'Symmetric' },
    'HS384': { name: 'HMAC SHA-384', type: 'Symmetric' },
    'HS512': { name: 'HMAC SHA-512', type: 'Symmetric' },
    'RS256': { name: 'RSA SHA-256', type: 'Asymmetric' },
    'RS384': { name: 'RSA SHA-384', type: 'Asymmetric' },
    'RS512': { name: 'RSA SHA-512', type: 'Asymmetric' },
    'ES256': { name: 'ECDSA SHA-256', type: 'Asymmetric' },
    'ES384': { name: 'ECDSA SHA-384', type: 'Asymmetric' },
    'ES512': { name: 'ECDSA SHA-512', type: 'Asymmetric' },
    'PS256': { name: 'RSA-PSS SHA-256', type: 'Asymmetric' },
    'PS384': { name: 'RSA-PSS SHA-384', type: 'Asymmetric' },
    'PS512': { name: 'RSA-PSS SHA-512', type: 'Asymmetric' },
    'none': { name: 'No signature', type: 'None' }
  };

  return algorithms[alg] || { name: 'Unknown algorithm', type: 'Unknown' };
};
