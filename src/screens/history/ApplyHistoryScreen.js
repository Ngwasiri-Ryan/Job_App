import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const ApplyHistoryScreen = () => {
  const screenWidth = Dimensions.get("window").width;

  // Sample data for the chart
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Days of the week
    datasets: [
      {
        data: [2, 4, 6, 8, 10, 12, 14], // Example number of applications submitted
        strokeWidth: 2, // Optional: line thickness
        color: (opacity = 1) => `rgba(94, 99, 255, ${opacity})`, // Line color
      },
    ],
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f7f7f7" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
        Application History
      </Text>
      <LineChart
        data={data}
        width={screenWidth - 32} // Adjust for padding
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#f7f7f7",
          backgroundGradientTo: "#ffffff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#5E63FF",
          },
        }}
        bezier // Smooth the curve
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default ApplyHistoryScreen;
