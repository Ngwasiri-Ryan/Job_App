import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'
const { width, height } = Dimensions.get('window');



const JobItemHorizontal = ({ item }) => {
    const navigation = useNavigation(); 
  return (
    <View style={{marginTop:10}}>
    <TouchableOpacity style={styles.jobItemHorizontal}
    onPress={() => 
        navigation.navigate('JobDetailScreen', { job: item } )
      }
    >
      <View style={styles.logoContainer}>
        {item.employer_logo ? (
          <Image source={{ uri: item.employer_logo }} style={styles.logo} />
        ) : (
          <Image source={require('../../../assets/icons/suitcase.png')} style={styles.logo} />
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.employerName}>{item.employer_name}</Text>
        <Text style={styles.jobTitle}>{item.job_title.length > 30 ? `${item.job_title.slice(0, 25)}...` : item.job_title}</Text>

        <View style={styles.boxHorizontal}>
          <View style={styles.border}>
            <Text style={styles.location}>{item.job_city  ?item.job_city : 'Online'} . {item.job_is_remote ? 'Remote' : 'Onsite'} . {item.job_employment_type === 'FULLTIME' ? 'Full-Time' : 'Part-Time'}</Text>
          </View>
  
        </View>
      </View>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  jobItemHorizontal: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    paddingHorizontal:20,
    paddingVertical:30,
    top:-20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: 'center',
  },
  logoContainer: {
    height: 80,
    width: 80,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden', // Ensures the logo doesn't overflow the container
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  employerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 14,
    color: '#555',
  },
  boxHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    height:'30%',
    left:-15,
  },
  border: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    marginHorizontal:3,
    height:40,
  },
  location: {
    fontSize: 14,
    color: '#000',
  },
  publisher: {
    fontSize: 14,
    color: '#000',
  },
  jobType: {
    fontSize: 14,
    color: '#000',
  },
});

export default JobItemHorizontal;
