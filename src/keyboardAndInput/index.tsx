import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import StickWithKeyboard from './StickWithKeyboard';
import {View} from 'react-native';
import Btn from '../components/btn';
import ManyInput from './ManyInput';

const kiStack = createStackNavigator();

const KI_ROUTES = {
  StickWithKeyboard: 'StickWithKeyboard',
  ManyInput: 'ManyInput',
};

function KIScreen(): React.JSX.Element {
  return (
    <kiStack.Navigator screenOptions={{headerStyle: {height: 60}}}>
      <kiStack.Screen name="all_screen" component={AllScreen} />
      <kiStack.Screen
        name={KI_ROUTES.StickWithKeyboard}
        component={StickWithKeyboard}
      />
      <kiStack.Screen name={KI_ROUTES.ManyInput} component={ManyInput} />
    </kiStack.Navigator>
  );
}

function AllScreen({navigation}: StackScreenProps<any>): React.JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 20,
      }}>
      <Btn
        name={KI_ROUTES.StickWithKeyboard}
        onPress={() => {
          navigation.navigate(KI_ROUTES.StickWithKeyboard);
        }}
      />
      <Btn
        name={KI_ROUTES.ManyInput}
        onPress={() => {
          navigation.navigate(KI_ROUTES.ManyInput);
        }}
      />
    </View>
  );
}

export default KIScreen;
