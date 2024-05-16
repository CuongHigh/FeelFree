import React, {useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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

type BottomModalPanCloseScrollableProps = React.PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
  height: number;
}>;

function BottomModalPanCloseScrollable(
  props: BottomModalPanCloseScrollableProps,
): React.JSX.Element {
  const styles = styleComponent(props.height);
  const transY = useSharedValue(0);
  const [isOnTop, setIsOnTop] = useState(true);

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
    .enabled(isOnTop)
    .activeOffsetY(10)
    .onStart(() => {
      transY.value += 10;
    })
    .onChange(e => {
      const val = e.translationY;
      transY.value = val > 0 ? val : 0;
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

        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.contentContainer, modalAnimate]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              onScroll={e => {
                const ontop = e.nativeEvent.contentOffset.y <= 0;
                if (ontop != isOnTop) {
                  setIsOnTop(ontop);
                }
              }}>
              {props.children}
            </ScrollView>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
}

export default BottomModalPanCloseScrollable;

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
