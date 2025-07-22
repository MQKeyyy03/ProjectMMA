import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { StripeProvider } from '@stripe/stripe-react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider publishableKey="your-publishable-key">
        <UserProvider>
          <BottomSheetModalProvider>
            <AppNavigator />
            <Toast />
          </BottomSheetModalProvider>
        </UserProvider>
      </StripeProvider>
    </GestureHandlerRootView>
  );
}
