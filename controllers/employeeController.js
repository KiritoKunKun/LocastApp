const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var numberTemp = 0;
    Employee.find((err, result) => {
        if (!err) {
            if (result.length != 0) {
                numberTemp = (result[result.length - 1].number + 1);
            } else {
                numberTemp = 1;
            }
            var employee = new Employee();
            employee.nome = req.body.nome;
            employee.cpf_cnpj = req.body.cpf_cnpj;
            employee.endereco = req.body.endereco;
            employee.cep = req.body.cep;
            employee.cidade = req.body.cidade;
            employee.estado = req.body.estado;
            employee.dataEmissao = req.body.dataEmissao;
            employee.descricao = req.body.descricao;
            employee.valor = req.body.valor;
            employee.vencimento = req.body.vencimento;
            employee.condicoesPagamento = req.body.condicoesPagamento;
            employee.valorTotal = req.body.valorTotal;
            employee.observacoes = req.body.observacoes;
            
            if (req.body.numeroFatura == null || req.body.numeroFatura <= 0) {
                employee.number = numberTemp;
            } else {
                employee.number = req.body.numeroFatura;
            }

            employee.save((err, doc) => {
                if (!err) {
                    res.redirect('employee/list');
                }
                else {
                    if (err.name == 'ValidationError') {
                        handleValidationError(err, req.body);
                        res.render("employee/addOrEdit", {
                            viewTitle: "Insert Employee",
                            employee: req.body
                        });
                    }
                    else
                        console.log('Error during record insertion : ' + err);
                }
            });
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('employee/list');
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else {
                console.log('Error during record update : ' + err);
            }
        }
    });
}

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            docs.reverse();
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

router.get('/#/:id', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;