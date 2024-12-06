import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, FlatList, ScrollView  , Dimensions, Image} from 'react-native';
import { updateUserDetails } from '../../backend/profile/editOverview';
import { COLORS, icons,FONTS } from '../../constants';
const { width, height } = Dimensions.get('window'); 

const EditOverview = ({ selectedSection, userDetails, setUserDetails, setShowEditModal }) => {
  const [editedData, setEditedData] = useState(() => {
    switch (selectedSection) {
      case 'personalDetails':
        return userDetails.personalDetails;
      case 'workExperience':
        return userDetails.workExperience || [];
      case 'education':
        return userDetails.education || [];
      case 'certifications':
        return userDetails.certifications || [];
      case 'language':
        return userDetails.languages || [];
      case 'projects':
        return userDetails.projects || [];
      case 'interests':
        return userDetails.interests || [];
      case 'skills':
        return userDetails.skills || [];
      default:
        return {};
    }
  });

  useEffect(() => {
    setEditedData(() => {
      switch (selectedSection) {
        case 'personalDetails':
          return userDetails.personalDetails;
        case 'workExperience':
          return userDetails.workExperience || [];
        case 'education':
          return userDetails.education || [];
        case 'certifications':
          return userDetails.certifications || [];
        case 'language':
          return userDetails.languages || [];
        case 'projects':
          return userDetails.projects || [];
        case 'interests':
          return userDetails.interests || [];
        case 'skills':
          return userDetails.skills || [];
        default:
          return {};
      }
    });
  }, [selectedSection, userDetails]);

  const handleSave = async () => {
    try {
      await updateUserDetails(selectedSection, editedData);
      const updatedUserDetails = { ...userDetails, [selectedSection]: editedData };
      setUserDetails(updatedUserDetails);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  };

  const handleChange = (index, value, key = null) => {
    const updatedData = [...editedData];
  
    if (key) {
      // Update a specific field in an object
      updatedData[index][key] = value;
    } else {
      // Update a simple string (for language, skills, etc.)
      updatedData[index] = value;
    }
  
    setEditedData(updatedData);
  };
  

  const handleAddItem = () => {
    let newItem;
  
    switch (selectedSection) {
      case 'language':
      case 'interests':
      case 'skills':
        newItem = ''; // For simple sections with strings
        break;
      case 'workExperience':
      case 'education':
      case 'certifications':
      case 'projects':
        newItem = {
          title: '',       // Example fields for these sections
          description: '', // You can customize these fields as needed
          startDate: '',
          endDate: '',
        };
        break;
      default:
        return; // Exit if section doesn't support adding items
    }
  
    setEditedData([...editedData, newItem]);
  };
  

  const handleRemoveItem = (index) => {
    const updatedData = editedData.filter((_, i) => i !== index);
    setEditedData(updatedData);
  };

  const renderSection = () => {
    if (selectedSection === 'personalDetails') {
      return (
        <View>
          {['name', 'email', 'phone', 'city', 'town', 'country', 'summary'].map((field) => (
            <TextInput
              key={field}
              style={styles.input}
              value={editedData[field]}
              onChangeText={(text) => handleChange(field, text)}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          ))}
        </View>
      );
    }

    if (['language', 'interests', 'skills'].includes(selectedSection)) {
      return (
        <View>
          {editedData.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <TextInput
                style={styles.input}
                value={item}
                onChangeText={(text) => handleChange(index, text)}
                placeholder={`Enter ${selectedSection.slice(0, -1)}`}
              />
              <TouchableOpacity onPress={() => handleRemoveItem(index)}>
              <Image source={icons.trash} style={styles.removeIcon} />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add {selectedSection.slice(0, -1)}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (['workExperience', 'education', 'certifications', 'projects'].includes(selectedSection)) {
      return (
        <View>
          <FlatList
            data={editedData}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.itemContainer}>
                {Object.keys(item).map((key, idx) => (
                  <TextInput
                    key={idx}
                    style={styles.input}
                    value={item[key]}
                    onChangeText={(text) => handleChange(index, text, key)}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  />
                ))}
                <TouchableOpacity  onPress={() => handleRemoveItem(index)}>
                <Image source={icons.trash} style={styles.removeIcon} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add {selectedSection}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
  <Modal
  visible={true}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setShowEditModal(false)}
>
  <View style={styles.modalOverlay}>
    <ScrollView
      contentContainerStyle={styles.modalContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.modalTitle}>Edit {selectedSection}</Text>
      {renderSection()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowEditModal(false)} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
</Modal>

  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: '100%' , // 80% of the screen height
    width: 'auto',  // 90% of the screen width
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    justifyContent:'center'
  },
  modalTitle: {
    ...FONTS.h2,
    fontWeight: 'bold',
    color:COLORS.black,
    marginBottom: 15,
    textAlign:'center'
  },
  input: {
    borderWidth: 2,
    borderColor: COLORS.darkgray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderRadius:10,
    color:COLORS.black,
  },
  itemContainer: {
    marginBottom: 20,
  },
  removeButton: {
    color: 'red',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 5,
    marginTop: 10,
    justifyContent:'center',
    alignItems:'center'
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    justifyContent:'center',
    alignItems:'center',
    width:'20%',
    borderRadius: 5,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  removeIcon:{
    width: 24,
    height: 24,
    tintColor: '#FC635B',
  },
  cancelButton: {
    padding: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: COLORS.primary,
  },
});

export default EditOverview;
