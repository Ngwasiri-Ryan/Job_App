import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import { icons, COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../../hooks/UserContext';
import { saveJob } from '../../backend/profile/savedJob';
import { ViewedJob } from '../../backend/history/viewedJobs';

const { width } = Dimensions.get('window');

const JobItem = ({ item }) => {
  const { userData } = useUserContext();
  const navigation = useNavigation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      if (item.employer_logo) {
        setLogoUrl(item.employer_logo);
      } else {
        try {
          const domain = `${item.employer_name.replace(/\s+/g, '').toLowerCase()}.com`;
          const logo = `https://logo.clearbit.com/${domain}`;
          const response = await fetch(logo);
          setLogoUrl(response.ok ? logo : null);
        } catch {
          setLogoUrl(null);
        }
      }
    };
    fetchLogo();
  }, [item.employer_logo, item.employer_name]);

  const handleBookmark = () => {
    if (!isBookmarked) {
      setIsBookmarked(true);
      saveJob(item, userData.username);
      setModalVisible(true);
      setTimeout(() => setModalVisible(false), 1500);
    }
  };

  const handleViewJob = async () => {
    try {
      await ViewedJob(item, userData.username);
      navigation.navigate('JobDetailScreen', { job: item });
    } catch (error) {
      console.error('Error saving viewed job:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleViewJob}>
      <View style={styles.logoContainer}>
        <Image source={logoUrl ? { uri: logoUrl } : icons.suitcase} style={styles.logo} />
      </View>

      <View style={styles.details}>
        <Text style={styles.jobTitle} numberOfLines={1}>{item.job_title}</Text>
        <Text style={styles.employerName} numberOfLines={1}>{item.employer_name}</Text>
        <View style={styles.infoContainer}>
          <JobInfo icon={icons.earth} text={`${item.job_city || 'Online'}, ${item.job_country}`} />
          <JobInfo icon={icons.marker} text={item.job_is_remote ? 'Remote' : 'Onsite'} />
          <JobInfo icon={icons.duration} text={item.job_employment_type === 'FULLTIME' ? 'Full-Time' : 'Part-Time'} />
        </View>
      </View>

      <View style={styles.actions}>
        {item.job_google_link && (
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => navigation.navigate('jobWebViewScreen', { url: item.job_apply_link })}>
            <Image source={icons.google} style={styles.icon} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleBookmark} disabled={isBookmarked}>
          <Image
            style={[styles.bookmarkIcon, { tintColor: isBookmarked ? COLORS.secondary : COLORS.darkgray }]}
            source={icons.bookmark}
          />
        </TouchableOpacity>
      </View>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Bookmarked!</Text>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const JobInfo = ({ icon, text }) => (
  <View style={styles.jobInfo}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray4,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  employerName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 5,
    flexWrap: 'wrap',
  },
  jobInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.black,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applyButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray4,
    marginRight: 10,
  },
  bookmarkIcon: {
    width: 20,
    height: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default JobItem;
