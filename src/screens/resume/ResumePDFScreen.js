import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';
import { COLORS } from '../../constants';

const ResumePDFScreen = ({ route }) => {
  const { filePath } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to stop the loading indicator after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={50} color={COLORS.primary} />
      ) : (
        <Pdf
          source={{ uri: filePath, cache: true }}
          onLoadComplete={(numberOfPages) => {
            console.log(`PDF loaded with ${numberOfPages} pages`);
          }}
          onError={(error) => {
            console.error('PDF Load Error:', error);
          }}
          style={styles.pdf}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ResumePDFScreen;
