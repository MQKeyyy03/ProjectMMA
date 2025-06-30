import React from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header"; // Nếu có dùng Header custom
import { Feather } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

type RouteProps = RouteProp<RootStackParamList, "ProductListByCategory">;
type NavProp = StackNavigationProp<RootStackParamList, "ProductListByCategory">;

export default function ProductListByCategoryScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavProp>();
  const { category } = route.params;
  const filtered = PRODUCTS.filter((p) => p.category === category);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header với nút Back */}
      <Header
        title={category}
        left={
          <Feather
            name="chevron-left"
            size={26}
            color="#FF6600"
            onPress={() => navigation.goBack()}
          />
        }
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetail", { productId: item.id })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No products found.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F6F6F6" },
  title: { fontSize: 22, fontWeight: "bold", margin: 16 },
  empty: { textAlign: "center", marginTop: 40, color: "#888" },
});
