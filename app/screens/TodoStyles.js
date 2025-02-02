import { StyleSheet, Dimensions } from 'react-native';
import colors from '../misc/colors';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // Add horizontal padding
    flex: 1,
    zIndex: 1,
    backgroundColor: colors.DARK, // Ensure background color is set
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10, // Add vertical padding
    paddingHorizontal: 1, // Add horizontal padding
    backgroundColor: colors.DARK, // Set a background color for the header
    elevation: 3, // Add shadow
  },
  backButton: {
    marginRight: 5,
    padding: 1, // Add padding for better touch area
  },
  header: {
    fontSize: 22, // Slightly larger font size
    fontWeight: 'bold',
    color: colors.LIGHT, // Ensure text color is visible
  },

emptyHeaderContainer: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Align text and button vertically
    justifyContent: 'flex-end', // Push items to the right
    marginBottom: 10,
    paddingHorizontal: 10, // Add padding to match other elements
  },
  emptyHeader: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.3,
    color: colors.LIGHT,
    marginRight: 10, // Space between text and button
    flex: 1,
    textAlign: 'center',
    marginLeft: 65,
  },
  addBtn: {
    padding: 15,
    backgroundColor: colors.PRIMARY,
    borderRadius: 30,
    elevation: 5,
  },
  

  tasksHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.LIGHT,
    // marginTop: 10,
    // marginBottom: 10,
    // textAlign: 'center',
  },

  emptyListText: {
    fontSize: 18,
    color: colors.LIGHT_GRAY,
    textAlign: 'center',
    marginTop: 50,
    fontStyle: 'italic',
    opacity: 0.7,
  },
});

export default styles;