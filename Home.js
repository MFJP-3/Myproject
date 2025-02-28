import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, FlatList, StyleSheet } from 'react-native';
import { CartContext } from '../CartContext';

const Home = ({ navigation }) => {
  const { products, addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    if (product.status === 'sold') {
      Alert.alert("สินค้านี้ถูกซื้อไปแล้ว");
      return;
    }
    addToCart(product);
    Alert.alert("เพิ่มลงตะกร้าเรียบร้อย");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>เพื่อนรักนักช้อป</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.product, item.status === 'sold' && styles.soldProduct]}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.status}>{item.status === 'sold' ? 'ถูกซื้อแล้ว' : 'ยังอยู่'}</Text>
            <TouchableOpacity onPress={() => handleAddToCart(item)}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.price}>ราคา: {item.price}$</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Store')}>
        <Text style={styles.buttonText}>ไปที่ตะกร้าสินค้า</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#D4C700', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  product: { backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 10 },
  soldProduct: { opacity: 0.5 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  status: { color: 'green' },
  image: { width: 100, height: 100, alignSelf: 'center' },
  price: { fontSize: 16, fontWeight: 'bold' },
  button: { backgroundColor: 'black', padding: 10, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18 }
});

export default Home;
