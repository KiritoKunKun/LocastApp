const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: 'This field is required.'
    },
    number: {
        type: Number
    },
    cpf_cnpj: {
        type: String
    },
    endereco: {
        type: String
    },
    cep: {
        type: String
    },
    cidade: {
        type: String
    },
    estado: {
        type: String
    },
    dataEmissao: {
        type: String
    },
    descricao: {
        type: String
    },
    valor: {
        type: String
    },
    vencimento: {
        type: String
    },
    condicoesPagamento: {
        type: String
    },
    valorTotal: {
        type: String
    },
    observacoes: {
        type: String
    }
});

mongoose.model('Employee', employeeSchema);