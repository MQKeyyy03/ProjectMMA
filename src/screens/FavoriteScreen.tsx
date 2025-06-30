import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Header from '@components/Header';

const COLORS = {
  primary: '#FF6600',
  gray: '#F6F6F6',
  white: '#FFF',
  black: '#000',
};

const favoriteData = [
  { id: '1', name: 'Bean bag chair', price: '$95' },
  { id: '2', name: 'Bathroom cabinet', price: '$490' },
  { id: '3', name: 'Table lamp lighting', price: '$110' },
];

export default function FavoriteScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="Favorites"
        left={<Feather name="menu" size={22} color="#000" />}
        right={<Feather name="bell" size={22} color="#FF6600" />}
      />
      <FlatList
        data={favoriteData}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Feather name="image" size={48} color="#EEE" style={styles.img} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Feather name="heart" size={20} color={COLORS.primary} style={styles.like} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: 'bold'
  },
  itemCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    margin: 8,
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
    position: 'relative'
  },
  img: {
    marginBottom: 12,
  },
  name: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  like: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});
