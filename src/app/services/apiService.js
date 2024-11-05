const BASE_URL = "/api/auth"; // Base URL for your API

// Function for making GET requests

const checkTokenAndRedirect = (isLoginPage) => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (!isLoginPage) {
        window.location.href = "/login"; // Redirect to login if no token is found
      }
      return false; // Indicate that there is no valid token
    }


const decoded = jwtDecode(token);
if (decoded && Date.now() >= decoded.exp * 1000) {
  localStorage.removeItem("token"); // Remove expired token
  if (!isLoginPage) {
    window.location.href = "/"; // Redirect to login if token is expired
  }
  return false; // Indicate that the token is expired
}

return true; // Indicate that the token exists and is valid
};

export const getRequest = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    
    return await response.json(); // Parse and return the JSON response
  } catch (error) {
    console.error("GET Request Error:", error);
    throw error; // Propagate the error
  }
};

// Function for making POST requests
export const postRequest = async (endpoint, body) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    
    return await response.json(); // Parse and return the JSON response
  } catch (error) {
    console.error("POST Request Error:", error);
    throw error; // Propagate the error
  }
};
