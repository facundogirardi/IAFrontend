//Envio las liquidaciones al banco
// Recupero Empresas

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
