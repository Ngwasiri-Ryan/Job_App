import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import axios from 'axios';
import { icons, COLORS } from '../../constants';
import Search from '../../components/search/Search';
import { useNavigation } from '@react-navigation/native';
import NoResults from '../../components/search/NoResults';
import Loader from '../../components/loading/Loader';
import { useUserContext } from '../../hooks/UserContext';
import { saveSearchHistory } from '../../backend/history/searchHistory';
import { API_KEY } from '@env';
import JobItem from '../../components/home/jobItem';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const FindjobScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const { userData } = useUserContext();
  const username = userData?.username;

  const searchJobs = async () => {
    if (!query.trim()) return; // Prevent empty searches
    setLoading(true);
    setSearchPerformed(true);

    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query:query,
        page: '1', // Default to page 1
        num_pages: '15',
        country: location,
        date_posted: 'all',
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setJobs(response.data.data || []); // Handle potential empty data
      if (username) saveSearchHistory(username, query); // Save search history if user is logged in
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderJobItem = ({ item }) => {
    return <JobItem item={item} />; // Use JobItem component for each job
  };

  return (
    <View style={styles.container}>
      <View style={styles.backdrop}>
        <Text style={styles.heading}>Job Search</Text>
        <View style={styles.inputHolders}>
          <View style={styles.inputWrapper}>
            <View style={styles.inputHolder}> 
            <Image source={icons.job} style={styles.icons} />
            <TextInput
              style={[styles.searchInput]}
              placeholder="Enter job title or keyword..."
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={searchJobs}
            />
            </View>
            
            <View style={styles.inputHolder}> 
            <Image source={icons.location} style={styles.icons} />
            <TextInput
              style={[styles.searchInput]}
              placeholder="Enter job location..."
              value={location}
              onChangeText={setLocation}
              onSubmitEditing={searchJobs}
            />
            </View>
           
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={searchJobs}>
            <Image source={icons.search} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.job_id}
          renderItem={renderJobItem} // Render each job using the JobItem component
          ListEmptyComponent={
            searchPerformed ? <NoResults /> : <Search />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: width * 0.05, 
    // Use width for padding
    backgroundColor: COLORS.white,
  },
  backdrop: {
    paddingBottom: height * 0.02, // Padding based on screen height
    backgroundColor: COLORS.white,
    paddingHorizontal: width * 0.05, // Use width for padding
    paddingBottom: width * 0.05, // Use width for padding
    borderBottomEndRadius: 25,
    borderBottomLeftRadius: 25,
    width:'100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 5,
    zIndex: 10,
  },
  heading: {
    fontSize: width * 0.06, // Font size based on screen width
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.02, // Margin based on screen height
    color: COLORS.black,
  },
  inputHolders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap', // Allow the elements to wrap
  },
  inputWrapper: {
    flexDirection: 'column',
    flex: 1,
    gap: height * 0.015, // Gap between input fields, scaled with height
    justifyContent: 'center',
  },
  searchInput: {
    height: height * 0.065, // Height based on screen height
    borderWidth: 1,
    paddingHorizontal: width * 0.05, // Horizontal padding based on screen width
    marginTop: height * 0.01, // Margin top based on height
    width: '100%',
    borderColor: 'transparent',
    color: COLORS.black,
    fontSize:15,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.02, // Vertical padding based on height
    paddingHorizontal: width * 0.05, // Horizontal padding based on width
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.02, // Margin based on height
    
  },
  icon: {
    width: width * 0.05, // Icon size based on width
    height: width * 0.05, // Icon size based on width
    tintColor: '#fff',
  },
  icons: {
    width: width * 0.05, // Icon size based on width
    height: width * 0.05, // Icon size based on width
    tintColor: COLORS.black,
  },
  inputHolder: {
    flexDirection: 'row',
    gap: width * 0.02, // Gap based on screen width
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: width * 0.05, // Padding based on width
    borderRadius: 30,
  },
});

export default FindjobScreen;
