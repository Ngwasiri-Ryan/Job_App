import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {COLORS, images} from '../../constants'; 
import ProgressBar from '../../components/ProgressBar'; 

const Step3 = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>Step 3/4</Text>
      <ProgressBar progress={75} />

      <Text style={styles.header}>Create Your Resume 📃</Text>
      

      <View style={styles.buttonContainer}>
        <View style={styles.imageHolder} >
          <Image source={images.resume} style={styles.image} />
        </View>
      </View>

     
      <Text style={styles.descriptionText}>
          You'll have to create your resume to continue with us for your profile.
        </Text>
      

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('OnboardingScreen')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    justifyContent:'center'
  },

  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 50,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  importButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resumeInfo: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: COLORS.darkgray,
    textAlign: 'center',
    marginHorizontal: 20,
    lineHeight: 22,
  },
  
  image: {
    width: 300, 
    height: 400, 
    marginTop:20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: 250,
    marginTop: 40,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: 'bold',
  },
});

export default Step3;
