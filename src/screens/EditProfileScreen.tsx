import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useUser } from '../context/UserContext';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'EditProfile'>;

const EditProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { profile, updateProfile } = useUser();

  const [tempProfile, setTempProfile] = useState(
    profile || { name: '', title: '', avatar: '' }
  );

  const handleSave = () => {
    if (!tempProfile.name || !tempProfile.title) {
      Alert.alert('Missing fields', 'Please fill in all required fields.');
      return;
    }

    updateProfile(tempProfile);
    Alert.alert('Profile Updated', 'Your profile was successfully updated.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Avatar URL"
        value={tempProfile.avatar}
        onChangeText={(text) => setTempProfile({ ...tempProfile, avatar: text })}
      />

      {tempProfile.avatar.trim() !== '' && (
        <Image source={{ uri: tempProfile.avatar }} style={styles.avatar} />
      )}

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={tempProfile.name}
        onChangeText={(text) => setTempProfile({ ...tempProfile, name: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={tempProfile.title}
        onChangeText={(text) => setTempProfile({ ...tempProfile, title: text })}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#43a047',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditProfileScreen;
