import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Receipt: { methodId: string; methodName: string };
    OrderPending: { methodId: string; methodName: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'OrderPending'>;

export default function OrderPendingScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<any>();

    useEffect(() => {
  const timer = setTimeout(() => {
    navigation.navigate("SuccessPayment", {
      methodName: route.params?.methodName,
    } as never); // 👈 Cần ép kiểu với 'as never' do typescript không hiểu rõ ở đây
  }, 5000); // 5 giây

  return () => clearTimeout(timer);
}, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Đơn hàng của bạn yêu nè :3</Text>
            <LottieView
                source={require('../../assets/animation/truck.json')} // bạn cần tải animation về
                autoPlay
                loop
                style={{ width: 300, height: 300 }}
            />
            <Text style={styles.text}>Đơn hàng của bạn đang được vận chuyển...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    text: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#007AFF' },
});
