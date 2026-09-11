import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crio o contexto que vai compartilhar o carrinho entre as telas.
export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
    const [itens, setItens] = useState([]);

    // Ao abrir o app, carrego o carrinho salvo no AsyncStorage.
    useEffect(() => {
        async function carregar() {
            try {
                const dados = await AsyncStorage.getItem('carrinho');
                if (dados !== null) {
                    setItens(JSON.parse(dados));
                }
            } catch (erro) {
                console.log('Erro ao carregar o carrinho:', erro);
            }
        }
        carregar();
    }, []);

    // Toda vez que o carrinho mudar, salvo no AsyncStorage.
    useEffect(() => {
        async function salvar() {
            try {
                await AsyncStorage.setItem('carrinho', JSON.stringify(itens));
            } catch (erro) {
                console.log('Erro ao salvar o carrinho:', erro);
            }
        }
        salvar();
    }, [itens]);

    // Adiciona um item do cardápio (se já existe, aumenta a quantidade).
    function adicionar(produto) {
        const existe = itens.find((item) => item.id === produto.id);
        if (existe) {
            setItens(itens.map((item) =>
                item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
            ));
        } else {
            setItens([...itens, { ...produto, quantidade: 1 }]);
        }
    }

    // Diminui a quantidade (se chegar a zero, remove o item).
    function diminuir(id) {
        setItens(itens
            .map((item) => item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item)
            .filter((item) => item.quantidade > 0)
        );
    }

    // Remove o item do carrinho.
    function remover(id) {
        setItens(itens.filter((item) => item.id !== id));
    }

    // Limpa o carrinho (usado ao finalizar o pedido).
    function limpar() {
        setItens([]);
    }

    // Calcula o valor total do pedido.
    const total = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

    return (
        <CarrinhoContext.Provider value={{ itens, adicionar, diminuir, remover, limpar, total }}>
            {children}
        </CarrinhoContext.Provider>
    );
}

// Hook personalizado para consumir o contexto nas telas.
export function useCarrinho() {
    return useContext(CarrinhoContext);
}
