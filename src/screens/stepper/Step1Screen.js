import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import { COLORS, icons } from '../../constants';

const Step1 = ({ navigation, setProgress }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [isNameFocused, setNameFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPhoneFocused, setPhoneFocused] = useState(false);

  return (
    <View style={styles.screenContainer}>
    
      <Text style={{color:COLORS.black}}>Step 1/4</Text>
      <ProgressBar progress={25} />
  
      <Text style={styles.title}>Tell Us About Yourself</Text>
      <Text style={styles.description}>Fill in your basic details to get started.</Text>

      <View style={[styles.inputContainer, isNameFocused && styles.inputContainerFocused]}>
        <Image style={styles.icon} source={icons.name} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          placeholderTextColor={COLORS.darkgray}
          onChangeText={setName}
          onFocus={() => setNameFocused(true)}
          onBlur={() => setNameFocused(false)}
        />
      </View>

      <View style={[styles.inputContainer, isEmailFocused && styles.inputContainerFocused]}>
        <Image style={styles.icon} source={icons.mail} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          placeholderTextColor={COLORS.darkgray}
          value={email}
          onChangeText={setEmail}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
        />
      </View>

      <View style={[styles.inputContainer, isPhoneFocused && styles.inputContainerFocused]}>
        <Image style={styles.icon} source={icons.phone} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          placeholderTextColor={COLORS.darkgray}
          value={phone}
          onChangeText={setPhone}
          onFocus={() => setPhoneFocused(true)}
          onBlur={() => setPhoneFocused(false)}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Step2')}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
    marginTop:20,
  },
  description: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.darkgray,
    paddingHorizontal: 20,
    paddingVertical:5,
    borderRadius: 50,
    width: 330,
    marginBottom: 20,
  },
  inputContainerFocused: {
    borderColor: COLORS.primary,
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: COLORS.primary,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color:COLORS.black
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 19,
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 19,
  },
});

export default Step1;
