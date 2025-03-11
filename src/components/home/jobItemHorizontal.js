import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { icons, COLORS } from '../../constants';
import { useUserContext } from '../../hooks/UserContext';
import { ViewedJob } from '../../backend/history/viewedJobs';

const JobItemHorizontal = ({ item }) => {
  const navigation = useNavigation();
  const { userData } = useUserContext();
  const username = userData.username;

  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch employer logo
  const fetchLogo = async () => {
    if (item.employer_logo) {
      setLogoUrl(item.employer_logo);
      setLoading(false);
      return;
    }

    try {
      const domain = `${item.employer_name.replace(/\s+/g, '').toLowerCase()}.com`;
      const clearbitLogoUrl = `https://logo.clearbit.com/${domain}`;
      const response = await fetch(clearbitLogoUrl);

      if (response.ok) {
        setLogoUrl(clearbitLogoUrl);
      } else {
        setLogoUrl(null);
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogo();
  }, [item.employer_logo, item.employer_name]);

  // Handle Job Click
  const handleViewJob = async () => {
    try {
      await ViewedJob(item, username);
      navigation.navigate('JobDetailScreen', { job: item });
    } catch (error) {
      console.error('Error saving viewed job:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleViewJob} activeOpacity={0.8}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Image source={logoUrl ? { uri: logoUrl } : icons.suitcase} style={styles.logo} />
        )}
      </View>

      {/* Job Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.employerName}>{item.employer_name}</Text>
        <Text style={styles.jobTitle}>
          {item.job_title.length > 30 ? `${item.job_title.slice(0, 25)}...` : item.job_title}
        </Text>

        {/* Job Info */}
        <View style={styles.jobInfoContainer}>
          <Text style={styles.jobInfo}>
            {item.job_city ? item.job_city : 'Online'} · {item.job_is_remote ? 'Remote' : 'Onsite'} ·{' '}
            {item.job_employment_type === 'FULLTIME' ? 'Full-Time' : 'Part-Time'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// 📌 **Optimized Styles**
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
    paddingVertical:30,
    height:150,
    marginBottom:150,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 12,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    gap:3,
  },
  employerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  jobInfoContainer: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  jobInfo: {
    fontSize: 13,
    color: '#444',
  },
});

export default JobItemHorizontal;
