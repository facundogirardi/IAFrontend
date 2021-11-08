import urlWebServicesExterno from "../controller/webServicesExterno.js";
//Envio las liquidaciones al banco
// Recupero Empresas
export const getClearingCBUD = async function (cbuUsuarioD) {
  let url = urlWebServicesExterno.getClearingCBUD;
  const formData = new URLSearchParams();

  formData.append("cbuUsuarioD", cbuUsuarioD);
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
      let data = await response.json();

      let listaUSuario = data.data.docs;
      return listaUSuario;
    } else {
      let vacio = [201];
      console.log("No hay Usuarios");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Traer usuario por CBUCC
export const getUsuarioCBUExterno = async function (cbuCC) {
  let url = urlWebServicesExterno.getUsuarioCBUExterno;
  const formData = new URLSearchParams();

  formData.append("cbuCC", cbuCC);

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
      let data = await response.json();

      let listaReporteID = data.data.docs;
      return listaReporteID;
    } else {
      let vacio = 201;
      console.log("No hay usuarios por ese CBU CC");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

//Creo Usuario
export const altaclearing = async function (
  cbuPropio,
  cbuUsuarioO,
  cbuUsuarioD,
  importe,
  descripcion,
  pagado
) {
  let url = urlWebServicesExterno.altaclearing;
  const formData = new URLSearchParams();
  formData.append("cbuPropio", cbuPropio);
  formData.append("cbuUsuarioO", cbuUsuarioO);
  formData.append("cbuUsuarioD", cbuUsuarioD);
  formData.append("importe", importe);
  formData.append("descripcion", descripcion);
  formData.append("pagado", pagado);

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
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};


