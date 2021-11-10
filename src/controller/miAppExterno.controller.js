import urlWebServicesExterno from "../controller/webServicesExterno.js";
//Envio las liquidaciones al banco
// Recupero Empresas

//Creo Usuario
export const tExterna = async function (
  account_origen,
  account_destino,
  amount
) {
  let url = urlWebServicesExterno.tExterna;
  const formData = new URLSearchParams();
  formData.append("account_origen", parseFloat(account_origen));
  formData.append("account_destino", parseFloat(account_destino));
  formData.append("amount", parseFloat(amount));
  try {
    let response = await fetch(url, {
      method: "POST", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem("x"),
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });
   
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

