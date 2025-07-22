import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform, StatusBar, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import OrderPendingScreen from './OrderPendingScreen';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
// Thay icon: 💳 ➝ credit-card-outline, 📱 ➝ cellphone, 💸 ➝ cash-multiple, 🏦 ➝ bank, 📦 ➝ truck-delivery





type RootStackParamList = {
    MockPayment: { linkedMethod?: string } | undefined;
    LinkAccount: { methodId: string; methodName: string };
    // Receipt: { methodId: string; methodName: string };
    OrderPending: { methodId: string; methodName: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MockPayment'>;
type RouteProps = RouteProp<RootStackParamList, 'MockPayment'>;

interface PaymentMethod {
    id: string;
    name: string;
    icon: string;
    requiresLinking: boolean;

}
type Voucher = {
    id: string;
    code: string;
    description: string;
    discount: number;
};

export default function PaymentScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProps>();
    const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['40%'], []);

    const [linkedAccounts, setLinkedAccounts] = useState<Record<string, boolean>>({
        card: false,
        momo: false,
        zalo: false,
    });

    const paymentMethods: PaymentMethod[] = [
        { id: 'card', name: 'Thẻ tín dụng / ghi nợ', icon: '💳', requiresLinking: true },
        { id: 'momo', name: 'Ví MoMo', icon: '📱', requiresLinking: true },
        { id: 'zalo', name: 'ZaloPay', icon: '💸', requiresLinking: true },
        { id: 'bank', name: 'Chuyển khoản ngân hàng', icon: '🏦', requiresLinking: false },
        { id: 'cod', name: 'Thanh toán khi nhận hàng', icon: '📦', requiresLinking: false },
    ];
    const vouchers: Voucher[]= [
        { id: 'v1', code: 'GIAM10', description: 'Giảm 10%', discount: 0.1 },
        { id: 'v2', code: 'FREESHIP', description: 'Miễn phí vận chuyển', discount: 20000 },
        { id: 'v3', code: 'GIAM50', description: 'Giảm 50K', discount: 50000 },
    ];

    useEffect(() => {
        if (route.params?.linkedMethod) {
            setLinkedAccounts((prev) => ({
                ...prev,
                [route.params!.linkedMethod!]: true,
            }));
        }
    }, [route.params]);

    const handleConfirm = () => {
        if (!selectedMethod) {
            Alert.alert('Vui lòng chọn phương thức thanh toán');
        } else {
            const selectedVoucherObj = vouchers.find(v => v.id === selectedVoucher);
            const voucherText = selectedVoucherObj
                ? `\nVoucher áp dụng: ${selectedVoucherObj.code}`
                : '';
            Alert.alert('Thanh toán thành công', `Bạn đã chọn: ${selectedMethod}${voucherText}`);
            const methodName = paymentMethods.find((m) => m.id === selectedMethod)?.name || '';
            // navigation.navigate('Receipt', {methodId: selectedMethod,methodName,});
            navigation.navigate('OrderPending', {
                methodId: selectedMethod,
                methodName,
            });

        }
    };

    return (
        <View style={styles.container}>
            <BottomSheetModal
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                backgroundStyle={{ borderRadius: 24 }}
            >
                <View style={{ padding: 16 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>
                        Chọn mã giảm giá
                    </Text>
                    <FlatList
                        data={vouchers}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.voucherItem}
                                onPress={() => {
                                    setSelectedVoucher(item.id);
                                    bottomSheetRef.current?.dismiss();
                                }}
                            >
                                <Text style={{ fontWeight: 'bold' }}>{item.code}</Text>
                                <Text style={{ color: '#555' }}>{item.description}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </BottomSheetModal>

            <TouchableOpacity
                style={styles.back}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={24} color="#1C1B1F" />
            </TouchableOpacity>
            <Text style={styles.title}>Chọn phương thức thanh toán</Text>
            {paymentMethods.map((method) => (
                <TouchableOpacity
                    key={method.id}
                    style={[
                        styles.method,
                        selectedMethod === method.id && styles.selected,
                    ]}
                    onPress={() => {
                        if (method.requiresLinking && !linkedAccounts[method.id]) {
                            navigation.navigate('LinkAccount', {
                                methodId: method.id,
                                methodName: method.name,
                            });
                        } else {
                            setSelectedMethod(method.id);
                        }
                    }}
                >
                    <Text style={styles.icon}>{method.icon}</Text>


                    <Text style={styles.text}>{method.name}</Text>
                    {linkedAccounts[method.id] && (
                        <Text style={styles.linkedText}>(Đã liên kết)</Text>
                    )}
                </TouchableOpacity>
            ))}
            <Text style={styles.title}>Chọn mã giảm giá</Text>
            {vouchers.map((voucher) => (
                <TouchableOpacity
                    style={styles.voucherButton}
                    onPress={() => bottomSheetRef.current?.present()}
                >
                    <Text style={styles.voucherButtonText}>
                        {selectedVoucher
                            ? `Mã đã chọn: ${vouchers.find(v => v.id === selectedVoucher)?.code}`
                            : 'Chọn mã giảm giá'}
                    </Text>
                </TouchableOpacity>


            ))}

            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Xác nhận thanh toán</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    method: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 14,
        backgroundColor: '#fff',
        elevation: 3, // Android shadow
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        marginVertical: 8,
    },
    back: {
        position: 'absolute',
        top: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 12 : 12,
        left: 16,
        zIndex: 1,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 24,
        padding: 4,
    },
    voucher: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginVertical: 6,
    },
    selected: {
        borderColor: '#007AFF',
        backgroundColor: '#e6f0ff',
    },
    icon: { fontSize: 24, marginRight: 12 },
    text: { fontSize: 16 },
    linkedText: {
        fontSize: 12,
        color: 'green',
        marginLeft: 8,
    },
    button: {
        marginTop: 30,
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    voucherButton: {
        backgroundColor: '#000',
        padding: 12,
        borderRadius: 12,
        marginVertical: 16,
    },
    voucherButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    voucherItem: {
        padding: 12,
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
        marginBottom: 10,
    },

});
