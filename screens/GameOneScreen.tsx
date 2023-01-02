import { TextInput, View, TouchableOpacity, StyleSheet, Dimensions, Button } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { getNames } from '../components/nameStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prompts to store in async storage
const prompts = [
  {
  text: 'take 3 sips if you have ever been to a different country, otherwise give them out'
  },
  {
  text: 'down your drink if you have a tattoo, otherwise give it out'
  },
  {
  text: 'take 2 sips if you have ever ridden a rollercoaster, otherwise give them out'
  },
  {
  text: 'down your drink if you have ever bungee jumped, otherwise give it out'
  },
  {
  text: 'give out 3 sips if you have ever been in a car accident, otherwise take them'
  },
  {
  text: 'take 4 sips if you have a phobia, otherwise give them out'
  },
  {
  text: 'down your drink if you have ever gone skydiving, otherwise give it out'
  },
  {
  text: 'give out 2 sips if you have ever broken a bone, otherwise take them'
  },
  {
  text: 'take 5 sips if you have a fear of public speaking, otherwise give them out'
  },
  {
  text: 'down your drink if you have ever played a sport at a professional level, otherwise give it out'
  },
  {
  text: 'take 2 sips if you are Irish, otherwise give them out'
  },
  {
  text: 'take 2 sips if you are Polish, otherwise give them out'
  },
  {
  text: 'take 2 sips if you are American, otherwise give them out'
  },
  {
  text: 'take 2 sips if you are Romanian, otherwise give them out'
  },
  {
  text: 'take 2 sips if you are mixed background, otherwise give them out'
  },
  {
  text: 'take 2 sips if you are in your early 20s, otherwise give them out'
  },
  {
  text: 'take 2 sips if you love formula one, otherwise give them out'
  },
  {
  text: 'take 2 sips if you spend money excessively, otherwise give them out'
  },
  {
  text: 'take 3 sips if you have a job in finance, otherwise give them out'
  },
  {
  text: 'take 3 sips if you have a job in tech, otherwise give them out'
  },
  {
  text: 'take 3 sips if you have a job in healthcare, otherwise give them out'
  },
  {
  text: 'take 3 sips if you have a job in education, otherwise give them out'
  },
  {
  text: 'take 3 sips if you have a job in the legal field, otherwise give them out'
  },
  {
  text: 'give out 3 sips if you have a job in the retail industry, otherwise take them'
  },
  {
  text: 'give out 3 sips if you have a job in the hospitality industry, otherwise take them'
  },
  {
  text: 'give out 3 sips if you have a job in the creative industry, otherwise take them'
  },
  {
  text: 'play never have i ever: players take turns saying something they have never done, and anyone who has done it must take a drink'
  },
  {
  text: 'play cheers to the governor: players take turns counting up from 1, but must say "cheers to the governor" instead of "3". If someone messes up or hesitates, they must take a drink'
  },
  {
  text: 'play quarters: players take turns trying to bounce a quarter off a table and into a cup. If they make it, they choose someone to drink. If they miss, they must drink'
  },
  ];
 
  
// Store the prompts in async storage
const storePrompts = async () => {
  try {
    // Convert the prompts array to a JSON string
    const promptsString = JSON.stringify(prompts);
    // Save the prompts string in async storage
    await AsyncStorage.setItem('prompts', promptsString);
    // console.log("Stored prompts");
  } catch (error) {
    console.error(error);
  }
};

// Retrieve the prompts from async storage
const retrievePrompts = async () => {
  try {
    // Get the prompts string from async storage
    const promptsString = await AsyncStorage.getItem('prompts');
    // Convert the prompts string back to an array
    return promptsString ? JSON.parse(promptsString) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};



export default function GameOneScreen({ navigation }: RootTabScreenProps<'GameOne'>) {
    // Store the prompts in async storage when the component is mounted
    useEffect(() => {
      storePrompts();
    }, []);

    useEffect(() => {
      displayRandomPromptAndName();
    }, []);
  
  const names = getNames(); // retrieve the names from the name store
  // Display a random prompt from the list of prompts
  const [randomName, setRandomName] = useState('');
  const [randomPrompt, setRandomPrompt] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#fff'); // Add a state to store the background color
  const [shouldNavigate] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [previousPrompt, setPreviousPrompt] = useState('');
  const [previousName, setPreviousName] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [previousBackgroundColor, setPreviousBackgroundColor] = useState<string>('');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [newRule, setNewRule] = useState('');

  const handleSubmit = () => {
    // Add the new rule to the prompts array and store it in async storage
    prompts.push({ text: newRule });
    AsyncStorage.setItem('prompts', JSON.stringify(prompts));
    // Reset the new rule input and close the overlay
    setNewRule('');
    setShowOverlay(false);
  }
  
  const displayRandomPromptAndName = async () => {
    // Retrieve the prompts from async storage
    const prompts = await retrievePrompts();
  
    // Check if there are any prompts left to display
    if (prompts.length > 0) {
      console.log(prompts.length)
      // Pick a random prompt from the list
      const index = Math.floor(Math.random() * prompts.length);
      const prompt = prompts[index];

      // Update the previous prompt, name and colour
      setPreviousBackgroundColor(backgroundColor);
      setPreviousPrompt(randomPrompt);
      setPreviousName(currentName);
  
 
      // Check if the prompt starts with "play" or if we should display a name with the prompt
      if (prompt.text.startsWith("play") || Math.random() > 0.5) {
        // Pick a random name from the list
        const nameIndex = Math.floor(Math.random() * names.length);
        const name = names[nameIndex];

        // Update the random name text
        setRandomName(name);
        setCurrentName(name);
      } else {
        // If the prompt doesn't start with "play" or if we decide not to display a name, set the random name to an empty string
        setRandomName('');
      }
      // Generate a random color
      const colors = ['#FFC300', '#FF3D00', '#000000', '#BF360C', '#B71C1C', '#607D8B', '#006064', '#D32F2F', '#4CAF50']; // Add some colors to choose from
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[colorIndex];
      // Update the background color
      setBackgroundColor(color);
  
      // Remove the displayed prompt from the list
      prompts.splice(index, 1);
  
      // Store the updated list of prompts in async storage
      await AsyncStorage.setItem('prompts', JSON.stringify(prompts));
  
      // Check if there are 5 prompts left to display
      // if (prompts.length === 5) {
      //   // Navigate back to the TabTwoScreen
      //   setShouldNavigate(true);
      // }
  
      // Update the random prompt text
      setRandomPrompt(prompt.text);

    } else {
      // If there are no prompts left to display, navigate back to the TabTwoScreen
      navigation.navigate('GameOver');
    }
  };
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={event => {
        const { locationX } = event.nativeEvent;
        const screenWidth = Dimensions.get('window').width;
        if (locationX < screenWidth / 2) {
          // Tap on the left side of the screen
          setRandomName(previousName);
          setRandomPrompt(previousPrompt);
          setBackgroundColor(previousBackgroundColor);
        } else {
          // Tap on the right side of the screen
          displayRandomPromptAndName();
          setCurrentName(previousName);
          setCurrentPrompt(previousPrompt);
          console.log("Name: "+ previousName);
          console.log("Prompt: "+ previousPrompt);
          if (shouldNavigate) {
            navigation.navigate('GameOver');
          }
        }
      }}
    >
      <TouchableOpacity onPress={() => setIsOverlayVisible(!isOverlayVisible)}>
        <Text>Add a Rule</Text>
      </TouchableOpacity>
      {isOverlayVisible && (
        <View style={styles.overlay}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter a new rule"
            onChangeText={text => setNewRule(text)}
            value={newRule}
          />
          <Button
            title="Submit"
            onPress={() => {
              // Add the new rule to the prompts array and store it in async storage
              prompts.push({ text: newRule });
              AsyncStorage.setItem('prompts', JSON.stringify(prompts));
              // Reset the new rule input and close the overlay
              setNew
              setNewRule('');
              setShowOverlay(false);
            }}
          />
        </View>
      )}
      <Text style={styles.gameText}>{randomName} {randomPrompt}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
