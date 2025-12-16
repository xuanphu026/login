export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: {
    id: string;
    name: string;
  };
}

// REPLACE THIS WITH YOUR ACTUAL API IP ADDRESS
const API_BASE_URL = "http://192.168.1.10:8080"; 

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login API Error:", error);
    
    // FOR DEMO PURPOSES ONLY: 
    // If the API fails (because the IP doesn't exist), we simulate a success 
    // so you can see the UI flow. Remove this block in production.
    if (username === 'admin' && password === 'admin') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            token: 'fake-jwt-token', 
            user: { id: '1', name: 'Admin User' } 
          });
        }, 1000);
      });
    }

    throw error;
  }
};