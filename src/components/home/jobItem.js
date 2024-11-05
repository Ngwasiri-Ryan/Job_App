// JobItem.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions ,Linking} from 'react-native';
import { icons, COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const JobItem = ({ item }) => {
  const navigation = useNavigation();

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString(); // Multiplied by 1000 to convert to milliseconds
  };
  
  return (
    <TouchableOpacity
      style={styles.jobItem}
      onPress={() =>
        navigation.navigate('JobDetailScreen', { job: item })
      }
    >
       
      {item.employer_logo ? (
        <View style={{ height: 70, width: 70, top:5 }}>
          <Image source={{ uri: item.employer_logo }} style={styles.logo} />
        </View>
      ) : (
        <View style={{ height: 70, width: 70 }}>
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

         {/* Job Link */}
         {item.job_google_link && (
          <View style={styles.google}>
           <TouchableOpacity style={styles.button} 
            onPress={() => navigation.navigate('jobWebViewScreen', { url: item.job_apply_link })}
            >
              <Image source={icons.google} style={styles.icon}/>
            </TouchableOpacity>
          </View>
            
          )}
         
         {/**job apply link, date posted and job offer expiration date */}
         <View style={styles.detailsContainer}>

          {/* Job Posted Date */}
          {item.job_posted_at_timestamp && (
            <View style={{flexDirection:'row', gap:10}}>
               <Image source={icons.green_clock} style={styles.icon}/>
               <Text style={styles.detailText}>
               {formatDate(item.job_posted_at_timestamp)}
               </Text>
           </View>
            
          )}

          {/* Job Posted Date in UTC */}
          {item.job_posted_at_datetime_utc && (
           <View style={{flexDirection:'row', gap:10}}>
           <Image source={icons.red_clock} style={styles.icon}/>
           <Text style={styles.detailText}>
           {formatDate(item.job_offer_expiration_timestamp)}
           </Text>
       </View>
          )}
        </View>
     
      </View>
     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  jobItem: {
    padding: 5,
    paddingLeft:20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkgray,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    backgroundColor:COLORS.white,
    gap: 20,
    height:130,
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
    width: '100%',
    height: '100%',
    borderRadius: 10,
    top: '60%',
  },
  icon:{
    height:20,
    width:20,
  },
  detailsContainer:{
    flexDirection:'row',
    gap:10,
    marginTop:10,
  },
  detailText:{
    color:COLORS.black,
  },
  google:{
    top:-35,
    position:'absolute',
    left:'80%',
  },
  button:{
    padding:10,
    borderRadius:10,
    backgroundColor:COLORS.lightGray4,
  }
});

export default JobItem;
