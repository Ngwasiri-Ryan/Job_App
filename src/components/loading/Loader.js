import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Image } from 'react-native';
import { icons } from '../../constants'; // Assuming you have your icons object set up

const Loader = () => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50], // Ball moves up by 50 units
  });

  const shadowScale = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5], // Shadow shrinks when ball moves up
  });

  return (
    <View style={styles.container}>
      {/* Shadow */}
      <Animated.View
        style={[
          styles.shadow,
          { transform: [{ scaleX: shadowScale }, { scaleY: shadowScale }] },
        ]}
      />
      {/* Bouncing Image */}
      <Animated.View style={[styles.bouncingPicture, { transform: [{ translateY }] }]}>
        <Image source={icons.suitcase} style={styles.image} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bouncingPicture: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  shadow: {
   top:200,
    width: 100,
    height: 20,
    backgroundColor: 'black',
    borderRadius: 50,
    opacity: 0.3,
    bottom:10,
     // Positioned below the bouncing image
  },
});

export default Loader;
