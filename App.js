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
import {Container, Button} from 'native-base'
import ReactNativeBiometrics from 'react-native-biometrics'


const App: () => React$Node = ({initialProps}) => {
  // const { biometryType } = await ReactNativeBiometrics.isSensorAvailable()
  const onPressB = () =>{
  //   ReactNativeBiometrics.isSensorAvailable()
  // .then((resultObject) => {
  //   const { available, biometryType } = resultObject

  //   console.log('Result',resultObject)

  //   if (available && biometryType === ReactNativeBiometrics.TouchID) {
  //     console.log('TouchID is supported')
  //   } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
  //     console.log('FaceID is supported')
  //   } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
  //     console.log('Biometrics is supported')
  //   } else {
  //     console.log('Biometrics not supported')
  //   }
  // })
  // ReactNativeBiometrics.biometricKeysExist()
  // .then((resultObject) => {
  //   const { keysExist } = resultObject

  //   if (keysExist) {
  //     console.log('Keys exist')
  //   } else {
  //     console.log('Keys do not exist or were deleted')
  //   }
  // })
  // ReactNativeBiometrics.createKeys('Confirm fingerprint')
  // .then((resultObject) => {
  //   const { publicKey } = resultObject
  //   console.log(publicKey)
  //  // sendPublicKeyToServer(publicKey)
  // })
  let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
  let payload = epochTimeSeconds + 'some message'

ReactNativeBiometrics.createSignature({
    promptMessage: 'Sign in',
    payload: payload
  })
  .then((resultObject) => {
    const { success, signature } = resultObject

    if (success) {
      console.log(signature)
      verifySignatureWithServer(signature, payload)
    }
  })  
  }
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
          <Button onPress={onPressB}>
            <Text>Press ME</Text>
          </Button>
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

export default App;
