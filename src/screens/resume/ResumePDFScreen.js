import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';
import { COLORS } from '../../constants';

const ResumePDFScreen = ({ route }) => {
  const { filePath } = route.params;

  return (
    <View style={styles.container}>
      {filePath ? (
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
      ) : (
        <ActivityIndicator size="large" color={COLORS.primary} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ResumePDFScreen;
