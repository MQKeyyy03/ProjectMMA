import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { StripeProvider } from '@stripe/stripe-react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView>

      <BottomSheetModalProvider>
        <AppNavigator />
        <Toast />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>

  );
}
