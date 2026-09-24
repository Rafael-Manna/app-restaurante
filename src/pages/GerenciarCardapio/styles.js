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
    secao: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 10,
    },
    cancelar: {
        color: '#FF0000',
        textAlign: 'center',
        marginTop: 10,
    },
    acoesPesquisa: {
        flexDirection: 'row',
    },
    botaoPesquisa: {
        flex: 1,
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    botaoPesquisaTexto: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    vazio: {
        textAlign: 'center',
        color: '#666666',
        marginTop: 20,
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
    acoes: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editar: {
        color: '#007BFF',
        marginRight: 15,
    },
    remover: {
        color: '#FF0000',
    },
});

export default styles;
