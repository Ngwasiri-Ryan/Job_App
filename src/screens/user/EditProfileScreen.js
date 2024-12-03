import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { COLORS, icons } from "../../constants";
import { updateUserProfile } from "../../backend/user/editProfile";
import { useUserContext } from "../../hooks/UserContext";

const EditProfileScreen = ({ route, navigation }) => {
  const { username, email, password } = route.params;

  const { userData, setUserData } = useUserContext();

  const [name, setName] = useState(username);
  const [userEmail, setUserEmail] = useState(email);
  const [passwordString, setPasswordString] = useState(password);

  const handleSave = async () => {
    const updates = {
      username: name,
      email: userEmail,
      password: passwordString,
    };

    const result = await updateUserProfile(username, updates);

    if (result.success) {

        // Update UserContext data
      setUserData((prevData) => ({
        ...prevData,
        username: name,
        email: userEmail,
      }));

      Alert.alert("Success", result.message, [
        { text: "OK", onPress: () => navigation.navigate('LoginScreen') },
      ]);
    } else {
      Alert.alert("Error", result.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={icons.logo} style={styles.logo} />
      </View>

      <Text style={styles.header}>Edit Profile</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={userEmail}
          onChangeText={setUserEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={passwordString}
          onChangeText={setPasswordString}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "#F9FAFB",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    height: 250,
    width: 400,
    resizeMode: "contain",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    fontSize: 16,
    color: COLORS.black,
    borderColor: COLORS.lightGray,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
