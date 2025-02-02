import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

export default function SearchBar({ containerStyle, onSearch }) {
  const [query, setQuery] = useState(''); // State to manage the search query

  // Handle text input changes
  const handleChangeText = (text) => {
    setQuery(text); // Update the query state
    onSearch(text); // Pass the query to the parent component
  };

  // Clear the search input
  const handleClear = () => {
    setQuery(''); // Clear the query state
    onSearch(''); // Pass an empty query to the parent component
  };

  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={query} // Bind the input value to the query state
        onChangeText={handleChangeText} // Handle text changes
        style={styles.searchBar}
        placeholder='Search here...'
        placeholderTextColor={colors.LIGHT_GRAY}
      />
      {query ? ( // Show the clear icon only if there's text in the input
        <AntDesign
          name='close'
          size={20}
          color={colors.PRIMARY}
          onPress={handleClear} // Clear the input when pressed
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
    borderRadius: 20, // Rounded corners
    paddingLeft: 15,
    fontSize: 16, // Slightly smaller font size
    color: colors.LIGHT, // Dark text color for better readability
    backgroundColor: colors.WHITE, // White background
    paddingRight: 40, // Add padding to prevent text overlap with the clear icon
  },
  container: {
    justifyContent: 'center',
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
  },
});