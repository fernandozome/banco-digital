const { contas, depositos, saques, transferencias } = require("../Dados/bancodedados")

let id_conta = 1

const listarContas = async (req, res) => {
    try {
        if (Array.isArray(contas) && !contas.length) {
            return res.status(404).json({ mensagem: "nenhuma conta encontrada" })
        }
        return res.json(contas)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

const criarConta = async (req, res) => {
    const {
        nome,
        cpf,
        email,
        data_nascimento,
        telefone,
        senha
    } = req.body

    if (!nome) { return res.status(401).json({ mensagem: "O nome é obrigatório." }) }
    if (!cpf) { return res.status(401).json({ mensagem: "O CPF é obrigatório." }) }
    if (!email) {
        return res.status(401).json({ mensagem: "Informe um e-mail válido" })
    } else {
        let posicao_arroba = email.indexOf("@")
        if (posicao_arroba <= 0 && email.includes(".", posicao_arroba)) {
            return res.status(401).json({ mensagem: "email inválido" })
        }
    }
    if (!telefone) { return res.status(401).json({ mensagem: "Informe um telefone" }) }
    if (!data_nascimento) { return res.status(401).json({ mensagem: "A data de nascimento é obrigatória." }) }
    if (!senha) { return res.status(401).json({ mensagem: "A senha é obrigatória." }) }

    try {
        if (contas.length > 0) {
            const novaConta = {
                numero: id_conta,
                saldo: 0,
                usuario: {
                    nome,
                    cpf,
                    data_nascimento,
                    telefone,
                    email,
                    senha
                }
            }
            contas.push(novaConta)
            id_conta++
            return res.status(201).json({ mensagem: "Conta criada!" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
    if (contas.length) {
        const contaExistente = contas.find((conta) => { return conta.usuario.cpf == cpf || conta.usuario.email == email })
        if (contaExistente) { return res.status(403).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" }) }
    }
    try {
        const novaConta = {
            numero: id_conta,
            saldo: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }

        }

        contas.push(novaConta)
        id_conta++

        return res.status(201).json({ mensagem: "Conta criada!" })  // Precisei colocar isso pq o cliente http exigia resposta (???)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }


}


const editarConta = async (req, res) => {
    const { numeroConta } = req.params
    const {
        nome,
        cpf,
        email,
        data_nascimento,
        telefone,
        senha
    } = req.body

    if (!numeroConta) { return res.status(401).json({ mensagem: "O número da conta é obrigatório." }) }
    if (!Number(numeroConta)) { return res.status(401).json({ mensagem: "Digite somente números" }) }
    const contaEncontrada = contas.find((conta) => { return conta.numero == Number(numeroConta) })
    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Não existe conta ser editada para o número da conta informado." })
    }

    if (cpf || email) {
        const mesmoCpfouEmail = contas.find((conta) => { return conta.usuario.cpf === cpf || conta.usuario.email === email })
        if (!mesmoCpfouEmail) { return res.status(403).json({ mensagem: "CPF ou E-mail diferente ao vinculado a esta conta" }) }
    }

    if (email) {
        let posicao_arroba = email.indexOf("@")
        if (posicao_arroba <= 0 && !email.includes(".", posicao_arroba)) {
            return res.status(401).json({ mensagem: "email inválido" })
        }
    }

    try {

        if (email) { contaEncontrada.usuario.email = email }
        if (nome) { contaEncontrada.usuario.nome = nome }
        if (data_nascimento) { contaEncontrada.usuario.data_nascimento = data_nascimento }
        if (telefone) { contaEncontrada.usuario.telefone = telefone }
        if (senha) { contaEncontrada.usuario.senha = senha }


        return res.status(201).json({ mensagem: "Conta editada!" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

const excluirConta = async (req, res) => {
    const { numeroConta } = req.params

    try {
        const contaIndex = contas.findIndex((conta) => conta.numero === Number(numeroConta));

        if (contaIndex < 0) {
            return res.status(404).json({ mensagem: "Conta não encontrada" });
        }
        if (contas[contaIndex].saldo > 0) {
            return res.status(406).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
        }

        contas.filter((conta) => conta.numero !== Number(numeroConta))
        contas.splice(contaIndex, 1)
        return res.status(410).json({ mensagem: "Conta excluída" }) //mais um caso em que tive que enviar uma resposta

    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}

const consultarSaldo = (req, res) => {
    const { numero_conta } = req.query

    if (!numero_conta) { return res.status(401).json({ mensagem: "O número da conta é obrigatório." }) }
    if (!Number(numero_conta)) { return res.status(401).json({ mensagem: "Digite somente números" }) }
    const contaEncontrada = contas.find((conta) => { return conta.numero == Number(numero_conta) })
    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta bancária não encontada!" })
    }

    return res.status(200).json({ saldo: `${contaEncontrada.saldo}` })

}

const consultarExtrato = (req, res) => {
    const { numero_conta } = req.query

    if (!numero_conta) { return res.status(401).json({ mensagem: "O número da conta é obrigatório." }) }
    if (!Number(numero_conta)) { return res.status(401).json({ mensagem: "Digite somente números" }) }
    const contaEncontrada = contas.find((conta) => { return conta.numero == Number(numero_conta) })
    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta bancária não encontada!" })
    }


    let extratoBancario = {
        depositos: depositos.filter((num_conta) => { return depositos.numero_conta === Number(num_conta) }),
        saques: saques.filter((num_conta) => { return saques.numero_conta === Number(num_conta) }),
        transferencias: {
            enviadas: transferencias.filter((num_conta) => { return transferencias.numero_conta_origem === Number(num_conta) }),
            recebias: transferencias.filter((num_conta) => { return transferencias.numero_conta_destino === Number(num_conta) })
        }
    }

    return res.status(200).json(extratoBancario)

}



module.exports = {
    listarContas,
    criarConta,
    editarConta,
    excluirConta,
    consultarSaldo,
    consultarExtrato
}