import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image , Alert , ActivityIndicator} from 'react-native';
import { COLORS, icons } from '../../constants'; 
import { signUpUser } from '../../backend/auth/signup';


const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Toggles password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignUp = async () => {
    if (username && email && password) {
      const result = await signUpUser(username, email, password);
      setLoading(false);
      if (result.success) {
        // Alert and navigate to login screen on success
        Alert.alert("Success", "Account created successfully!", [
          { text: "OK", onPress: () => navigation.navigate('LoginScreen') }
        ]);
      } else {
        // Show error message in case of failure
        Alert.alert("Error", result.error || "Something went wrong!");
      }
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={icons.logo} style={styles.logo}/>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <View style={styles.inputContainer}>
        <Image source={icons.user} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={COLORS.darkgray}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={icons.mail} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={COLORS.darkgray}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={icons.lock} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={COLORS.darkgray}
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

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : (
          <Text style={styles.loginButtonText}>Sign Up</Text>
        )}
        </Text>
      </TouchableOpacity>

      <Text style={styles.alreadyMemberText}>
        Already have an account?{' '}
        <Text style={styles.loginText} onPress={() => navigation.navigate('LoginScreen')}>
          Log in
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    alignItems:'center'
  },
  logo:{
    height:200,
    width:300,
    top:-40,
   },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
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
  eyeIconContainer: {
    padding: 5,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray,
  },
  signUpButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width:'80%'
  },
  signUpButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  alreadyMemberText: {
    textAlign: 'center',
    color: COLORS.darkgray,
    fontSize: 16,
    marginTop: 15,
  },
  loginText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
