import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Product } from "../data/products";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

type Props = {
  product: Product;
  onPress?: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Badge Sale */}
      <View style={styles.saleTag}>
        <Text style={styles.saleText}>SALE</Text>
      </View>
      {/* Product image */}
      <Image source={product.image} style={styles.image} resizeMode="cover" />
      {/* Product info */}
      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.price}>{product.price}</Text>
      <View style={styles.ratingRow}>
        <Feather name="star" size={15} color="#FFAF7A" />
        <Text style={styles.ratingText}>{product.rating}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: CARD_MARGIN * 1.4,
    marginHorizontal: CARD_MARGIN / 2,
    paddingHorizontal: 10,
    paddingVertical: 14,
    shadowColor: "#FFAF7A",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
    position: "relative",
    alignItems: "flex-start",
  },
  saleTag: {
    position: "absolute",
    top: 13,
    left: 13,
    zIndex: 2,
    backgroundColor: "#FF6600",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  saleText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  image: {
    width: "100%",
    height: CARD_WIDTH * 0.65,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 2,
    lineHeight: 20,
  },
  price: {
    fontSize: 16.5,
    color: "#FF6600",
    fontWeight: "800",
    marginBottom: 6,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  ratingText: { marginLeft: 3, color: "#888", fontSize: 14, fontWeight: "500" },
});
