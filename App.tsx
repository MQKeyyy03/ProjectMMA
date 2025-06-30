// src/App.tsx
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { PRODUCTS } from './src/data/products';
import ProductDetailScreen from './src/ProductDetailScreen';

// Định nghĩa các route và params
export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string };
};
type HomeNavProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;
const BOTTOM_HEIGHT = 60;

// Màn hình danh sách sản phẩm
function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={PRODUCTS}
        keyExtractor={item => item.id}
        numColumns={2}
        ListHeaderComponent={() => (
          <>
            <View style={styles.header}>
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={18} color="#666" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Bạn cần tìm gì?"
                  placeholderTextColor="#999"
                />
              </View>
              <TouchableOpacity style={styles.location}>
                <Ionicons name="location-outline" size={20} color="#d00" />
                <Text style={styles.locationText}>Hồ Chí Minh</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color="#d00" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.cart}>
                <Ionicons name="cart-outline" size={24} color="#d00" />
              </TouchableOpacity>
            </View>
            <View style={styles.breadcrumb}>
              <Feather name="home" size={16} color="#666" />
              <Text style={styles.breadcrumbText}>Trang chủ / Sofa</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sortBar}
            >
              {['Giá Cao – Thấp', 'Giá Thấp – Cao', 'Khuyến Mãi Hot'].map(
                label => (
                  <TouchableOpacity key={label} style={styles.sortButton}>
                    <Text style={styles.sortText}>{label}</Text>
                  </TouchableOpacity>
                )
              )}
            </ScrollView>
          </>
        )}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: BOTTOM_HEIGHT + CARD_MARGIN },
        ]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('ProductDetail', { productId: item.id })
            }
          >
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.row}>
              <Text style={styles.price}>{item.price}</Text>
              <View style={styles.ratingContainer}>
                <Feather name="star" size={12} color="#C8A165" />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* Bottom fixed menu */}
      <View style={styles.bottomMenu}>
        {[
          { label: 'Home', icon: 'home' },
          { label: 'Shop', icon: 'shopping-bag' },
          { label: 'Search', icon: 'search' },
          { label: 'Favorite', icon: 'heart' },
          { label: 'Account', icon: 'user' },
        ].map(item => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <Feather
              name={item.icon as any}
              size={20}
              color={item.label === 'Shop' ? '#1C1B1F' : '#9A9A9D'}
            />
            <Text
              style={[
                styles.menuText,
                item.label === 'Shop' && { color: '#1C1B1F' },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// Stack navigator
const Stack = createStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F3EE',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 40,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  locationText: {
    color: '#d00',
    marginHorizontal: 4,
    fontWeight: '500',
  },
  cart: {},
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 32,
  },
  breadcrumbText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 12,
  },
  sortBar: {
    paddingHorizontal: 16,
    height: 48,
    alignItems: 'center',
  },
  sortButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sortText: {
    fontSize: 13,
    color: '#333',
  },
  list: {
    padding: CARD_MARGIN,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF8F1',
    borderRadius: 16,
    margin: CARD_MARGIN / 2,
    padding: 16,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1B1F',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1B1F',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#1C1B1F',
  },
  bottomMenu: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: BOTTOM_HEIGHT,
    backgroundColor: '#FFF464',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    fontSize: 12,
    marginTop: 2,
    color: '#9A9A9D',
  },
});