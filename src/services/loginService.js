import axios from 'axios';
import { IP_ADDRESS } from '@env';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`http://${IP_ADDRESS}:5000/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Backend login error:", error.response?.data || error.message);
    return { success: false, error: error.response?.data?.error || error.message };
  }
};
