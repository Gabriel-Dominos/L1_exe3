const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/index", {
        retorno: null,
        valores: { salario: "" }
    });
});

router.post("/reajuste", (req, res) => {

    // recuperar salário
    let salario = parseFloat(req.body.salario);

    // VALIDAÇÃO
    if (isNaN(salario) || salario <= 0) {

        return res.render("pages/index", {
            retorno: {
                erro: "Digite um salário válido"
            },
            valores: {
                salario: req.body.salario
            }
        });
    }

    // classificação do percentual
    let percentual = 0;

    if (salario <= 1400) {
        percentual = 15;

    } else if (salario <= 4500) {
        percentual = 10;

    } else if (salario <= 10000) {
        percentual = 7.5;

    } else {
        percentual = 5;
    }

    // cálculo do aumento
    let aumento = salario * (percentual / 100);

    // novo salário
    let novoSalario = salario + aumento;

    // objeto retorno
    let objJson = {
        salario: salario.toFixed(2),
        percentual: percentual,
        aumento: aumento.toFixed(2),
        novoSalario: novoSalario.toFixed(2)
    };

    // renderização
    res.render("pages/index", {
        retorno: objJson,
        valores: {
            salario: req.body.salario
        }
    });

});

module.exports = router;
