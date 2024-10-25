import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import JobItemHorizontal from '../components/home/jobItemHorizontal';
import JobItem from '../components/home/jobItem';
import Error from '../components/search/Error';
import { COLORS } from '../constants';
import Loader from '../components/loading/Loader';

const HomeScreen = ({ route, navigation }) => {
  const { selectedJobs } = route.params || {};
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]); // State for filtered jobs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // State for filter type

  const fetchJobs = async (retryCount = 0, page = 1) => {
    const query = selectedJobs.join();
    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: `${query}`,
        page: page.toString(),
        num_pages: '15',
        date_posted: 'all',
      },
      headers: {
        'x-rapidapi-key': '7ebac52e5fmsh8c8e70ae21d3c45p1df713jsne91049cffb94', // Use your API key
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setJobs(prevJobs => [...prevJobs, ...response.data.data]);
      setFilteredJobs(prevJobs => [...prevJobs, ...response.data.data]); // Set initial filtered jobs

      if (page < response.data.total_pages) {
        fetchJobs(retryCount, page + 1);
      } else {
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 429 && retryCount < 3) {
        setTimeout(() => fetchJobs(retryCount + 1, page), 2000);
      } else {
        setError(error.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedJobs]);

  useEffect(() => {
    filterJobs(); // Call filterJobs whenever the jobs or filter changes
  }, [jobs, filter]);

  const filterJobs = () => {
    const filtered = filter === 'remote'
      ? jobs.filter(job => job.job_is_remote) // Filter for remote jobs
      : filter === 'onsite'
        ? jobs.filter(job => !job.job_is_remote) // Filter for onsite jobs
        : jobs; // Show all jobs

    setFilteredJobs(filtered);
  };

  if (loading) {
    return <Loader/>
  }

  if (error) {
    // Render the SearchJob component when there is an error
    return (
      <View style={styles.errorContainer}>
        <Error/>
      </View>
    );
  }

  const firstFiveJobs = filteredJobs.slice(0, 6);
  const remainingJobs = filteredJobs.slice(6);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Jobs Based on Your Selection</Text>

      {/* Filter Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {['all', 'remote', 'onsite'].map(type => (
          <TouchableOpacity 
            key={type} 
            onPress={() => setFilter(type)} 
            style={[
              styles.filterButton, 
              filter === type && styles.selectedFilterButton // Apply selected button styles
            ]}
          >
            <Text style={filter === type ? styles.selectedFilterText : styles.filterText}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Horizontal Scroll for Job Items */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {firstFiveJobs.map((item, index) => (
          <JobItemHorizontal key={`${item.job_id}-${index}`} item={item} /> // Use a combination of job_id and index
        ))}
      </ScrollView>

      {/* FlatList for Remaining Jobs */}
      <FlatList
        data={remainingJobs}
        keyExtractor={(item) => item.job_id || item.id || Math.random().toString(36).substr(2, 9)} // Ensure unique keys
        renderItem={({ item }) => <JobItem item={item} />} // Use the JobItem component
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:COLORS.white,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:COLORS.black,
  },
  filterScroll: {
    paddingVertical: 5,
    height: 100,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginRight: 10,
    borderColor: '#000',
    borderWidth: 1,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  selectedFilterButton: {
    backgroundColor: COLORS.primary, // Background color for selected filter
    borderColor: 'transparent', // Transparent border for selected filter
  },
  filterText: {
    fontSize: 16,
    color: '#000',
  },
  selectedFilterText: {
    fontSize: 16,
    color: 'white', // White text for selected filter
  },
  horizontalScroll: {
    paddingVertical: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
