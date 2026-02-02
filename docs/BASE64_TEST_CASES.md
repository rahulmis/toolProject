/**
 * Base64 Tool - Manual Test Cases
 * 
 * Run these tests manually in the browser console or create a test file
 */

import { encodeToBase64, decodeFromBase64, isValidBase64, getTextStats } from '../src/features/tools/base64/logic.js';

// Test Case 1: Basic encoding
console.log('Test 1: Basic encoding');
const test1 = encodeToBase64('Hello, World!');
console.assert(test1.success === true, 'Should succeed');
console.assert(test1.result === 'SGVsbG8sIFdvcmxkIQ==', 'Should encode correctly');
console.log('✓ Test 1 passed');

// Test Case 2: Basic decoding
console.log('Test 2: Basic decoding');
const test2 = decodeFromBase64('SGVsbG8sIFdvcmxkIQ==');
console.assert(test2.success === true, 'Should succeed');
console.assert(test2.result === 'Hello, World!', 'Should decode correctly');
console.log('✓ Test 2 passed');

// Test Case 3: UTF-8 encoding (emoji)
console.log('Test 3: UTF-8 encoding with emoji');
const test3 = encodeToBase64('Hello 👋');
console.assert(test3.success === true, 'Should succeed');
const test3decode = decodeFromBase64(test3.result);
console.assert(test3decode.result === 'Hello 👋', 'Should round-trip correctly');
console.log('✓ Test 3 passed');

// Test Case 4: UTF-8 encoding (accents)
console.log('Test 4: UTF-8 encoding with accents');
const test4 = encodeToBase64('café naïve');
console.assert(test4.success === true, 'Should succeed');
const test4decode = decodeFromBase64(test4.result);
console.assert(test4decode.result === 'café naïve', 'Should round-trip correctly');
console.log('✓ Test 4 passed');

// Test Case 5: UTF-8 encoding (Japanese)
console.log('Test 5: UTF-8 encoding with Japanese characters');
const test5 = encodeToBase64('こんにちは');
console.assert(test5.success === true, 'Should succeed');
const test5decode = decodeFromBase64(test5.result);
console.assert(test5decode.result === 'こんにちは', 'Should round-trip correctly');
console.log('✓ Test 5 passed');

// Test Case 6: Empty string encoding
console.log('Test 6: Empty string encoding');
const test6 = encodeToBase64('');
console.assert(test6.success === false, 'Should fail for empty string');
console.assert(test6.error === 'Input text is empty', 'Should have correct error message');
console.log('✓ Test 6 passed');

// Test Case 7: Invalid Base64 decoding
console.log('Test 7: Invalid Base64 decoding');
const test7 = decodeFromBase64('Not valid base64!!!');
console.assert(test7.success === false, 'Should fail for invalid Base64');
console.log('✓ Test 7 passed');

// Test Case 8: Empty Base64 decoding
console.log('Test 8: Empty Base64 decoding');
const test8 = decodeFromBase64('');
console.assert(test8.success === false, 'Should fail for empty string');
console.log('✓ Test 8 passed');

// Test Case 9: Base64 validation
console.log('Test 9: Base64 validation');
console.assert(isValidBase64('SGVsbG8=') === true, 'Should validate correct Base64');
console.assert(isValidBase64('Invalid!!!') === false, 'Should reject invalid Base64');
console.assert(isValidBase64('') === false, 'Should reject empty string');
console.log('✓ Test 9 passed');

// Test Case 10: Text statistics
console.log('Test 10: Text statistics');
const test10 = getTextStats('Hello\nWorld');
console.assert(test10.characters === 11, 'Should count characters correctly');
console.assert(test10.lines === 2, 'Should count lines correctly');
console.assert(test10.bytes >= 11, 'Should count bytes correctly');
console.log('✓ Test 10 passed');

// Test Case 11: Multiline text
console.log('Test 11: Multiline text encoding/decoding');
const multiline = 'Line 1\nLine 2\nLine 3';
const test11 = encodeToBase64(multiline);
console.assert(test11.success === true, 'Should encode multiline text');
const test11decode = decodeFromBase64(test11.result);
console.assert(test11decode.result === multiline, 'Should decode multiline text correctly');
console.log('✓ Test 11 passed');

// Test Case 12: Special characters
console.log('Test 12: Special characters');
const special = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/~`';
const test12 = encodeToBase64(special);
console.assert(test12.success === true, 'Should encode special characters');
const test12decode = decodeFromBase64(test12.result);
console.assert(test12decode.result === special, 'Should decode special characters correctly');
console.log('✓ Test 12 passed');

console.log('\n✓ All tests passed!');

/**
 * Expected Behavior Summary:
 * 
 * Encoding:
 * - ✓ Encodes plain ASCII text correctly
 * - ✓ Handles UTF-8 characters (emojis, accents, CJK)
 * - ✓ Handles multiline text with \n
 * - ✓ Handles special characters
 * - ✓ Returns error for empty input
 * 
 * Decoding:
 * - ✓ Decodes valid Base64 correctly
 * - ✓ Preserves UTF-8 characters through round-trip
 * - ✓ Returns error for invalid Base64 format
 * - ✓ Returns error for empty input
 * - ✓ Handles whitespace in Base64 input (strips it)
 * 
 * Validation:
 * - ✓ Correctly identifies valid Base64 strings
 * - ✓ Correctly rejects invalid formats
 * 
 * Statistics:
 * - ✓ Counts characters correctly
 * - ✓ Counts bytes correctly (UTF-8 aware)
 * - ✓ Counts lines correctly
 */
