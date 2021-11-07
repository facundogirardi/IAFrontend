const urlExtApi = "https://iabackendparalelo.herokuapp.com/"; // Colocar endpoint de BancoA
//const urlExtApi = "http://localhost:4000/";

const urlWebServicesExterno = {
  //Endpoints externos
  altaclearingM: urlExtApi + "api/users/altaclearingM",
  altaclearing: urlExtApi + "api/users/altaclearing",
  getClearings: urlExtApi + "api/users/getClearings",
  getUsuarioCBUExterno: urlExtApi + "api/users/getusersCBUCC",
  getClearingCBUD: urlExtApi + "api/users/getClearingCBUD",
  getClearingCBUP: urlExtApi + "api/users/getClearingCBUP",
  getClearingCBUO: urlExtApi + "api/users/getClearingCBUO",
};

export default urlWebServicesExterno;
