# Order Management System - Hướng dẫn sử dụng

## Tổng quan
Hệ thống quản lý đơn hàng bao gồm các màn hình:
- **PaymentScreen**: Chọn phương thức thanh toán và xác nhận đơn hàng
- **OrderPendingScreen**: Hiển thị animation đang vận chuyển (5 giây)
- **OrderListScreen**: Danh sách tất cả đơn hàng
- **OrderDetailScreen**: Chi tiết đơn hàng và tiến trình

## Flow hoạt động

1. **Cart → Payment → OrderPending → OrderList**
   ```
   CartScreen 
   ↓ (nhấn "Thanh toán")
   PaymentScreen 
   ↓ (chọn phương thức & xác nhận)
   OrderPendingScreen (5 giây)
   ↓ (tự động)
   OrderListScreen
   ```

2. **Từ User Profile → OrderList**
   ```
   UserScreen 
   ↓ (nhấn "Đơn hàng của tôi")
   OrderListScreen
   ```

## Cấu trúc dữ liệu

### Order Interface
```typescript
interface Order {
  orderId: string;           // Mã đơn hàng (ORD + timestamp)
  orderDate: string;         // Ngày đặt hàng (ISO string)
  items: OrderItem[];        // Danh sách sản phẩm
  totalAmount: number;       // Tổng tiền
  paymentMethod: string;     // Phương thức thanh toán
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}
```

### OrderItem Interface
```typescript
interface OrderItem {
  id: string;         // ID sản phẩm
  name: string;       // Tên sản phẩm
  image: any;         // Hình ảnh
  price: number;      // Giá đơn vị
  quantity: number;   // Số lượng
  totalPrice: number; // Tổng giá (price * quantity)
}
```

## Tính năng chính

### OrderListScreen
- ✅ Hiển thị danh sách đơn hàng theo thời gian mới nhất
- ✅ Thông tin: ID, tên, hình ảnh, giá, số lượng, tổng giá
- ✅ Nút "Xem chi tiết" → OrderDetailScreen  
- ✅ Nút "Hủy đơn" (chỉ với đơn hàng pending/confirmed/shipped)
- ✅ Pull to refresh
- ✅ Trạng thái đơn hàng có màu sắc khác nhau
- ✅ Empty state khi chưa có đơn hàng

### OrderDetailScreen
- ✅ Thông tin chi tiết đơn hàng
- ✅ Tiến trình đơn hàng (Progress steps)
- ✅ Danh sách sản phẩm đầy đủ
- ✅ Tổng kết thanh toán
- ✅ Nút hủy đơn hàng (nếu được phép)
- ✅ Responsive design

### OrderManager (Utility)
- ✅ `getAllOrders()`: Lấy tất cả đơn hàng
- ✅ `addOrder()`: Thêm đơn hàng mới
- ✅ `updateOrder()`: Cập nhật đơn hàng
- ✅ `cancelOrder()`: Hủy đơn hàng
- ✅ `getOrderById()`: Lấy đơn hàng theo ID
- ✅ `getOrdersByStatus()`: Lấy đơn hàng theo trạng thái
- ✅ `getOrderStats()`: Thống kê đơn hàng

## Cách test

### 1. Test với mock data
```typescript
import { loadMockOrders } from '../data/mockOrders';

// Load mock orders vào AsyncStorage
await loadMockOrders();
```

### 2. Test flow bình thường
1. Thêm sản phẩm vào giỏ hàng
2. Vào CartScreen → nhấn "Thanh toán"
3. Chọn phương thức thanh toán → "Xác nhận"
4. Xem animation OrderPendingScreen (5 giây)
5. Tự động chuyển đến OrderListScreen

### 3. Test từ User Profile
1. Vào UserScreen (tab User)
2. Nhấn "Đơn hàng của tôi"
3. Xem danh sách đơn hàng

## Ghi chú kỹ thuật

### AsyncStorage Keys
- `orders`: Lưu trữ mảng Order[]
- `cart`: Giỏ hàng (sẽ bị xóa sau khi đặt hàng thành công)

### Navigation Types
Đã cập nhật `src/navigation/types.ts`:
```typescript
OrderList: undefined;
OrderDetail: { order: Order };
OrderPending: { methodId: string; methodName: string };
MockPayment: { orderedProducts?: Product[] };
```

### Status Colors
- `pending`: #FFA500 (Orange)
- `confirmed`: #4169E1 (Blue)  
- `shipped`: #32CD32 (Green)
- `delivered`: #228B22 (Dark Green)
- `cancelled`: #DC143C (Red)

## Troubleshooting

### Lỗi thường gặp:
1. **Không thấy đơn hàng**: Kiểm tra AsyncStorage có dữ liệu không
2. **Lỗi navigation**: Đảm bảo đã thêm screen vào AppNavigator
3. **Lỗi types**: Kiểm tra RootStackParamList trong types.ts

### Debug commands:
```typescript
// Xem tất cả orders
const orders = await OrderManager.getAllOrders();
console.log('All orders:', orders);

// Xem stats
const stats = await OrderManager.getOrderStats();
console.log('Order stats:', stats);

// Clear tất cả orders
await OrderManager.clearAllOrders();
```

## TODO Future Enhancements
- [ ] Thêm filter theo trạng thái
- [ ] Thêm search đơn hàng
- [ ] Thêm pagination
- [ ] Thêm notification push khi trạng thái thay đổi
- [ ] Thêm tracking number
- [ ] Export hóa đơn PDF
