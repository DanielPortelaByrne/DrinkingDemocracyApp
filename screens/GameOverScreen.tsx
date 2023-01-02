import { Button, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React from 'react';


export default function GameOverScreen({ navigation }: RootTabScreenProps<'GameOver'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over</Text>
      <Button
          title="More Games"
          onPress={() => {
            navigation.navigate('TabTwo')
          }}
          color="#ed1e26"
        />
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
    marginVertical: 20,
  },
});
