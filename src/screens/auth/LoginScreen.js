import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { COLORS, icons } from '../../constants'; // Customize COLORS and icons for your project
import { loginUser } from '../../backend/auth/login'; 
import { useUserContext } from '../../hooks/UserContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUserData } = useUserContext();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
  
    try {
      const result = await loginUser(email, password);
      setLoading(false);
  
      if (result.success) {
        const { user, username, isInPersonal } = result;
        setUserData({ email: user.email, username });
        console.log(`Username set in context: ${username}`);
  
        // Navigate based on the collection check
        if (isInPersonal) {
          navigation.navigate("JobSelectionScreen");
        } else {
          navigation.navigate("Step1");
        }
      } else {
        setError(result.error);
      }
    } catch (error) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
      console.error(error);
    }
  };
  

  return (
    <View style={styles.container}>
    <Image source={icons.logo} style={styles.logo}/>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Please login to continue</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Image source={icons.mail} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={COLORS.darkgray}
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
          placeholderTextColor={COLORS.darkgray}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Image
            source={hidePassword ? icons.eyeOff : icons.eye}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : (
          <Text style={styles.loginButtonText}>Log In</Text>
        )}
      </TouchableOpacity>

      {/* Error message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Register Redirect */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.registerLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    justifyContent: 'center',
    alignItems:'center'
  },
  logo:{
   height:200,
   width:300,
   top:-60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 30,
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
    borderBottomWidth: 2, // Increases the width of the bottom border for emphasis
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: COLORS.black,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop:30,
    width:'80%'
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  forgotPassword: {
    color: COLORS.primary,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 30,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: COLORS.black,
    fontSize: 14,
  },
  registerLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
