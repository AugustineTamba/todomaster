import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../misc/colors';
import { Dimensions } from 'react-native';

export default function TodoModal({ visible, onClose, onSubmit, note, isEdit }) {
  // State variables for task title, description, date, and date picker visibility
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Effect to initialize state when the modal is opened for editing
  useEffect(() => {
    if (isEdit && note) {
      setTitle(note.title || '');
      setDesc(note.desc || '');
      setDate(note.date ? new Date(note.date) : new Date());
    } else {
      resetState();
    }
  }, [isEdit, note]);

  // Function to reset the form state
  const resetState = () => {
    setTitle('');
    setDesc('');
    setDate(new Date());
    setShowPicker(false);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Prevent submission if the title is empty
    if (!title.trim()) return;

    // Call the onSubmit function with the task details
    onSubmit(title, desc, date);
    resetState();
    onClose();
  };

  // Function to handle modal close
  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.modalContainer}>

        <StatusBar hidden />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{isEdit ? 'Edit Task' : 'New Task'}</Text>

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task title"
              style={[styles.input, styles.titleInput]}
              placeholderTextColor={colors.LIGHT_GRAY}
              accessibilityLabel="Task Title Input"
            />

            <TextInput
              value={desc}
              onChangeText={setDesc}
              placeholder="Enter task description"
              style={[styles.input, styles.descInput]}
              multiline
              placeholderTextColor={colors.LIGHT_GRAY}
              accessibilityLabel="Task Description Input"
            />

            <Text style={styles.label}>Select Date:</Text>
            <TouchableOpacity
              style={styles.datePickerBtn}
              onPress={() => setShowPicker(true)}
              accessibilityLabel="Select Date"
            >
              <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setDate(selectedDate || date);
                  setShowPicker(false);
                }}
              />
            )}

            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit} accessibilityLabel="Save Task">
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelBtn} onPress={handleClose} accessibilityLabel="Cancel">
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  );
}

const width = Dimensions.get('window').width * 0.9;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width,
    backgroundColor: colors.LIGHT,
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.DARK,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.DARK,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  titleInput: {
    fontWeight: 'bold',
  },
  descInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.DARK,
    marginBottom: 5,
  },
  datePickerBtn: {
    backgroundColor: colors.WHITE,
    borderColor: colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: colors.DARK,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveBtn: {
    backgroundColor: colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelBtn: {
    backgroundColor: colors.GRAY,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  btnText: {
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
