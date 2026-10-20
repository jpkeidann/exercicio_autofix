const Cliente = require('../models/Cliente')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const login = async (req, res) => {
    const valores = req.body

    if (!valores.email || !valores.senha) {
        return res.status(422).json({ message: 'Preencha todos os campos!' })
    }
    
    try {
        const cliente = Cliente.findOne({where: {email: valores.email}})
        if(!cliente){
            return res.status(400).json({ message: 'email ou senha incorreta!' })
        }
        
        const bytes = CryptoJS.AES.decrypt(cliente.senha, CHAVE_SECRETA);
        const senhaCliente = bytes.toString(CryptoJS.enc.Utf8);
        
        if(valores.senha !== senhaCliente){
            return res.status(400).json({ message: 'email ou senha incorreta!' })
        }

        const tempo = 3 * 60 * 60 * 1000
        const tempoExpirar = Date.now() + tempo

        const payload = {
            idCliente: cliente.codCliente,
            nome: cliente.nome,
            expiraEm: tempoExpirar,
        }
        
        const token  = CryptoJS.AES.encrypt(payload, CHAVE_SECRETA).toString()

        return res.status(200).json({
            message: 'login realizado com sucesso!',
            token: token,
            nome: cliente.nome,
        })
    } catch (err) {
        console.error('Houve um problema ao logar com o Cliente!', err)
        return res.status(500).json({ message: 'Houve um problema ao logar com o Cliente!' })
    }
}

module.exports = { login }