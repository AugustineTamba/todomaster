import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../misc/colors';
import styles from './IntroStyles';
import RoundIconBtn from '../components/RoundIconBtn';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Intro({ onFinish }) {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
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
        <Text style={styles.welcomeText}> Welcome to My TodoMaster </Text>
        <Text style={styles.inputTitle}>Enter Your Name to Continue</Text>
        <TextInput
          value={name}
          onChangeText={setName}
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