const { Cliente , Veiculo , Agendamento } = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase() {
    try {
        await conn.sync({force: true})
        console.log('iniciando conexão com o banco...')
    } catch (err) {
        console.error('houve um prolema ao conectar com o banco!' , err)
    }finally{
        await conn.close()
        console.log('fechando conexão com o banco...')
    }
}

syncDataBase()