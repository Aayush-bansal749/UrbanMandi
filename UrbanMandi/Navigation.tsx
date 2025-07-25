import BootSplash from 'react-native-bootsplash';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChangesProvider} from './UseContext';
import Modal from './Modal';
import Main from './Dashboard';
import Selection from './Categories';
import Ordered from './OrderAgain';

const Stack = createNativeStackNavigator();
const Figma = () => {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await BootSplash.hide({fade: true});
    };
    hideSplashScreen();
  }, []);

  return (
    <ChangesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name={'dashboard'}
              component={Main}
              options={{headerShown: false}}
            />
            <Stack.Screen name={'Shop by categories'} component={Selection} />
            <Stack.Screen name={'Order again'} component={Ordered} />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
            <Stack.Screen
              name={'Modal'}
              component={Modal}
              options={{headerShown: false}}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ChangesProvider>
  );
};

export default Figma;
