import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {COLORS, icons, images} from '../../constants'; // Ensure you have your COLORS constant defined
import ProgressBar from '../../components/ProgressBar'; // Assuming ProgressBar is already implemented

const Step3 = ({navigation}) => {
  const [resume, setResume] = useState(null);

  // Function to handle file upload
  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
        ],
      });
      setResume(result);
      Alert.alert('Success', 'Resume uploaded successfully!');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled', 'Resume upload canceled.');
      } else {
        Alert.alert('Error', 'An error occurred while uploading the resume.');
      }
    }
  };

  const handleSkip = () => {
    navigation.navigate('JobSelectionScreen'); // Replace 'NextStep' with the actual next screen name
  };

  const handleNext = () => {
    navigation.navigate('JobSelectionScreen'); // Replace 'NextStep' with the actual next screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>Step 3/4</Text>
      <ProgressBar progress={75} />

      <Text style={styles.header}>Upload Your Resume</Text>
      <Text style={styles.subHeader}>
        Let employers see your skills by uploading your resume.
      </Text>

      <View style={styles.buttonContainer}>
        <View style={styles.imageHolder} onPress={handleUpload}>
          <Image source={icons.upload} style={styles.image} />
        </View>
      </View>

      {resume && (
        <View style={styles.resumeInfo}>
          <Text style={styles.resumeText}>Uploaded: {resume.name}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip, I'll upload later</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={()=> navigation.navigate('OnboardingScreen')}>
        <Text style={styles.skipText}>
          I don't have a resume. I want one.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('JobSelectionScreen')}>
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
  },

  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 50,
  },
  subHeader: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 30,
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
  imageHolder: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
  },
  resumeText: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontStyle: 'italic',
  },
  skipButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  skipText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  imageHolder: {
    width: 200, // adjust as needed
    height: 200, // adjust as needed
    borderRadius: 12,
    backgroundColor: COLORS.lightGray, // light background color for the placeholder
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100, // adjust based on your icon size
    height: 100, // adjust based on your icon size
    resizeMode: 'contain',
    tintColor: COLORS.black, // add this if you want the icon to match primary color
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
