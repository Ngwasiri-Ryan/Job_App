import React from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const NewsArticleScreen = ({ route }) => {
  const { url } = route.params;

  return (
    <WebView source={{ uri: url }} style={styles.webView} />
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});

export default NewsArticleScreen;
