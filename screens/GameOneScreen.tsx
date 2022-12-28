import { Button,StyleSheet } from 'react-native';
import React, { useEffect } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { getNames } from '../components/nameStore';
import Orientation from 'react-native-orientation';
import * as Expo from 'expo';
import { fetchPrompts, getRandomPrompt } from '../prompts';
import {useState} from 'react';
import { Prompt } from '../types';
// import { LoadingIndicator } from 'react-native-indicators';



export default function GameOneScreen({ navigation }: RootTabScreenProps<'GameOne'>) {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const names = getNames(); // retrieve the names from the name store

  useEffect(() => {
    fetchPrompts().then(() => {
      setPrompt(getRandomPrompt());
    });
  }, []);

  if (!prompt) {
    return null;
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game One</Text>
      {names.map((name, index) => (
        <Text key={index}>{name}</Text>
      ))}
      <Text>{prompt.text}</Text>
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
