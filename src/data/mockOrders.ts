import { Order, OrderItem } from './orders';

// Mock data để test
export const MOCK_ORDERS: Order[] = [
  {
    orderId: 'ORD1640123456789',
    orderDate: '2024-01-15T10:30:00.000Z',
    items: [
      {
        id: '1',
        name: 'Ghế Sofa Hiện Đại',
        image: require('../../assets/images/sofa1.jpg'),
        price: 5000000,
        quantity: 1,
        totalPrice: 5000000,
      },
      {
        id: '2',
        name: 'Bàn Trà Gỗ Tự Nhiên',
        image: require('../../assets/images/sofa1.jpg'),
        price: 600000,
        quantity: 2,
        totalPrice: 1200000,
      },
    ],
    totalAmount: 6200000,
    paymentMethod: 'Thẻ tín dụng / ghi nợ',
    status: 'shipped',
  },
  {
    orderId: 'ORD1640123456790',
    orderDate: '2024-01-14T14:20:00.000Z',
    items: [
      {
        id: '3',
        name: 'Ghế Bành Bọc Da',
        image: require('../../assets/images/sofa1.jpg'),
        price: 588900,
        quantity: 1,
        totalPrice: 588900,
      },
    ],
    totalAmount: 588900,
    paymentMethod: 'Ví MoMo',
    status: 'delivered',
  },
  {
    orderId: 'ORD1640123456791',
    orderDate: '2024-01-13T16:45:00.000Z',
    items: [
      {
        id: '4',
        name: 'Kệ Sách Hiện Đại',
        image: require('../../assets/images/sofa1.jpg'),
        price: 250000,
        quantity: 4,
        totalPrice: 1000000,
      },
    ],
    totalAmount: 1000000,
    paymentMethod: 'Thanh toán khi nhận hàng',
    status: 'pending',
  },
  {
    orderId: 'ORD1640123456792',
    orderDate: '2024-01-12T09:15:00.000Z',
    items: [
      {
        id: '5',
        name: 'Giường Ngủ 1.6m',
        image: require('../../assets/images/sofa1.jpg'),
        price: 3500000,
        quantity: 1,
        totalPrice: 3500000,
      },
    ],
    totalAmount: 3500000,
    paymentMethod: 'Chuyển khoản ngân hàng',
    status: 'cancelled',
  },
];

// Function để load mock data vào AsyncStorage (để test)
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadMockOrders = async (): Promise<boolean> => {
  try {
    await AsyncStorage.setItem('orders', JSON.stringify(MOCK_ORDERS));
    console.log('Mock orders loaded successfully');
    return true;
  } catch (error) {
    console.error('Error loading mock orders:', error);
    return false;
  }
};

// Function để clear mock data
export const clearMockOrders = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem('orders');
    console.log('Mock orders cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing mock orders:', error);
    return false;
  }
};
