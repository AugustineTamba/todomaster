import React, { useEffect, useState, Animated } from 'react';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './TodoStyles';
import colors from '../misc/colors';
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import TodoModal from '../components/TodoModal';
import Todo from '../components/Todo';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';

export default function TodoScreen({ user, onBack }) {
  const [greetings, setGreetings] = useState(''); // Greeting message based on time of day
  const [modalVisible, setModalVisible] = useState(false); // Controls visibility of the TodoModal
  const [todos, setTodos] = useState([]); // List of todos
  const [searchQuery, setSearchQuery] = useState(''); // Search query for filtering todos
  const [editTodo, setEditTodo] = useState(null); // Todo item being edited

  // Effect to load todos and determine greeting when the user changes
  useEffect(() => {
    findTodos();
    determineGreeting();
  }, [user]);

  // Function to determine the greeting based on the current time
  const determineGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) setGreetings('Morning');
    else if (hrs < 17) setGreetings('Afternoon');
    else setGreetings('Evening');
  };

  // Function to fetch todos from AsyncStorage
  const findTodos = async () => {
    if (!user || !user.name) return;
  
    const normalizedName = user.name.trim().toLowerCase();
    const userKey = `todos_${normalizedName}`;
  
    try {
      const result = await AsyncStorage.getItem(userKey);
      if (result) {
        setTodos(JSON.parse(result));
      } else {
        setTodos([]);
      }
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    }
  };

  // Function to handle submission of a new or edited todo
  const handleOnSubmit = async (title, desc, date) => {
    const newTodo = {
      id: editTodo ? editTodo.id : Date.now(),
      title,
      desc,
      date: date.toISOString(),
      createdAt: new Date().toISOString(),
      time: new Date().toLocaleTimeString(),
    };
  
    let updatedTodos;
    if (editTodo) {
      updatedTodos = todos.map((todo) => (todo.id === editTodo.id ? newTodo : todo));
    } else {
      updatedTodos = [...todos, newTodo];
    }
  
    setTodos(updatedTodos);
  
    const normalizedName = user.name.trim().toLowerCase();
    await AsyncStorage.setItem(`todos_${normalizedName}`, JSON.stringify(updatedTodos));
    setEditTodo(null);
  
    Toast.show({
      type: 'success',
      text1: 'Task Saved',
      text2: 'Your task has been successfully saved.',
    });
  };
  
  // Function to handle deletion of a todo
  const handleDeleteTodo = async (id) => {
    const normalizedName = user.name.trim().toLowerCase();
    const userKey = `todos_${normalizedName}`;
    const updatedTodos = todos.filter((todo) => todo.id !== id);
  
    setTodos(updatedTodos);
    await AsyncStorage.setItem(userKey, JSON.stringify(updatedTodos));
  
    Toast.show({
      type: 'error',
      text1: 'Task Deleted',
      text2: 'Your task has been successfully deleted.',
    });
  };

  // Function to handle editing of a todo
  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setModalVisible(true);
  };

  // Function to handle search query changes
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Function to handle back button press
  const handleBack = () => {
    if (onBack) onBack();
  };

  // Filter todos based on the search query
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.DARK }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
        <View style={styles.headerContainer}>

          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Icon name="arrowleft" size={24} color={colors.LIGHT} />
          </TouchableOpacity>

          <Text style={styles.header}>{`Good ${greetings}, ${user.name}`}</Text>
        </View>
        <SearchBar containerStyle={{ marginVertical: 15 }} onSearch={handleSearch} />
        <Text style={styles.tasksHeader}>My Tasks</Text>

        {/* FlatList to display todos */}
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Todo
              item={item}
              onDelete={() => handleDeleteTodo(item.id)}
              onEdit={() => handleEditTodo(item)}
            />
          )}
          initialNumToRender={10} 
          windowSize={5} 
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>No tasks found. Add a new task!</Text>
          }
        />

        <View style={styles.emptyHeaderContainer}>
          <Text style={styles.emptyHeader}>Add Todo</Text>
          <RoundIconBtn onPress={() => setModalVisible(true)} antIconName="plus" style={styles.addBtn} />
        </View>

        <TodoModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setEditTodo(null);
          }}
          onSubmit={handleOnSubmit}
          note={editTodo}
          isEdit={!!editTodo}
        />
      </View>
    </SafeAreaView>
  );
}