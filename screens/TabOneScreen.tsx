import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Button, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { updateNames, getNames } from '../components/nameStore';
import * as Font from 'expo-font';





export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
        <View style={styles.container}>
          <View style={{ marginTop: 80, marginBottom: 10, flexDirection: 'row'}}>
            <Image
              style={styles.image}
              source={require('../assets/images/logo.png')}
            />
            <View style={{ marginLeft: 15 , marginTop: 25}}>
              <Text style={styles.largerTitle}>Drinking</Text>
              <Text style={styles.title}>Democracy</Text>
            </View>
          </View>

                <View style={styles.separator} lightColor="#000" darkColor="#111111" />
          <ScrollView>
            <View style={{ marginTop: 80}}>
              <Text style={styles.subTitle}>Who's playing?</Text>
              <NameInput navigation={navigation}/>
            </View>
          </ScrollView>
          {/* <View style={styles.separator} lightColor="#000" darkColor="#111111" /> */}
          {/* <View style={styles.buttonContainer}>
          <Button title="Let's Get Drunk!" onPress={() => navigation.navigate('TabTwo')}/>
        </View> */}
          {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
          <Image
            source={require('../assets/images/transparent_logo.png')}
            style={styles.bottomImage}
          />
      </View>
  );
}


const NameInput: React.FC<RootTabScreenProps<'TabOne'>>= ({ navigation }) => {
  const [names, setNames] = useState<string[]>(['']);

  const handleNameChange = (text: string, index: number) => {
    // Trim the input text to remove any leading or trailing white spaces
    const trimmedText = text.trim();
  
    // Check if the input text is not empty
    if (trimmedText) {
      // If the input text is not empty, add it to the list of names
      const newNames = [...names];
      newNames[index] = trimmedText;
      setNames(newNames);
      updateNames(newNames); // update the names in the name store
    }
  }

  const handleAddName = () => {
    setNames([...names, '']);
  }
  const handleRemoveName = () => {
    if (names.length > 1) {
      setNames(names.slice(0, -1));
    }
  }

  return (
      <View style={{ marginTop: 10, marginBottom: 10}}>
        {names.map((name, index) => (
          <View style={{ marginTop: 2.5, marginBottom: 2.5}} key={index}>
            <TextInput
              placeholder={` Enter name ${index + 1}`}
              value={name}
              onChangeText={text => handleNameChange(text, index)}
              style={styles.textInput}
              textAlign='center'
            />
          </View> 
        ))}
        <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row' }}>
          {names.length > 1 && (
            <TouchableOpacity
                style={{ ...styles.button, width: '25%' , marginRight: 5}}
                onPress={handleRemoveName}
            >
              <Text style={{ textAlign: 'center' , lineHeight: 25}}>-</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
              style={{ ...styles.button, width: '25%' }}
              onPress={handleAddName}
          >
          <Text style={{ textAlign: 'center' , lineHeight: 25}}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20, marginBottom: 5, width: 250, alignItems: 'center', justifyContent: 'center'}}>
          <Button
            title="Let's get drunk!"
            onPress={() => {
              navigation.navigate('TabTwo')
              console.log(`Names: ${names.join(', ')}`);
            }}
            color="#ed1e26"
          />
        </View>
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
    fontSize: 22,
    fontWeight: 'bold',
    // fontFamily: 'RamaSlabMW01-Heavy'
  },
  largerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    // fontFamily: 'RamaSlabMW01-Heavy'
  },
  subTitle: {
    textAlign: 'center', 
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    marginTop: 10,
    width: 100,
    height: 100
  },
  button: {
    backgroundColor: "#ed1e26",
    height: 25,
  },
  textInput: {
    backgroundColor: 'white',
    width: 250,
  },
  bottomImage: {
    position: 'absolute',
    bottom: -50,
    left: 0,
    right: 0,
    width: '100%',
    height: '33%',
    zIndex: -1,
  },
});
