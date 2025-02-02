import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Intro from './app/screens/Intro';
import TodoScreen from './app/screens/TodoScreen';
import colors from './app/misc/colors';

export default function App() {
  const [user, setUser] = useState(null);
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const findUser = async () => {
    try {
      const result = await AsyncStorage.getItem('user');
      if (result === null) {
        setIsAppFirstTimeOpen(true);
      } else {
        setUser(JSON.parse(result));
        setIsAppFirstTimeOpen(false);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  }

  return (
    <>
      {!user ? (
        <Intro onFinish={findUser} />
      ) : (
        <TodoScreen user={user} onBack={() => setUser(null)} />
      )}
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.DARK,
  },
});