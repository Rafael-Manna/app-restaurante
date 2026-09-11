import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 30,
        backgroundColor: '#FFFFFF',
    },
    voltar: {
        color: '#007BFF',
        fontSize: 16,
        marginBottom: 15,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    item: {
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
        paddingVertical: 12,
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    detalhe: {
        color: '#666666',
        marginTop: 4,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 10,
    },
});

export default styles;
