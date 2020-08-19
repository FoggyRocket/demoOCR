/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Container} from 'native-base'
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {utils} from '@react-native-firebase/app';
  import vision from '@react-native-firebase/ml-vision';

const OCRScreen: () => React$Node = ({initialProps}) => {
  const [picture, setPicture] = useState({});
  const [
    {cameraRef, type, ratio, autoFocus, autoFocusPoint, isRecording},
    {takePicture},
  ] = useCamera(initialProps);
  const options = {quality: 0.5, base64: false, pauseAfterCapture: false};
  const onTakePicture = async () => {
    try {
      const data = await takePicture(options);
      processesDocument(data.uri.replace('file://', ''));
      console.warn(data);
    } catch (error) {
      console.error(error);
    }
  };

  //Fireabse
  const processesDocument = async (localPath) => {
    const processed = await vision().cloudDocumentTextRecognizerProcessImage(
      localPath,
    );

    console.log('Found text in document: ', processed.text);
    processed.blocks.forEach((block) => {
      console.log('Found block with text: ', block.text);
      console.log('Confidence in block: ', block.confidence);
      console.log('Languages found in block: ', block.recognizedLanguages);
    });
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <RNCamera ref={cameraRef} style={styles.preview}>
          <Text style={styles.capture} onPress={() => onTakePicture()}>
            {' '}
            [CAPTURE CARD]{' '}
          </Text>
        </RNCamera>
      </View>
      <Container>

      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
});

export default OCR;
