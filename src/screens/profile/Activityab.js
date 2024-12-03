import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, LogBox , ScrollView} from 'react-native';
import { COLORS, icons, FONTS } from '../../constants';
import { useUserContext } from '../../hooks/UserContext';
import { fetchUserActivity } from '../../backend/profile/activity';
import DotLoader from '../../components/loading/DotLoader';
import AppliedJobs from '../../components/home/AppliedJobs';

// Ignore specific warnings if needed
LogBox.ignoreLogs(['Warning: ...']); // Replace with specific warning messages

const ActivityTab = ({navigation}) => {
  const { userData } = useUserContext();
  const username = userData?.username;

  const [activityStatus, setActivityStatus] = useState(null);

  useEffect(() => {
    const checkUserActivity = async () => {
      if (username) {
        try {
          const exists = await fetchUserActivity(username);
          if (exists) {
            setActivityStatus('Profile created, resume built');
          } else {
            setActivityStatus('Resume and Profile not created');
          }
        } catch (error) {
          console.error("Error fetching user activity: ", error);
          setActivityStatus('Error checking activity');
        }
      } else {
        setActivityStatus('No username found');
      }
    };

    checkUserActivity();
  }, [username]);

  const handleProfileCreation = () => {
    console.log('Navigating to Profile Creation');
  };

  const handleResumeCreation = () => {
    console.log('Navigating to Resume Creation');
  };

  if (activityStatus === null) {
    return <DotLoader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recent Activity</Text>
      {activityStatus === 'Profile created, resume built' ? (
        <View style={styles.successContainer}>
          <View style={styles.box}>
            <View style={{ flexDirection: 'row', gap: 10, justifyContent:'center',alignItems:'center',}}>
              <Image source={icons.profile_built} style={[styles.profileIcon, styles.icon]} />
              <Text style={styles.successText}>Profile Created</Text>
            </View>
            <Image source={icons.check} style={styles.icon} />
          </View>
          <View style={styles.box}>
            <View style={{ flexDirection: 'row', gap: 10, justifyContent:'center',alignItems:'center',}}>
              <Image source={icons.cv_built} style={[styles.resumeIcon, styles.icon]} />
              <Text style={styles.successText}>Resume Built</Text>
            </View>
            <Image source={icons.check} style={styles.icon} />
          </View>
        </View>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{activityStatus}</Text>
          <Button title="Create Profile" onPress={handleProfileCreation} />
          <Button title="Create Resume" onPress={handleResumeCreation} />
        </View>
      )}
       <Text style={styles.heading} >Applied Jobs</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll} >
          <AppliedJobs/>
      </ScrollView>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor:'#F8F8F8',
    flex: 1,
  },horizontalScroll: {
    paddingVertical: 10,
    backgroundColor:'#F8F8F8',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  box: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 65,
    borderRadius: 10,
    gap: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 5,
    flexDirection: 'row',
    gap: 20,
  },
  successText: {
    fontSize: 19,
    color: COLORS.black,
    marginBottom: 10,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'
  },
  errorContainer: {
    backgroundColor: COLORS.lightRed,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: COLORS.red,
    marginBottom: 10,
  },
  icon: {
    height: 28,
    width: 28,
  },
  resumeIcon: {
    tintColor: '#B65FCF',
  },
  profileIcon: {
    tintColor: '#018154',
  },
});

export default ActivityTab;
