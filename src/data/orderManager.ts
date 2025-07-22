import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order } from './orders';

const ORDERS_STORAGE_KEY = 'orders';

export class OrderManager {
  // Lấy tất cả đơn hàng
  static async getAllOrders(): Promise<Order[]> {
    try {
      const data = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as Order[];
      }
      return [];
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  }

  // Thêm đơn hàng mới
  static async addOrder(order: Order): Promise<boolean> {
    try {
      const existingOrders = await this.getAllOrders();
      const updatedOrders = [...existingOrders, order];
      await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
      return true;
    } catch (error) {
      console.error('Error adding order:', error);
      return false;
    }
  }

  // Cập nhật đơn hàng
  static async updateOrder(orderId: string, updates: Partial<Order>): Promise<boolean> {
    try {
      const existingOrders = await this.getAllOrders();
      const updatedOrders = existingOrders.map(order =>
        order.orderId === orderId ? { ...order, ...updates } : order
      );
      await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
      return true;
    } catch (error) {
      console.error('Error updating order:', error);
      return false;
    }
  }

  // Lấy đơn hàng theo ID
  static async getOrderById(orderId: string): Promise<Order | null> {
    try {
      const orders = await this.getAllOrders();
      return orders.find(order => order.orderId === orderId) || null;
    } catch (error) {
      console.error('Error getting order by ID:', error);
      return null;
    }
  }

  // Hủy đơn hàng
  static async cancelOrder(orderId: string): Promise<boolean> {
    return await this.updateOrder(orderId, { status: 'cancelled' });
  }

  // Lấy đơn hàng theo trạng thái
  static async getOrdersByStatus(status: Order['status']): Promise<Order[]> {
    try {
      const orders = await this.getAllOrders();
      return orders.filter(order => order.status === status);
    } catch (error) {
      console.error('Error getting orders by status:', error);
      return [];
    }
  }

  // Xóa tất cả đơn hàng (để testing)
  static async clearAllOrders(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(ORDERS_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing orders:', error);
      return false;
    }
  }

  // Thống kê đơn hàng
  static async getOrderStats(): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    totalAmount: number;
  }> {
    try {
      const orders = await this.getAllOrders();
      const stats = {
        total: orders.length,
        pending: 0,
        confirmed: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
        totalAmount: 0,
      };

      orders.forEach(order => {
        stats[order.status]++;
        if (order.status !== 'cancelled') {
          stats.totalAmount += order.totalAmount;
        }
      });

      return stats;
    } catch (error) {
      console.error('Error getting order stats:', error);
      return {
        total: 0,
        pending: 0,
        confirmed: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
        totalAmount: 0,
      };
    }
  }
}
