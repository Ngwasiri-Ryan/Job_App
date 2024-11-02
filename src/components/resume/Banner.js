import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { images } from '../../constants'; // Make sure to have relevant icons

const Banner = () => {
  return (
    <View style={styles.bannerContainer}>
      <Image source={images.banner} style={styles.bannerBackground} />
      <View style={styles.overlay}>
        <Text style={styles.bannerTitle}>Create Your Perfect Resume</Text>
        <Text style={styles.bannerSubtitle}>
          Showcase your skills, education, and experience to land your dream job!
        </Text>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    position: 'relative',
    height: 200, // Adjust height as needed
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    opacity: 0.8, // Slightly transparent for overlay effect
  },
  overlay: {
    position: 'absolute',
    alignItems: 'center',
    padding: 20,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text for contrast
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  startButton: {
    backgroundColor: '#5E63FF', // Match your primary color
    padding: 10,
    borderRadius: 5,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Banner;
