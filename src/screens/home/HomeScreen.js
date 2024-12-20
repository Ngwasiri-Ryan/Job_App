import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import axios from 'axios';
import JobItemHorizontal from '../../components/home/jobItemHorizontal';
import JobItem from '../../components/home/jobItem';
import Error from '../../components/search/Error';
import RequestError from '../../components/search/429_error';// Import the RequestError component
import { COLORS, FONTS, icons } from '../../constants';
import Loader from '../../components/loading/Loader';
import Greetings from '../../components/home/Greetings';
import { API_KEY } from '@env';
import { useUserContext } from '../../hooks/UserContext';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ route, navigation }) => {
  const { userData } = useUserContext();
  const username = userData?.username;
  const firstLetter = username?.charAt(0).toUpperCase() || '?';
  const { selectedJobs } = route.params || {};
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [is429Error, setIs429Error] = useState(false); 
  

  const categories = [
    { name: 'All', type: 'FULLTIME' },
    { name: 'Full-Time', type: 'FULLTIME' },
    { name: 'Part-Time', type: 'PARTTIME' },
    { name: 'Contract', type: 'CONTRACT' },
    { name: 'Internship', type: 'INTERN' },
    { name: 'Freelance', type: 'FREELANCE' },
  ];

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
        country:'all',
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setJobs((prevJobs) => [...prevJobs, ...response.data.data]);
      setFilteredJobs((prevJobs) => [...prevJobs, ...response.data.data]);

      if (page < response.data.total_pages) {
        fetchJobs(retryCount, page + 1);
      } else {
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 429 && retryCount < 3) {
        setTimeout(() => fetchJobs(retryCount + 1, page), 2000);
      } else if (error.response && error.response.status === 429) {
        setIs429Error(true);
        setLoading(false);
      } else {
        setError(error.message);
        console.log(error.message)
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedJobs]);

  useEffect(() => {
    filterJobs();
  }, [jobs, filter, selectedCategory]);

  const filterJobs = () => {
    let filtered = jobs;
    if (filter === 'remote') {
      filtered = filtered.filter((job) => job.job_is_remote);
    } else if (filter === 'onsite') {
      filtered = filtered.filter((job) => !job.job_is_remote);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((job) => job.job_employment_type === selectedCategory);
    }

    setFilteredJobs(filtered);
  };

  if (loading) {
    return <Loader />;
  }

  if (is429Error) {
    return <RequestError/>;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Error />
      </View>
    );
  }

  const firstFiveJobs = filteredJobs.slice(0, 6);
  const remainingJobs = filteredJobs.slice(6);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profile}>
          <Text style={styles.profileText}>{firstLetter}</Text>
        </View>
        <View>
          <Greetings />
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.heading}>Available Jobs</Text>
        <TouchableOpacity style={styles.search} onPress={() => navigation.navigate('FindjobScreen')}>
          <Image source={icons.search} style={styles.icon} />
        </TouchableOpacity>
      </View>
{/* 
      <Text style={styles.smallheading}>Based on time</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {['all', 'remote', 'onsite'].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setFilter(type)}
            style={[styles.filterButton, filter === type && styles.selectedFilterButton]}
          >
            <Text style={filter === type ? styles.selectedFilterText : styles.filterText}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      <Text style={styles.smallheading}>Job Type</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.type}
            onPress={() => setSelectedCategory(category.type)}
            style={[styles.filterButton, selectedCategory === category.type && styles.selectedCategoryButton]}
          >
            <Text style={selectedCategory === category.type ? styles.selectedCategoryText : styles.categoryText}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {firstFiveJobs.map((item, index) => (
          <JobItemHorizontal key={`${item.job_id}-${index}`} item={item} />
        ))}
      </ScrollView>

      <FlatList
        data={remainingJobs}
        keyExtractor={(item) => item.job_id || item.id || Math.random().toString(36).substr(2, 9)}
        renderItem={({ item }) => <JobItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.white,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  smallheading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.black,
    paddingHorizontal: 10,
  },
  profileText: {
    color: COLORS.white,
    ...FONTS.h2,
  },
  header: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  search: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: COLORS.white,
  },
  categoryScroll: {
    paddingVertical: 5,
    height: 100,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  selectedCategoryButton: {
    backgroundColor: COLORS.secondary,
    borderColor: 'transparent',
  },
  categoryText:{
     color: COLORS.black,
     top:8,
  },
  selectedCategoryText: {
    fontSize: 14,
    color: 'white',
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
  },
  selectedFilterButton: {
    backgroundColor: COLORS.secondary,
    borderColor: 'transparent',
  },
  profile: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },
  filterText: {
    fontSize: 16,
    color: '#000',
  },
  selectedFilterText: {
    fontSize: 16,
    color: 'white',
  },
  horizontalScroll: {
    paddingVertical: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
