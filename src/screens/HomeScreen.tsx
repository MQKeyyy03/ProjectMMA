import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import { Feather } from '@expo/vector-icons';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

const { width } = Dimensions.get('window');
const SECTION_SPACING = 18;

export default function HomeScreen({ navigation }: any) {
  const bestSellers = PRODUCTS.slice(0, 2);
  const topTrends = PRODUCTS.slice(2, 4);

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="Explore"
        left={<Feather name="menu" size={22} color="#000" />}
        right={<Feather name="bell" size={22} color="#FF6600" />}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner sale */}
        <TouchableOpacity style={styles.banner}>
          <Image
            source={require('../../assets/images/banner-sale.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerLabel}>Cyber Monday</Text>
            <Text style={styles.bannerTitle}>Sale Up To 70% Off</Text>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Best Seller */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Seller</Text>
        </View>
        <View style={styles.productRow}>
          {bestSellers.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          ))}
        </View>

        {/* Top Trends */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Trends</Text>
        </View>
        <View style={styles.productRow}>
          {topTrends.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          ))}
        </View>

        {/* All Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Products</Text>
        </View>
        <FlatList
          data={PRODUCTS}
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.productList}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          )}
        />

        <View style={{ height: 24 }} /> {/* Bottom spacing */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F6F6F6' },

  banner: {
    marginHorizontal: 8,
    borderRadius: 22,
    marginBottom: SECTION_SPACING,
    marginTop: 10,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#FFAF7A',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  bannerImage: {
    width: width - 16,
    height: (width - 16) * 0.48 + 50,
    borderRadius: 22,
  },
  bannerOverlay: {
    position: 'absolute',
    left: 28,
    top: 32,
  },
  bannerLabel: {
    backgroundColor: '#FF6600',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 14,
  },
  bannerBtn: {
    backgroundColor: '#FF6600',
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 10,
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  bannerBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 6,
  },
  sectionTitle: { fontSize: 19, fontWeight: 'bold', color: '#000' },

  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginBottom: 8,
  },

  productList: {
    paddingHorizontal: 4,
    marginBottom: 2,
  },
});
