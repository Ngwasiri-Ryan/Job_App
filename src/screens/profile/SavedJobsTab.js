// SavedJobsTab.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const SavedJobsTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Saved Jobs</Text>
      <Text style={styles.text}>- Full Stack Developer at ABC Corp</Text>
      <Text style={styles.text}>- Frontend Engineer at XYZ Solutions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: COLORS.darkGray,
    marginBottom: 5,
  },
});

export default SavedJobsTab;
