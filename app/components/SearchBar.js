import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

export default function SearchBar({ containerStyle, onSearch }) {
  const [query, setQuery] = useState(''); // State to manage the search query

  // Handle text input changes
  const handleChangeText = (text) => {
    setQuery(text); 
    onSearch(text); 
  };

  // Clear the search input
  const handleClear = () => {
    setQuery(''); 
    onSearch(''); 
  };

  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={query} 
        onChangeText={handleChangeText} 
        style={styles.searchBar}
        placeholder='Search here...'
        placeholderTextColor={colors.LIGHT_GRAY}
      />
      {query ? ( // Show the clear icon only if there's text in the input
        <AntDesign
          name='close'
          size={20}
          color={colors.PRIMARY}
          onPress={handleClear} 
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 40,
    borderRadius: 20, 
    paddingLeft: 15,
    fontSize: 16, 
    color: colors.LIGHT, 
    backgroundColor: colors.WHITE, 
    paddingRight: 40,
  },
  container: {
    justifyContent: 'center',
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
  },
});