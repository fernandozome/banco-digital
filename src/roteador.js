const express = require("express")
const {
    listarContas,
    criarConta,
    editarConta,
    excluirConta,
    consultarSaldo,
    consultarExtrato
} = require("./Controladores/ctrl_contas bancarias")
const {
    transacaoDepositar,
    transacaoSacar,
    transacaoTransferir
} = require("./Controladores/ctrl_transacoes")

const {
    verificarSenhaBanco,
    verificarSenhaUsuario
} = require("./verificar senha")
const rotas = express()

rotas.get("/contas", verificarSenhaBanco, listarContas)
rotas.post("/contas", criarConta)
rotas.put("/contas/:numeroConta/usuario", verificarSenhaUsuario, editarConta)
rotas.delete("/contas/:numeroConta", verificarSenhaUsuario, excluirConta)
rotas.get("/contas/saldo/", consultarSaldo)
rotas.get("/contas/extrato", consultarExtrato)
rotas.post("/transacoes/depositar", transacaoDepositar)
rotas.post("/transacoes/sacar", transacaoSacar)
rotas.post("/transacoes/transferir", transacaoTransferir)


module.exports = rotas