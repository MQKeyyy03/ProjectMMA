import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import { useUser } from '../context/UserContext';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { profile, logout } = useUser();

  const handleLogout = () => {
    logout();
    Alert.alert('Logged out', 'You have been logged out.');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const avatar = profile?.avatar?.trim();
const avatarUrl =
  avatar && avatar !== ''
    ? avatar
    : 'https://ui-avatars.com/api/?name=User&background=ccc&color=fff';
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.avatarSection}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
        <Text style={styles.name}>{profile?.name || 'No Name'}</Text>
        <Text style={styles.title}>{profile?.title || 'No Title'}</Text>
      </View>


      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      
      <View style={styles.menuSection}>
        <MenuItem icon="shopping-bag" label="My Purchases" />
        <MenuItem icon="map-pin" label="My Address" />
        <MenuItem icon="credit-card" label="Payment Method" />
        <MenuItem icon="settings" label="Settings" />
      </View>


      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

// Subcomponent for menu item
const MenuItem = ({ icon, label }: { icon: any; label: string }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Feather name={icon} size={20} color="#f57c00" />
    <Text style={styles.menuText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: '#f57c00',
    borderRadius: 60,
    padding: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
  },
  title: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    marginBottom: 20,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#FF6600',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'stretch',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
