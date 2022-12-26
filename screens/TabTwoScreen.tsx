import { Button,StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { getNames } from '../components/nameStore';


export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  const names = getNames(); // retrieve the names from the name store
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Games</Text>
      <Text>Welcome </Text>
      {names.map((name, index) => (
        <Text key={index}>{name}</Text>
      ))}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/GamesScreen.tsx" /> */}
      <Button title="Start Game One" onPress={() => navigation.navigate('GameOne')}/>
      {/* <Button title="Getting into it" onPress={() => navigation.navigate('TabOne')}/>
      <Button title="Getting Crazy" onPress={() => navigation.navigate('TabOne')}/>
      <Button title="Getting Flirty" onPress={() => navigation.navigate('TabOne')}/>
      <Button title="Versus Battles" onPress={() => navigation.navigate('TabOne')}/> */}
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
