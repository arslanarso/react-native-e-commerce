/* eslint-disable react-hooks/rules-of-hooks */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../../../Redux/CartReducer';

const Products = props => {
  const navigation = useNavigation();
  const [_categories, setCategories] = useState('');
  const cart = useSelector(state => state.cart.cart);

  const dispatch = useDispatch();

  const categoriesList = _categories;
  const item = props.item;

  const addItemToCart = item => {
    dispatch(addToCart(item));
  };
  const removeItemFromCart = item => {
    dispatch(removeFromCart(item));
  };

  const AddToCartButton = () => {
    return (
      <>
        {cart.some(value => value.id == item.id) ? (
          <Pressable
            style={styles.removeButton}
            onPress={() => {
              Alert.alert('Başarılı', 'Ürün Başarıyla Sepetten Çıkartıldı', [
                {text: 'Tamam', onPress: () => {}},
              ]);
              removeItemFromCart(item);
            }}>
            <Text
              style={{
                color: '#f70c02',
                fontWeight: 'bold',
              }}>
              SİL
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.button}
            onPress={() => {
              Alert.alert('Başarılı', 'Ürün Başarıyla Sepete Eklendi', [
                {text: 'Tamam', onPress: () => {}},
              ]);
              addItemToCart(item);
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}>
              Sepete Ekle
            </Text>
          </Pressable>
        )}
      </>
    );
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Ürün Detay', {
          item: item,
        })
      }
      style={styles.root}>
      <View>
        <FastImage
          style={[styles.image]}
          source={{
            uri: item.image,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          margin: 10,
          width: 150,
        }}>
        <Text style={styles.title}>{item.price} ₺</Text>
        <Text numberOfLines={1} style={{marginVertical: 5, fontSize: 16}}>
          {item.name}
        </Text>
        <View style={{justifyContent: 'flex-end'}}>
          <AddToCartButton />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 5,
    backgroundColor: 'white',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: '#fc8f8b',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },

  image: {
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: Dimensions.get('screen').width / 2.2,
    resizeMode: 'cover',
  },

  title: {
    fontSize: 16,
    marginTop: 5,
    color: 'blue',
    fontWeight: '700',
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Products;
