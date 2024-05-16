import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

type StickWithKeyboardProps = React.PropsWithChildren<{}>;

function StickWithKeyboard({}: StickWithKeyboardProps): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      <ScrollView overScrollMode="never" alwaysBounceVertical={false}>
        {['#786BCF', '#6996E6', '#78E0F5', '#BDF5A9', '#FFF2A1', '#FC6FB1'].map(
          (x, i) => (
            <View key={i} style={{height: 300, backgroundColor: x}}></View>
          ),
        )}
      </ScrollView>

      <View style={{height: 60}}>
        <TextInput
          style={{
            color: '#fff',
            backgroundColor: '#1a1a1a',
            ...StyleSheet.absoluteFillObject,
          }}
          placeholder={'Write here'}
          placeholderTextColor={'#ababab'}
        />
      </View>
    </View>
  );
}

export default StickWithKeyboard;
