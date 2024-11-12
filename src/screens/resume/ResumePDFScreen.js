import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Share, Alert } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import { COLORS, icons } from '../../constants';

const ResumePDFScreen = ({ route }) => {
  const { filePath } = route.params; // Assuming filePath points to the newly created PDF file
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const sharePDF = async () => {
    try {
      // Use the path of the newly created PDF file
      const pdfPath = filePath.startsWith('file://') ? filePath : `file://${filePath}`;

      // Check if the file exists before sharing
      const fileExists = await RNFS.exists(pdfPath);
      if (!fileExists) {
        Alert.alert('Error', 'PDF file not found');
        return;
      }

      // Share the actual PDF file
      await Share.share({
        url: pdfPath,
        title: 'Share PDF',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share the PDF');
      console.error('Share error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={50} color={COLORS.primary} />
      ) : (
        <Pdf
          source={{ uri: filePath, cache: true }}
          onLoadComplete={(numberOfPages) => console.log(`PDF loaded with ${numberOfPages} pages`)}
          onError={(error) => console.error('PDF Load Error:', error)}
          style={styles.pdf}
        />
      )}
      <TouchableOpacity style={styles.shareButton} onPress={sharePDF}>
        <Image source={icons.share} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  pdf: { flex: 1, width: '100%', height: '100%' },
  shareButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  icon: { height: 30, width: 30, tintColor: COLORS.white },
});

export default ResumePDFScreen;
