import { Button, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React from 'react';


const interests = ['Outdoor activities', 'Music', 'Art', 'Sports', 'Cooking', 'Reading', 'Traveling', 'Photography', 'Hiking', 'Camping', 'Fishing', 'Hunting', 'Gardening', 'Birdwatching', 'Skiing', 'Snowboarding', 'Ice skating', 'Biking', 'Swimming', 'Running', 'Yoga', 'Pilates', 'Gymnastics', 'Dancing', 'Singing', 'Musical instruments', 'Writing', 'Journaling', 'Poetry', 'Painting', 'Drawing', 'Sculpting', 'Ceramics', 'Crafting', 'Sewing', 'Knitting', 'Crocheting', 'Baking', 'Brewing', 'Wine tasting', 'Sommelier', 'Cocktails', 'Barista', 'Barkeeping', 'Food Critic', 'Food Blogger', 'Food Photography', 'Farmers Markets', 'Farm to Table', 'Farmers Markets', 'Farm to Table', 'Fashion', 'Makeup', 'Hair styling', 'Fashion Design', 'Fashion Photography', 'Styling', 'Personal Shopping', 'Interior Design', 'Landscaping', 'Home Decor', 'Gambling', 'Board Games', 'Video Games', 'Puzzles', 'Scavenger Hunts', 'Escape Rooms', 'Ghost Hunting', 'Magic', 'Psychics', 'Astrology', 'Tarot Reading'];

export default function PersonalisedGameScreen({ navigation }: RootTabScreenProps<'GameOver'>) {
  return (
<View style={styles.buttonContainer}>
  {interests.map(interest => (
    <TouchableOpacity
      key={interest}
      style={styles.button}
      onPress={() => {
        // Add the button's onPress handler here
      }}
    >
      <Text style={styles.buttonText}>{interest}</Text>
    </TouchableOpacity>
  ))}
</View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ed1e26',
    padding: 8,
    margin: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
