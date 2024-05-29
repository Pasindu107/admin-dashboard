const API_URL = 'http://localhost:8000/login'; // Replace with your actual API URL

export const loginUser = async (email, password) => {
    // const token =
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRoYXJpbmR1IiwiaWF0IjoxNzExNzg1MTQ5LCJleHAiOjE3MTE3ODYxNDl9.O6Q3ZB8O2IXUSaGoyyBBrhvpOhkswGz6ZLZw4UvES2Q";
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', /*"access-token": token*/},
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};