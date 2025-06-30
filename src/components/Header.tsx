import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';

type Props = {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export default function Header({ title, left, right }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>{left}</View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.side}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 4 : 28,
    paddingBottom: 10,
    backgroundColor: 'transparent', // Hoặc đặt màu tùy theme app
  },
  side: {
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});
