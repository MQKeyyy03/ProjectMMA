import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductListByCategoryScreen from "../screens/ProductListByCategoryScreen"; // Thêm import này!
import { Feather } from "@expo/vector-icons";
import { RootStackParamList } from "./types";

// Main bottom tab
const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF6600",
        tabBarInactiveTintColor: "#9A9A9D",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          borderTopWidth: 0.5,
          borderTopColor: "#eee",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Feather name="grid" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Feather name="heart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main app stack
const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Tab bar group */}
        <Stack.Screen name="Home" component={MainTabs} />
        {/* Các màn chi tiết mở chồng lên tab */}
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen
          name="ProductListByCategory"
          component={ProductListByCategoryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
