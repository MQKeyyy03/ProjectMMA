import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { PRODUCTS } from '../data/products';
import { RootStackParamList } from '../navigation/types';

type RouteProps = RouteProp<RootStackParamList, 'ProductDetail'>;

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = width * 0.75;

export default function ProductDetailScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const product = PRODUCTS.find(p => p.id === route.params.productId);

  if (!product) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>Product not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#1C1B1F" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={product.image}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>{product.price}</Text>
          <View style={styles.ratingContainer}>
            <Feather name="star" size={14} color="#C8A165" />
            <Text style={styles.rating}>{product.rating}</Text>
          </View>
        </View>

        {/* Product specs */}
        <View style={styles.specs}>
          {product.specs.map((s, i) => (
            <Text key={i} style={styles.specText}>• {s}</Text>
          ))}
        </View>

        {/* Description */}
        {product.description && (
          <Text style={styles.description}>{product.description}</Text>
        )}

        {/* Feedbacks */}
        {product.feedbacks && product.feedbacks.length > 0 && (
          <View style={styles.feedbackSection}>
            <Text style={styles.sectionTitle}>Phản hồi khách hàng</Text>
            {product.feedbacks.map((fb, idx) => (
              <View key={idx} style={styles.feedbackItem}>
                <View style={styles.feedbackHeader}>
                  <Text style={styles.feedbackUser}>{fb.user}</Text>
                  <View style={styles.ratingContainer}>
                    <Feather name="star" size={12} color="#C8A165" />
                    <Text style={styles.rating}>{fb.rating}</Text>
                  </View>
                </View>
                <Text style={styles.feedbackComment}>{fb.comment}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Action buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCart}>
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNow}>
          <Text style={styles.buyNowText}>Buy it now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F3EE',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
  content: {
    paddingTop: 56,
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingBottom: 140,
  },
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1B1F',
    marginBottom: 8,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1B1F',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1B1F',
  },
  specs: {
    width: '100%',
    marginBottom: 16,
  },
  specText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  feedbackSection: {
    width: '100%',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1B1F',
    marginBottom: 8,
  },
  feedbackItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  feedbackUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1B1F',
  },
  feedbackComment: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F7F3EE',
  },
  addToCart: {
    flex: 1,
    backgroundColor: '#1C1B1F',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  addToCartText: {
    color: '#FFF823',
    fontSize: 16,
    fontWeight: '600',
  },
  buyNow: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#1C1B1F',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buyNowText: {
    color: '#1C1B1F',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
});
