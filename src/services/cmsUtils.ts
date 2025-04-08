
/**
 * CMS Utility Functions
 * 
 * These functions provide security and validation for CMS operations
 */

// Sanitize user input to prevent XSS attacks
export const sanitizeInput = (input: string): string => {
  if (!input) return input;
  
  // Basic sanitization - in a real app, use a library like DOMPurify
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Validate user input meets requirements
export const validateInput = (input: string, type: 'text' | 'email' | 'url' | 'date'): boolean => {
  if (!input) return false;
  
  switch (type) {
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    case 'url':
      return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(input);
    case 'date':
      return !isNaN(Date.parse(input));
    default:
      return input.length > 0;
  }
};

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

// Deep clone objects
export const deepClone = <T>(obj: T): T => {
  if (!obj) return obj;
  return JSON.parse(JSON.stringify(obj));
};

// Simple encryption (for demo purposes only)
export const encryptData = (data: string, key = 'demo-key'): string => {
  // In a real app, use a proper encryption library
  return btoa(data + key);
};

// Simple decryption (for demo purposes only)
export const decryptData = (encryptedData: string, key = 'demo-key'): string => {
  // In a real app, use a proper encryption library
  const data = atob(encryptedData);
  return data.substring(0, data.length - key.length);
};

// Validate date format
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

// Validate URL format
export const isValidUrl = (urlString: string): boolean => {
  try {
    new URL(urlString);
    return true;
  } catch (error) {
    return false;
  }
};

// Format date for display
export const formatDate = (dateString: string, format = 'long'): string => {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  if (format === 'short') {
    return date.toLocaleDateString();
  } else if (format === 'time') {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    return date.toLocaleDateString([], { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
};

// Check if an object is empty
export const isEmptyObject = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 0;
};

// Truncate text to a specified length
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
