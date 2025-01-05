import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  ScrollView 
} from 'react-native';
import axios from 'axios';
import { COLORS, icons, images } from '../../constants';

const { width, height} = Dimensions.get('window');

const categories = [
  { id: 1, name: 'Jobs' },
  { id: 2, name: 'Salary' },
  { id: 3, name: 'Sports' },
  { id: 4, name: 'Economy' },
  { id: 5, name: 'Price' },
  { id: 6, name: 'Technology' },
  { id: 7, name: 'Health' },
  { id: 8, name: 'Education' },
];

const NewsScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Jobs');
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNews = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${category}&apiKey=793880b566c84f45a55799733ed1ac26`
      );
      setNewsData(response.data.articles);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch news');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  const renderCategory = ({ item }) => {
    const isSelected = item.name === selectedCategory;

    return (
      <TouchableOpacity
        style={[
          styles.categoryButton,
          isSelected && { backgroundColor: COLORS.primary },
        ]}
        onPress={() => setSelectedCategory(item.name)}
      >
        <Text
          style={[
            styles.categoryText,
            isSelected && { color: COLORS.white },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderNewsItem = ({ item }) => {
    // Exclude items with unwanted data
    const shouldExcludeItem = 
      item.title === "[Removed]" &&
      item.description === "[Removed]" &&
      item.urlToImage === null;
  
    // Skip rendering if the item matches exclusion criteria
    if (shouldExcludeItem) {
      return null;
    }
  
    return (
      <View style={styles.newsItem}>
        <TouchableOpacity onPress={() => navigation.navigate('NewsArticleScreen', { url: item.url })}>
          <Image
            source={item.urlToImage ? { uri: item.urlToImage } : images.news_default}
            style={styles.newsImage}
          />
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDescription}>{item.description}</Text>
            <Text style={styles.newsDate}>
              {new Date(item.publishedAt).toLocaleDateString()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={styles.icon} />
        </TouchableOpacity>
        <Image source={icons.news_logo} style={styles.logo} />
      </View>
<View>
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      />
      </View>

<View>
      <FlatList
        data={newsData}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.url}
        contentContainerStyle={styles.listContainer}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height:width*0.18,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white, // Ensure the background color is set for the shadow to show
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 3, // Shadow radius for iOS
    elevation: 4, // Shadow for Android
  },
  
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginTop:width*0.05,
    marginLeft:width*0.2,
  },
  categoryContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  categoryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
    minWidth: width * 0.25, // Ensures buttons have a minimum width
  },
  categoryText: {
    fontSize: 14,
    color: COLORS.black,
    textAlign: 'center',
    flexWrap: 'wrap', // Allows text to wrap if needed
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  newsItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    width: width - 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  newsContent: {
    padding: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  newsDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  newsDate: {
    fontSize: 12,
    color: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsScreen;
