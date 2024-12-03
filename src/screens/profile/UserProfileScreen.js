import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView , ActivityIndicator} from 'react-native';
import { COLORS, images } from '../../constants';
import OverviewTab from './OverviewTab';
import SavedJobsTab from './SavedJobsTab';
import ActivityTab from './Activityab';
import Loader from '../../components/loading/Loader';
import { fetchuserDetails } from '../../backend/profile/overview';
import { useUserContext } from '../../hooks/UserContext';



const UserProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [userDetails, setuserDetails] = useState(null);
  const {userData} = useUserContext();
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
        // Fetch user details using the username from context
       
        const data = await fetchuserDetails(username);
        setuserDetails(data);
      } catch (error) {
        console.error("Error loading user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); 

  
  if (loading) {
    return (
      <Loader/>
    );
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
          <Text style={styles.name}>{userDetails.personal.name } <Text style={styles.verifiedBadge}></Text></Text>
          <Text style={styles.username}>{userDetails.current.jobTitle }</Text>
          <Text style={styles.bio}>{userDetails.personalDetails.summary}</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabItem, activeTab === 'Overview' && styles.activeTab]} onPress={() => setActiveTab('Overview')}>
          <Text style={[styles.tabText, activeTab === 'Overview' && styles.activeTabtext]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, activeTab === 'Activity' && styles.activeTab]} onPress={() => setActiveTab('Activity')}>
          <Text style={[styles.tabText, activeTab === 'Activity' && styles.activeTabtext]} >Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, activeTab === 'Saved Jobs' && styles.activeTab]} onPress={() => setActiveTab('Saved Jobs')}>
          <Text  style={[styles.tabText, activeTab === 'Saved Jobs' && styles.activeTabtext]} >Saved Jobs</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView contentContainerStyle={styles.profileDetails}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
backgroundColor:'#F8F8F8',
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 20,
  },
  profilePictureContainer: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  verifiedBadge: {
    fontSize: 16,
    color: COLORS.primary,
  },
  username: {
    fontSize: 15,
    color: COLORS.darkgray,
    marginBottom: 10,
  },
  bio: {
    fontSize: 13,
    color: COLORS.darkgray,
    textAlign: 'center',
    marginBottom: 20,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingVertical: 10,
  },
  tabItem: {
    paddingHorizontal: 15,
    padding:10,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    display:'flex'
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    backgroundColor:COLORS.primary,
    padding:10,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    display:'flex'
  },
  activeTabtext:{
    color:COLORS.white
  },
  tabText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  profileDetails: {
    padding: 20,
  },
});

export default UserProfileScreen;
