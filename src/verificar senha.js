const { contas } = require("./Dados/bancodedados")

const verificarSenhaBanco = (req, res, next) => {
    const { senha_banco } = req.query

    if (!senha_banco) { return res.status(401).json({ mensagem: "A senha é obrigatória." }) }
    if (senha_banco !== "Cubos123Bank") {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" })
    }

    next()
}

const verificarSenhaUsuario = (req, res, next) => {
    const { senha } = req.query
    const { numeroConta } = req.params

    if (!senha) { return res.status(401).json({ mensagem: "A senha da conta é obrigatória." }) }
    const contaEncontrada = contas.find((conta) => { return conta.numero === Number(numeroConta) })

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "A senha informada é inválida!" })
    }

    next()
}

module.exports = {
    verificarSenhaBanco,
    verificarSenhaUsuario
}