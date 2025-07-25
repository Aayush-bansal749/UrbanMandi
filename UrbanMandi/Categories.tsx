import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useChanges} from './UseContext';
import {allItems, categories} from './constants';
const selection = ({route}) => {
  const {Choice, index} = route.params;
  const navigation: any = useNavigation();
  const [Filter, SetFilter] = useState('');
  const [Array, SetArray] = useState([]);
  const {Changes, SetChanges, Sort, setSort, now} = useChanges();
  const ref = useRef(false);

  useEffect(() => {
    SetFilter(Choice);
    Choice == 'All'
      ? SetArray([...allItems[1], ...allItems[2], ...allItems[3]])
      : SetArray(allItems[index]);
    setSort('Relevance (default)');
  }, []);

  useEffect(() => {
    if (ref.current) {
      if (Sort === 'Price (low to high)') {
        SetArray(
          [...Array].sort((a, b) => {
            return (
              parseInt(a.PriceBefore.split('₹')[1]) -
              parseInt(b.PriceBefore.split('₹')[1])
            );
          }),
        );
      }
      if (Sort === 'Price (high to low)') {
        SetArray(
          [...Array].sort((a, b) => {
            return (
              parseInt(b.PriceBefore.split('₹')[1]) -
              parseInt(a.PriceBefore.split('₹')[1])
            );
          }),
        );
      }
      if (Sort === 'Relevance (default)') {
        Filter == 'All'
          ? SetArray([...allItems[1], ...allItems[2], ...allItems[3]])
          : SetArray(allItems[index]);
      }
    }
    ref.current = true;
  }, [now]);

  const ItemRender = ({item}) => (
    <View
      style={{
        marginHorizontal: 3.5,
        marginVertical: 3.5,
      }}>
      <View>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 193,
            width: 134,
            paddingLeft: 16,
            justifyContent: 'center',
            borderRadius: 13,

            paddingTop: 10,
          }}>
          <Image
            style={{alignSelf: 'center', marginLeft: -16}}
            source={item.image}
          />
          <Text
            style={{
              fontFamily: 'ArgentumNovus-Medium',
              fontSize: 14,

              paddingTop: 20,
            }}>
            {item.Item}
          </Text>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 12,

              opacity: 0.6,
            }}>
            {item.quantity}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                fontSize: 14,
                paddingTop: 15,
              }}>
              {item.PriceAfter}
              <Text> </Text>
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 14,
                  textDecorationLine: 'line-through',
                  color: '#00000066',
                }}>
                {item.PriceBefore}
              </Text>
            </Text>
            <View>
              {Changes.filter(check => check.name == item.Item).length == 0 && (
                <TouchableOpacity
                  onPress={() => {
                    const checker = Changes.filter(
                      check => check.name == item.Item,
                    );
                    if (checker.length == 0) {
                      SetChanges(prev => [
                        ...prev,
                        {name: item.Item, count: 1},
                      ]);
                    } else {
                      const updated = [...Changes];
                      updated[Changes.indexOf(checker[0])].count += 1;
                      SetChanges(updated);
                    }
                  }}>
                  <Image
                    style={{
                      backgroundColor: 'darkgreen',
                      borderRadius: 4,
                      marginTop: 8,

                      marginHorizontal: 15,
                    }}
                    source={require('./figmaImages/Add_round.png')}
                  />
                </TouchableOpacity>
              )}
              {Changes.filter(check => check.name == item.Item).length > 0 && (
                <View
                  style={{
                    backgroundColor: 'darkgreen',
                    marginTop: 8,
                    borderRadius: 4,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      const checker = Changes.filter(
                        check => check.name == item.Item,
                      );

                      const updated = [...Changes];
                      updated[Changes.indexOf(checker[0])].count -= 1;
                      if (updated[Changes.indexOf(checker[0])].count == 0) {
                        updated.splice(Changes.indexOf(checker[0]), 1);
                      }
                      SetChanges(updated);
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}> - </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      marginHorizontal: 3,
                    }}>
                    {Changes.filter(check => check.name == item.Item)[0].count}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      const checker = Changes.filter(
                        check => check.name == item.Item,
                      );

                      const updated = [...Changes];
                      updated[Changes.indexOf(checker[0])].count += 1;
                      SetChanges(updated);
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}> + </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const Category = ({item}) => {
    return (
      <View style={{marginHorizontal: 10, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            SetArray(allItems[item.id]);
            SetFilter(item.name);
            setSort('Relevance (default)');
          }}>
          <View
            style={{
              backgroundColor: 'white',
              height: 62,
              width: 62,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 31,
              borderColor: Filter == item.name ? '#0B7954' : '#FAFAFA',
              borderWidth: 2,
              marginTop: 30,
            }}>
            <Image
              style={{
                height: 50,
                width: 50,
                resizeMode: 'contain',
                borderRadius: 25,
              }}
              source={item.image}
            />
          </View>
          <Text
            style={{
              fontFamily:
                Filter == item.name ? 'Inter-SemiBold' : 'Inter-Regular',
              fontSize: 13,
              alignSelf: 'center',
              marginTop: 10,
              textAlign: 'center',
              width: 80,
              color: Filter == item.name ? '#0B7954' : 'black',
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
        {Filter == item.name && (
          <View
            style={{
              width: 3,
              backgroundColor: '#0B7954',
              marginLeft: 7,
              height: 80,
              marginTop: 25,
            }}></View>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View
        style={{
          backgroundColor: 'white',
          width: 100,
        }}>
        <View style={{marginHorizontal: 10, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              SetArray([...allItems[1], ...allItems[2], ...allItems[3]]);
              SetFilter('All');
              setSort('Relevance (default)');
            }}>
            <View
              style={{
                backgroundColor: 'white',
                height: 62,
                width: 62,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 31,
                borderColor: Filter == 'All' ? '#0B7954' : '#FAFAFA',
                borderWidth: 2,
                marginTop: 10,
              }}>
              <Image
                style={{height: 50, width: 50, resizeMode: 'contain'}}
                source={require('./figmaImages/all-cat.png')}
              />
            </View>
            <Text
              style={{
                fontFamily:
                  Filter == 'All' ? 'Inter-SemiBold' : 'Inter-Regular',
                fontSize: 13,
                alignSelf: 'center',
                marginTop: 10,
                textAlign: 'center',
                width: 80,
                color: Filter == 'All' ? '#0B7954' : 'black',
              }}>
              All
            </Text>
          </TouchableOpacity>
          {Filter == 'All' && (
            <View
              style={{
                width: 3,
                backgroundColor: '#0B7954',
                marginLeft: 7,
                height: 80,
                marginTop: 5,
              }}></View>
          )}
        </View>
        <FlatList
          data={categories}
          renderItem={({item}) => <Category item={item} />}
        />
      </View>

      <View style={{backgroundColor: '#FAFAFA', paddingHorizontal: 14}}>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 24,
              width: 104,
              marginVertical: 5,
              marginLeft: 175,
              backgroundColor: 'white',
              justifyContent: 'space-evenly',
            }}
            onPress={() => {
              navigation.navigate('figmaModal');
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image source={require('./figmaImages/Vector13.png')} />
              <Image source={require('./figmaImages/Vector12.png')} />
            </View>

            <Text style={{fontFamily: 'Inter-Regular', fontSize: 14}}>
              Sort by
            </Text>
            <Image source={require('./figmaImages/Vector10.png')} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {Array.map(item => (
              <ItemRender item={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default selection;
