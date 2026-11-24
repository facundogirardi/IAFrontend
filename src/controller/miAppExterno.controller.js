//Envio las liquidaciones al banco
// Recupero Empresas
import {
  updateUsuario,
  getUsuarioUsuario,
  getUsuarioCuit,
  GeneroMovimiento,
} from "../controller/miApp.controller";
import swal from "sweetalert";

const API_HOST = "https://bff-banking-app.herokuapp.com";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMGQzZjNhZTU2NGRhMjUwOGZiMDFlNSIsImlhdCI6MTYyODI1ODEwNiwiZXhwIjoxNjQzODEwMTA2fQ.tsv_8Yo7TMi0hxBGMtQ_1ltRFd4Sbtaf8HDKKepHtwY";

// Hace la request con fetch (nativo del navegador) y devuelve el body como texto
const requestBancoA = async function (method, path, body) {
  const headers = { "x-access-token": API_TOKEN };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const res = await fetch(API_HOST + path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  return res.text();
};

//Creo Usuario
export const tExterna = async function (
  account_origen,
  account_destino,
  amount,
  tipoCuenta,
  origenT
) {
  try {
    const texto = await requestBancoA("POST", "/transfers_inbancoa/57288124", {
      account_origen: account_origen,
      account_destino: account_destino,
      amount: amount,
    });
    console.log("retorno", texto);

    if (texto == '{"transfer_success":"Transferencia exitosa"}') {
      getUsuarioUsuario(window.localStorage.getItem("name")).then(
        (valueE) => {
          const numerico = -parseFloat(amount);
          if (tipoCuenta === "CA") {
            valueE[0].balanceca = parseFloat(valueE[0].balanceca) + numerico;
          } else if (tipoCuenta === "CC") {
            valueE[0].balancecc = parseFloat(valueE[0].balancecc) + numerico;
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
      texto == '{"transfer_error":"La cuenta de destino no existe"}'
    ) {
      swal(" ", "La cuenta de destino no existe", "error");
    } else {
      swal(" ", "Error en transferencia", "error");
    }
  } catch (error) {
    console.error(error);
  }
};

export const gcuenta = async function (
  account_origen,
  account_destino,
  amount
) {
  try {
    const texto = await requestBancoA("GET", "/busqueda-cuenta/" + account_destino);
    console.log(texto);

    var Consulta = texto.slice(0, -10);
    if (Consulta == '{"account_no":"') {
      var Tdestino = texto.slice(15, -2);
      tExternaT(account_origen, Tdestino, amount, "", "comercio");
    } else {
      console.log("cuenta no encontrada en Banco A");
    }
  } catch (error) {
    console.error(error);
  }
};

export const tExternaT = async function (
  account_origen,
  account_destino,
  amount,
  tipoCuenta,
  origenT
) {
  try {
    const texto = await requestBancoA("POST", "/transfers_inbancoa/57288124", {
      account_origen: account_origen,
      account_destino: account_destino,
      amount: amount,
    });
    console.log("retorno", texto);

    if (texto == '{"transfer_success":"Transferencia exitosa"}') {
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
  } catch (error) {
    console.error(error);
  }
};
