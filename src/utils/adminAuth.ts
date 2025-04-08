
import { encryptData, decryptData } from "./cmsUtils";

// Simulated admin credentials for demo purposes
// In a real application, this would be handled server-side
const ADMIN_CREDENTIALS = {
  username: "admin",
  // This password would normally be hashed and stored securely
  password: "admin123"  
};

// In a real application, you would use a secure token system
const AUTH_TOKEN_KEY = "cms_auth_token";
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

interface AuthToken {
  username: string;
  timestamp: number;
}

/**
 * Logs in the admin user
 * @param username The admin username
 * @param password The admin password
 * @returns A success flag and optional error message
 */
export const loginAdmin = (username: string, password: string): { success: boolean; message?: string } => {
  // Validate credentials
  if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
    return { success: false, message: "Invalid username or password" };
  }
  
  // Create a token
  const token: AuthToken = {
    username,
    timestamp: Date.now()
  };
  
  // Encrypt and store the token
  localStorage.setItem(AUTH_TOKEN_KEY, encryptData(JSON.stringify(token)));
  
  return { success: true };
};

/**
 * Logs out the admin user
 */
export const logoutAdmin = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

/**
 * Checks if the admin is authenticated
 * @returns Whether the admin is authenticated
 */
export const isAdminAuthenticated = (): boolean => {
  const tokenString = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!tokenString) {
    return false;
  }
  
  try {
    const token: AuthToken = JSON.parse(decryptData(tokenString));
    
    // Check if token is expired
    if (Date.now() - token.timestamp > TOKEN_EXPIRY) {
      logoutAdmin();
      return false;
    }
    
    return true;
  } catch (error) {
    logoutAdmin();
    return false;
  }
};

/**
 * Refreshes the admin authentication token
 * @returns Whether the token was successfully refreshed
 */
export const refreshAdminToken = (): boolean => {
  const tokenString = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!tokenString) {
    return false;
  }
  
  try {
    const token: AuthToken = JSON.parse(decryptData(tokenString));
    
    // Check if token is expired
    if (Date.now() - token.timestamp > TOKEN_EXPIRY) {
      logoutAdmin();
      return false;
    }
    
    // Refresh token timestamp
    token.timestamp = Date.now();
    
    // Update token in storage
    localStorage.setItem(AUTH_TOKEN_KEY, encryptData(JSON.stringify(token)));
    
    return true;
  } catch (error) {
    logoutAdmin();
    return false;
  }
};
