import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useChanges} from './UseContext';

const Modal = () => {
  const navigation: any = useNavigation();
  const {Sort, setSort, now, setnow} = useChanges();

  const sorts = [
    'Relevance (default)',
    'Price (low to high)',
    'Price (high to low)',
  ];

  const options = item => {
    return (
      <TouchableOpacity
        style={{backgroundColor: Sort === item ? '#E2F8E9' : 'white'}}
        onPress={() => {
          setSort(item);
          setnow(!now);
          navigation.goBack();
        }}
        key={item}>
        <Text
          style={{
            fontSize: 16,
            padding: 10,
            fontFamily: 'Inter-SemiBold',
            marginLeft: 40,
            color: Sort === item ? '#0B7954' : 'black',
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#00000043'}}>
      <Pressable style={{height: '70%'}} onPress={() => navigation.goBack()} />

      <View
        style={{
          height: '30%',
          width: '100%',

          alignSelf: 'center',
          borderTopRightRadius: 70,
          borderTopLeftRadius: 60,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 30,
          }}>
          <Text
            style={{
              fontSize: 20,

              fontFamily: 'ArgentumNovus-SemiBold',
              marginLeft: 40,
            }}>
            Sort by
          </Text>
        </View>
        <View>{sorts.map(item => options(item))}</View>
      </View>
    </View>
  );
};

export default Modal;
