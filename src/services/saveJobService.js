import axios from "axios";
import { IP_ADDRESS } from "@env";

const API_URL = `http://${IP_ADDRESS}:5000/api/jobs`;

export const saveJob = async (jobData, username) => {
  try {
    console.log("Sending job save request..."); // Debugging log
    const response = await axios.post(`${API_URL}/save`, { jobData, username });
    console.log(response.data.message);
  } catch (error) {
    console.error("🔥 Error saving job:", error.response ? error.response.data : error.message);
  }
};
