import axios from 'axios';
import { IP_ADDRESS } from '@env'; 


const searchJobs = async (query, location, username, setJobs, setLoading, setSearchPerformed, saveSearchHistory) => {
  if (!query.trim()) return; 
  setLoading(true);
  setSearchPerformed(true);

  try {
    const response = await axios.get(`http://${IP_ADDRESS}:5000/api/job-search`, {
      params: {
        query: query,
        page: '1',
        num_pages: '15',
        country: location,
        date_posted: 'all',
      },
    });

    setJobs(response.data.jobs || []); // Handle potential empty data
    if (username) saveSearchHistory(username, query); // Save search history if user is logged in
  } catch (error) {
    console.error('Error fetching jobs:', error);
  } finally {
    setLoading(false);
  }
};

export default searchJobs;
