# App Restaurante

Atividade da aula "DM6 - Armazenamento de dados" (React Native + Expo).

O app tem um cardápio com comidas e bebidas, onde o usuário escolhe os itens e a quantidade. O carrinho mostra os itens, quantidade e valor, e ao finalizar é exibido um resumo do pedido com o total.

O carrinho é compartilhado entre as telas com a **Context API** e persistido no dispositivo com o **AsyncStorage**.

## Gerenciar Cardápio (DM7 - Banco de dados)

Atividade da aula "DM7 - Banco de dados". A tela **Gerenciar Cardápio** usa o **SQLite** (`expo-sqlite`) para guardar os pratos na tabela `pratos` e tem as opções:

- Cadastro do prato
- Mostrar todos os pratos do cardápio
- Mostrar prato específico por pesquisa
- Atualizar dados de prato
- Remover um prato cadastrado

## Como rodar

```
npm install
npm start
```
