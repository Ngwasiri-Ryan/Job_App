import React from 'react';
import { Image } from 'react-native'; // Import Image component
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/home/HomeScreen';
import JobSelectionScreen from './screens/intro/jobSelectionScreen';
import JobDetailsScreen from './screens/job/JobDetailsScreen';
import FindjobScreen from './screens/search/FindjobScreen';
import UserProfileScreen from './screens/profile/UserProfileScreen';
import ApplyHistoryScreen from './screens/history/ApplyHistoryScreen';

//resume builder screens
import OnboardingScreen from './screens/resume/OnboardingScreen';
import ResumeMakerScreen from './screens/resume/ResumeMakerScreen';
import ResumePreviewScreen from './screens/resume/ResumePriewerScreen';
import ResumePDFScreen from './screens/resume/ResumePDFScreen';
import JobWebViewScreen from './components/home/jobWebViewScreen';

import { icons, COLORS } from './constants';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator with custom icons from the assets folder
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false, // Hide default labels
        headerShown: false, // Hide header for all stack screens
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,         // Adjusted for shadow spacing
          left: 0,
          right: 0,
          elevation: 5,       // For Android shadow
          backgroundColor: '#fff',
          borderTopColor: 'transparent',
          height: 60,
          marginHorizontal: 20,
          borderRadius: 50,
          
          // Shadow properties for iOS
          shadowColor: '#000',     // Black shadow
          shadowOffset: { width: 0, height: 10 }, // Offset for the shadow
          shadowOpacity: 0.1,      // Opacity of the shadow (10%)
          shadowRadius: 10,        // Blurring of the shadow
        },
        
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.home}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.black,
              }}
            />
          ),
        }}
      />
      

<Tab.Screen
        name="ApplyHistoryScreen"
        component={ApplyHistoryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.history}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.black,
              }}
            />
          ),
        }}
      />

<Tab.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.resume}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.black,
              }}
            />
          ),
        }}
      />

<Tab.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.user}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.black,
              }}
            />
          ),
        }}
      />



    </Tab.Navigator>
  );
};

// Main App with the BottomTabNavigator inside a Stack Navigator
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide header for all stack screens
        }}
      >
        <Stack.Screen name="JobSelectionScreen" component={JobSelectionScreen} />
        <Stack.Screen name="FindjobScreen" component={FindjobScreen} />
        <Stack.Screen name="jobWebViewScreen" component={JobWebViewScreen} />
        <Stack.Screen name="JobDetailScreen" component={JobDetailsScreen} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="ResumeMakerScreen" component={ResumeMakerScreen} />
        <Stack.Screen name="ResumePreviewScreen" component={ResumePreviewScreen} />
        <Stack.Screen name="pdfViewer" component={ResumePDFScreen} />

        <Stack.Screen name="Main" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
