import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {useChanges} from './UseContext';
import {OrderAgain} from './constants';
const Ordered = () => {
  const {Changes, SetChanges} = useChanges();

  const ItemRender = ({item}) => (
    <View
      key={item.Item}
      style={{
        marginHorizontal: 3.5,
        marginVertical: 3.5,
      }}>
      <View>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 200,
            width: 184,
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

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <ScrollView style={{backgroundColor: '#FAFAFA', paddingHorizontal: 14}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {OrderAgain.map(item => (
            <ItemRender item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Ordered;
