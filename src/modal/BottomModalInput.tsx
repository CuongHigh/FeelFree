import React, {useEffect} from 'react';
import {
  Keyboard,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';

type BottomModalInputProps = React.PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
  height: number;
}>;

function BottomModalInput(props: BottomModalInputProps): React.JSX.Element {
  const safeInset = useSafeAreaInsets();
  const kbHeight = useSharedValue(0);
  const styles = styleComponent(props.height, safeInset);

  useEffect(() => {
    const subKBShowName =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';

    const subKBHideName =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const subKBShow = Keyboard.addListener(subKBShowName, event => {
      kbHeight.value = withTiming(event.endCoordinates.height, {
        duration: event.duration,
      });
    });

    const subKBHide = Keyboard.addListener(subKBHideName, event => {
      kbHeight.value = withTiming(0, {duration: event.duration});
    });

    return () => {
      subKBShow.remove();
      subKBHide.remove();
    };
  }, []);

  const inputAnimate = useAnimatedStyle(() => {
    const val = -kbHeight.value;
    let trans = val > 0 ? 0 : val;

    if (Math.abs(trans) > safeInset.bottom) {
      trans += safeInset.bottom;
    }

    return {
      transform: [{translateY: trans}],
    };
  });

  return (
    <Modal
      visible={props.visible}
      transparent
      statusBarTranslucent
      animationType="fade">
      <View style={styles.modal}>
        <TouchableWithoutFeedback onPress={props.onClose}>
          <View style={styles.backDrop} />
        </TouchableWithoutFeedback>

        <View style={styles.contentContainer}>
          <View style={{flex: 1, backgroundColor: 'green'}} />
          <Animated.View style={[styles.inputContainer, inputAnimate]}>
            <TextInput
              style={styles.inputCmt}
              placeholder={'Write here'}
              placeholderTextColor={'#ababab'}
            />
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
}

export default BottomModalInput;

const styleComponent = (height: number, safeInset: EdgeInsets) =>
  StyleSheet.create({
    modal: {flex: 1},
    backDrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    contentContainer: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      height: height,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 10,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderColor: '#565656',
      paddingTop: 10,
      backgroundColor: '#000',
      paddingBottom: safeInset.bottom + 10,
    },
    inputCmt: {
      borderRadius: 6,
      paddingHorizontal: 10,
      fontSize: 13,
      flex: 1,
      color: '#fff',
      backgroundColor: '#1a1a1a',
      height: 40,
    },
  });
