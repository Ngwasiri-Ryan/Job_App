import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { useUserContext } from '../../hooks/UserContext';
import { fetchAppliedJobs } from '../../backend/history/appliedJobs';
import { FONTS, icons } from '../../constants';

const { width , height} = Dimensions.get('window');

const AppliedJobs = () => {
  const { userData } = useUserContext();
  const username = userData?.username;

  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch applied jobs when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await fetchAppliedJobs(username); // Fetch applied jobs based on the username
        setSavedJobs(fetchedJobs);
      } catch (err) {
        setError('Failed to fetch applied jobs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [username]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>No applied jobs yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true} // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar
        contentContainerStyle={styles.horizontalScrollContainer}
      >
        {savedJobs.map((job, index) => (
          <View key={index} style={styles.jobItem}>
            <Image 
              source={{ uri: job?.employer_logo }} 
              style={styles.companyLogo}
            />
            <Text style={styles.jobTitle}>{job?.job_title}</Text>
            <Text style={styles.companyName}>{job?.employer_name}</Text>
            <View style={styles.flex}>
              <Image source={icons.green_clock} style={styles.icon}/>
            <Text style={styles.jobDate}>{new Date(job?.appliedAt).toLocaleDateString()}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    backgroundColor: '#f9f9f9', 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    ...FONTS.h3,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  horizontalScrollContainer: {
    flexDirection: 'row',
    gap: 15, // Space between job cards
    padding: width*0.035,
   
  },
  jobItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 15,
    width: width * 0.7, // Adjust width for better layout
    height: 180, // Reduced height
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // For Android
    alignItems: 'center',
    justifyContent: 'space-between', // Distribute items vertically
  },
  companyLogo: {
    width: 50, // Slightly reduced size
    height: 50,
    borderRadius: 25, // Circular logo
    marginBottom: height*0.0001,
    resizeMode: 'cover',
  },
  jobTitle: {
    fontSize: width*0.035,
    fontWeight: '600',
    color: '#333', // Slightly darker text
    textAlign: 'center',
    marginBottom: height*0.0001,
  },
  companyName: {
    fontSize: width*0.035,
    color: '#777',
    textAlign: 'center',
    marginBottom: height*0.0001,
  },
  jobDate: {
    fontSize: 12,
    color: '#555',
    marginLeft: 5,
  },
  icon: {
    height: 18,
    width: 18,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});


export default AppliedJobs;
