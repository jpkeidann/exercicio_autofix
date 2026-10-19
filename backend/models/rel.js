const Cliente = require("./Cliente");
const Veiculo = require("./Veiculo");
const Agendamento = require("./Agendamento");

Cliente.hasMany(Agendamento,{
    foreignKey: 'idCliente',
    as: 'clienteAgendamento',
    onDelete: 'CASCADE'
});

Agendamento.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    as: 'agendamentoCliente',
    allowNull: false
});

Veiculo.hasMany(Agendamento,{
    foreignKey: 'idVeiculo',
    as: 'veiculoAgendamento',
    onDelete: 'CASCADE'
});

Agendamento.belongsTo(Veiculo,{
    foreignKey: 'idVeiculo',
    as: 'agendamentoVeiculo',
    allowNull: false
});

Cliente.hasMany(Veiculo,{
    foreignKey: 'idCliente',
    as: 'clienteVeiculo',
    onDelete: 'CASCADE'
});

Veiculo.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    as: 'veiculoCliente',
    allowNull: false
});

module.exports = { Cliente , Veiculo , Agendamento }