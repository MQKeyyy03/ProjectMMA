import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const SuccessPaymentScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const handleViewOrder = () => {
    navigation.navigate('MyOrders'); // hoặc màn bạn định nghĩa
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/845/845646.png',
        }}
        style={styles.image}
      />

      <Text style={styles.title}>Thanh toán thành công!</Text>
      <Text style={styles.subtitle}>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</Text>

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Quay về Trang chủ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={handleViewOrder}>
        <Text style={styles.buttonTextSecondary}>Xem đơn hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  buttonPrimary: {
    backgroundColor: '#FF6600',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonSecondary: {
    borderColor: '#FF6600',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonTextSecondary: {
    color: '#FF6600',
    fontWeight: '600',
    fontSize: 16,
  },
});
