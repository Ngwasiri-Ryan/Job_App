// ActivityTab.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const ActivityTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recent Activity</Text>
      <Text style={styles.text}>- Applied for a Software Developer position at XYZ Inc.</Text>
      <Text style={styles.text}>- Updated profile information</Text>
      <Text style={styles.text}>- Added new skills to profile</Text>
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

export default ActivityTab;
