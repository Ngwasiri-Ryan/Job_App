import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Dimensions, Image } from "react-native";
import { icons } from "../../constants"; 
import Video from 'react-native-video'


const { width } = Dimensions.get("window");

const VideoPlayerScreen = ({ route }) => {
  const { video } = route.params;
  const [paused, setPaused] = useState(false);
  const videoRef = useRef(null);

  return (
    <View style={styles.playerContainer}>
      <StatusBar hidden />
      <Video ref={videoRef} source={video.source} style={styles.videoPlayer} resizeMode="contain" controls paused={paused} />
      <TouchableOpacity style={styles.controlButton} onPress={() => setPaused(!paused)}>
        <Image
          source={paused ? icons.home : icons.user}
          style={styles.controlIcon}
        />
      </TouchableOpacity>
      <Text style={styles.videoTitle}>{video.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" },
  videoPlayer: { width: width, height: 250 },
  controlButton: { position: "absolute", bottom: 20, alignSelf: "center", backgroundColor: "rgba(0,0,0,0.5)", padding: 10, borderRadius: 50 },
  controlIcon: { width: 32, height: 32 , tintColor:'white' }, // Adjust size as needed
  videoTitle: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default VideoPlayerScreen;


