import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

type ManyInputProps = React.PropsWithChildren<{}>;

function ManyInput({}: ManyInputProps): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      <ScrollView
        overScrollMode="never"
        alwaysBounceVertical={false}
        contentContainerStyle={{rowGap: 40}}>
        {[1, 2, 3, 4, 5].map(x => (
          <View key={x}>
            <View style={{height: 100, backgroundColor: '#786BCF'}} />
            <View style={{height: 60}}>
              <TextInput
                style={{
                  color: '#fff',
                  backgroundColor: '#1a1a1a',
                  ...StyleSheet.absoluteFillObject,
                }}
                placeholder={'Write here ' + x}
                placeholderTextColor={'#ababab'}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default ManyInput;
