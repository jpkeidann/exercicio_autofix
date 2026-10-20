const express = require('express')
const app = express()
const sequelize = require('sequelize')
const cors = require('cors')

const conn = require('./db/conn')

const clienteController = require('./controller/cliente.controller')
const veiculoController = require('./controller/veiculo.controller')
const agendamentoController = require('./controller/agendamento.controller')
const authController = require('./controller/auth.controller')
const authMiddleware = require('./middleware/auth.middleware')

const host = 'localhost'
const PORT = 3000
// ======================== midware =============================
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// ------- rotas públicas ------
app.post('/cliente',clienteController.cadastrar)
app.post('/login',authController.login)

app.get('/', (req,res)=>{
    return res.status(200).json({message: 'APLICAÇÃO RODANDO YIPEEE!!!'})
})

// muralha da china pra previnir entrada de estrangeiros no país:
app.use(authMiddleware)

// ------- rotas Privadas ------
app.get('/clientes',clienteController.listar)
app.get('/cliente/:id',clienteController.consultar)
app.put('/cliente/:id',clienteController.atualizar)
app.delete('/cliente/:id',clienteController.apagar)

app.post('/veiculo',veiculoController.cadastrar)

app.post('/agendamento',agendamentoController.cadastrar)
app.get('/agendamentos',agendamentoController.listar)
app.delete('/agendamento/:id',agendamentoController.apagar)

// ---------------------- server ----------------

conn.sync()
.then(()=>{
    app.listen(PORT , host , ()=>{
        console.log(`Aplicação rodando em: http://${host}:${PORT}/`)
    })
})
.catch((err)=>{
    console.error( 'Houve um problema ao iniciar a aplicação! ',err)
})