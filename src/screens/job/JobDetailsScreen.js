import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { COLORS, FONTS, icons } from '../../constants';
import { API_KEY } from '@env';

const { width, height } = Dimensions.get('window');

const JobDetailsScreen = ({ route }) => {
  const { job } = route.params;
  const navigation = useNavigation();

  // State to control the modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // State to store the estimated salary
  const [salaryEstimate, setSalaryEstimate] = useState(null);

  // State to store fetched employer logo
  const [employerLogo, setEmployerLogo] = useState(job.employer_logo);




  //fall back data for job highlights
  const jobHighights = job.job_highlights || {};
  const benefits = jobHighights.Benefits || [];
  const qualifications = jobHighights.Qualifications || [];
  const responsibilities = jobHighights.Responsibilities || [];

  // Fetch employer logo if not provided
  const fetchEmployerLogo = async () => {
    if (!job.employer_logo && job.employer_name) {
      try {
        const response = await axios.get(`https://logo.clearbit.com/${job.employer_name.split(' ').join('').toLowerCase()}.com`);
        setEmployerLogo(response.config.url);
      } catch (error) {
        console.error('Error fetching employer logo:', error);
      }
    }
  };

  // Fetch salary estimate
  const fetchSalaryEstimate = async () => {
    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/estimated-salary',
      params: {
        job_title: job.job_title,
        location: `${job.job_city}, ${job.job_state}`,
        radius: '100',
      },
      headers: {
        'x-rapidapi-key': '6ad3207de2msh3e62d0537d5a1b0p1f7c0ejsn75521868e83a',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const salaryData = response.data.data;
      setSalaryEstimate(salaryData);
    } catch (error) {
      console.error('Error fetching salary estimate:', error);
    }
  };

  // Fetch logo and salary estimate on mount
  useEffect(() => {
    fetchEmployerLogo();
    fetchSalaryEstimate();
  }, []);

  return (
    <View style={styles.container}>
      {/* Fixed backdrop */}
      <View style={styles.backdrop}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <View style={styles.imageWrapper}>
            {employerLogo ? (
              <Image source={{ uri: employerLogo }} style={styles.logo} />
            ) : (
              <Image source={icons.suitcase} style={styles.logo} />
            )}
          </View>
        </View>

        {/* Job title and employer name */}
        <Text style={styles.title}>{job.job_title}</Text>
        <Text style={styles.employerName}>{job.employer_name}</Text>

        <View style={styles.box}>
          <View style={styles.holder}>
            <Text style={styles.boldText}>
              {job.job_employment_type === 'FULLTIME' ? 'Full-Time' : 'Part-Time'}
            </Text>
          </View>
          <View style={styles.holderMiddle}>
            <Text style={styles.boldText}>{job.job_city}, {job.job_state}</Text>
          </View>
          <View style={styles.holderLast}>
            <Text style={styles.details}>
              <Text style={styles.boldText}>{job.job_is_remote ? 'Remote' : 'Onsite'}</Text>
            </Text>
          </View>
        </View>

        {/* Degree, Experience, and Salary Requirements */}
        <View style={styles.requirementsContainer}>
          <View style={[styles.requirementsSection]}>
            <Image source={icons.experience} style={styles.icon} />
            <Text style={styles.requirementLabel}>Experience</Text>
            <Text style={styles.requirementValue}>
              {job.job_required_experience.experience_mentioned
                ? `${job.job_required_experience.required_experience_in_months / 12 || 0} years`
                : 'No experience required'}
            </Text>
          </View>
          <View style={[styles.requirementsSection]}>
            <Image source={icons.degree} style={styles.icon} />
            <Text style={styles.requirementLabel}>Degree</Text>
            <Text style={styles.requirementValue}>
              {job.job_required_education.degree_mentioned ? 'Required' : 'Not required'}
            </Text>
          </View>

          {/* Display salary estimate if available */}
          {salaryEstimate && (
            <View style={styles.requirementsSection}>
              <Image source={icons.salary} style={styles.icon} />
              <Text style={styles.requirementLabel}>Salary</Text>
              <Text style={styles.requirementValue}>
                {salaryEstimate && salaryEstimate.min_salary && salaryEstimate.max_salary
                  ? `${salaryEstimate.min_salary.toFixed(2)}${salaryEstimate.salary_currency} - ${salaryEstimate.max_salary.toFixed(2)}${salaryEstimate.salary_currency} / ${salaryEstimate.salary_period.toLowerCase()}`
                  : 'Unavailable'}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Scrollable content */}
      <ScrollView style={styles.content}>
        <Text style={styles.heading}>Job Highlights</Text>
        <Text style={styles.subHeading}>Benefits</Text>
        {benefits.length > 0 ? (
      benefits.map((benefit, index) => (
        <Text key={`benefit-${index}`} style={styles.listItem}>• {benefit}</Text>
      ))
    ) : (
      <Text>No benefits available</Text>
    )}

    <Text style={styles.subHeading}>Qualifications</Text>
    {qualifications.length > 0 ? (
      qualifications.map((qualification, index) => (
        <Text key={`qualification-${index}`} style={styles.listItem}>• {qualification}</Text>
      ))
    ) : (
      <Text>No qualifications available</Text>
    )}

    <Text style={styles.subHeading}>Responsibilities</Text>
    {responsibilities.length > 0 ? (
      responsibilities.map((responsibility, index) => (
        <Text key={`responsibility-${index}`} style={styles.listItem}>• {responsibility}</Text>
      ))
    ) : (
      <Text>No responsibilities available</Text>
    )}
        <Text style={styles.heading}>About Job</Text>
        <Text style={styles.description}>{job.job_description}</Text>
      </ScrollView>

      {/* Apply Button */}
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => setModalVisible(true)} // Open modal when button is pressed
      >
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>

      {/* Modal for WebView */}
      <Modal visible={modalVisible} animationType="slide">
        <WebView source={{ uri: job.job_apply_link }} />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)} // Close modal
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backdrop: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    borderBottomEndRadius: 25,
    borderBottomLeftRadius: 25,
    height: height / 2,
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0, 
    gap: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 5,
    zIndex: 10,
  },
  content: {
    marginTop: height / 2,
    marginHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  icon: {
    height: 30,
    width: 30,
    tintColor: COLORS.secondary,
  },
  employerName: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'center',
    color: COLORS.darkgray,
    top: -5,
  },

  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: -30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    marginTop:30,
    color:COLORS.black,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: COLORS.black,
    top: 0,
  },

  logo: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.primary,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 60,
    height: 50,
  },
  box: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 50,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    top: 4,
  },
  holder: {
    height: '100%',
    width: '25%',
    gap: 4,
    borderRightWidth: 1,
    borderColor: COLORS.black,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  holderMiddle: {
    height: '100%',
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRightWidth: 1,
    borderColor: COLORS.black,
  },
  holderLast: {
    height: '100%',
    width: '25%',
    gap: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 14,
    marginBottom: 100,
    color: COLORS.darkgray,
  },

  requirementsContainer: {
    marginTop: 20,
    padding: 5,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  requirementsSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Elevation for Android
    elevation: 5,
  },

    requirementLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color:COLORS.black,
  },
  requirementValue: {
    fontSize: 14,
    color: COLORS.darkgray,
  },

  applyButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,  
    zIndex: 10, 
  },
  applyButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  closeButton: {
    padding: 15,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: 18,
  },
  boldText:{
    color:COLORS.black,
    ...FONTS.body5
  },
  subHeading:{
     ...FONTS.h4,
     marginBottom:20,
     marginTop:10,
  },
  listItem:{
    ...COLORS.black,
    marginBottom:10,
  }
});

export default JobDetailsScreen;
