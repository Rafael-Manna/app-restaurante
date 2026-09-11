import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { useCarrinho } from '../../contexts/CarrinhoContext';
import CustomButton from '../../components/CustomButton';
import styles from './styles';

// Cardápio com as comidas e bebidas disponíveis.
const CARDAPIO = [
    { id: 1, nome: 'X-Burguer', preco: 15.0, tipo: 'Comida' },
    { id: 2, nome: 'X-Salada', preco: 17.0, tipo: 'Comida' },
    { id: 3, nome: 'Batata Frita', preco: 10.0, tipo: 'Comida' },
    { id: 4, nome: 'Pastel', preco: 8.0, tipo: 'Comida' },
    { id: 5, nome: 'Refrigerante', preco: 6.0, tipo: 'Bebida' },
    { id: 6, nome: 'Suco de Laranja', preco: 7.0, tipo: 'Bebida' },
    { id: 7, nome: 'Água Mineral', preco: 4.0, tipo: 'Bebida' },
];

export default function Cardapio({ irParaCarrinho }) {
    // Pego os dados do carrinho pelo contexto.
    const { itens, adicionar } = useCarrinho();

    // Conto quantos itens já foram escolhidos.
    const quantidadeTotal = itens.reduce((soma, item) => soma + item.quantidade, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Cardápio</Text>

            <FlatList
                data={CARDAPIO}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.detalhe}>{item.tipo} - R$ {item.preco.toFixed(2)}</Text>
                        </View>
                        <TouchableOpacity style={styles.botaoAdicionar} onPress={() => adicionar(item)}>
                            <Text style={styles.botaoAdicionarTexto}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <CustomButton
                title={`Ver Carrinho (${quantidadeTotal})`}
                onPress={irParaCarrinho}
            />
        </View>
    );
}
