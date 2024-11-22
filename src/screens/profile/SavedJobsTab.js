import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {useUserContext} from '../../hooks/UserContext';
import {fetchSavedJobs} from '../../backend/profile/fetchSavedJobs';
import {icons} from '../../constants';

const SavedJobsTab = ({navigation}) => {
  const {userData} = useUserContext();
  const username = userData?.username;

  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSavedJobs = async () => {
      try {
        const jobs = await fetchSavedJobs(username);
        setSavedJobs(jobs);
      } catch (error) {
        console.error('Error loading saved jobs:', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadSavedJobs();
  }, [username]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (savedJobs.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Saved Jobs</Text>
        <Text style={styles.noJobsText}>You have no saved jobs.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Saved Jobs</Text>
      <FlatList
        data={savedJobs}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.jobItem}>
            {/**compny logo */}
            {item.employer_logo ? (
              <View style={{height: 50, width: 50}}>
                <Image source={{uri: item.employer_logo}} style={styles.logo} />
              </View>
            ) : (
              <View style={{height: 50, width: 50}}>
                <Image
                  source={require('../../../assets/icons/suitcase.png')}
                  style={styles.logo}
                />
              </View>
            )}
            <View>
              {/* Job title */}
              <Text style={styles.jobTitle}>
                {item.job_title.length > 35
                  ? `${item.job_title.slice(0, 30)}...`
                  : item.job_title}
              </Text>

              {/**employer name */}
              <Text style={styles.employerNameList}>
                {item.employer_name.length > 30
                  ? `${item.employer_name.slice(0, 25)}...`
                  : item.employer_name}
              </Text>

              {/* Job Link */}
              {item.job_google_link && (
                <View style={styles.google}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('jobWebViewScreen', {
                        url: item.job_apply_link,
                      })
                    }>
                    <Image source={icons.google} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              )}

              {/* Job details */}
              <View style={styles.detailsContainer}>
                <View style={{flexDirection: 'row', gap: 2}}>
                  <Image source={icons.earth} style={styles.icon} />
                  <Text style={styles.detailText}>
                    {item.job_city ? item.job_city : 'Online'}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', gap: 2}}>
                  <Image source={icons.marker} style={styles.icon} />
                  <Text style={styles.detailText}>
                    {item.job_is_remote ? 'Remote' : 'Onsite'}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', gap: 2}}>
                  <Image source={icons.duration} style={styles.icon} />
                  <Text style={styles.detailText}>
                    {item.job_employment_type === 'FULLTIME'
                      ? 'Full-Time'
                      : 'Part-Time'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: COLORS.white,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  noJobsText: {
    fontSize: 16,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginTop: 20,
  },
  jobItem: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    borderBottomColor:COLORS.black,
    borderBottomWidth:1,
  },
  jobTitle: {
    ...FONTS.h5,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  google: {
    height: 10,
    width: 10,
  },
  icon: {
    height: 15,
    width: 15,
  },
  employerName: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  location: {
    fontSize: 12,
    color: COLORS.darkGray,
    marginTop: 5,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});

export default SavedJobsTab;
