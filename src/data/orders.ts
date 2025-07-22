import { Product } from './products';

export interface OrderItem {
  id: string;
  name: string;
  image: any;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  orderId: string;
  orderDate: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress?: string;
  customerInfo?: {
    name: string;
    phone: string;
    email: string;
  };
}

export const createOrderFromCart = (cartItems: Product[], paymentMethod: string): Order => {
  const orderId = 'ORD' + Date.now().toString();
  const orderDate = new Date().toISOString();
  
  const items: OrderItem[] = cartItems.map(item => ({
    id: item.id || '',
    name: item.name || 'Sản phẩm không xác định',
    image: item.image,
    price: typeof item.price === 'number' ? item.price : 0,
    quantity: typeof item.quantity === 'number' ? item.quantity : 1,
    totalPrice: (typeof item.price === 'number' ? item.price : 0) * (typeof item.quantity === 'number' ? item.quantity : 1)
  }));

  const totalAmount = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

  return {
    orderId,
    orderDate,
    items,
    totalAmount,
    paymentMethod,
    status: 'pending'
  };
};
