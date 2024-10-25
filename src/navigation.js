import React from 'react';
import { Image } from 'react-native'; // Import Image component
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import JobSelectionScreen from './screens/jobSelectionScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';
import FindJobScreen from './screens/FindjobScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import ApplyHistoryScreen from './screens/ApplyHistoryScreen';
import Loader from './components/loading/Loader';

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
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
        }}
      />
      
      <Tab.Screen
        name="FindJobScreen"
        component={FindJobScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.search}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
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
                tintColor: focused ? COLORS.primary : COLORS.secondary,
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
                tintColor: focused ? COLORS.primary : COLORS.secondary,
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
        <Stack.Screen name="JobDetailScreen" component={JobDetailsScreen} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
