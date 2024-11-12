import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { COLORS, images, ICONS } from '../../constants';

const slides = [
  {
    id: '1',
    image: images.work,
    title: 'Welcome to JobQuest',
    description: 'Find the best job opportunities tailored to your skills and preferences.',
  },
  {
    id: '2',
    image: images.resume_folder,
    title: 'Build Your Resume',
    description: 'Create a professional resume directly within the app.',
  },
  {
    id: '3',
    image: images.browse,
    title: 'Search & Apply',
    description: 'Browse jobs, search by industry, and apply with one tap.',
  },
  {
    id: '4',
    image: images.track,
    title: 'Track Applications',
    description: 'Keep track of all your job applications in one place.',
  },
  {
    id: '5',
    image: images.resume_folder,
    title: 'Get Notifications',
    description: 'Receive instant updates on job postings and application statuses.',
  },
  {
    id: '6',
    image: images.start,
    title: 'Get Started',
    description: 'Start your journey towards the perfect job today!',
  },
];

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Automatically move to the next slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // 2000ms = 2 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % slides.length; // Loop back to 0 when reaching the last slide
    setCurrentIndex(newIndex);
    flatListRef.current.scrollToIndex({ index: newIndex });
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
          setCurrentIndex(index);
        }}
        ref={flatListRef}
      />
      
      {/* Dots for the slides */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index ? styles.activeDot : styles.inactiveDot]}
          />
        ))}
      </View>
      
      {/* Static View with Text and Get Started Button */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Ready to get started?</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: COLORS.white,
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  image: {
    width: '100%',
    height: 250, // Set your preferred height
    borderRadius: 10,
    marginBottom:30,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 18,
    color: COLORS.black,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.black,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 15, // Active dot is wider
  },
  inactiveDot: {
    backgroundColor: '#e0e0e0',
  },
  footer: {
    alignItems: 'center',
    height: height / 5,
    width: width,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: 'center',
    marginTop: 10,
    paddingBottom: 60,
    backgroundColor: '#fff', // Set a background color
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
      android: {
        elevation: 5, // Control the shadow elevation on Android
      },
    }),
  },
  footerText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.black,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    padding: 15,
    borderRadius: 50,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;