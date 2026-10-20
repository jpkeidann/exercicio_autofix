const Cliente = require('../models/Cliente')
const Veiculo = require('../models/Veiculo')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.modelo || !valores.marca || !valores.placa || !valores.rastreador || !valores.idCliente) {
        return res.status(422).json({ message: 'Preencha todos os campos!' })
    }

    try {
        const cliente = Cliente.findByPk(valores.idCliente)
        if(!cliente){
            return res.status(404).json({ message: 'O cliente não foi encontrado!' })
        }

        const placa = CryptoJS.AES.encrypt(valores.placa, CHAVE_SECRETA).toString()
        const rastreador = CryptoJS.AES.encrypt(valores.rastreador, CHAVE_SECRETA).toString()

        await Veiculo.create({
            modelo: valores.modelo,
            marca: valores.marca,
            placa: placa,
            rastreador: rastreador,
            idCliente: valores.idCliente,
        })
        return res.status(201).json({ message: 'Veículo cadastrado com sucesso!' })
    } catch (err) {
        console.error('Houve um problema ao cadastrar o Veículo!', err)
        return res.status(500).json({ message: 'Houve um problema ao cadastrar o Veículo!' })
    }
}

module.exports = { cadastrar }