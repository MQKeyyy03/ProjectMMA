import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Order } from '../data/orders';
import { OrderManager } from '../data/orderManager';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  OrderDetail: { order: Order };
  OrderList: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'OrderDetail'>;

export default function OrderDetailScreen({ navigation, route }: Props) {
  const { order: initialOrder } = route.params;
  const [order, setOrder] = useState<Order>(initialOrder);

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
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN') + ' lúc ' + date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const cancelOrder = async () => {
    Alert.alert(
      'Hủy đơn hàng',
      'Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không thể hoàn tác.',
      [
        { text: 'Không', style: 'cancel' },
        {
          text: 'Có',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await OrderManager.cancelOrder(order.orderId);
              if (success) {
                // Cập nhật trạng thái đơn hàng hiện tại
                const updatedOrder = { ...order, status: 'cancelled' as const };
                setOrder(updatedOrder);
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

  const getProgressSteps = () => {
    const allSteps = [
      { key: 'pending', label: 'Chờ xử lý', icon: 'time-outline' },
      { key: 'confirmed', label: 'Đã xác nhận', icon: 'checkmark-circle-outline' },
      { key: 'shipped', label: 'Đang vận chuyển', icon: 'car-outline' },
      { key: 'delivered', label: 'Đã giao', icon: 'home-outline' },
    ];

    if (order.status === 'cancelled') {
      return [
        { key: 'cancelled', label: 'Đã hủy', icon: 'close-circle-outline', isActive: true, isCompleted: false }
      ];
    }

    const currentIndex = allSteps.findIndex(step => step.key === order.status);
    
    return allSteps.map((step, index) => ({
      ...step,
      isActive: index === currentIndex,
      isCompleted: index < currentIndex,
    }));
  };

  const renderProgressStep = (step: any, index: number, steps: any[]) => {
    const stepColor = step.isCompleted ? '#228B22' : step.isActive ? getStatusColor(order.status) : '#ccc';
    
    return (
      <View key={step.key} style={styles.progressStep}>
        <View style={styles.progressStepContent}>
          <View style={[styles.stepIcon, { backgroundColor: stepColor }]}>
            <Ionicons name={step.icon as any} size={20} color="#fff" />
          </View>
          <Text style={[styles.stepLabel, { color: stepColor }]}>{step.label}</Text>
        </View>
        {index < steps.length - 1 && (
          <View style={[styles.progressLine, { backgroundColor: step.isCompleted ? '#228B22' : '#ccc' }]} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#1C1B1F" />
      </TouchableOpacity>

      <Text style={styles.title}>Chi tiết đơn hàng</Text>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Thông tin đơn hàng */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Mã đơn hàng:</Text>
            <Text style={styles.infoValue}>{order.orderId}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ngày đặt:</Text>
            <Text style={styles.infoValue}>{formatDate(order.orderDate)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phương thức thanh toán:</Text>
            <Text style={styles.infoValue}>{order.paymentMethod}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Trạng thái:</Text>
            <Text style={[styles.statusBadge, { color: getStatusColor(order.status) }]}>
              {getStatusText(order.status)}
            </Text>
          </View>
        </View>

        {/* Tiến trình đơn hàng */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tiến trình đơn hàng</Text>
          <View style={styles.progressContainer}>
            {getProgressSteps().map((step, index, steps) => renderProgressStep(step, index, steps))}
          </View>
        </View>

        {/* Danh sách sản phẩm */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sản phẩm đã đặt ({order.items.length} món)</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.productItem}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.productId}>ID: {item.id}</Text>
                <Text style={styles.productPrice}>
                  {(item.price || 0).toLocaleString()} VND x {item.quantity || 0}
                </Text>
                <Text style={styles.productTotal}>
                  Tổng: {(item.totalPrice || 0).toLocaleString()} VND
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tổng kết đơn hàng */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tổng kết</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tổng số lượng:</Text>
            <Text style={styles.summaryValue}>
              {order.items.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tổng tiền hàng:</Text>
            <Text style={styles.summaryValue}>
              {(order.totalAmount || 0).toLocaleString()} VND
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Phí vận chuyển:</Text>
            <Text style={styles.summaryValue}>Miễn phí</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
            <Text style={styles.totalValue}>
              {(order.totalAmount || 0).toLocaleString()} VND
            </Text>
          </View>
        </View>

        {/* Nút hành động */}
        {order.status !== 'cancelled' && order.status !== 'delivered' && (
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.cancelOrderButton}
              onPress={cancelOrder}
            >
              <Ionicons name="close-circle-outline" size={20} color="#fff" />
              <Text style={styles.cancelOrderButtonText}>Hủy đơn hàng</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 12 : 50,
    left: 16,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1B1F',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#1C1B1F',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  statusBadge: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    textAlign: 'center',
  },
  progressContainer: {
    paddingVertical: 8,
  },
  progressStep: {
    alignItems: 'center',
  },
  progressStepContent: {
    alignItems: 'center',
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  progressLine: {
    width: 2,
    height: 30,
    marginVertical: 8,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1B1F',
    marginBottom: 4,
  },
  productId: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productTotal: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1C1B1F',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 16,
    color: '#1C1B1F',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  actionSection: {
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
  cancelOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC143C',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  cancelOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});