import React, { useState } from 'react';

// Importo o provider do carrinho e as telas do aplicativo.
import { CarrinhoProvider } from './src/contexts/CarrinhoContext';
import Cardapio from './src/pages/Cardapio';
import Carrinho from './src/pages/Carrinho';
import Resumo from './src/pages/Resumo';
import GerenciarCardapio from './src/pages/GerenciarCardapio';

export default function App() {
    // Estado que controla qual tela o usuário está vendo.
    const [telaAtual, setTelaAtual] = useState('Cardapio');

    // Escolho a tela de acordo com o estado atual.
    let tela;
    if (telaAtual === 'Carrinho') {
        tela = (
            <Carrinho
                voltarParaCardapio={() => setTelaAtual('Cardapio')}
                irParaResumo={() => setTelaAtual('Resumo')}
            />
        );
    } else if (telaAtual === 'Resumo') {
        tela = (
            <Resumo
                voltarParaCarrinho={() => setTelaAtual('Carrinho')}
                voltarParaCardapio={() => setTelaAtual('Cardapio')}
            />
        );
    } else if (telaAtual === 'GerenciarCardapio') {
        tela = (
            <GerenciarCardapio
                voltarParaCardapio={() => setTelaAtual('Cardapio')}
            />
        );
    } else {
        tela = (
            <Cardapio
                irParaCarrinho={() => setTelaAtual('Carrinho')}
                irParaGerenciar={() => setTelaAtual('GerenciarCardapio')}
            />
        );
    }

    // O provider engloba as telas para que todas acessem o carrinho.
    return <CarrinhoProvider>{tela}</CarrinhoProvider>;
}
