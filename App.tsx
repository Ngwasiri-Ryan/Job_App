import React from 'react';
import Navigator from './src/navigation';
import { ProgressProvider } from './src/context/ProgressContext';
import { UserProvider } from './src/hooks/UserContext';

export default function App() {
  return (
    <UserProvider>
    <ProgressProvider>
      <Navigator />
    </ProgressProvider>
    </UserProvider>
  
  );
}
