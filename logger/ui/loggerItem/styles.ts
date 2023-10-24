import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    button: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        flexDirection: 'row',
    },
    name: {
        fontSize: 16,
        color: 'black'
    },
    text: {
        flex: 1,
        color: 'black',
        textAlign: 'justify',

        textTransform: 'capitalize'
    },
    titleError: {
        color: 'red',
    },
    titleRequest: {
        color: 'blue',
    },
    titleResponse: {
        color: 'green',
    },
    titleLibrary: {
        color: 'gray',
    },
    top: {
        flex: 1,
        paddingHorizontal: 10,
    },
    chevronContainer: {
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
    },
    description: {
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    buttonsRow: {
        width: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}); 
