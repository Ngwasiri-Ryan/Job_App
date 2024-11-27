import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { icons, COLORS } from '../../constants';
import Search from '../../components/search/Search';
import { useNavigation } from '@react-navigation/native'
import NoResults from '../../components/search/NoResults';
import Loader from '../../components/loading/Loader';

const FindjobScreen = () => {
  const navigation = useNavigation(); 
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if search was performed
 
  const searchJobs = async () => {
    setLoading(true);
    setSearchPerformed(true); // Mark that a search has been done

    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: query,
        page: 1,
        num_pages: '15',
        date_posted: 'all',
        country:location,
      },
      headers: {
        'x-rapidapi-key':'af6483481cmshc6c5f362b888facp174bc3jsn0aea1c091026',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      setJobs(response.data.data); // Assuming jobs are in response.data.data
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }

    setLoading(false);
  };

  const renderJobItem = ({ item }) => {

      const defaultLogo = icons.suitcase; // Your default fallback logo
      const clearbitLogoUrl = item.employer_name 
    ? `https://logo.clearbit.com/${item.employer_name.replace(/\s+/g, '').toLowerCase()}.com`
    : null;
    return (
      <TouchableOpacity style={styles.jobCard}
      onPress={() => 
        navigation.navigate('JobDetailScreen', { job: item } )
      }
      >
       <Image
        source={
          item.employer_logo
            ? { uri: item.employer_logo }
            : clearbitLogoUrl
            ? { uri: clearbitLogoUrl }
            : defaultLogo
        }
        style={styles.logo}
        onError={(e) => (e.target.src = defaultLogo)} // Handle Clearbit logo failure
      />
       
        <View style={styles.jobDetails}>
          <Text style={styles.employerName}>{item.employer_name}</Text>
          <Text style={styles.jobTitle}>{item.job_title}</Text>
          <View style={styles.boxHorizontal}>
            <View style={styles.border}>
              <Text style={styles.location}>{item.job_city ? item.job_city : 'Online'}</Text>
            </View>
            <View style={styles.border}>
              <Text style={styles.publisher}>{item.job_is_remote ? 'Remote' : 'Onsite'}</Text>
            </View>
            <View style={styles.border}>
              <Text style={styles.jobType}>{item.job_employment_type === 'FULLTIME' ? 'Full-Time' : 'Part-Time'}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Job Search</Text>
      <View style={styles.inputHolders}>
      <View style={{display:'flex' , flex:1, gap: 5}}> 
        <TextInput
         style={[styles.searchInput, styles.inputHolder ]}
          placeholder="Enter job title or keyword..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchJobs}
        />
        <TextInput
          style={[styles.searchInput, styles.inputHolder ]}
          placeholder="Enter job location..."
          value={location}
          onChangeText={setLocation}
          onSubmitEditing={searchJobs}
        />
      </View>
        
        <TouchableOpacity style={styles.searchButton} onPress={searchJobs}>
          <Image source={icons.search} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {loading ? (
       <Loader/>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.job_id}
          renderItem={renderJobItem}
          ListEmptyComponent={
            searchPerformed ? <NoResults /> : <Search /> // Show NoResults if no jobs, otherwise show Search
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color:COLORS.darkgray,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    width: '85%',
    marginBottom: 5,
    borderRadius: 8,
    borderColor: 'transparent',
    color:COLORS.darkgray,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 50,
    top: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  inputHolder: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
     paddingHorizontal: 20,
    borderRadius: 50,
  },
  inputHolders: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobCard: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 20,
    top: 20,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#fff'
  },
  jobDetails: {
    flex: 1,
  },
  boxHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  border: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  employerName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color:COLORS.darkgray,
  },
  location: {
    fontSize: 12,
    color:COLORS.black,
    marginBottom: 5,
  },
  jobType: {
    fontSize: 12,
    fontWeight: 'bold',
    color:COLORS.black
  },
  publisher: {
    fontSize: 12,
    fontWeight: 'bold',
    color:COLORS.black
  },
});

export default FindjobScreen;
