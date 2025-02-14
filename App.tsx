import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import Navigator from './src/navigation';
import { ProgressProvider } from './src/context/ProgressContext';
import { UserProvider } from './src/hooks/UserContext';

async function requestStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default function App() {
  useEffect(() => {
    requestStoragePermission();
  }, []); // Runs once when the app loads

  return (
    <UserProvider>
      <ProgressProvider>
        <Navigator />
      </ProgressProvider>
    </UserProvider>
  );
}
