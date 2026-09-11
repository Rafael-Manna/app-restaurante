import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';

import { useCarrinho } from '../../contexts/CarrinhoContext';
import CustomButton from '../../components/CustomButton';
import styles from './styles';

export default function Carrinho({ voltarParaCardapio, irParaResumo }) {
    // Pego os itens e as funções do carrinho pelo contexto.
    const { itens, adicionar, diminuir, remover, total } = useCarrinho();

    // Só deixa finalizar se tiver item no carrinho.
    function finalizar() {
        if (itens.length === 0) {
            Alert.alert('Atenção', 'O carrinho está vazio.');
            return;
        }
        irParaResumo();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={voltarParaCardapio}>
                <Text style={styles.voltar}>{'< Voltar para o Cardápio'}</Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>Carrinho</Text>

            <FlatList
                data={itens}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={styles.vazio}>Nenhum item no carrinho.</Text>}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.detalhe}>
                                {item.quantidade} x R$ {item.preco.toFixed(2)} = R$ {(item.quantidade * item.preco).toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.acoes}>
                            <TouchableOpacity style={styles.botao} onPress={() => diminuir(item.id)}>
                                <Text style={styles.botaoTexto}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantidade}>{item.quantidade}</Text>
                            <TouchableOpacity style={styles.botao} onPress={() => adicionar(item)}>
                                <Text style={styles.botaoTexto}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => remover(item.id)}>
                                <Text style={styles.remover}>Remover</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

            <CustomButton title="Finalizar Pedido" onPress={finalizar} />
        </View>
    );
}
