import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomModal from './BottomModal';
import BottomModalHeaderPanClose from './BottomModalHeaderPanClose';
import BottomModalPanClose from './BottomModalPanClose';
import BottomModalPanCloseScrollable from './BottomModalPanCloseScrollable';
import Btn from '../components/btn';
import BottomModalInput from './BottomModalInput';

function ModalScreen(): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);

  return (
    <SafeAreaView>
      <View style={{alignItems: 'center', rowGap: 20}}>
        <TouchableOpacity
          style={{padding: 10, backgroundColor: 'red'}}
          onPress={() => {
            setVisible(true);
          }}>
          <Text style={{color: '#fff'}}>modal bottom</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{padding: 10, backgroundColor: 'red'}}
          onPress={() => {
            setVisible2(true);
          }}>
          <Text style={{color: '#fff'}}>modal bottom header pan close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: 10, backgroundColor: 'red'}}
          onPress={() => {
            setVisible3(true);
          }}>
          <Text style={{color: '#fff'}}>modal bottom pan close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: 10, backgroundColor: 'red'}}
          onPress={() => {
            setVisible4(true);
          }}>
          <Text style={{color: '#fff'}}>modal bottom pan close scrollable</Text>
        </TouchableOpacity>
        <Btn onPress={() => setVisible5(true)} name="modal bottom input" />
      </View>

      <BottomModal
        height={400}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}>
        <View style={{width: 200, height: 200, backgroundColor: 'red'}}></View>
      </BottomModal>

      <BottomModalHeaderPanClose
        height={400}
        visible={visible2}
        onClose={() => {
          setVisible2(false);
        }}
        HeaderPanCloseComponent={() => (
          <View style={{height: 50, backgroundColor: 'blue'}} />
        )}>
        <View style={{height: 200, backgroundColor: 'red'}}></View>
      </BottomModalHeaderPanClose>

      <BottomModalPanClose
        height={400}
        visible={visible3}
        onClose={() => {
          setVisible3(false);
        }}>
        <View style={{width: 200, height: 200, backgroundColor: 'red'}}></View>
      </BottomModalPanClose>

      <BottomModalPanCloseScrollable
        height={400}
        visible={visible4}
        onClose={() => {
          setVisible4(false);
        }}>
        {['#786BCF', '#6996E6', '#78E0F5', '#BDF5A9', '#FFF2A1', '#FC6FB1'].map(
          (x, i) => (
            <View key={i} style={{height: 300, backgroundColor: x}}></View>
          ),
        )}
      </BottomModalPanCloseScrollable>

      <BottomModalInput
        height={600}
        visible={visible5}
        onClose={() => {
          setVisible5(false);
        }}
      />
    </SafeAreaView>
  );
}

export default ModalScreen;
