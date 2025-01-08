// import React, { useEffect, useRef } from 'react';
// import { View, Animated, StyleSheet, Image } from 'react-native';
// import { icons } from '../../constants'; // Assuming you have your icons object set up

// const Loader = () => {
//   const bounceAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(bounceAnim, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(bounceAnim, {
//           toValue: 0,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   }, [bounceAnim]);

//   const translateY = bounceAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, -50], // Ball moves up by 50 units
//   });

//   const shadowScale = bounceAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 0.5], // Shadow shrinks when ball moves up
//   });

//   return (
//     <View style={styles.container}>
//       {/* Shadow */}
//       <Animated.View
//         style={[
//           styles.shadow,
//           { transform: [{ scaleX: shadowScale }, { scaleY: shadowScale }] },
//         ]}
//       />
//       {/* Bouncing Image */}
//       <Animated.View style={[styles.bouncingPicture, { transform: [{ translateY }] }]}>
//         <Image source={icons.suitcase} style={styles.image} />
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bouncingPicture: {
//     width: 100,
//     height: 100,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   shadow: {
//    top:200,
//     width: 100,
//     height: 20,
//     backgroundColor: 'black',
//     borderRadius: 50,
//     opacity: 0.3,
//     bottom:10,
//      // Positioned below the bouncing image
//   },
// });

// export default Loader


import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const Loader = () => {
  const loaderHTML = `
  <html>
    <head>
      <style>
        .my-loader {
          width: 200px;
          height: 200px;
          perspective: 1000px;
          margin: 100px auto;
        }

        .rubiks-cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: my-rotateCube 5s infinite linear;
        }

        .my-loader .face {
          position: absolute;
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          height: 100%;
        }

        .my-loader .face.front {
          transform: translateZ(100px);
        }
        .my-loader .face.back {
          transform: rotateY(180deg) translateZ(100px);
        }
        .my-loader .face.left {
          transform: rotateY(-90deg) translateZ(100px);
        }
        .my-loader .face.right {
          transform: rotateY(90deg) translateZ(100px);
        }
        .my-loader .face.top {
          transform: rotateX(90deg) translateZ(100px);
        }
        .my-loader .face.bottom {
          transform: rotateX(-90deg) translateZ(100px);
        }

        .my-loader .cube {
          width: calc(100% / 3);
          height: calc(100% / 3);
          box-sizing: border-box;
          border: 1px solid #000;
        }

        @keyframes my-rotateCube {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }
      </style>
    </head>
    <body>
      <div class="my-loader">
        <div class="rubiks-cube">
          <div class="face front">
            <div style="background: #ff3d00;" class="cube"></div>
            <div style="background: #ffeb3b;" class="cube"></div>
            <div style="background: #4caf50;" class="cube"></div>
            <div style="background: #2196f3;" class="cube"></div>
            <div style="background: #ffffff;" class="cube"></div>
            <div style="background: #ffeb3b;" class="cube"></div>
            <div style="background: #4caf50;" class="cube"></div>
            <div style="background: #2196f3;" class="cube"></div>
            <div style="background: #ff3d00;" class="cube"></div>
          </div>
          <div class="face back">
            <div style="background: #4caf50;" class="cube"></div>
            <div style="background: #ff3d00;" class="cube"></div>
            <div style="background: #ffeb3b;" class="cube"></div>
            <div style="background: #2196f3;" class="cube"></div>
            <div style="background: #ffffff;" class="cube"></div>
            <div style="background: #ff3d00;" class="cube"></div>
            <div style="background: #ffeb3b;" class="cube"></div>
            <div style="background: #4caf50;" class="cube"></div>
            <div style="background: #2196f3;" class="cube"></div>
          </div>
          <div class="face left">
            <div style="background: #ffeb3b;" class="cube"></div>
            <div style="background: #4caf50;" class="cube"></div>
            <div style="background: #2196f3;" class="cube"></div>
            <div style="background: #ff3d00;" class="cube"></div>
            <div style="background: #ffffff;" class="cube"></div>
            <div style="background: #4caf50;" class="cube"></div>
            <div style="background: #2196f3;" class="cube"></div>
            <div style="background: #ffeb3b;" class="cube"></div>
            <div style="background: #ff3d00;" class="cube"></div>
          </div>
          <div class="face right">
            <div style="background: #4caf50;" class="cube"></div>
            <div style="background: #ff3d00;" class="cube"></div>
            <div style="background: #ffeb3b;" class="cube"></div>
            <div style="background: #2196f3;" class="cube"></div>
            <div style="background: #ffffff;" class="cube"></div>
            <div style="background: #ff3d00;" class="cube"></div>
            <div style="background: #ffeb3b;" class="cube"></div>
            <div style="background: #4caf50;" class="cube"></div>
            <div style="background: #2196f3;" class="cube"></div>
          </div>
          <div class="face top">
            <div style="background: #2196f3;" class="cube"></div>
            <div style="background: #ffeb3b;" class="cube"></div>
            <div style="background: #ff3d00;" class="cube"></div>
            <div style="background: #4caf50;" class="cube"></div>
            <div style="background: #ffffff;" class="cube"></div>
            <div style="background: #ffeb3b;" class="cube"></div>
            <div style="background: #ff3d00;" class="cube"></div>
            <div style="background: #4caf50;" class="cube"></div>
            <div style="background: #2196f3;" class="cube"></div>
          </div>
          <div class="face bottom">
            <div style="background: #ffffff;" class="cube"></div>
            <div style="background: #4caf50;" class="cube"></div>
            <div style="background: #2196f3;" class="cube"></div>
            <div style="background: #ff3d00;" class="cube"></div>
            <div style="background: #ffeb3b;" class="cube"></div>
            <div style="background: #4caf50;" class="cube"></div>
            <div style="background: #2196f3;" class="cube"></div>
            <div style="background: #ffffff;" class="cube"></div>
            <div style="background: #ff3d00;" class="cube"></div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView originWhitelist={['*']} source={{ html: loaderHTML }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    
  },
});

export default Loader;
