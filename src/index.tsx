import {StackScreenProps} from '@react-navigation/stack';
import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Routes} from './constants/Routes';

function HomeScreen({navigation}: StackScreenProps<any>): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={{alignItems: 'center', backgroundColor: '#fff', rowGap: 20}}>
        <TouchableOpacity
          style={{padding: 10, backgroundColor: 'red'}}
          onPress={() => {
            navigation.navigate(Routes.MODAL);
          }}>
          <Text style={{color: '#fff'}}>modal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{padding: 10, backgroundColor: 'red'}}
          onPress={() => {
            navigation.navigate(Routes.KEYBOARD_INPUT);
          }}>
          <Text style={{color: '#fff'}}>keyboard & input</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
