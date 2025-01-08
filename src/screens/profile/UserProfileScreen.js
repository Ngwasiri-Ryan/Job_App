import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { COLORS, images,icons } from '../../constants';
import OverviewTab from './OverviewTab';
import SavedJobsTab from './SavedJobsTab';
import ActivityTab from './Activityab';
import Loader from '../../components/loading/Loader';
import { fetchuserDetails } from '../../backend/profile/overview';
import { useUserContext } from '../../hooks/UserContext';

const { width, height } = Dimensions.get('window');

const UserProfileScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [userDetails, setUserDetails] = useState(null);
  const { userData } = useUserContext();
  const username = userData.username;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab />;
      case 'Activity':
        return <ActivityTab />;
      case 'Saved Jobs':
        return <SavedJobsTab />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(false);
        const data = await fetchuserDetails(username);
        setUserDetails(data);
      } catch (error) {
        setError(true);
        console.error('Error loading user data: ', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load user data. Please try again.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => setLoading(true)}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={images.pic}
            style={styles.profilePicture}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {userDetails.personal.name}{' '}
            {userDetails.verified && <Text style={styles.verifiedBadge}>✓</Text>}
          </Text>
          <Text style={styles.username}>{userDetails.current.jobTitle}</Text>
          <Text style={styles.bio}>{userDetails.personalDetails.summary}</Text>
        </View>
        {/* interview button */}
        <TouchableOpacity style={styles.interviewButton} onPress={() => navigation.navigate('InterviewPrepScreen')}>
          <Text style={styles.interviewButtonText}>Prepare for Interview</Text>
        </TouchableOpacity>

      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {['Overview', 'Activity', 'Saved Jobs'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView contentContainerStyle={styles.profileDetails}>{renderTabContent()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: height * 0.03,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profilePictureContainer: {
    borderRadius: height * 0.1,
    borderWidth: 3,
    borderColor: COLORS.white,
    overflow: 'hidden',
  },
  profilePicture: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
  },
  userInfo: {
    alignItems: 'center',
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  name: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  username: {
    fontSize: width * 0.04,
    color: COLORS.lightGray,
    marginBottom: height * 0.01,
  },
  bio: {
    fontSize: width * 0.035,
    color: COLORS.lightGray,
    textAlign: 'center',
  },
  interviewButton: {
    backgroundColor: COLORS.white, // Replace with your primary color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, // For Android shadow
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  interviewButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black, // White text for contrast
    textTransform: 'uppercase', // Makes the text all caps
    letterSpacing: 1, // Adds some spacing between letters for a clean look
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingVertical: height * 0.015,
    backgroundColor: COLORS.white,
  },
  tabItem: {
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  tabText: {
    fontSize: width * 0.04,
    color: COLORS.darkGray,
  },
  profileDetails: {
    padding: width * 0.05,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },
  errorText: {
    fontSize: width * 0.045,
    color: COLORS.red,
    marginBottom: height * 0.02,
  },
  retryButton: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
