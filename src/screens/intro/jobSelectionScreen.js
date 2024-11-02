import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { COLORS, FONTS } from '../../constants';

const JobSelectionScreen = ({ navigation }) => {
  const [selectedJobs, setSelectedJobs] = useState([]);

  const jobOptions = ['Developer', 'UI/UX Designer', 'Marketing',];

  const toggleSelection = (job) => {
    if (selectedJobs.includes(job)) {
      setSelectedJobs(selectedJobs.filter((item) => item !== job));
    } else {
      setSelectedJobs([...selectedJobs, job]);
    }
  };

  const handleNext = () => {
    // Navigate to the next screen and pass the selected jobs
   // navigation.navigate('HomeScreen', { selectedJobs });
   navigation.navigate('Main', { screen: 'Home', params: { selectedJobs } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select the Jobs You Do</Text>
      {jobOptions.map((job) => (
        <TouchableOpacity
          key={job}
          style={[
            styles.option,
            selectedJobs.includes(job) && styles.selectedOption,
          ]}
          onPress={() => toggleSelection(job)}
        >
          <Text
            style={[
              styles.optionText,
              selectedJobs.includes(job) && styles.selectedOptionText,
            ]}
          >
            {job}
          </Text>
        </TouchableOpacity>
      ))}
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    ...FONTS.h1
  },
  option: {
    backgroundColor: '#f0f0f0',
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    ...FONTS.body5
  },
  selectedOption: {
    backgroundColor: '#6a0dad', // Purple background when selected
  },
  optionText: {
    color: '#000',
  },
  selectedOptionText: {
    color: '#fff', // White text when selected
  },
});

export default JobSelectionScreen;
