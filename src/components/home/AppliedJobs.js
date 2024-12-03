import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { useUserContext } from '../../hooks/UserContext';
import { fetchAppliedJobs } from '../../backend/history/appliedJobs';
import { FONTS, icons } from '../../constants';

const { width } = Dimensions.get('window');

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
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    ...FONTS.h3,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalScrollContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  jobItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginRight: 15,
    borderRadius: 10,
    width: width * 0.8, // Adjust width as per your design
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // For Android
    paddingTop:40,
    paddingHorizontal:20,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  jobDate: {
    fontSize: 12,
    color: '#555',
  },
  icon:{
    height:20,
    width:20,
  },
  flex:{
    display:'flex',
    flexDirection:'row',
    gap:10,
  }
});

export default AppliedJobs;
