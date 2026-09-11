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
    vazio: {
        textAlign: 'center',
        color: '#666666',
        marginTop: 20,
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
    },
    acoes: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    botao: {
        backgroundColor: '#DDDDDD',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    botaoTexto: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantidade: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    remover: {
        color: '#FF0000',
        marginLeft: 15,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 10,
    },
});

export default styles;
