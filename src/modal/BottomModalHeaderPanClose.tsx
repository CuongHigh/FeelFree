import React, {useEffect} from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type BottomModalHeaderPanCloseProps = React.PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
  height: number;
  HeaderPanCloseComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
}>;

function BottomModalHeaderPanClose(
  props: BottomModalHeaderPanCloseProps,
): React.JSX.Element {
  const styles = styleComponent(props.height);
  const transY = useSharedValue(0);

  const HeaderPanClose: any = props.HeaderPanCloseComponent;

  const panClose = React.isValidElement(HeaderPanClose) ? (
    HeaderPanClose
  ) : HeaderPanClose ? (
    <HeaderPanClose />
  ) : null;

  useEffect(() => {
    if (!props.visible) {
      transY.value = 0;
    }
  }, [props.visible]);

  const modalAnimate = useAnimatedStyle(() => {
    return {
      transform: [{translateY: transY.value}],
    };
  });

  const gesture = Gesture.Pan()
    .activeOffsetY(10)
    .onStart(() => {
      transY.value += 10;
    })
    .onChange(e => {
      const val = e.translationY;
      if (val > 0) {
        transY.value = val;
      } else {
        transY.value = 0;
      }
    })
    .onEnd(e => {
      if (e.translationY > props.height / 2 || e.velocityY > 2300) {
        transY.value = withTiming(props.height, {duration: 200}, isFinish => {
          if (isFinish) {
            runOnJS(props.onClose)();
          }
        });
      } else {
        transY.value = withTiming(0, {duration: 200});
      }
    });

  return (
    <Modal
      visible={props.visible}
      transparent
      statusBarTranslucent
      animationType="fade">
      <GestureHandlerRootView style={styles.modal}>
        <TouchableWithoutFeedback onPress={props.onClose}>
          <View style={styles.backDrop} />
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.contentContainer, modalAnimate]}>
          {panClose && (
            <GestureDetector gesture={gesture}>{panClose}</GestureDetector>
          )}
          {props.children}
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

export default BottomModalHeaderPanClose;

const styleComponent = (height: number) =>
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
  });
