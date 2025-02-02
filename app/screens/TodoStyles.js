import { StyleSheet, Dimensions } from 'react-native';
import colors from '../misc/colors';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, 
    flex: 1,
    zIndex: 1,
    backgroundColor: colors.DARK, 
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10, 
    paddingHorizontal: 1, 
    backgroundColor: colors.DARK, 
    elevation: 3, 
  },
  backButton: {
    marginRight: 5,
    padding: 1,
  },
  header: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: colors.LIGHT, 
  },

emptyHeaderContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    marginBottom: 10,
    paddingHorizontal: 10, 
  },
  emptyHeader: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.3,
    color: colors.LIGHT,
    marginRight: 10, 
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
    color: colors.LIGHT
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