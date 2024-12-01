import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, icons } from '../../constants';

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
            source={isPasswordVisible ? icons.eye : icons.eyeOff} // Assume eye and eyeOff icons are defined
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
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 30,
  },
  eyeIconContainer: {
    padding: 5,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.black,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 20,
    backgroundColor: COLORS.lightGrayBackground, // Set a lighter background if desired
    borderBottomColor: COLORS.black, // Adds a defined bottom border color
    borderBottomWidth: 2, // Increases the width of the bottom border for emphasi
  },
  iconCircle: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 25,
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },
  resetButton: {
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent:'center',
    display:'flex',
    alignItems: 'center',
    backgroundColor:COLORS.primary,
    marginTop:30,
  },
  resetButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLogin: {
    color: COLORS.black,
    fontWeight:'bold',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
  },
});

export default ForgotPasswordScreen;
