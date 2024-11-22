import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, icons } from '../../constants';
import { fetchuserDetails } from '../../backend/profile/overview';
import { useUserContext } from '../../hooks/UserContext';

const OverviewTab = () => {
  const [userDetails, setuserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const {userData} = useUserContext();
  const username = userData.username;
  
   
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
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Loading...</Text>
      </View>
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
    <ScrollView contentContainerStyle={styles.container}>
      {/* Personal Info */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Image source={icons.id_card} style={styles.icon} />
          <Text style={styles.sectionTitle}>Personal Info</Text>
        </View>
        <View style={styles.row}>
          <Image source={icons.identity} style={styles.smallIcon} />
          <Text style={styles.infoText}>{userDetails.personalDetails.name}</Text>
        </View>
        <View style={styles.row}>
          <Image source={icons.mail} style={styles.smallIcon} />
          <Text style={styles.infoText}>{userDetails.personalDetails.email}</Text>
        </View>
        <View style={styles.row}>
          <Image source={icons.phone} style={styles.smallIcon} />
          <Text style={styles.infoText}>{userDetails.personalDetails.phone}</Text>
        </View>
        <View style={styles.row}>
          <Image source={icons.location} style={styles.smallIcon} />
          <Text style={styles.infoText}>{userDetails.personalDetails.city},{userDetails.personalDetails.town},{userDetails.personalDetails.country}, </Text>
        </View>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Image source={icons.briefcase} style={styles.icon} />
          <Text style={styles.sectionTitle}>Experience</Text>
        </View>
        {userDetails.workExperience.map((job, index) => (
          <View key={index}>
            <Text style={styles.subheading}>{job.jobTitle} at {job.company}</Text>
            <Text style={styles.detailText}>{job.startDate} - {job.endDate || "Present"}</Text>
            <Text style={styles.description}>{job.description}</Text>
          </View>
        ))}
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Image source={icons.project} style={styles.icon} />
          <Text style={styles.sectionTitle}>Projects</Text>
        </View>
        {userDetails.projects.map((project, index) => (
          <View key={index}>
            <Text style={styles.subheading}>{project.projectName}</Text>
            <Text style={styles.detailText}>{project.projectDescription}</Text>
            {project.link && (
              <Text style={styles.linkText}>Link: {project.link}</Text>
            )}
          </View>
        ))}
      </View>

      {/* Certifications */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Image source={icons.certification} style={styles.icon} />
          <Text style={styles.sectionTitle}>Certifications</Text>
        </View>
        {userDetails.certifications.map((cert, index) => (
          <View key={index}>
            <Text style={styles.subheading}>{cert.name}</Text>
            <Text style={styles.detailText}>Issued by: {cert.issuer}</Text>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Image source={icons.education} style={styles.icon} />
          <Text style={styles.sectionTitle}>Education</Text>
        </View>
        {userDetails.education.map((edu, index) => (
          <View key={index}>
            <Text style={styles.subheading}>{edu.degree}</Text>
            <Text style={styles.detailText}>{edu.institution} - {edu.year}</Text>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Image source={icons.skill} style={styles.icon} />
          <Text style={styles.sectionTitle}>Skills</Text>
        </View>
        {userDetails.skills.map((skill, index) => (
          <Text key={index} style={styles.infoText}>{skill}</Text>
        ))}
      </View>

      {/* Languages */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Image source={icons.language} style={styles.icon} />
          <Text style={styles.sectionTitle}>Languages</Text>
        </View>
        {userDetails.languages.map((language, index) => (
          <Text key={index} style={styles.infoText}>{language}</Text>
        ))}
      </View>

      {/* Interests */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Image source={icons.interest} style={styles.icon} />
          <Text style={styles.sectionTitle}>Interests</Text>
        </View>
        {userDetails.interests.map((interest, index) => (
          <Text key={index} style={styles.infoText}>{interest}</Text>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: COLORS.white,
    marginBottom:60,
  },
  loader:{
     flex:1,
     alignItems:'center',
     justifyContent:'center',
     backgroundColor: COLORS.white,
  },
  section: {
    backgroundColor: '#F2F8FF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  row:{
    display:'flex',
    flexDirection:'row',
    gap:15,
    alignItems:'center',
    marginBottom:10,
  },
  sectionHeader: {
    ...FONTS.h5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: 10,
  },
  smallIcon:{
    height:20,
    width:20,
    tintColor:COLORS.darkgray

  },
  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.darkgray,
    marginBottom: 5,
  },
  subheading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.darkgray,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: COLORS.darkgray,
    marginBottom: 10,
  },
});



export default OverviewTab;
