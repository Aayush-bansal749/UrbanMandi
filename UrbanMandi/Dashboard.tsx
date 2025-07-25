import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {categories} from './constants';
import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useChanges} from './UseContext';
import {OrderAgain} from './constants';
const main = () => {
  const navigation: any = useNavigation();

  const {Changes, SetChanges} = useChanges();

  const Heading = ({item}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text
        style={{
          fontFamily: 'ArgentumNovus-SemiBold',
          fontSize: 16,
          marginTop: 20,
        }}>
        {item}
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item, {
            Choice: 'All',
            index: 0,
          });
        }}>
        <Text
          style={{
            fontFamily: 'Inter-Bold',
            fontSize: 14,
            marginTop: 20,
            color: '#0B7954',
            textDecorationLine: 'underline',
          }}>
          see all
        </Text>
      </TouchableOpacity>
    </View>
  );

  const PastOrder = ({item}) => (
    <View
      key={item.Item}
      style={{
        marginHorizontal: 3.5,
        marginTop: 3,
        width: 110,
      }}>
      <View>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 90,
            width: 110,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            borderColor: '#EDEDED',
            borderWidth: 1,
          }}>
          <Image source={item.image} />
        </View>

        <Text
          style={{
            fontFamily: 'ArgentumNovus-Medium',
            fontSize: 14,
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
                    SetChanges(prev => [...prev, {name: item.Item, count: 1}]);
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
                    marginTop: -7,
                  }}
                  source={require('./figmaImages/Add_round.png')}
                />
              </TouchableOpacity>
            )}
            {Changes.filter(check => check.name == item.Item).length > 0 && (
              <View
                style={{
                  backgroundColor: 'darkgreen',
                  marginTop: -7,
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
                <Text style={{color: 'white', fontSize: 18}}>
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
  );

  const GreenScreen = () => (
    <View
      style={{
        backgroundColor: 'green',
        height: 169,
        width: 284,
        marginTop: 40,
        borderRadius: 15,
        marginRight: 10,
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 30,
          fontFamily: 'Argentum-Bold',
          marginTop: 30,
          marginLeft: 20,
        }}>
        Offers
      </Text>
      <Image
        style={{marginTop: -128, marginLeft: 40}}
        source={require('./figmaImages/sdfds1.png')}
      />
    </View>
  );

  const Category = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Shop by categories', {
            Choice: item.name,
            index: item.id,
          });
        }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 90,
            width: 112,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            borderColor: '#EDEDED',
            borderWidth: 1,
            marginRight: 6,
          }}>
          <Image source={item.image} />
        </View>
        <Text
          style={{
            fontFamily: 'ArgentumNovus-Medium',
            fontSize: 14,
            marginTop: 3,
            textAlign: 'center',
            width: 112,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 22,
        paddingTop: 30,
        backgroundColor: 'white',
      }}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{flexDirection: 'row', marginHorizontal: 8}}>
        <Image
          style={{marginTop: 17, marginLeft: 6}}
          source={require('./figmaImages/Logo.png')}
        />
        <Image
          style={{marginTop: 21, marginLeft: 112}}
          source={require('./figmaImages/Wallet_alt_fill.png')}
        />
        <Image
          style={{marginTop: 15, marginLeft: 11}}
          source={require('./figmaImages/User_cicrle_light.png')}
        />
      </View>
      <View style={{marginHorizontal: 8}}>
        <Text
          style={{
            fontFamily: 'ArgentumNovus-SemiBold',
            fontWeight: 600,
            fontSize: 20,
            marginTop: 10,
            marginLeft: 7,
          }}>
          Freshness delivered at a click
        </Text>
        <Text
          style={{
            fontFamily: 'Inter-SemiBold',
            fontSize: 15,
            marginTop: 7,
            marginLeft: 6,
          }}>
          Home - <Text> </Text>
          <Text
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 14,
            }}>
            Sector 135, Meerut Division, Bajidpur
          </Text>
        </Text>
      </View>

      <Pressable
        style={{
          width: 346,
          height: 49,
          backgroundColor: '#E2F8E9',
          marginTop: 26,
          alignSelf: 'center',
          borderRadius: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{marginTop: 12, marginLeft: 18}}
            source={require('./figmaImages/Search.png')}
          />
          <Text
            style={{
              marginTop: 12,
              marginLeft: 9,
              fontFamily: 'Inter-Regular',
              fontSize: 16,
              color: '#00000099',
            }}>
            Search for fruits, vegetables, eggs...
          </Text>
        </View>
      </Pressable>
      <Heading item={'Order again'} />

      <View style={{height: 150, marginTop: 6, marginBottom: 18}}>
        <FlatList
          data={OrderAgain}
          renderItem={({item}) => <PastOrder item={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Heading item={'Shop by categories'} />

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 8,
          marginTop: 9,
          justifyContent: 'space-between',
        }}>
        <FlatList
          data={categories}
          renderItem={({item}) => <Category item={item} />}
          horizontal={true}
        />
      </View>

      <FlatList
        data={[1, 2, 3]}
        renderItem={() => <GreenScreen />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default main;
