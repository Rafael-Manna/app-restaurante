import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 30,
        backgroundColor: '#FFFFFF',
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    },
    botaoAdicionar: {
        backgroundColor: '#28A745',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    botaoAdicionarTexto: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default styles;
