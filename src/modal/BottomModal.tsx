import React from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

type BottomModalProps = React.PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
  height: number;
}>;

function BottomModal(props: BottomModalProps): React.JSX.Element {
  const styles = styleComponent(props.height);

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

        <View style={styles.contentContainer}>{props.children}</View>
      </View>
    </Modal>
  );
}

export default BottomModal;

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
