import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {COLORS, FONTS, icons, images} from '../../constants';
import {useUserContext} from '../../hooks/UserContext';
import DotLoader from '../../components/loading/DotLoader';
import {fetchUserProfile} from '../../backend/user/fetchUserProfile';

const {width} = Dimensions.get('window');

const ProfileScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const {userData} = useUserContext();
  const username = userData?.username;
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      const result = await fetchUserProfile(username);
      if (result.success) {
        setProfileData(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    loadUserProfile();
  }, [username]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <DotLoader />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.contain}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImage}>
            <Text style={styles.accronym}>
              {profileData.username.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.username}>{profileData.username}</Text>
        </View>

        {/* Info Sections */}

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Image source={icons.name} style={styles.icon} />
            <Text style={styles.infoText}>{profileData.username}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Image source={icons.mail} style={styles.icon} />
            <Text style={styles.infoText}>{profileData.email}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Image source={icons.lock} style={styles.icon} />
            <Text style={styles.infoText}>••••••</Text>
          </View>
        </View>
        <View style={styles.actionView}>
          <Text style={styles.text}>Actions</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity  onPress={() => navigation.navigate('EditProfileScreen', { 
                userId: profileData.userId,
                username: profileData.username, 
                email: profileData.email ,
                password: profileData.password,
              })}  style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Edit Profile</Text>
            <Image source={icons.edit} style={styles.editIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
            <Image source={icons.logout} style={styles.logoutIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contain: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  actionView: {
    marginVertical: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    backgroundColor: '#029BC5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  accronym: {
    ...FONTS.h1,
    color: COLORS.white,
    fontSize: 36,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  infoSection: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  actions: {
    marginTop: 20,
    width: '100%',
  },
  editButton: {
    backgroundColor: '#5E63FF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  editButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  text: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutButtonText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  logoutIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor: '#FF5E63',
  },
  editIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor: COLORS.primary,
  },
});

export default ProfileScreen;
