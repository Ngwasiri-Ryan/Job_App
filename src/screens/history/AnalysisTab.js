import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import DonutChart from '../../components/analytics/DonutChart';
import {COLORS, FONTS} from '../../constants';
import {useUserContext} from '../../hooks/UserContext';
import {countSavedJobs} from '../../backend/analysis/savedJobsCount';
import {getNumberOfAppliedJobs} from '../../backend/history/appliedJobs';
import {getUserChatSearchCount} from '../../backend/history/chatHistory';
import {countUserSearches} from '../../backend/history/searchHistory';
import {getViewedJobCount} from '../../backend/history/viewedJobs';

const AnalysisTab = () => {
  const {userData} = useUserContext();
  const username = userData?.username;

  const [chartData, setChartData] = useState([
    {label: 'Saved Jobs', value: 10, color: COLORS.blue},
    {label: 'Applied Jobs', value: 10, color: COLORS.green},
    {label: 'Chat Activity', value: 20, color: COLORS.red},
    {label: 'Job Previewing', value: 20, color: COLORS.yellow},
    {label: 'Jobs Searched', value: 10, color: COLORS.purple},
  ]);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        const [
          savedJobsCount,
          appliedJobsCount,
          chatCount,
          searchCount,
          viewedJobCount,
        ] = await Promise.all([
          countSavedJobs(username),
          getNumberOfAppliedJobs(username),
          getUserChatSearchCount(username),
          countUserSearches(username),
          getViewedJobCount(username),
        ]);

        setChartData([
          {label: 'Saved Jobs', value: savedJobsCount, color: COLORS.blue},
          {label: 'Applied Jobs', value: appliedJobsCount, color: COLORS.green},
          {label: 'Chat Activity', value: chatCount, color: COLORS.red},
          {
            label: 'Job Previewing',
            value: viewedJobCount,
            color: COLORS.yellow,
          },
          {label: 'Jobs Searched', value: searchCount, color: COLORS.purple},
        ]);
      } catch (error) {
        console.error('Error fetching analytics data:', error.message);
      }
    };

    fetchData();
  }, [username]);

  return (
    <View style={styles.container}>
      {/* Donut Chart */}
      <View style={styles.chartContainer}>
        <DonutChart radius={140} strokeWidth={70} data={chartData} />
      </View>

      {/* Chart Labels */}
      <View style={styles.labelsContainer}>
        <FlatList
          data={chartData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.labelRow}>
              <View
                style={[styles.labelColor, {backgroundColor: item.color}]}
              />
              <Text style={styles.labelText}>
                {` ${item.value} ${item.label}`}{' '}
                {/* Displays label and count */}
              </Text>
            </View>
          )}
          numColumns={2} // Set the number of columns
          columnWrapperStyle={styles.columnWrapper} // Optional: Add spacing between columns
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    top:-20,
  },
  labelsContainer: {
    marginTop: -5,
  },
  labelRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
    backgroundColor: COLORS.white,
    padding:20,
    width:200,
    height:60,
    borderRadius:10,
    gap: 5,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 5,
  },
  labelColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelText: {
    ...FONTS.body3,
    color: COLORS.black,
  },
});

export default AnalysisTab;
