import React from 'react';
import { ActivityIndicator, Dimensions, Modal, View } from 'react-native';

const Loader = ({ Visible }: { Visible: boolean }) => {
  const { width, height } = Dimensions.get('window');
  return (
    <Modal visible={Visible} transparent={true} animationType={'fade'}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5',
          width: width,
          height: height,
        }}
      >
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    </Modal>
  );
};

export default Loader;
