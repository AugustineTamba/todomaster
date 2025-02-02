import { StyleSheet, Dimensions } from 'react-native';
import colors from '../misc/colors';

const width = Dimensions.get('window').width - 50;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
        backgroundColor: colors.DARK,
    },
    textInput: {
        width,
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 18,
        backgroundColor: colors.LIGHT,
        borderWidth: 1,
        borderColor: colors.PRIMARY,
        color: colors.DARK,
        marginBottom: 20,
        fontWeight: '600',
    },
    inputTitle: {
        alignSelf: 'flex-start',
        fontSize: 18,
        marginBottom: 10,
        color: colors.LIGHT,
        opacity: 0.7,
    },
    button: {
        backgroundColor: colors.PRIMARY,
        borderRadius: 25,
        padding: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    buttonDisabled: {
       display: 'none',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.HOME,
        marginBottom: 20,
      },

      logo: {
        marginBottom: 20,
      },
});

export default styles;
