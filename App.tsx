import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src';
import {Routes} from './src/constants/Routes';
import ModalScreen from './src/modal';
import KIScreen from './src/keyboardAndInput';

const StackNav = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNav.Navigator id="rootStack">
            <StackNav.Screen name={Routes.HOME} component={HomeScreen} />
            <StackNav.Screen name={Routes.MODAL} component={ModalScreen} />
            <StackNav.Screen
              options={{headerShown: false}}
              name={Routes.KEYBOARD_INPUT}
              component={KIScreen}
            />
          </StackNav.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
