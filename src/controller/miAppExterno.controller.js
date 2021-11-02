import urlWebServicesExterno from "../controller/webServicesExterno.js";
import dateFormat from "dateformat";

//Envio las liquidaciones al banco
export const postLiquidacionesExterno = async function (
  cuit,
) {
  let url = urlWebServicesExterno.altatarjeta;
  const formData = new URLSearchParams();

  formData.append("cuit", cuit);
  formData.append("codigotransaccion", "11111111");
  formData.append("importe", "200");
  formData.append("fechaVencimiento",dateFormat(Date.now(), "dd/mm/yyyy").toString());
  formData.append("pagado", "0");
  formData.append("cuitEmpresa", "20378353622");
  formData.append("descripcion","Resumen GIPEY".concat(" ", dateFormat(Date.now(), "dd/mm/yyyy").toString())
  );

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

    if (response.status === 201) {
      let data = await response.json();

      return data.message;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
