const Cliente = require('../models/Cliente')
const Veiculo = require('../models/Veiculo')
const Agendamento = require('../models/Agendamento') 

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.data || !valores.horario || !valores.tipo || !valores.idVeiculo || !valores.idCliente) {
        return res.status(422).json({ message: 'Preencha todos os campos!' })
    }
    
    try {
        const veiculo = Veiculo.findByPk(valores.idVeiculo)
        if(!veiculo){
            return res.status(404).json({ message: 'Não foi possível achar o Veículo!' })
        }
        
        const cliente = Cliente.findByPk(valores.idCliente)
        if(!cliente){
            return res.status(404).json({ message: 'Não foi possível achar o Cliente!' })
        }

        await Agendamento.create(valores)
        return res.status(201).json({ message: 'Agendamento cadastrado com sucesso!' })
    } catch (err) {
        console.error('Houve um problema ao cadastrar o usuário!', err)
        return res.status(500).json({ message: 'Houve um problema ao cadastrar o Agendamento!' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Agendamento.findAll()

        return res.status(201).json(dados)
    } catch (err) {
        console.error('Houve um problema ao listar os Agendamentos!', err)
        return res.status(500).json({ message: 'Houve um problema ao listar os Agendamentos!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const agendamento = await Agendamento.findByPk(id)

        if (!agendamento) {
            return res.status(404).json({ message: 'O Agendamento não foi encontrado!' })
        }

        await Agendamento.destroy({ where: { codAgendamento: id } })
        return res.status(201).json({ message: 'Agendamento apagado com sucesso!' })
    } catch (err) {
        console.error('Houve um problema ao apagar o Agendamento!', err)
        return res.status(500).json({ message: 'Houve um problema ao apagar o Agendamento!' })
    }
}

module.exports = { cadastrar, listar, apagar }