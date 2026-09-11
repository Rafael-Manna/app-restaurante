import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';

import { useCarrinho } from '../../contexts/CarrinhoContext';
import CustomButton from '../../components/CustomButton';
import styles from './styles';

export default function Resumo({ voltarParaCarrinho, voltarParaCardapio }) {
    // Pego os itens e o total do pedido pelo contexto.
    const { itens, total, limpar } = useCarrinho();

    // Confirma o pedido, limpa o carrinho e volta para o cardápio.
    function confirmar() {
        Alert.alert('Sucesso', 'Pedido finalizado com sucesso!');
        limpar();
        voltarParaCardapio();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={voltarParaCarrinho}>
                <Text style={styles.voltar}>{'< Voltar para o Carrinho'}</Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>Resumo do Pedido</Text>

            <FlatList
                data={itens}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Text style={styles.detalhe}>
                            Quantidade: {item.quantidade} | Valor unitário: R$ {item.preco.toFixed(2)} | Subtotal: R$ {(item.quantidade * item.preco).toFixed(2)}
                        </Text>
                    </View>
                )}
            />

            <Text style={styles.total}>Total do Pedido: R$ {total.toFixed(2)}</Text>

            <CustomButton title="Confirmar Pedido" onPress={confirmar} />
        </View>
    );
}
