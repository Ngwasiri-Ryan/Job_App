import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { COLORS, icons } from '../../constants';

const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Toggles password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email address to receive a password reset link.
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <View style={styles.iconCircle}>
          <Image source={icons.mail} style={styles.icon} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={COLORS.gray}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Image source={icons.lock} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={COLORS.gray}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
          <Image
            source={isPasswordVisible ? icons.eye : icons.eyeOff}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>

      {/* Back to Login */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  subtitle: {
    fontSize: width * 0.045,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: height * 0.04,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.black,
    borderRadius: 10,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.02,
    marginBottom: height * 0.03,
    backgroundColor: COLORS.lightGrayBackground,
    borderBottomColor: COLORS.black,
    borderBottomWidth: 2,
  },
  iconCircle: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 25,
    padding: width * 0.03,
  },
  icon: {
    width: width * 0.05,
    height: width * 0.05,
    tintColor: COLORS.gray,
  },
  input: {
    flex: 1,
    fontSize: width * 0.045,
    color: COLORS.black,
    marginLeft: width * 0.03,
  },
  eyeIconContainer: {
    padding: width * 0.02,
  },
  eyeIcon: {
    width: width * 0.05,
    height: width * 0.05,
    tintColor: COLORS.gray,
  },
  resetButton: {
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginTop: height * 0.03,
  },
  resetButtonText: {
    color: COLORS.white,
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  backToLogin: {
    color: COLORS.black,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: width * 0.04,
    marginTop: height * 0.02,
  },
});

export default ForgotPasswordScreen;
