import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import Products from '../../components/Home/Products';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Searchbar} from 'react-native-paper';

const staticFilters = [
  {
    title: 'brand',
    data: [
      {name: 'Rolls Royce', selected: false},
      {name: 'Volkswagen', selected: false},
      {name: 'Mini', selected: false},
      {name: 'Ferrari', selected: false},
      {name: 'Dodge', selected: false},
    ],
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState('');
  const [filteredData, setFilteredData] = useState('');
  const [search, setSearch] = useState('');
  const [filterList, setFilterList] = useState([...staticFilters]);
  const [modalFilterList, setModalFilterList] = useState([...staticFilters]);
  const modalizeRef = useRef(null);

  const filterModalOnOpen = async () => {
    const helperJson = JSON.stringify(filterList);
    const helperArray = JSON.parse(helperJson);
    setModalFilterList(helperArray);
    modalizeRef.current?.open();
  };

  const applyPress = () => {
    const helperJson = JSON.stringify(modalFilterList);
    const helperArray = JSON.parse(helperJson);
    setFilterList(helperArray);
    modalizeRef.current?.close();
  };

  const badgePress = (sectionIndex, index) => {
    const helperJson = JSON.stringify(modalFilterList);
    const helperArray = JSON.parse(helperJson);
    const section = helperArray[sectionIndex];
    section.data = section.data.map((element, _index) => ({
      ...element,
      selected: index == _index ? !element.selected : false,
    }));
    setModalFilterList(helperArray);
  };

  const listCategories = () => {
    axios
      .get(`https://5fc9346b2af77700165ae514.mockapi.io/products`)
      .then(result => {
        var _res = result.data;

        setProducts(_res);
        setFilteredData(_res);
      })
      .catch(err => {
        console.error(err);
        Alert.alert('UYARI', 'HATA', [
          {text: 'OK', onPress: () => console.warn(err)},
        ]);
      });
  };

  useEffect(() => {
    listCategories();
  }, []);

  const searchFilter = text => {
    if (text) {
      const newData = products.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(products);
      setSearch(text);
    }
  };
  const searchFilterWithModal = element => {
    if (element) {
      const newData = products.filter(function (item) {
        const itemData = item.brand
          ? item.brand.toUpperCase()
          : ''.toUpperCase();
        const textData = element.name.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(products);
    }
  };
  const refreshList = () => {
    axios
      .get(`https://5fc9346b2af77700165ae514.mockapi.io/products`)
      .then(result => {
        var _res = result.data;

        setProducts(_res);
        setFilteredData(_res);
      })
      .catch(err => {
        console.error(err);
        Alert.alert('UYARI', 'HATA', [
          {text: 'OK', onPress: () => console.warn(err)},
        ]);
      });
    modalizeRef.current?.close();
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={{height: Dimensions.get('screen').height - 130}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Searchbar
            style={styles.searchBarStyle}
            value={search}
            placeholder="Ara"
            underlineColorAndroid="transparent"
            onChangeText={text => searchFilter(text)}
          />
          <Ionicons
            onPress={filterModalOnOpen}
            name="options-outline"
            color={'black'}
            size={35}
          />
        </View>
        <FlatList
          numColumns={2}
          data={filteredData}
          renderItem={({item}) => <Products item={item} />}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={{backgroundColor: '#FFFFFF', paddingTop: 32}}>
        {modalFilterList.map((sectionElement, sectionIndex) => {
          const {title, data} = sectionElement;
          return (
            <View key={sectionIndex}>
              <Text style={{fontSize: 18, fontWeight: '500', margin: 10}}>
                Markalar
              </Text>
              <View style={[styles.badgeContainer]}>
                {data.map((element, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.badge,
                        {
                          marginLeft: 8,
                          backgroundColor: element.selected
                            ? 'blue'
                            : '#F7F7F7',
                        },
                      ]}
                      onPress={() => {
                        badgePress(sectionIndex, index);
                        searchFilterWithModal(element);
                      }}>
                      <Text
                        style={{
                          color: element.selected ? '#FFFF' : '#222222',
                        }}>
                        {element.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
        <View style={[styles.buttonContainer]}>
          <TouchableOpacity onPress={applyPress} style={[styles.button]}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>SEÇ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={refreshList} style={[styles.delButton]}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}>
              SIFIRLA
            </Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  columnWrapper: {
    justifyContent: 'space-evenly',
  },

  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    marginBottom: 8,
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  delButton: {
    borderWidth: 1,
    borderColor: 'red',
    marginTop: 10,
    borderRadius: 20,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 22,
    paddingVertical: 16,
    marginBottom: 20,
  },
  searchBarStyle: {
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    height: 50,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 30,
  },
});

export default HomeScreen;
