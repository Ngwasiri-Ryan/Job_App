// SplashScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { COLORS , FONTS, icons} from '../../constants';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Show the splash screen for 3 seconds
    const timer = setTimeout(() => {
     navigation.navigate('WelcomeScreen')
    }, 3000);

    // Clear the timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={icons.logo} // Update with your logo path
        style={styles.logo}
      />
      <Text style={styles.text}>The ultimate job seeker...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:COLORS.white, // Your primary color
  },
  logo: {
    width: 300,
    height: 300,
    marginTop:-100,
    
  },
  text: {
    fontSize: 15,
    color: COLORS.black,
    ...FONTS.h4,
    top:-50,
  },
});

export default SplashScreen;
