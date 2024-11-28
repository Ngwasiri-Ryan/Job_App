import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DonutChart from '../../components/analytics/DonutChart';
import { COLORS, FONTS } from '../../constants';

const AnalysisTab = () => {
  // Sample data for the DonutChart
  const chartData = [
    { value: 40, color: COLORS.blue }, // saved jobs
    { value: 30, color: COLORS.green }, // applied jobs
    { value: 20, color: COLORS.red }, // chat activity
    { value: 10, color: COLORS.yellow },   // job preveiw
    { value: 10, color: COLORS.purple },  // job searched
  ];

  // Labels for chart segments
  const chartLabels = [
    { label: 'Saved Jobs', color: COLORS.blue },
    { label: 'Applied Jobs', color: COLORS.green },
    { label: 'Chat Activity', color: COLORS.red },
    { label: 'Job Preveiwing', color: COLORS.yellow },
    { label: 'Jobs Searched', color: COLORS.purple },
  ];

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Application Analysis</Text> */}
      
      {/* Donut Chart */}
      <View style={styles.chartContainer}>
        <DonutChart radius={140} strokeWidth={80} data={chartData} maxValue={100} />
      </View>
      
      {/* Chart Labels */}
      <View style={styles.labelsContainer}>
        <FlatList
          data={chartLabels}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.labelRow}>
              <View style={[styles.labelColor, { backgroundColor: item.color }]} />
              <Text style={styles.labelText}>{item.label}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical:20,
    backgroundColor: COLORS.white,
  },
  header: {
    ...FONTS.h2,
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.black,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  labelsContainer: {
    marginTop: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  labelText: {
    ...FONTS.body3,
    color: COLORS.black,
  },
});

export default AnalysisTab;
