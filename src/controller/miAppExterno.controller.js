//Envio las liquidaciones al banco
// Recupero Empresas
import {
  updateUsuario,
  getUsuarioUsuario,
  getUsuarioCBU,
  GeneroMovimiento,
  getUsuarioCBUCC,
  getMantenimientoClave,
} from "../controller/miApp.controller";
import swal from "sweetalert";

//Creo Usuario
export const tExterna = async function (
  account_origen,
  account_destino,
  amount
) {
  var https = require("follow-redirects").https;

  var options = {
    method: "POST",
    hostname: "bff-banking-app.herokuapp.com",
    path: "/transfers_inbancoa/57288124",
    headers: {
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMGQzZjNhZTU2NGRhMjUwOGZiMDFlNSIsImlhdCI6MTYyODI1ODEwNiwiZXhwIjoxNjQzODEwMTA2fQ.tsv_8Yo7TMi0hxBGMtQ_1ltRFd4Sbtaf8HDKKepHtwY",
      "Content-Type": "application/json",
    },
    maxRedirects: 20,
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log("retorno", body.toString());

      if (body.toString() == '{"transfer_success":"Transferencia exitosa"}') {
        getUsuarioUsuario(window.localStorage.getItem("name")).then(
          (valueE) => {
            const numerico = parseFloat(amount);
            valueE[0].balanceca = parseFloat(valueE[0].balanceca) - numerico;

            const importeCA = valueE[0].balanceca;
            const importeCC = valueE[0].balancecc;
            updateUsuario(valueE[0]).then((valueE) => {});
            const tipomovimiento =
              "Transferencia a usuario externo - " + account_destino;
            GeneroMovimiento(
              valueE[0].usuario,
              tipomovimiento,
              numerico,
              importeCA,
              importeCC
            );
          }
        );

        swal(" ", "Transferencia exitosa", "success");
      } else {
        swal(" ", "Error en transferencia", "error");
      }
      if (
        body.toString() == '{"transfer_error":"La cuenta de destino no existe"}'
      ) {
        swal(" ", "La cuenta de destino no existe", "error");
      }
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  var postData = JSON.stringify({
    account_origen: account_origen,
    account_destino: account_destino,
    amount: amount,
  });

  req.write(postData);

  req.end();
};
