import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../misc/colors';
import styles from './IntroStyles';
import RoundIconBtn from '../components/RoundIconBtn';

export default function Intro({ onFinish }) {
  // State to store the user's name
  const [name, setName] = useState('');

  // Function to handle submission of the user's name
  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      // Save the user's name in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify({ name }));
      onFinish();
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.LIGHT} />
      <View style={styles.container}>
        <Text style={styles.welcomeText}> Welcome to TodoMaster </Text>
        <Text style={styles.inputTitle}>Enter Your Name to Continue</Text>
        <TextInput
          value={name}
          onChangeText={setName} // Update the name state on text change
          placeholder="Enter your Name"
          style={styles.textInput}
          placeholderTextColor={colors.LIGHT_GRAY} 
        />

        <TouchableOpacity
          style={[styles.button, !name.trim() && styles.buttonDisabled]} 
          onPress={handleSubmit} 
          disabled={!name.trim()} 
        >
          <RoundIconBtn antIconName="arrowright" size={30} />
        </TouchableOpacity>
      </View>
    </>
  );
}