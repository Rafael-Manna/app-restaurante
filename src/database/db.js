import * as SQLite from 'expo-sqlite';

// Guardo a conexão aberta para não precisar abrir o banco várias vezes.
let db = null;

// Abre o banco e cria a tabela de pratos caso ela ainda não exista.
export async function abrirBanco() {
    if (db === null) {
        db = await SQLite.openDatabaseAsync('restaurante.db');

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS pratos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL UNIQUE,
                tipo TEXT NOT NULL,
                preco REAL NOT NULL CHECK(preco > 0)
            );
        `);
    }
    return db;
}

// Cadastra um prato novo no cardápio (INSERT).
export async function inserirPrato(nome, tipo, preco) {
    const banco = await abrirBanco();
    const resultado = await banco.runAsync(
        `INSERT INTO pratos (nome, tipo, preco) VALUES (?, ?, ?)`,
        nome,
        tipo,
        preco
    );
    return resultado.lastInsertRowId;
}

// Mostra todos os pratos do cardápio (SELECT).
export async function listarPratos() {
    const banco = await abrirBanco();
    return await banco.getAllAsync(`SELECT * FROM pratos ORDER BY nome`);
}

// Mostra os pratos que combinam com o nome pesquisado (SELECT com LIKE).
export async function pesquisarPratos(texto) {
    const banco = await abrirBanco();
    return await banco.getAllAsync(
        `SELECT * FROM pratos WHERE nome LIKE ? ORDER BY nome`,
        `%${texto}%`
    );
}

// Busca um único prato pelo id, usado para carregar os dados na edição.
export async function buscarPratoPorId(id) {
    const banco = await abrirBanco();
    return await banco.getFirstAsync(`SELECT * FROM pratos WHERE id = ?`, id);
}

// Atualiza os dados de um prato já cadastrado (UPDATE).
export async function atualizarPrato(id, nome, tipo, preco) {
    const banco = await abrirBanco();
    const resultado = await banco.runAsync(
        `UPDATE pratos SET nome = ?, tipo = ?, preco = ? WHERE id = ?`,
        nome,
        tipo,
        preco,
        id
    );
    return resultado.changes;
}

// Remove um prato cadastrado (DELETE).
export async function removerPrato(id) {
    const banco = await abrirBanco();
    const resultado = await banco.runAsync(`DELETE FROM pratos WHERE id = ?`, id);
    return resultado.changes;
}
