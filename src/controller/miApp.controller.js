import urlWebServices from "../controller/webServices.js";

//Creo Usuario
export const CrearUsuario = async function (
  nombre,
  apellido,
  email,
  usuario,
  password,
  usuariotipo,
  tipodni,
  dni,
  nacimiento,
  telefono,
  cuit,
  calle,
  altura,
  ciudad,
  provincia,
  piso,
  depto,
  empresa
) {
  let url = urlWebServices.CrearUsuario;
  const formData = new URLSearchParams();
  formData.append("nombre", nombre);
  formData.append("email", email);
  formData.append("apellido", apellido);
  formData.append("usuario", usuario);
  formData.append("password", password);
  formData.append("usuariotipo", usuariotipo);
  formData.append("tipodni", tipodni);
  formData.append("dni", dni);
  formData.append("nacimiento", nacimiento);
  formData.append("telefono", telefono);
  formData.append("cuit", cuit);
  formData.append("calle", calle);
  formData.append("altura", altura);
  formData.append("ciudad", ciudad);
  formData.append("provincia", provincia);
  formData.append("piso", piso);
  formData.append("depto", depto);
  formData.append("empresa", empresa);
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

/////////////////////////////////////////////////////////
export const altaEmpresa = async function (
  nombre,
  codigopago,
  cuitEmpresa,
  importe,
  descripcion,
  fechaVencimiento,
  estado,
  cuit,
  debito
) {
  let url = urlWebServices.altaEmpresa;
  const formData = new URLSearchParams();
  formData.append("nombre", nombre);
  formData.append("codigopago", codigopago);
  formData.append("cuitEmpresa", cuitEmpresa);
  formData.append("importe", importe);
  formData.append("descripcion", descripcion);
  formData.append("fechaVencimiento", fechaVencimiento);
  formData.append("estado", estado);
  formData.append("cuit", cuit);
  formData.append("debito", debito);
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
////////////////////////////////
export const altasueldo = async function (
  cbu,
  importe,
  fechaPago,
  pagado,
  cbuEmpresa,
  descripcion
) {
  let url = urlWebServices.altasueldo;
  const formData = new URLSearchParams();
  formData.append("cbu", cbu);
  formData.append("importe", importe);
  formData.append("fechaPago", fechaPago);
  formData.append("pagado", pagado);
  formData.append("cbuEmpresa", cbuEmpresa);
  formData.append("descripcion", descripcion);
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

export const GeneroMovimiento = async function (
  usuario,
  tipomovimiento,
  importe,
  importeCA,
  importeCC
) {
  let url = urlWebServices.GeneroMovimiento;
  const formData = new URLSearchParams();
  formData.append("usuario", usuario);
  formData.append("tipomovimiento", tipomovimiento);
  formData.append("importe", importe);
  formData.append("importeCA", importeCA);
  formData.append("importeCC", importeCC);

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

// Recupero usuarios
export const getUsuario = async function () {
  let url = urlWebServices.getUsuario;

  try {
    let response = await fetch(url, {
      method: "GET", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem("x"),
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      let data = await response.json();

      let listaUsuarios = data.data.docs;
      return listaUsuarios;
    } else {
      let vacio = [];
      console.log("No hay usuarios");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Recupero sueldos
export const getSueldo = async function () {
  let url = urlWebServices.getSueldo;

  try {
    let response = await fetch(url, {
      method: "GET", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem("x"),
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      let data = await response.json();

      let listaSueldos = data.data.docs;
      return listaSueldos;
    } else {
      let vacio = [];
      console.log("No hay sueldos");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getComercios = async function () {
  let url = urlWebServices.getComercios;

  try {
    let response = await fetch(url, {
      method: "GET", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem("x"),
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      let data = await response.json();

      let listaComercios = data.data.docs;
      return listaComercios;
    } else {
      let vacio = [];
      console.log("No hay Comercios");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Recupero Empresas
export const getEmpresa = async function () {
  let url = urlWebServices.getEmpresa;

  try {
    let response = await fetch(url, {
      method: "GET", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem("x"),
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      let data = await response.json();

      let listaSueldos = data.data.docs;
      return listaSueldos;
    } else {
      let vacio = [];
      console.log("No hay empresas");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Recupero Empresas
export const getTarjetaCUITEmpresa = async function () {
  let url = urlWebServices.getTarjetaCUITEmpresa;

  try {
    let response = await fetch(url, {
      method: "GET", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem("x"),
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      let data = await response.json();

      let listaSueldos = data.data.docs;
      return listaSueldos;
    } else {
      let vacio = [];
      console.log("No hay empresas");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Recupero Empresas
export const getTarjetaCUIT = async function (cuit) {
  let url = urlWebServices.getTarjetaCUIT;
  const formData = new URLSearchParams();

  formData.append("cuit", cuit);
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

      let listaSueldos = data.data.docs;
      return listaSueldos;
    } else {
      let vacio = [];
      console.log("No hay Tarjetas");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getTarjetaCodigo = async function (codigotransaccion) {
  let url = urlWebServices.getTarjetaCodigo;
  const formData = new URLSearchParams();

  formData.append("codigotransaccion", codigotransaccion);
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

      let listaSueldos = data.data.docs;
      return listaSueldos;
    } else {
      let vacio = [];
      console.log("No hay Tarjetas");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Traer usuario por CBU
export const getuserscbu = async function (cbu) {
  let url = urlWebServices.getuserscbu;
  const formData = new URLSearchParams();

  formData.append("cbu", cbu);

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
      let vacio = [];
      console.log("No hay usuarios por ese CBU");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Traer usuario por CBU CC
export const getuserscbuCC = async function (cbuCC) {
  let url = urlWebServices.getuserscbuCC;
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
      let vacio = [];
      console.log("No hay reportes por ese CBU cc");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Traer usuario por CBU
export const getUsuarioCBU = async function (cbu) {
  let url = urlWebServices.getUsuarioCBU;
  const formData = new URLSearchParams();

  formData.append("cbu", cbu);

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
      console.log("No hay usuarios por ese CBU");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Traer usuario por CBUCC
export const getUsuarioCBUCC = async function (cbuCC) {
  let url = urlWebServices.getUsuarioCBUCC;
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

// Traer usuario por CodigoPago
export const getEmpresaPAGO = async function (codigopago) {
  let url = urlWebServices.getEmpresaPAGO;
  const formData = new URLSearchParams();

  formData.append("codigopago", codigopago);

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
      console.log("No hay empresas por ese codigopago");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Traer usuario por Usuario
export const getUsuarioUsuario = async function (usuario) {
  let url = urlWebServices.getUsuarioUsuario;
  const formData = new URLSearchParams();

  formData.append("usuario", usuario);

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
      let vacio = [];
      console.log("No hay Usuarios por ese Usuario");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Traer usuario por Cuit
export const getUsuarioCuit = async function (cuit) {
  let url = urlWebServices.getUsuarioCuit;
  const formData = new URLSearchParams();

  formData.append("cuit", cuit);

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
      let vacio = [];
      console.log("No hay Usuarios por ese Usuario");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Traer movimientos por Usuario
export const getMovimientoUsuario = async function (usuario) {
  let url = urlWebServices.getMovimientoUsuario;
  const formData = new URLSearchParams();

  formData.append("usuario", usuario);

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
      let vacio = [];
      console.log("No hay movimientos por Usuario");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Acutualizo usuarios cbu CA
export const updateUsuario = async function ({
  nombre,
  apellido,
  tipodni,
  dni,
  email,
  estadocuenta,
  usuario,
  password,
  usuariotipo,
  empresa,
  nacimiento,
  telefono,
  cuit,
  calle,
  altura,
  ciudad,
  piso,
  cbu,
  cbuCC,
  nrocuenta,
  numerocajacc,
  balancecc,
  numerocajaca,
  balanceca,
  provincia,
  depto,
}) {
  let url = urlWebServices.updateUsuario;
  const formData = new URLSearchParams();
  formData.append("estadocuenta", estadocuenta);
  formData.append("cbu", cbu);
  formData.append("cbuCC", cbuCC);
  formData.append("nrocuenta", nrocuenta);
  formData.append("numerocajacc", numerocajacc);
  formData.append("balancecc", balancecc);
  formData.append("numerocajaca", numerocajaca);
  formData.append("balanceca", balanceca);
  formData.append("usuario", usuario);
  formData.append("password", password);
  formData.append("usuariotipo", usuariotipo);
  formData.append("tipodni", tipodni);
  formData.append("dni", dni);
  formData.append("nacimiento", nacimiento);
  formData.append("telefono", telefono);
  formData.append("cuit", cuit);
  formData.append("calle", calle);
  formData.append("altura", altura);
  formData.append("ciudad", ciudad);
  formData.append("provincia", provincia);
  formData.append("piso", piso);
  formData.append("depto", depto);
  formData.append("empresa", empresa);
  formData.append("nombre", nombre);
  formData.append("apellido", apellido);
  formData.append("email", email);

  try {
    let response = await fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
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

// Acutualizo Sueldos
export const updateSueldo = async function ({
  cbu,
  codigo,
  cbuEmpresa,
  importe,
  descripcion,
  fechaPago,
  pagado,
}) {
  let url = urlWebServices.updateSueldo;
  const formData = new URLSearchParams();
  formData.append("cbu", cbu);
  formData.append("codigo", codigo);
  formData.append("cbuEmpresa", cbuEmpresa);
  formData.append("importe", importe);
  formData.append("descripcion", descripcion);
  formData.append("fechaPago", fechaPago);
  formData.append("pagado", pagado);

  try {
    let response = await fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
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

export const updateComercio = async function ({
  cuit,
  codigotransaccion,
  cuitEmpresa,
  importe,
  descripcion,
  fechaPago,
  pagado,
}) {
  let url = urlWebServices.updateComercio;
  const formData = new URLSearchParams();
  formData.append("cuit", cuit);
  formData.append("codigotransaccion", codigotransaccion);
  formData.append("cuitEmpresa", cuitEmpresa);
  formData.append("importe", importe);
  formData.append("descripcion", descripcion);
  formData.append("fechaPago", fechaPago);
  formData.append("pagado", pagado);

  try {
    let response = await fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
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

// Acutualizo usuarios cbu CA
export const updateUserP = async function ({
  nombre,
  apellido,
  tipodni,
  dni,
  email,
  estadocuenta,
  usuario,
  password,
  usuariotipo,
  empresa,
  nacimiento,
  telefono,
  cuit,
  calle,
  altura,
  ciudad,
  piso,
  cbu,
  cbuCC,
  nrocuenta,
  numerocajacc,
  balancecc,
  numerocajaca,
  balanceca,
  provincia,
  depto,
}) {
  let url = urlWebServices.updateUserP;
  const formData = new URLSearchParams();
  formData.append("estadocuenta", estadocuenta);
  formData.append("cbu", cbu);
  formData.append("cbuCC", cbuCC);
  formData.append("nrocuenta", nrocuenta);
  formData.append("numerocajacc", numerocajacc);
  formData.append("balancecc", balancecc);
  formData.append("numerocajaca", numerocajaca);
  formData.append("balanceca", balanceca);
  formData.append("usuario", usuario);
  formData.append("password", password);
  formData.append("usuariotipo", usuariotipo);
  formData.append("tipodni", tipodni);
  formData.append("dni", dni);
  formData.append("nacimiento", nacimiento);
  formData.append("telefono", telefono);
  formData.append("cuit", cuit);
  formData.append("calle", calle);
  formData.append("altura", altura);
  formData.append("ciudad", ciudad);
  formData.append("provincia", provincia);
  formData.append("piso", piso);
  formData.append("depto", depto);
  formData.append("empresa", empresa);
  formData.append("nombre", nombre);
  formData.append("apellido", apellido);
  formData.append("email", email);

  try {
    let response = await fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
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

// Acutualizo usuarios cbu CA
export const updateEmpresa = async function (
  nombre,
  codigopago,
  cuitEmpresa,
  importe,
  descripcion,
  fechaVencimiento,
  estado,
  cuit,
  debito
) {
  let url = urlWebServices.updateEmpresa;
  const formData = new URLSearchParams();
  formData.append("nombre", nombre);
  formData.append("codigopago", codigopago);
  formData.append("importe", importe);
  formData.append("descripcion", descripcion);
  formData.append("fechaVencimiento", fechaVencimiento);
  formData.append("cuitEmpresa", cuitEmpresa);
  formData.append("estado", estado);
  formData.append("cuit", cuit);
  formData.append("debito", debito);

  try {
    let response = await fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (response.status === 200) {
      console.log("Actualiza", importe);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

// Recupero Empresas
export const getPagoCUITEmpresa = async function () {
  let url = urlWebServices.getPagoCUITEmpresa;

  try {
    let response = await fetch(url, {
      method: "GET", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem("x"),
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      let data = await response.json();

      let listaSueldos = data.data.docs;
      return listaSueldos;
    } else {
      let vacio = [];
      console.log("No hay pagos");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Recupero Empresas
export const getPagoCUIT = async function () {
  let url = urlWebServices.getPagoCUIT;

  try {
    let response = await fetch(url, {
      method: "GET", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem("x"),
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      let data = await response.json();

      let listaSueldos = data.data.docs;
      return listaSueldos;
    } else {
      let vacio = [];
      console.log("No hay pagos");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Acutualizo usuarios cbu CA
export const updatePago = async function ({
  codigotransaccion,
  cuitEmpresa,
  importe,
  descripcion,
  fechaPago,
  pagado,
  cuit,
}) {
  let url = urlWebServices.updatePago;
  const formData = new URLSearchParams();

  formData.append("codigotransaccion", codigotransaccion);
  formData.append("cuitEmpresa", cuitEmpresa);
  formData.append("importe", importe);
  formData.append("fechaPago", fechaPago);
  formData.append("descripcion", descripcion);
  formData.append("pagado", pagado);
  formData.append("cuit", cuit);

  try {
    let response = await fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
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

// Acutualizo usuarios cbu CA


export const updateTarjeta = async function (
  codigotransaccion,
  cuitEmpresa,
  importe,
  descripcion,
  fechaVencimiento,
  pagado,
  cuit,
) {
  let url = urlWebServices.updateTarjeta;
  const formData = new URLSearchParams();
  formData.append("codigotransaccion", codigotransaccion);
  formData.append("cuitEmpresa", cuitEmpresa);
  formData.append("importe", importe);
  formData.append("fechaVencimiento", fechaVencimiento);
  formData.append("descripcion", descripcion);
  formData.append("pagado", pagado);
  formData.append("cuit", cuit);

  try {
    let response = await fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (response.status === 200) {
      console.log("Actualiza", importe);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

// Acutualizo usuarios cbu CC
export const updateUsuarioCC = async function ({
  nombre,
  apellido,
  tipodni,
  dni,
  email,
  estadocuenta,
  usuario,
  password,
  usuariotipo,
  empresa,
  nacimiento,
  telefono,
  cuit,
  calle,
  altura,
  ciudad,
  piso,
  cbu,
  cbuCC,
  nrocuenta,
  numerocajacc,
  balancecc,
  numerocajaca,
  balanceca,
  provincia,
  depto,
}) {
  let url = urlWebServices.updateUsuarioCC;
  const formData = new URLSearchParams();
  formData.append("estadocuenta", estadocuenta);
  formData.append("cbu", cbu);
  formData.append("cbuCC", cbuCC);
  formData.append("nrocuenta", nrocuenta);
  formData.append("numerocajacc", numerocajacc);
  formData.append("balancecc", balancecc);
  formData.append("numerocajaca", numerocajaca);
  formData.append("balanceca", balanceca);
  formData.append("usuario", usuario);
  formData.append("password", password);
  formData.append("usuariotipo", usuariotipo);
  formData.append("tipodni", tipodni);
  formData.append("dni", dni);
  formData.append("nacimiento", nacimiento);
  formData.append("telefono", telefono);
  formData.append("cuit", cuit);
  formData.append("calle", calle);
  formData.append("altura", altura);
  formData.append("ciudad", ciudad);
  formData.append("provincia", provincia);
  formData.append("piso", piso);
  formData.append("depto", depto);
  formData.append("empresa", empresa);
  formData.append("nombre", nombre);
  formData.append("apellido", apellido);
  formData.append("email", email);

  try {
    let response = await fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
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

// Acutualizo usuarios
export const updateUsuarioOperador = async function (
  nombre,
  apellido,
  tipodni,
  dni,
  email,
  estadocuenta,
  usuario,
  password,
  usuariotipo,
  empresa,
  nacimiento,
  telefono,
  cuit,
  calle,
  altura,
  ciudad,
  piso,
  cbu,
  cbuCC,
  nrocuenta,
  numerocajacc,
  balancecc,
  numerocajaca,
  balanceca,
  provincia,
  depto
) {
  let url = urlWebServices.updateUsuarioOperador;
  const formData = new URLSearchParams();
  formData.append("estadocuenta", estadocuenta);
  formData.append("cbu", cbu);
  formData.append("cbuCC", cbuCC);
  formData.append("nrocuenta", nrocuenta);
  formData.append("numerocajacc", numerocajacc);
  formData.append("balancecc", balancecc);
  formData.append("numerocajaca", numerocajaca);
  formData.append("balanceca", balanceca);
  formData.append("usuario", usuario);
  formData.append("password", password);
  formData.append("usuariotipo", usuariotipo);
  formData.append("tipodni", tipodni);
  formData.append("dni", dni);
  formData.append("nacimiento", nacimiento);
  formData.append("telefono", telefono);
  formData.append("cuit", cuit);
  formData.append("calle", calle);
  formData.append("altura", altura);
  formData.append("ciudad", ciudad);
  formData.append("provincia", provincia);
  formData.append("piso", piso);
  formData.append("depto", depto);
  formData.append("empresa", empresa);
  formData.append("nombre", nombre);
  formData.append("apellido", apellido);
  formData.append("email", email);

  try {
    let response = await fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
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

// Login de usuarios
export const login = async function (login) {
  let url = urlWebServices.login;

  const formData = new URLSearchParams();
  formData.append("usuario", login.usuario);
  formData.append("password", login.password);

  try {
    let response = await fetch(url, {
      method: "POST", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    let rdo = response.status;
    let data = await response.json();
    switch (rdo) {
      case 201: {
        localStorage.setItem("x", data.loginUser.token);
        let user = data.loginUser.user;
        localStorage.setItem("nombre", user.name);
        localStorage.setItem("email", user.email);

        if (user.estadocuenta === 1) {
          return { rdo: 11, mensaje: "Usuario no Habilitado" }; //Usuario Hablitado
        }
        if (user.usuariotipo === 3) {
          return { rdo: 3, mensaje: "Usuario no Habilitado" }; //Usuario Operador
        } else {
          return { rdo: 4, mensaje: "Usuario no Habilitado" }; //No esta habilitado
        }
      }
      case 202: {
        return {
          rdo: 12,
          mensaje: "El mail ingresado no existe en nuestra base.",
        };
      }
      case 203: {
        return { rdo: 12, mensaje: "La contraseña no es correcta." };
      }
      default: {
        return { rdo: 12, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Recupero usuarios
export const getMovimientos = async function () {
  let url = urlWebServices.getMovimientos;

  try {
    let response = await fetch(url, {
      method: "GET", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem("x"),
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      let data = await response.json();

      let listaUsuarios = data.data.docs;
      return listaUsuarios;
    } else {
      let vacio = [];
      console.log("No hay Movimientos");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const uploadfile = async function (filePath) {
  //url webservices
  let url = urlWebServices.uploadfile;

  console.log("filePath", filePath);
  const formData = new FormData();
  //agrego archivos para subir

  formData.append("filePath", filePath);

  try {
    let response = await fetch(url, {
      method: "POST", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/form-data",
        "x-access-token": localStorage.getItem("x"),
        Origin: "http://localhost:3000",
        //'Content-Type': 'application/form-data'
      },
      body: formData,
    });

    let archivos = await response.json();
    console.log("respuestaUpload", archivos);
    return archivos;
  } catch (err) {
    alert("Error uploading the files");
    console.log("Error uploading the files", err);
  }
};

// Traer empresas por ID
export const getEmpresasID = async function (_id) {
  let url = urlWebServices.getEmpresasID;
  const formData = new URLSearchParams();

  formData.append("_id", _id);

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
      let vacio = [];
      console.log("No hay empresas por ese ID");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Recupero usuarios
export const getMantenimientos = async function () {
  let url = urlWebServices.getMantenimientos;

  try {
    let response = await fetch(url, {
      method: "GET", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "x-access-token": localStorage.getItem("x"),
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      let data = await response.json();

      let listaUsuarios = data.data.docs;
      return listaUsuarios;
    } else {
      let vacio = [];
      console.log("No hay Mantenimientos");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Acutualizo mantenimiento
export const updateMantenimiento = async function (
  clave,
  descubiertoF,
  descubiertoJ,
  mantenimientoF,
  mantenimientoJ,
  interes
) {
  let url = urlWebServices.updateMantenimiento;
  const formData = new URLSearchParams();
  formData.append("clave", clave);
  formData.append("descubiertoF", descubiertoF);
  formData.append("descubiertoJ", descubiertoJ);
  formData.append("mantenimientoF", mantenimientoF);
  formData.append("mantenimientoJ", mantenimientoJ);
  formData.append("interes", interes);

  try {
    let response = await fetch(url, {
      method: "PUT", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
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

// Traer usuario por Cuit
export const getMantenimientoClave = async function (clave) {
  let url = urlWebServices.getMantenimientoClave;
  const formData = new URLSearchParams();

  formData.append("clave", clave);

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
      let vacio = [];
      console.log("No hay Matenimientos por esa clave");
      return vacio;
    }
  } catch (error) {
    console.log("error", error);
  }
};
