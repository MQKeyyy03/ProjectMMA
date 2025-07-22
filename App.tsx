import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <AppNavigator />
      <Toast />
    </UserProvider>
  );
}
