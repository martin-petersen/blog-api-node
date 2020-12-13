const modelos = [
  require("./modelos-tabelas/TabelaUser"),
  require("./modelos-tabelas/TabelaPost"),
];

async function criarTabelas() {
  for (let i = 0; i < modelos.length; i++) {
    const modelo = modelos[i];
    await modelo.sync();
  }
}

criarTabelas();
