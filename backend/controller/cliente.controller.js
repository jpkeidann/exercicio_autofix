const Cliente = require('../models/Cliente')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.email || !valores.senha || !valores.CPF || !valores.endereco || !valores.telefone) {
        return res.status(404).json({ message: 'Preencha todos os campos!' })
    }

    try {
        const senha = CryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA);
        const CPF = CryptoJS.AES.encrypt(valores.CPF, CHAVE_SECRETA);

        await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: senha,
            CPF: CPF,
            endereco: valores.endereco,
            telefone: valores.telefone,
        })
        return res.status(201).json({ message: 'Cliente cadastrado com sucesso!' })
    } catch (err) {
        console.error('Houve um problema ao cadastrar o usuário!', err)
        return res.status(201).json({ message: 'Houve um problema ao cadastrar o usuário!' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Cliente.findAll()
        let resultado = []

        dados.forEach(el => {
            let cpfDescriptografado = ''
            try {
                const bytes = CryptoJS.AES.decrypt(el.CPF, CHAVE_SECRETA);
                cpfDescriptografado = bytes.toString(CryptoJS.enc.Utf8);
            } catch (err) {
                cpfDescriptografado = 'Problema ao descriptografar!'
                console.error('Problema ao descriptografar um dos CPFs!', err)
            }
            resultado.push({
                nome: el.nome,
                email: el.email,
                CPF: cpfDescriptografado,
                endereco: el.endereco,
                telefone: el.telefone,
            })
        });
        return res.status(201).json(resultado)
    } catch (err) {
        console.error('Houve um problema ao listar os Clientes!', err)
        return res.status(201).json({ message: 'Houve um problema ao listar os Clientes!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id
    
    try {
        const cliente = await Cliente.findByPk(id)
        
        if (!cliente) {
            return res.status(404).json({ message: 'O cliente não foi encontrado!' })
        }

        const bytes = CryptoJS.AES.decrypt(cliente.CPF, CHAVE_SECRETA);
        const CPF = bytes.toString(CryptoJS.enc.Utf8);

        return res.status(201).json({
            nome: valores.nome,
            email: valores.email,
            CPF: CPF,
            endereco: valores.endereco,
            telefone: valores.telefone,
        })
    } catch (err) {
        console.error('Houve um problema ao consultar o Cliente!', err)
        return res.status(201).json({ message: 'Houve um problema ao consultar o Cliente!' })
    }
}

const atualizar = async (req, res) => {
    const valores = req.body
    const id = req.params.id

    if (!valores.nome || !valores.email || !valores.senha || !valores.CPF || !valores.endereco || !valores.telefone) {
        return res.status(404).json({ message: 'Preencha todos os campos!' })
    }

    try {
        const senha = CryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA);
        const CPF = CryptoJS.AES.encrypt(valores.CPF, CHAVE_SECRETA);

        const valores2 = {
            nome: valores.nome,
            email: valores.email,
            senha: senha,
            CPF: CPF,
            endereco: valores.endereco,
            telefone: valores.telefone,
        }

        await Cliente.update(valores2, { where: { codCliente: id } })
        return res.status(201).json({ message: 'Cliente atualizado com sucesso!' })
    } catch (err) {
        console.error('Houve um problema ao cadastrar o Cliente!', err)
        return res.status(201).json({ message: 'Houve um problema ao atualizado o Cliente!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const cliente = await Cliente.findByPk(id)

        if (!cliente) {
            return res.status(404).json({ message: 'O cliente não foi encontrado!' })
        }

        await cliente.destroy({ where: { codCliente: id } })
        return res.status(201).json({ message: 'Cliente apagado com sucesso!' })
    } catch (err) {
        console.error('Houve um problema ao consultar o usuário!', err)
        return res.status(201).json({ message: 'Houve um problema ao consultar o Cliente!' })
    }
}

module.exports = { cadastrar, listar, consultar, atualizar, apagar }