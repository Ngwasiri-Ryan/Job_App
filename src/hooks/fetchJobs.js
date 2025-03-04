// fetchJobs.js
import axios from 'axios';
import {IP_ADDRESS} from '@env'


export const fetchJobs = async (selectedJobs, setJobs, setFilteredJobs, setLoading, setIs429Error, setError, retryCount = 0, page = 1) => {
  const query = selectedJobs.join();

  try {
    console.log(`Fetching jobs... Page: ${page}, Retry Count: ${retryCount}`);

    // Fetch jobs from your backend API
    const response = await axios.get(`http://${IP_ADDRESS}:5000/api/jobs`, {
      params: {
        query: `${query}`,
        page: page.toString(),
      },
    });

    // Handle response
    console.log('Fetched Jobs:', response.data.jobs);
    setJobs((prevJobs) => [...prevJobs, ...response.data.jobs]);
    setFilteredJobs((prevJobs) => [...prevJobs, ...response.data.jobs]);

    if (page < response.data.totalPages) {
      fetchJobs(selectedJobs, setJobs, setFilteredJobs, setLoading, setIs429Error, setError, retryCount, page + 1);
    } else {
      setLoading(false);
    }
  } catch (error) {
    if (error.response && error.response.status === 429 && retryCount < 3) {
      console.log('Rate limit exceeded, retrying...');
      setTimeout(() => fetchJobs(selectedJobs, setJobs, setFilteredJobs, setLoading, setIs429Error, setError, retryCount + 1, page), 2000);
    } else if (error.response && error.response.status === 429) {
      setIs429Error(true);
      setLoading(false);
      console.log('Rate limit exceeded permanently.');
    } else {
      setError(error.message);
      console.log('Error fetching jobs:', error.message);
      setLoading(false);
    }
  }
};
