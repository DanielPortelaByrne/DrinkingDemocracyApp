import { Button,StyleSheet } from 'react-native';
import React, { useEffect } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { getNames } from '../components/nameStore';
import Orientation from 'react-native-orientation';
import * as Expo from 'expo';


export default function GameOneScreen({ navigation }: RootTabScreenProps<'GameOne'>) {
  const names = getNames(); // retrieve the names from the name store

//   Expo.ScreenOrientation.lockAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game One</Text>
      {names.map((name, index) => (
        <Text key={index}>{name} do a backflip</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
