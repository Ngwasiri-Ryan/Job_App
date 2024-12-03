import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS, icons, images } from '../../constants';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>


      <View style={styles.contain}>
 {/* Profile Header */}
 <View style={styles.profileHeader}>
        <View style={styles.profileImage} >
          <Text style={styles.accronym}>N</Text>
        </View>
        <Text style={styles.username}>John Doe</Text>
      </View>

      {/* Info Sections */}
      <View style={styles.infoSection}>
      <View style={styles.infoRow}>
          <Image source={icons.name} style={styles.icon} />
          <Text style={styles.infoText}>John Snow</Text>
        </View>
        <View style={styles.infoRow}>
          <Image source={icons.mail} style={styles.icon} />
          <Text style={styles.infoText}>johndoe@example.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Image source={icons.phone} style={styles.icon} />
          <Text style={styles.infoText}>+123 456 7890</Text>
        </View>
        <View style={styles.infoRow}>
          <Image source={icons.lock} style={styles.icon} />
          <Text style={styles.infoText}>123456</Text>
        </View>
      </View>
      

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
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
  contain:{
   paddingHorizontal:20,
  
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
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
    marginVertical: 30,
  },
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    marginBottom: 15,
    backgroundColor:'#029BC5',
    alignItems:'center',
    justifyContent:'center'
  },
  accronym:{
    ...FONTS.h1,
    color:COLORS.white,
    fontSize:40,
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
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  actions: {
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
  logoutButton: {
    backgroundColor: '#FF5E63',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
