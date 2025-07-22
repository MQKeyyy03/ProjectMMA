import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, StatusBar, Platform, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from '../data/products';
import { Button } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { ButtonType } from '@stripe/stripe-react-native/lib/typescript/src/types/PlatformPay';



type RootStackParamList = {
  Cart: undefined;
  Payment: { orderedProducts: Product[] }; 
};
type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

export default function CartScreen({ navigation }: Props) {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const loadCart = async () => {
        try {
            const data = await AsyncStorage.getItem('cart');
            if (data !== null) {
                const parsed = JSON.parse(data) as Product[];
                setCartItems(parsed);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadCart);
        return unsubscribe;
    }, [navigation]);

    const removeItem = async (id: string) => {
        const newCart = cartItems.filter(item => item.id !== id);
        setCartItems(newCart);
        await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    };

    const getTotal = (): string => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return total.toLocaleString();
    };
    const updateQuantity = async (id: string, quantity: number) => {
        if (quantity <= 0) return removeItem(id);

        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity } : item
        );
        setCartItems(updatedCart);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleCheckout = async () => {
        Alert.alert(
            'Xác nhận thanh toán',
            'Bạn có chắc muốn thanh toán?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        Alert.alert('Thanh toán thành công', 'Cảm ơn bạn đã mua hàng!');
                        setCartItems([]);
                        await AsyncStorage.removeItem('cart');
                    },
                },
            ]
        );
    };
    const handleCheckoutPress = () => {
  Animated.sequence([
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start(() => {
    // ✅ Gọi thanh toán và truyền orderedProducts
    navigation.navigate('Payment', { orderedProducts: cartItems });
  });
};

    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: String(item.image) }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>  
                <Text>Giá: {item.price.toLocaleString()} VND</Text>
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <Text style={styles.removeText}>Xóa</Text>
                </TouchableOpacity>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Ionicons name="remove-circle-outline" size={26} color="red" />
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{item.quantity}</Text>

                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Ionicons name="add-circle-outline" size={26} color="green" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.back}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={24} color="#1C1B1F" />
            </TouchableOpacity>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={styles.empty}>Giỏ hàng trống</Text>}
            />
            <View style={styles.footer}>
                <Text style={styles.total}>Tổng: {getTotal().toLocaleString()} VND</Text>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity onPress={handleCheckoutPress} style={styles.checkoutButton}>
                        <Text style={styles.checkoutText}>Thanh toán</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fdfdfd',
    },
    itemContainer: {
        flexDirection: 'row',
        marginVertical: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    info: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    removeText: {
        color: 'red',
        marginTop: 8,
        fontSize: 14,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    checkoutButton: {
        backgroundColor: '#000',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ scale: 1 }],
    },
    checkoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 12,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 8,
    },
    empty: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#777',
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
});

