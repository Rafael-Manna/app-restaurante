import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';

import {
    inserirPrato,
    listarPratos,
    pesquisarPratos,
    buscarPratoPorId,
    atualizarPrato,
    removerPrato,
} from '../../database/db';
import CustomButton from '../../components/CustomButton';
import styles from './styles';

export default function GerenciarCardapio({ voltarParaCardapio }) {
    // Campos do formulário de cadastro/edição do prato.
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [preco, setPreco] = useState('');

    // Guarda o id do prato em edição (null quer dizer que é um cadastro novo).
    const [idEditando, setIdEditando] = useState(null);

    // Texto da pesquisa e a lista de pratos mostrada na tela.
    const [pesquisa, setPesquisa] = useState('');
    const [pratos, setPratos] = useState([]);

    // Assim que a tela abre, já mostro todos os pratos cadastrados.
    useEffect(() => {
        mostrarTodos();
    }, []);

    // Limpa o formulário e sai do modo de edição.
    function limparFormulario() {
        setNome('');
        setTipo('');
        setPreco('');
        setIdEditando(null);
    }

    // Mostra todos os pratos do cardápio.
    async function mostrarTodos() {
        try {
            setPesquisa('');
            const lista = await listarPratos();
            setPratos(lista);
        } catch (erro) {
            console.log('Erro ao listar os pratos:', erro);
            Alert.alert('Erro', 'Não foi possível carregar os pratos.');
        }
    }

    // Mostra apenas os pratos que combinam com o nome pesquisado.
    async function pesquisar() {
        if (pesquisa.trim() === '') {
            Alert.alert('Atenção', 'Digite o nome do prato para pesquisar.');
            return;
        }

        try {
            const lista = await pesquisarPratos(pesquisa.trim());
            setPratos(lista);
            if (lista.length === 0) {
                Alert.alert('Pesquisa', 'Nenhum prato encontrado com esse nome.');
            }
        } catch (erro) {
            console.log('Erro ao pesquisar o prato:', erro);
            Alert.alert('Erro', 'Não foi possível fazer a pesquisa.');
        }
    }

    // Salva o prato: cadastra um novo ou atualiza o que está sendo editado.
    async function salvar() {
        const valor = parseFloat(preco.replace(',', '.'));

        if (nome.trim() === '' || tipo.trim() === '') {
            Alert.alert('Atenção', 'Preencha o nome e o tipo do prato.');
            return;
        }

        if (isNaN(valor) || valor <= 0) {
            Alert.alert('Atenção', 'Informe um preço válido.');
            return;
        }

        try {
            if (idEditando === null) {
                await inserirPrato(nome.trim(), tipo.trim(), valor);
                Alert.alert('Sucesso', 'Prato cadastrado com sucesso!');
            } else {
                await atualizarPrato(idEditando, nome.trim(), tipo.trim(), valor);
                Alert.alert('Sucesso', 'Prato atualizado com sucesso!');
            }
            limparFormulario();
            mostrarTodos();
        } catch (erro) {
            console.log('Erro ao salvar o prato:', erro);
            Alert.alert('Erro', 'Não foi possível salvar. Verifique se já existe outro prato com esse nome.');
        }
    }

    // Carrega os dados do prato escolhido no formulário para poder atualizar.
    async function editar(id) {
        try {
            const prato = await buscarPratoPorId(id);
            if (prato === null) {
                Alert.alert('Atenção', 'Prato não encontrado.');
                return;
            }
            setIdEditando(prato.id);
            setNome(prato.nome);
            setTipo(prato.tipo);
            setPreco(prato.preco.toFixed(2));
        } catch (erro) {
            console.log('Erro ao buscar o prato:', erro);
            Alert.alert('Erro', 'Não foi possível carregar o prato.');
        }
    }

    // Remove o prato cadastrado, confirmando antes com o usuário.
    function remover(id, nomeDoPrato) {
        Alert.alert('Remover', `Deseja remover o prato "${nomeDoPrato}"?`, [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Remover',
                onPress: async () => {
                    try {
                        await removerPrato(id);
                        if (idEditando === id) {
                            limparFormulario();
                        }
                        mostrarTodos();
                    } catch (erro) {
                        console.log('Erro ao remover o prato:', erro);
                        Alert.alert('Erro', 'Não foi possível remover o prato.');
                    }
                },
            },
        ]);
    }

    // Formulário e pesquisa ficam no topo da lista para a tela toda rolar junto.
    const cabecalho = (
        <View>
            <Text style={styles.secao}>
                {idEditando === null ? 'Cadastro do Prato' : 'Atualizar Prato'}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Nome do prato"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo (Comida ou Bebida)"
                value={tipo}
                onChangeText={setTipo}
            />
            <TextInput
                style={styles.input}
                placeholder="Preço (ex: 15.00)"
                keyboardType="numeric"
                value={preco}
                onChangeText={setPreco}
            />

            <CustomButton
                title={idEditando === null ? 'Cadastrar Prato' : 'Salvar Alterações'}
                onPress={salvar}
            />

            {idEditando !== null && (
                <TouchableOpacity onPress={limparFormulario}>
                    <Text style={styles.cancelar}>Cancelar edição</Text>
                </TouchableOpacity>
            )}

            <Text style={styles.secao}>Pesquisar Prato</Text>

            <TextInput
                style={styles.input}
                placeholder="Digite o nome do prato"
                value={pesquisa}
                onChangeText={setPesquisa}
            />

            <View style={styles.acoesPesquisa}>
                <TouchableOpacity style={styles.botaoPesquisa} onPress={pesquisar}>
                    <Text style={styles.botaoPesquisaTexto}>Pesquisar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoPesquisa} onPress={mostrarTodos}>
                    <Text style={styles.botaoPesquisaTexto}>Mostrar Todos</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.secao}>Pratos do Cardápio</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={voltarParaCardapio}>
                <Text style={styles.voltar}>{'< Voltar para o Cardápio'}</Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>Gerenciar Cardápio</Text>

            <FlatList
                data={pratos}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={cabecalho}
                ListEmptyComponent={<Text style={styles.vazio}>Nenhum prato cadastrado.</Text>}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.detalhe}>{item.tipo} - R$ {item.preco.toFixed(2)}</Text>
                        </View>
                        <View style={styles.acoes}>
                            <TouchableOpacity onPress={() => editar(item.id)}>
                                <Text style={styles.editar}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => remover(item.id, item.nome)}>
                                <Text style={styles.remover}>Remover</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}
