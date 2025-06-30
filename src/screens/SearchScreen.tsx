import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Header from "../components/Header";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

const COLORS = {
  primary: "#FF6600",
  gray: "#F6F6F6",
  white: "#FFF",
  black: "#000",
  placeholder: "#C8C8C8",
};

export default function SearchScreen() {
  const [keyword, setKeyword] = useState("");

  // Lọc sản phẩm theo tên (không phân biệt hoa thường, bỏ dấu cách)
  const filtered = PRODUCTS.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="Search"
        left={<Feather name="menu" size={22} color="#000" />}
        right={<Feather name="bell" size={22} color="#FF6600" />}
      />
      {/* Search bar */}
      <View style={styles.searchBox}>
        <Feather name="search" size={18} color={COLORS.placeholder} />
        <TextInput
          style={styles.input}
          placeholder="Tìm sản phẩm..."
          placeholderTextColor={COLORS.placeholder}
          value={keyword}
          onChangeText={setKeyword}
        />
        {keyword.length > 0 && (
          <TouchableOpacity onPress={() => setKeyword("")}>
            <Feather name="x" size={18} color={COLORS.placeholder} />
          </TouchableOpacity>
        )}
      </View>
      {/* List kết quả */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListEmptyComponent={
          <Text style={styles.empty}>Không tìm thấy sản phẩm phù hợp.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 14,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 42,
    marginBottom: 14,
    shadowColor: COLORS.black,
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
    fontSize: 15,
  },
});
