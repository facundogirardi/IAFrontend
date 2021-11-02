//const urlApi = "http://localhost:4000/";
const urlApi = "https://iabackend.herokuapp.com/";
console.log("url", urlApi);

const urlWebServices = {
  login: urlApi + "api/users/login",
  CrearUsuario: urlApi + "api/users/registration",
  getUsuario: urlApi + "api/users/getusers",
  getSueldo: urlApi + "api/users/getsueldos",
  getEmpresa: urlApi + "api/users/getEmpresas",
  updateSueldo: urlApi + "api/users/updateSueldo",
  updateUsuarioOperador: urlApi + "api/users/updateusercbu",
  updateUsuario: urlApi + "api/users/updateusercbu",
  updateUserP: urlApi + "api/users/updateUserP",
  updateUsuarioCC: urlApi + "api/users/updateusercbu",
  getUsuarioCBU: urlApi + "api/users/getusersCBU",
  getUsuarioCBUCC: urlApi + "api/users/getusersCBUCC",
  getUsuarioUsuario: urlApi + "api/users/getusersUsuario",
  getUsuarioCuit: urlApi + "api/users/getUsuarioCuit",
  GeneroMovimiento: urlApi + "api/users/registromovimiento",
  getMovimientoUsuario: urlApi + "api/users/getMovimientoUsuario",
  getMovimientos: urlApi + "api/users/getmovimientos",
  getEmpresaCUIT: urlApi + "api/users/getEmpresaCUIT",
  getEmpresaPAGO: urlApi + "api/users/getEmpresaPAGO",
  updateEmpresa: urlApi + "api/users/updateEmpresa",
  getEmpresasID: urlApi + "api/users/getEmpresasID",
  getMantenimientoClave: urlApi + "api/users/getMantenimientoClave",
  getMantenimientos: urlApi + "api/users/getMantenimientos",
  updateMantenimiento: urlApi + "api/users/updateMantenimiento",
  uploadfile : urlApi + "api/users/uploadfile ",
  altaEmpresa: urlApi + "api/users/altaempresa",
  altasueldo: urlApi + "api/users/altasueldo",
  updateTarjeta: urlApi + "api/users/updateTarjeta",
  getTarjetaCUIT: urlApi + "api/users/getTarjetaCUIT",
  getTarjetaCodigo: urlApi + "api/users/getTarjetaCodigo",
  getTarjetaCUITEmpresa: urlApi + "api/users/getTarjetaCUITEmpresa",
  updatePago: urlApi + "api/users/updatePago",
  getPagoCUIT: urlApi + "api/users/getPagoCUIT",
  getPagoCUITEmpresa: urlApi + "api/users/getPagoCUITEmpresa",
  getComercios: urlApi + "api/users/getComercios",
  updateComercio: urlApi + "api/users/updateComercio",
};

export default urlWebServices;
