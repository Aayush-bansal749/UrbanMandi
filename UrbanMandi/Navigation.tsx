import BootSplash from 'react-native-bootsplash';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import main from './Dashboard';
import selection from './Categories';
import {ChangesProvider} from './UseContext';
import ordered from './OrderAgain';
import figmaModal from './Modal';

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
              component={main}
              options={{headerShown: false}}
            />
            <Stack.Screen name={'Shop by categories'} component={selection} />
            <Stack.Screen name={'Order again'} component={ordered} />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
            <Stack.Screen
              name={'figmaModal'}
              component={figmaModal}
              options={{headerShown: false}}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ChangesProvider>
  );
};

export default Figma;
