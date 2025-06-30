import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Header from '../components/Header'; // Đổi lại nếu cần
import { PRODUCTS } from '../data/products';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/navigation/types';

export default function CategoryScreen() {
//   const navigation = useNavigation();
type NavProp = StackNavigationProp<RootStackParamList, 'Category'>;
const navigation = useNavigation<NavProp>();

  // Lấy danh sách category duy nhất (không cần map icon)
  const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="Category"
        left={<Feather name="menu" size={22} color="#000" />}
        right={<Feather name="bell" size={22} color="#FF6600" />}
      />
      <FlatList
        data={categories}
        keyExtractor={item => item}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() =>
              navigation.navigate('ProductListByCategory', { category: item })
            }
          >
            <View style={styles.iconBox}>
              <Feather name="box" size={36} color="#FF6600" />
            </View>
            <Text style={styles.label}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F6F6F6' },
  categoryItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    margin: 8,
    alignItems: 'center',
    paddingVertical: 22,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#FFF4E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    color: '#FF6600',
    fontWeight: 'bold'
  }
});
