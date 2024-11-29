import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DonutChart from '../../components/analytics/DonutChart';
import { COLORS, FONTS } from '../../constants';
import { useUserContext } from '../../hooks/UserContext';
import { countSavedJobs } from '../../backend/analysis/savedJobsCount';
import { getNumberOfAppliedJobs } from '../../backend/history/appliedJobs';
import { getUserChatSearchCount } from '../../backend/history/chatHistory';
import { countUserSearches } from '../../backend/history/searchHistory';
import { getViewedJobCount } from '../../backend/history/viewedJobs';

const AnalysisTab = () => {
   const { userData } = useUserContext();
   const username = userData?.username;

   const [chartData, setChartData] = useState([
      { label: "Saved Jobs", value: 10, color: COLORS.blue }, 
      { label: "Applied Jobs", value: 10, color: COLORS.green }, 
      { label: "Chat Activity", value: 20, color: COLORS.red }, 
      { label: "Job Previewing", value: 20, color: COLORS.yellow }, 
      { label: "Jobs Searched", value: 10, color: COLORS.purple }, 
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
               { label: "Saved Jobs", value: savedJobsCount, color: COLORS.blue },
               { label: "Applied Jobs", value: appliedJobsCount, color: COLORS.green },
               { label: "Chat Activity", value: chatCount, color: COLORS.red },
               { label: "Job Previewing", value: viewedJobCount, color: COLORS.yellow },
               { label: "Jobs Searched", value: searchCount, color: COLORS.purple },
            ]);
         } catch (error) {
            console.error("Error fetching analytics data:", error.message);
         }
      };

      fetchData();
   }, [username]);

   return (
      <View style={styles.container}>
         {/* Donut Chart */}
         <View style={styles.chartContainer}>
            <DonutChart radius={150} strokeWidth={80} data={chartData} />
         </View>

         {/* Chart Labels */}
         <View style={styles.labelsContainer}>
            <FlatList
               data={chartData}
               keyExtractor={(item, index) => index.toString()}
               renderItem={({ item }) => (
                  <View style={styles.labelRow}>
                     <View style={[styles.labelColor, { backgroundColor: item.color }]} />
                     <Text style={styles.labelText}>
                        {`${item.label}: ${item.value}`} {/* Displays label and count */}
                     </Text>
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
      backgroundColor: COLORS.white,
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
