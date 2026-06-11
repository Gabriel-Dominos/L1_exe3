const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/index", {
        retorno: null,
        valores: {
            nota1: "",
            nota2: ""
        },
        erros: {}
    });
});

router.post("/classificar", (req, res) => {

    // recuperar notas
    let nota1 = parseFloat(req.body.nota1);
    let nota2 = parseFloat(req.body.nota2);

    // validação
    if (
        isNaN(nota1) ||
        isNaN(nota2) ||
        nota1 < 0 || nota1 > 10 ||
        nota2 < 0 || nota2 > 10
    ) {

        return res.render("pages/index", {
            retorno: {
                erro: "Digite notas válidas entre 0 e 10."
            },
            valores: {
                nota1: req.body.nota1,
                nota2: req.body.nota2
            },
            erros: {
                nota1: true,
                nota2: true
            }
        });
    }

    // calcular média
    let media = (nota1 + nota2) / 2;

    // classificar
    let notafinal;

    if (media > 9 && media <= 10) {
        notafinal = "A";
    } else if (media > 7.5 && media <= 9) {
        notafinal = "B";
    } else if (media > 6 && media <= 7.5) {
        notafinal = "C";
    } else if (media > 4 && media <= 6) {
        notafinal = "D";
    } else {
        notafinal = "E";
    }

    let objJson = {
        notafinal,
        media: media.toFixed(2)
    };

    res.render("pages/index", {
        retorno: objJson,
        valores: {
            nota1: req.body.nota1,
            nota2: req.body.nota2
        },
        erros: {}
    });
});

module.exports = router;
