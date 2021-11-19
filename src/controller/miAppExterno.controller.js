//Envio las liquidaciones al banco
// Recupero Empresas
import {
  updateUsuario,
  getUsuarioUsuario,
  getUsuarioCuit,
  GeneroMovimiento,
} from "../controller/miApp.controller";
import swal from "sweetalert";

//Creo Usuario
export const tExterna = async function (
  account_origen,
  account_destino,
  amount,
  tipoCuenta,
  origenT
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
            if (tipoCuenta === "CC") {
              valueE[0].balanceca = parseFloat(valueE[0].balanceca) - numerico;
            } else if (tipoCuenta === "CC") {
              valueE[0].balancecc = parseFloat(valueE[0].balancecc) - numerico;
            }

            const importeCA = valueE[0].balanceca;
            const importeCC = valueE[0].balancecc;
            updateUsuario(valueE[0]).then((valueE) => {});
            let tipomovimiento = 0;
            if (origenT === "comercio") {
              tipomovimiento = "Pago a comercio externo - " + account_destino;
            } else {
              tipomovimiento =
                "Transferencia a usuario externo - " + account_destino;
            }

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
      } else if (
        body.toString() == '{"transfer_error":"La cuenta de destino no existe"}'
      ) {
        swal(" ", "La cuenta de destino no existe", "error");
      } else {
        swal(" ", "Error en transferencia", "error");
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

export const gcuenta = async function (
  account_origen,
  account_destino,
  amount
) {
  var https = require("follow-redirects").https;

  var qs = require("querystring");

  var options = {
    method: "GET",
    hostname: "bff-banking-app.herokuapp.com",
    path: "/busqueda-cuenta/" + account_destino,
    headers: {
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMGQzZjNhZTU2NGRhMjUwOGZiMDFlNSIsImlhdCI6MTYyODI1ODEwNiwiZXhwIjoxNjQzODEwMTA2fQ.tsv_8Yo7TMi0hxBGMtQ_1ltRFd4Sbtaf8HDKKepHtwY",
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
      console.log(body.toString());

      var Consulta = body.toString().slice(0, -10);
      if (Consulta == '{"account_no":"') {
        var Tdestino = body.toString().slice(15, -2);
        tExternaT(account_origen, Tdestino, amount, "", "comercio");
      } else {
        console.log("cuenta no encontrada en Banco A");
      }
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  var postData = qs.stringify({});

  req.write(postData);

  req.end();
};

export const tExternaT = async function (
  account_origen,
  account_destino,
  amount,
  tipoCuenta,
  origenT
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
        getUsuarioCuit(account_origen).then((valueE) => {
          const numerico = -parseFloat(amount);
          valueE[0].balanceca = parseFloat(valueE[0].balanceca) + numerico;

          const importeCA = valueE[0].balanceca;
          const importeCC = valueE[0].balancecc;
          updateUsuario(valueE[0]).then((valueE) => {});
          let tipomovimiento = 0;
          if (origenT === "comercio") {
            tipomovimiento = "Pago a comercio externo - " + account_destino;
          }

          GeneroMovimiento(
            valueE[0].usuario,
            tipomovimiento,
            numerico,
            importeCA,
            importeCC
          );
        });

        swal(" ", "Pago a comercio exitoso", "success");
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
