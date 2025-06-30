
// src/data/products.ts

export interface Feedback {
  user: string;
  comment: string;
  rating: number; // đánh giá cá nhân (0–5)
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  image: any;
  price: string;
  oldPrice: string;
  discount: string;
  availability: boolean;
  rating: number;       // trung bình đánh giá (0–5)
  reviewCount: number;  // số lượng đánh giá
  description: string;
  specs: string[];      // kích thước, chất liệu, màu sắc...
  features: string[];   // tính năng nổi bật
  feedbacks: Feedback[]; // góp ý chi tiết từ khách hàng
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'SOFA001',
    category: 'Sofa',
    name: 'Ghế Sofa Hiện Đại',
    image: require('../images/sofa1.jpg'),
    price: '5.200.000đ',
    oldPrice: '6.000.000đ',
    discount: 'Giảm 13%',
    availability: true,
    rating: 4.5,
    reviewCount: 24,
    description:
      'Ghế sofa hiện đại với thiết kế tối giản, khung gỗ sồi chắc chắn và nệm bọc vải cao cấp, mang lại cảm giác êm ái tối ưu.',
    specs: ['140×80×70 cm', 'Chất liệu: Vải nhung', 'Màu: Xám'],
    features: [
      'Khung gỗ tự nhiên chịu lực',
      'Nệm mút dày 15cm',
      'Chân inox chống trượt',
      'Bọc vải tháo rời dễ vệ sinh',
    ],
    feedbacks: [
      { user: 'Trần Văn A', rating: 5, comment: 'Rất đẹp và êm ái, đáng mua!' },
      { user: 'Nguyễn Thị B', rating: 4, comment: 'Chất liệu tốt nhưng hơi cứng.' },
    ],
  },
  {
    id: '2',
    sku: 'TABLE001',
    category: 'Bàn Trà',
    name: 'Bàn Trà Gỗ Tự Nhiên',
    image: require('../images/sofa1.jpg'),
    price: '2.150.000đ',
    oldPrice: '2.500.000đ',
    discount: 'Giảm 14%',
    availability: true,
    rating: 4.2,
    reviewCount: 18,
    description:
      'Bàn trà làm từ gỗ sồi tự nhiên, thiết kế vuông vắn, bề mặt sơn mờ chống trầy xước và thấm nước.',
    specs: ['80×80×45 cm', 'Chất liệu: Gỗ sồi', 'Màu: Nâu tự nhiên'],
    features: [
      'Gỗ sồi nhập khẩu',
      'Chống ẩm mốc tốt',
      'Chân bàn gắn ốc inox',
      'Bề mặt sơn PU mịn',
    ],
    feedbacks: [
      { user: 'Lê Thị C', rating: 4, comment: 'Khá chắc chắn nhưng hơi nặng.' },
      { user: 'Phạm Văn D', rating: 5, comment: 'Hoàn thiện rất đẹp, màu tự nhiên.' },
    ],
  },
  {
    id: '3',
    sku: 'ARMCHAIR001',
    category: 'Ghế Bành',
    name: 'Ghế Bành Bọc Da',
    image: require('../images/sofa1.jpg'),
    price: '3.300.000đ',
    oldPrice: '3.900.000đ',
    discount: 'Giảm 15%',
    availability: true,
    rating: 4.7,
    reviewCount: 32,
    description:
      'Ghế bành bọc da PU cao cấp, tựa lưng ôm sát, phù hợp góc đọc sách hoặc phòng khách sang trọng.',
    specs: ['90×85×80 cm', 'Chất liệu: Da PU', 'Màu: Đen'],
    features: [
      'Da tổng hợp chống thấm',
      'Khung thép chịu lực',
      'Đệm tự phồng êm ái',
      'Tua vít đi kèm để lắp ráp',
    ],
    feedbacks: [
      { user: 'Hoàng Anh E', rating: 5, comment: 'Thoải mái và sang trọng.' },
      { user: 'Đặng Thị F', rating: 4, comment: 'Da hơi cứng lúc mới dùng.' },
    ],
  },
  {
    id: '4',
    sku: 'SHELF001',
    category: 'Kệ Sách',
    name: 'Kệ Sách Hiện Đại',
    image: require('../images/sofa1.jpg'),
    price: '1.800.000đ',
    oldPrice: '2.000.000đ',
    discount: 'Giảm 10%',
    availability: true,
    rating: 4.1,
    reviewCount: 12,
    description:
      'Kệ sách 5 tầng làm từ gỗ công nghiệp chống ẩm, thiết kế thanh mảnh, tối ưu không gian nhỏ.',
    specs: ['120×30×180 cm', 'Chất liệu: MDF', 'Màu: Trắng'],
    features: [
      'Chống cong vênh',
      'Bề mặt phủ melamine',
      'Khung sắt gia cố',
      'Lắp ráp nhanh chóng',
    ],
    feedbacks: [
      { user: 'Võ Minh G', rating: 4, comment: 'Dễ lắp đặt, tuy nhiên kệ hơi rung.' },
      { user: 'Lý Thanh H', rating: 5, comment: 'Thiết kế đẹp và chắc chắn.' },
    ],
  },
  {
    id: '5',
    sku: 'BED001',
    category: 'Giường Ngủ',
    name: 'Giường Ngủ 1.6m',
    image: require('../images/sofa1.jpg'),
    price: '4.500.000đ',
    oldPrice: '5.200.000đ',
    discount: 'Giảm 13%',
    availability: false,
    rating: 4.3,
    reviewCount: 20,
    description:
      'Giường ngủ size 1.6m với khung gỗ keo bền chắc, đầu giường bọc vải nỉ, phong cách Bắc Âu nhẹ nhàng.',
    specs: ['160×200 cm', 'Chất liệu: Gỗ keo', 'Màu: Nâu đậm'],
    features: [
      'Khung giường cứng chắc',
      'Đầu giường có kệ tích hợp',
      'Hộp đựng đồ dưới gầm',
      'Bảo hành 12 tháng',
    ],
    feedbacks: [
      { user: 'Ngô Thị I', rating: 5, comment: 'Rất êm và chắc chắn.' },
      { user: 'Trịnh Văn K', rating: 3, comment: 'Khung hơi cọ vào sàn.' },
    ],
  },
  {
    id: '6',
    sku: 'DESK001',
    category: 'Bàn Làm Việc',
    name: 'Bàn Làm Việc Gỗ Tự Nhiên',
    image: require('../images/sofa1.jpg'),
    price: '2.900.000đ',
    oldPrice: '3.200.000đ',
    discount: 'Giảm 9%',
    availability: true,
    rating: 4.4,
    reviewCount: 15,
    description:
      'Bàn làm việc 1m2, mặt gỗ tự nhiên sơn PU, khung sắt sơn tĩnh điện, chịu lực tốt, phù hợp văn phòng tại nhà.',
    specs: ['120×60×75 cm', 'Chất liệu: Gỗ tự nhiên', 'Màu: Vàng sáng'],
    features: [
      'Chịu trọng đến 80kg',
      'Tấm lót chống trượt',
      'Lỗ đi dây âm bàn',
      'Chân có nút nhựa chống trượt',
    ],
    feedbacks: [
      { user: 'Phan Minh L', rating: 4, comment: 'Ổn định, nhưng vết xước xuất hiện nhanh.' },
      { user: 'Vũ Thị M', rating: 5, comment: 'Thiết kế rất tinh tế.' },
    ],
  },
  {
    id: '7',
    sku: 'OFFICECHAIR001',
    category: 'Ghế Văn Phòng',
    name: 'Ghế Văn Phòng Lưới',
    image: require('../images/sofa1.jpg'),
    price: '1.250.000đ',
    oldPrice: '1.500.000đ',
    discount: 'Giảm 16%',
    availability: true,
    rating: 4.0,
    reviewCount: 22,
    description:
      'Ghế văn phòng dạng lưới thoáng khí, tựa đầu điều chỉnh được độ cao, cần gạt ngả lưng tiện lợi.',
    specs: ['60×60×110 cm', 'Chất liệu: Lưới', 'Màu: Xám'],
    features: [
      'Lưng lưới thoáng',
      'Chân xoay 360°',
      'Tựa đầu tháo rời được',
      'Tải trọng 120kg',
    ],
    feedbacks: [
      { user: 'Đỗ Hữu N', rating: 4, comment: 'Thoải mái, lưng hơi cứng khi ngồi lâu.' },
      { user: 'Bùi Anh O', rating: 5, comment: 'Giải pháp tuyệt vời cho văn phòng.' },
    ],
  },
  {
    id: '8',
    sku: 'LAMP001',
    category: 'Đèn Trang Trí',
    name: 'Đèn Cây Trang Trí',
    image: require('../images/sofa1.jpg'),
    price: '750.000đ',
    oldPrice: '900.000đ',
    discount: 'Giảm 17%',
    availability: true,
    rating: 4.6,
    reviewCount: 8,
    description:
      'Đèn cây cao 1.5m, khung thép mạ vàng, chao đèn thả thủy tinh, ánh sáng ấm áp cho góc đọc sách.',
    specs: ['Dùng bóng E27', 'Chiều cao: 150 cm', 'Màu: Vàng ấm'],
    features: [
      'Chân thép mạ vàng',
      'Dây bọc vải 2m',
      'Công tắc xoay ngay thân',
      'Bóng LED tiết kiệm điện',
    ],
    feedbacks: [
      { user: 'Phùng Thị P', rating: 5, comment: 'Ánh sáng rất đẹp và ấm.' },
      { user: 'Lưu Minh Q', rating: 4, comment: 'Dễ vặn bóng, hơi lớn so với không gian nhỏ.' },
    ],
  },
  {
    id: '9',
    sku: 'RUG001',
    category: 'Thảm',
    name: 'Thảm Trải Sàn Cao Cấp',
    image: require('../images/sofa1.jpg'),
    price: '1.100.000đ',
    oldPrice: '1.300.000đ',
    discount: 'Giảm 15%',
    availability: true,
    rating: 4.2,
    reviewCount: 10,
    description:
      'Thảm trải sàn large size, sợi tổng hợp êm ái, chống trượt, dễ giặt, phù hợp phòng khách hoặc phòng ngủ.',
    specs: ['200×300 cm', 'Chất liệu: Sợi tổng hợp', 'Màu: Kem'],
    features: [
      'Chống rụng lông',
      'Dễ giặt máy',
      'Mặt đáy chống trượt',
      'Chịu mài mòn tốt',
    ],
    feedbacks: [
      { user: 'Trần Thị R', rating: 5, comment: 'Mềm mại và rất dễ giặt.' },
      { user: 'Phạm Văn S', rating: 4, comment: 'Tuyệt vời nhưng hơi dày.' },
    ],
  },
  {
    id: '10',
    sku: 'TVSTAND001',
    category: 'Tủ TV',
    name: 'Tủ TV Hiện Đại',
    image: require('../images/sofa1.jpg'),
    price: '2.400.000đ',
    oldPrice: '2.800.000đ',
    discount: 'Giảm 14%',
    availability: true,
    rating: 4.3,
    reviewCount: 14,
    description:
      'Tủ kệ TV dài 1.4m, gỗ MDF phủ melamine, ngăn kéo và kệ hở lưu trữ đa năng, phong cách tối giản.',
    specs: ['140×40×50 cm', 'Chất liệu: MDF', 'Màu: Đen'],
    features: [
      'Melamine chống trầy',
      'Ngăn kéo đóng êm',
      'Kệ hở trưng bày',
      'Dễ lắp ráp',
    ],
    feedbacks: [
      { user: 'Nguyễn Hữu T', rating: 4, comment: 'Ngăn kéo rất mượt.' },
      { user: 'Lê Thị U', rating: 5, comment: 'Phong cách tối giản rất đẹp.' },
    ],
  },
];
