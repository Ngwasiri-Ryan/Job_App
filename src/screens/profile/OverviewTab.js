// OverviewTab.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { COLORS , FONTS, icons, images } from '../../constants';

const OverviewTab = () => {
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
           <Text style={styles.infoText}>John Doe</Text>
        </View>
        
        <View style={styles.row}>
        <Image source={icons.mail} style={styles.smallIcon} />
        <Text style={styles.infoText}>johndoe@gmail.com</Text>
        </View>

        <View style={styles.row}>
        <Image source={icons.phone} style={styles.smallIcon} />
        <Text style={styles.infoText}>+123 456 7890</Text>
        </View>

        <View style={styles.row}>
        <Image source={icons.location} style={styles.smallIcon} />
        <Text style={styles.infoText}>New York, USA</Text>
        </View>

      </View>

      {/* Experience */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
        <Image source={icons.briefcase} style={styles.icon} />
          <Text style={styles.sectionTitle}>Experience</Text>
        </View>
        <Text style={styles.subheading}>Software Engineer at ABC Corp</Text>
        <Text style={styles.detailText}>Jan 2020 - Present</Text>
        <Text style={styles.description}>Worked on mobile and web applications with a focus on creating a seamless user experience.</Text>
        
        <Text style={styles.subheading}>Frontend Developer at XYZ Solutions</Text>
        <Text style={styles.detailText}>May 2018 - Dec 2019</Text>
        <Text style={styles.description}>Developed responsive UIs for clients in the technology and e-commerce industries.</Text>
      </View>

      {/* Certifications */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
        <Image source={icons.certification} style={styles.icon} />
          <Text style={styles.sectionTitle}>Certifications</Text>
        </View>
        <Text style={styles.subheading}>Certified React Developer</Text>
        <Text style={styles.detailText}>Issued by: CodeAcademy - 2021</Text>
        
        <Text style={styles.subheading}>AWS Cloud Practitioner</Text>
        <Text style={styles.detailText}>Issued by: Amazon Web Services - 2020</Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
        <Image source={icons.education} style={styles.icon} />
          <Text style={styles.sectionTitle}>Education</Text>
        </View>
        <Text style={styles.subheading}>BSc in Computer Science</Text>
        <Text style={styles.detailText}>University of Example - Graduated 2018</Text>
      </View>

        {/* Languages */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
        <Image source={icons.skill} style={styles.icon} />
          <Text style={styles.sectionTitle}>Skills</Text>
        </View>
        <Text style={styles.infoText}>React</Text>
        <Text style={styles.infoText}>Nodejs</Text>
        <Text style={styles.infoText}>MongoDB</Text>
      </View>



      {/* Languages */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
        <Image source={icons.language} style={styles.icon} />
          <Text style={styles.sectionTitle}>Languages</Text>
        </View>
        <Text style={styles.infoText}>English - Fluent</Text>
        <Text style={styles.infoText}>Spanish - Intermediate</Text>
        <Text style={styles.infoText}>French - Beginner</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
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
