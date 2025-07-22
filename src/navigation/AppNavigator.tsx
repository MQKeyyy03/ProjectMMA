import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductListByCategoryScreen from "../screens/ProductListByCategoryScreen";
import PaymentScreen from '../screens/PaymentScreen';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SuccessPaymentScreen from "../screens/SuccessPaymentScreen";


import { RootStackParamList } from "./types";
import LinkAccountScreen from "../screens/LinkAccountScreen";
// import ReceiptScreen from "../screens/ReceiptScreen";
import OrderPendingScreen from "../screens/OrderPendingScreen";


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
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <Feather name="grid" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <Feather name="heart" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "", // ✅ Không hiển thị chữ
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />


    </Tab.Navigator>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Màn auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

        {/* Màn chính */}
        <Stack.Screen name="Home" component={MainTabs} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="ProductListByCategory" component={ProductListByCategoryScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Phương thức thanh toán' }} />
        <Stack.Screen name="LinkAccount" component={LinkAccountScreen} options={{ title: 'Liên kết tài khoản' }} />
        {/* <Stack.Screen name="Receipt" component={ReceiptScreen} options={{ title: 'Biên lai' }} /> */}
        <Stack.Screen name="SuccessPayment" component={SuccessPaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OrderPending" component={OrderPendingScreen} options={{ headerShown: false }} />


        {/* Màn cá nhân */}
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
