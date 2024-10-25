// JobItem.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { icons, COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const JobItem = ({ item }) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity
      style={styles.jobItem}
      onPress={() =>
        navigation.navigate('JobDetailScreen', { job: item })
      }
    >
       
      {item.employer_logo ? (
        <View style={{ height: 50, width: 50 }}>
          <Image source={{ uri: item.employer_logo }} style={styles.logo} />
        </View>
      ) : (
        <View style={{ height: 50, width: 50 }}>
          <Image source={require('../../../assets/icons/suitcase.png')} style={styles.logo} />
        </View>
      )}
      
      <View style={styles.box}>
        {/* Employer name */}
        <Text style={styles.employerNameList}>
          {item.employer_name.length > 30 ? `${item.employer_name.slice(0, 25)}...` : item.employer_name}
        </Text>

        {/* Job title */}
        <Text style={styles.jobTitle}>
          {item.job_title.length > 35 ? `${item.job_title.slice(0, 30)}...` : item.job_title}
        </Text>
      </View>
     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  jobItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkgray,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  box: {
    height: height * 0.09,
    width: '80%',
    gap: 4,
    top: '30%',
  },
  employerNameList: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.darkgray,
  },
  logo: {
    width: '70%',
    height: '70%',
    borderRadius: 10,
    top: '20%',
  },
});

export default JobItem;
