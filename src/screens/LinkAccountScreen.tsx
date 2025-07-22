import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type LinkAccountRouteProp = RouteProp<RootStackParamList, 'LinkAccount'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LinkAccount'>;

export default function LinkAccountScreen() {
    const route = useRoute<LinkAccountRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const { methodId, methodName } = route.params;

    const handleLink = () => {
        // Trả về màn trước và báo đã liên kết
        navigation.navigate('MockPayment', { linkedMethod: methodId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liên kết {methodName}</Text>
            <Text style={styles.text}>
                Bạn đang thực hiện liên kết với {methodName}. Nhấn nút bên dưới để hoàn tất.
            </Text>
            <Button title="Liên kết tài khoản" onPress={handleLink} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    text: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
});
