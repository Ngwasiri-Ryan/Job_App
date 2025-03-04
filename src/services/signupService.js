import { IP_ADDRESS } from '@env'; 

const signUpUser = async (username, email, password) => {
  try {
    const response = await fetch(`http://${IP_ADDRESS}:5000/api/auth/signup`, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Something went wrong!');
    }

    return result; 
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
};

export default signUpUser;
