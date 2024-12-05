import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { COLORS, images } from '../../constants';
import OverviewTab from './OverviewTab';
import SavedJobsTab from './SavedJobsTab';
import ActivityTab from './Activityab';
import Loader from '../../components/loading/Loader';
import { fetchuserDetails } from '../../backend/profile/overview';
import { useUserContext } from '../../hooks/UserContext';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const UserProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [userDetails, setuserDetails] = useState(null);
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
        const data = await fetchuserDetails(username);
        setuserDetails(data);
      } catch (error) {
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

  if (!userDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load user data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Picture & Basic Info */}
      <View style={styles.profileHeader}>
        <View style={styles.profilePictureContainer}>
          <Image source={images.pic} style={styles.profilePicture} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {userDetails.personal.name} <Text style={styles.verifiedBadge}></Text>
          </Text>
          <Text style={styles.username}>{userDetails.current.jobTitle}</Text>
          <Text style={styles.bio}>{userDetails.personalDetails.summary}</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Overview' && styles.activeTab]}
          onPress={() => setActiveTab('Overview')}
        >
          <Text style={[styles.tabText, activeTab === 'Overview' && styles.activeTabtext]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Activity' && styles.activeTab]}
          onPress={() => setActiveTab('Activity')}
        >
          <Text style={[styles.tabText, activeTab === 'Activity' && styles.activeTabtext]}>
            Activity
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Saved Jobs' && styles.activeTab]}
          onPress={() => setActiveTab('Saved Jobs')}
        >
          <Text style={[styles.tabText, activeTab === 'Saved Jobs' && styles.activeTabtext]}>
            Saved Jobs
          </Text>
        </TouchableOpacity>
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
    paddingTop: height * 0.03,
  },
  profilePictureContainer: {
    borderRadius: height * 0.1,
    borderWidth: 3,
    borderColor: COLORS.white,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
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
    color: COLORS.black,
  },
  username: {
    fontSize: width * 0.04,
    color: COLORS.darkgray,
    marginBottom: height * 0.01,
  },
  bio: {
    fontSize: width * 0.035,
    color: COLORS.darkgray,
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingVertical: height * 0.015,
  },
  tabItem: {
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  activeTabtext: {
    color: COLORS.white,
  },
  tabText: {
    fontSize: width * 0.04,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  profileDetails: {
    padding: width * 0.05,
  },
});

export default UserProfileScreen;
