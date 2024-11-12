import React from 'react';
import Navigator from './src/navigation';
import { ProgressProvider } from './src/context/ProgressContext';

export default function App() {
  return (
    <ProgressProvider>
      <Navigator />
    </ProgressProvider>
  );
}
