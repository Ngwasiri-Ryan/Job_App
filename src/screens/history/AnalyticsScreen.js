import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import { COLORS, icons, FONTS } from '../../constants';
import AnalysisTab from './AnalysisTab';
import ListTab from './ListTab';


const AnalyticsScreen = () => {
  const [activeCategory, setActiveCategory] = useState('list');

  // Render the List component
  const renderList = () =>  <ListTab/>;
  
  // Render the Analysis component
  const renderAnalysis = () => <AnalysisTab />;
  

  return (
    <View style={styles.container}>
      {/* First Section */}
      <View style={styles.whitebackground}>
        <View style={styles.header}>
          <Image source={icons.back} style={styles.icon} />
          <Image source={icons.analytics} style={styles.icon} />
        </View>

        <View style={styles.headingView}>
          <View>
            <Text style={styles.haedingText}>My Analysis</Text>
            <Text style={styles.smallText}>Summary</Text>
          </View>
          <View style={styles.dateHolder}>
            <View style={styles.calendarIconHolder}>
              <Image source={icons.calendar} style={styles.calendarIcon} />
            </View>
            <View style={styles.dateInfo}>
              <Text style={styles.dateText}>October 5, 2024</Text>
              <Text style={styles.text}>Activity up by 18%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tab}>
        <View style={styles.categoryheadingHolder}>
          <Text style={styles.categorItemTitle}>CATEGORIES</Text>
          <Text style={styles.text}>5 total</Text>
        </View>
        <View style={styles.categoryHolder}>
          {/* Analysis Tab */}
          <TouchableOpacity
            style={[
              styles.categoryItemHolder,
              activeCategory === 'analysis' && styles.activeCategory,
            ]}
            onPress={() => setActiveCategory('analysis')}
          >
            <Image
              source={icons.stats}
              style={[
                styles.categoryIcon,
                activeCategory === 'analysis' && styles.activeCategoryIcon,
              ]}
            />
          </TouchableOpacity>

          {/* List Tab */}
          <TouchableOpacity
            style={[
              styles.categoryItemHolder,
              activeCategory === 'list' && styles.activeCategory,
            ]}
            onPress={() => setActiveCategory('list')}
          >
            <Image
              source={icons.list}
              style={[
                styles.categoryIcon,
                activeCategory === 'list' && styles.activeCategoryIcon,
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Render Content Based on Active Tab */}
      <View style={styles.contentContainer}>
        {activeCategory === 'list' ? renderList() : renderAnalysis()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    height: 30,
    width: 30,
  },
  whitebackground: {
    backgroundColor: COLORS.white,
    paddingBottom: 20,
    paddingHorizontal:15,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
    
  },
  haedingText: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  smallText: {
    ...FONTS.body3,
    marginBottom: 20,
  },
  calendarIconHolder: {
    backgroundColor: COLORS.lightGray3,
    borderRadius: 50,
    height: 50,
    width: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateHolder: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginTop: 5,
    alignItems: 'flex-start',
  },
  dateInfo: {
    top: 5,
  },
  text:{
    ...FONTS.h5,
    ...COLORS.darkgray,
    top:5,
  },
  dateText: {
    ...FONTS.h4,
  },
  categoryItemHolder: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: COLORS.lightGray3,
    height: 40,
    width: 40,
  },
  calendarIcon:{
     height:20,
     width:20,
  },
  categoryIcon: {
    height: 20,
    width: 20,
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  categoryHolder: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorItemTitle: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  activeCategory: {
    backgroundColor: COLORS.primary,
  },
  activeCategoryIcon: {
    tintColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray3,
  },
  title: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  date: {
    ...FONTS.body5,
    color: COLORS.lightGray,
  },
});

export default AnalyticsScreen;
