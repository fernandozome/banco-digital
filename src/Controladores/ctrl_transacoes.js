const { contas, depositos, saques, transferencias } = require("../Dados/bancodedados")
const { format } = require("date-fns")

const transacaoDepositar = async (req, res) => {
    const { numero_conta, valor } = req.body

    if (!numero_conta || !valor) { return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" }) }

    const contaEncontrada = contas.find((conta) => { return conta.numero === Number(numero_conta) })
    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Não existe conta para o número da conta informado." })
    }

    if (Number(valor) < 0) { return res.status(400).json({ mensagem: "O valor para depósito não pode ser negativo!" }) }

    try {

        contaEncontrada.saldo += valor
        depositos.push(
            {
                data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                numero_conta,
                valor
            }
        )

        return res.status(201).json({ mensagem: "Depósito realizado com sucesso!" })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}


const transacaoSacar = async (req, res) => {
    const { numero_conta, valor, senha } = req.body

    if (!numero_conta || !valor) { return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" }) }
    if (!senha) { return res.status(400).json({ mensagem: "Digite a senha!" }) }
    const contaEncontrada = contas.find((conta) => { return conta.numero === Number(numero_conta) })
    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Não existe conta para o número da conta informado." })
    }
    if (senha !== contaEncontrada.usuario.senha) { return res.status(403).json({ mensagem: "Senha incorreta!" }) }

    if (valor < 0) { return res.status(403).json({ mensagem: "O valor não pode ser zero ou negativo!" }) }
    if (valor > contaEncontrada.saldo) { return res.status(403).json({ mensagem: "Saldo insuficiente!" }) }

    try {

        contaEncontrada.saldo -= valor
        saques.push(
            {
                data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                numero_conta,
                valor
            }
        )

        return res.status(201).json({ mensagem: "Saque realizado com sucesso!" })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

const transacaoTransferir = async (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    const contaOrigem = contas.find((conta) => { return conta.numero === Number(numero_conta_origem) })
    const contaDestino = contas.find((conta) => { return conta.numero === Number(numero_conta_destino) })
    if (!contaOrigem) { return res.status(404).json({ mensagem: "Conta de origem não encontrada" }) }
    if (!contaDestino) { return res.status(404).json({ mensagem: "Conta de destino não encontrada" }) }

    if (senha !== contaOrigem.usuario.senha) { return res.status(403).json({ mensagem: "Senha incorreta!" }) }
    if (valor < 0) { return res.status(403).json({ mensagem: "O valor não pode ser zero ou negativo!" }) }
    if (valor > contaOrigem.saldo) { return res.status(403).json({ mensagem: "Saldo insuficiente!" }) }


    try {

        contaOrigem.saldo -= valor
        contaDestino.saldo += valor

        transferencias.push(
            {
                data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                numero_conta_origem,
                numero_conta_destino,
                valor
            }

        )

        return res.status(201).json({ mensagem: "Transferência realizada com sucesso!" })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}


module.exports = {
    transacaoDepositar,
    transacaoSacar,
    transacaoTransferir
}