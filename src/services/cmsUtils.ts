
/**
 * Sanitizes user input to prevent XSS attacks
 * @param input The input string to sanitize
 * @returns A sanitized string
 */
export const sanitizeInput = (input: string): string => {
  // Create a temporary element
  const tempElement = document.createElement('div');
  tempElement.textContent = input;
  return tempElement.innerHTML;
};

/**
 * Validates input against allowed patterns
 * @param input The input to validate
 * @param pattern The regex pattern to validate against
 * @returns True if the input matches the pattern
 */
export const validateInput = (input: string, pattern: RegExp): boolean => {
  return pattern.test(input);
};

/**
 * Generates a unique ID
 * @param prefix An optional prefix for the ID
 * @returns A unique ID
 */
export const generateId = (prefix: string = ''): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Deep clones an object to prevent mutation
 * @param obj The object to clone
 * @returns A deep clone of the object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Encrypts data before storing (simple encoding for demo)
 * @param data The data to encrypt
 * @returns Encrypted data
 * Note: In a real app, use a proper encryption library
 */
export const encryptData = (data: string): string => {
  // This is just for demonstration, use a proper encryption method in production
  return btoa(encodeURIComponent(data));
};

/**
 * Decrypts data after retrieval (simple decoding for demo)
 * @param data The data to decrypt
 * @returns Decrypted data
 * Note: In a real app, use a proper decryption library
 */
export const decryptData = (data: string): string => {
  // This is just for demonstration, use a proper decryption method in production
  return decodeURIComponent(atob(data));
};

/**
 * Security headers for API calls
 * @returns Security headers for fetch calls
 */
export const getSecurityHeaders = (): HeadersInit => {
  return {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-XSS-Protection': '1; mode=block'
  };
};

/**
 * Validates a date string format
 * @param dateString The date string to validate
 * @returns True if the date string is valid
 */
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Validates a URL string format
 * @param url The URL string to validate
 * @returns True if the URL string is valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates an email string format
 * @param email The email string to validate
 * @returns True if the email string is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Throttles a function to prevent too many calls
 * @param fn The function to throttle
 * @param delay The delay in milliseconds
 * @returns A throttled function
 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    return fn(...args);
  };
};
