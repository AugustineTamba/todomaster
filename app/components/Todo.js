import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../misc/colors';

export default function Todo({ item, onDelete, onEdit }) {
  // Animation value for fade-in effect
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fade-in animation when the component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.todoContainer, { opacity: fadeAnim }]}>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        {item.desc && (
          <Text style={styles.desc} numberOfLines={2} ellipsizeMode="tail">
            {item.desc}
          </Text>
        )}
        <View style={styles.dateTimeContainer}>
          <Text style={styles.date}>📅 {new Date(item.date).toDateString()} </Text>
          <Text style={styles.createdAt}>⏳ {new Date(item.createdAt).toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={onEdit}
          style={styles.actionBtn}
          activeOpacity={0.6}
          accessibilityLabel="Edit Task"
          accessibilityRole="button"
        >
          <Icon name="pencil" size={22} color={colors.PRIMARY} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={styles.actionBtn}
          activeOpacity={0.6}
          accessibilityLabel="Delete Task"
          accessibilityRole="button"
        >
          <Icon name="delete-outline" size={22} color={colors.DANGER} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.DARK,
  },
  desc: {
    fontSize: 14,
    color: colors.GRAY,
    marginTop: 4,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  date: {
    fontSize: 12,
    color: colors.GRAY,
    marginRight: 10,
  },
  createdAt: {
    fontSize: 12,
    color: colors.LIGHT_GRAY,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  actionBtn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F4F4F4',
    elevation: 2,
    marginLeft: 8,
  },
});