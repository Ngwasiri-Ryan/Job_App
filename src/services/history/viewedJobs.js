// api/jobApi.js
import axios from "axios";
import { IP_ADDRESS } from '@env';


export const ViewedJob = async (jobData, username) => {
  try {
    const response = await axios.post(`http://${IP_ADDRESS}:5000/viewedJob`, {
      jobData,
      username,
    });
    return response.data; 
  } catch (error) {
    console.error("Error saving viewed job:", error);
    throw error; 
  }
};

export const getViewedJobCount = async (username) => {
  try {
    const response = await axios.get(`http://${IP_ADDRESS}:5000/viewedJobCount/${username}`);
    return response.data.viewedJobCount; 
  } catch (error) {
    console.error("Error fetching viewed job count:", error);
    throw error; 
  }
};
