import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  StatusBar, 
  Platform,
  RefreshControl 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Order, OrderItem } from '../data/orders';
import { OrderManager } from '../data/orderManager';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  OrderList: undefined;
  OrderDetail: { order: Order };
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'OrderList'>;

export default function OrderListScreen({ navigation }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadOrders();
    });
    return unsubscribe;
  }, [navigation]);

  const loadOrders = async () => {
    try {
      const orders = await OrderManager.getAllOrders();
      // Sắp xếp đơn hàng theo ngày mới nhất
      const sortedOrders = orders.sort((a, b) => 
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const cancelOrder = async (orderId: string) => {
    Alert.alert(
      'Hủy đơn hàng',
      'Bạn có chắc chắn muốn hủy đơn hàng này?',
      [
        { text: 'Không', style: 'cancel' },
        {
          text: 'Có',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await OrderManager.cancelOrder(orderId);
              if (success) {
                // Reload orders để cập nhật giao diện
                await loadOrders();
                Alert.alert('Thành công', 'Đơn hàng đã được hủy');
              } else {
                Alert.alert('Lỗi', 'Có lỗi xảy ra khi hủy đơn hàng');
              }
            } catch (error) {
              console.error('Error cancelling order:', error);
              Alert.alert('Lỗi', 'Có lỗi xảy ra khi hủy đơn hàng');
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'confirmed': return '#4169E1';
      case 'shipped': return '#32CD32';
      case 'delivered': return '#228B22';
      case 'cancelled': return '#DC143C';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'confirmed': return 'Đã xác nhận';
      case 'shipped': return 'Đang vận chuyển';
      case 'delivered': return 'Đã giao';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return 'Ngày không xác định';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Ngày không hợp lệ';
      return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Ngày không xác định';
    }
  };

  const renderOrderItem = ({ item: order }: { item: Order }) => {
    // Validation để đảm bảo order có đầy đủ thuộc tính
    if (!order || !order.orderId) {
      return null;
    }

    return (
      <View style={styles.orderContainer}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>Đơn hàng: {order.orderId}</Text>
          <Text style={[styles.status, { color: getStatusColor(order.status || 'pending') }]}>
            {getStatusText(order.status || 'pending')}
          </Text>
        </View>
        
        <Text style={styles.orderDate}>{formatDate(order.orderDate)}</Text>
        <Text style={styles.paymentMethod}>Thanh toán: {order.paymentMethod || 'Chưa xác định'}</Text>
      
      {/* Hiển thị items trong đơn hàng */}
      {order.items && order.items.length > 0 && order.items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <Image source={item.image} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName} numberOfLines={2}>{item.name || 'Sản phẩm không xác định'}</Text>
            <Text style={styles.itemPrice}>
              {(item.price || 0).toLocaleString()} VND x {item.quantity || 0}
            </Text>
            <Text style={styles.itemTotal}>
              Tổng: {(item.totalPrice || 0).toLocaleString()} VND
            </Text>
          </View>
        </View>
      ))}
      
      <View style={styles.orderFooter}>
        <Text style={styles.totalAmount}>
          Tổng đơn hàng: {(order.totalAmount || 0).toLocaleString()} VND
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.detailButton}
            onPress={() => navigation.navigate('OrderDetail', { order })}
          >
            <Ionicons name="eye-outline" size={16} color="#007AFF" />
            <Text style={styles.detailButtonText}>Xem chi tiết</Text>
          </TouchableOpacity>
          
          {order.status !== 'cancelled' && order.status !== 'delivered' && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => cancelOrder(order.orderId)}
            >
              <Ionicons name="close-circle-outline" size={16} color="#DC143C" />
              <Text style={styles.cancelButtonText}>Hủy đơn</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="chevron-back" size={24} color="#1C1B1F" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Danh sách đơn hàng</Text>
      
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.orderId}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Chưa có đơn hàng nào</Text>
            <Text style={styles.emptySubText}>Hãy đặt hàng để xem lịch sử tại đây</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 12 : 50,
    left: 16,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 24,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 60 : 100,
    marginBottom: 20,
    color: '#1C1B1F',
  },
  orderContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1B1F',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  paymentMethod: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1B1F',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  itemTotal: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '600',
  },
  orderFooter: {
    marginTop: 8,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1B1F',
    textAlign: 'right',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  detailButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  detailButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  cancelButtonText: {
    color: '#DC143C',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
