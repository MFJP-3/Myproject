import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, FlatList, StyleSheet } from 'react-native';
import { CartContext } from '../CartContext';

const Store = ({ navigation }) => {
  const { cart, removeFromCart, confirmPurchase } = useContext(CartContext);

  const handleRemove = (id) => {
    Alert.alert("ยืนยันการลบ?", "ต้องการเอาสินค้าออกจากตะกร้าหรือไม่?", [
      { text: "ยกเลิก" },
      { text: "ตกลง", onPress: () => removeFromCart(id) }
    ]);
  };

  const handleConfirmPurchase = () => {
    Alert.alert("สั่งซื้อสำเร็จ!", "สินค้าของคุณถูกซื้อเรียบร้อยแล้ว");
    confirmPurchase();
    navigation.goBack();
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ตะกร้าสินค้า</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text style={styles.productName}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleRemove(item.id)}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.totalPrice}>ราคารวมสินค้า: {totalPrice}$</Text>
      <TouchableOpacity style={styles.button} onPress={handleConfirmPurchase}>
        <Text style={styles.buttonText}>ยืนยันการซื้อ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#D4C700', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  product: { backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 10 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  image: { width: 100, height: 100, alignSelf: 'center' },
  totalPrice: { fontSize: 20, fontWeight: 'bold', marginVertical: 20 },
  button: { backgroundColor: 'black', padding: 10, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18 }
});

export default Store;
