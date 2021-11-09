const urlExtApi = "https://bff-banking-app.herokuapp.com/"; // Colocar endpoint de BancoA

const urlWebServicesExterno = {
  //Endpoints externos
  altaclearingM: urlExtApi + "api/users/altaclearingM",
  tExterna: urlExtApi + "transfers_inbancoa/57288124",
  altaclearing: urlExtApi + "api/users/altaclearing",
  getUsuarioCBUExterno: urlExtApi + "api/users/getusersCBUCC",
  getClearingCBUD: urlExtApi + "api/users/getClearingCBUD",
  getClearingCBUP: urlExtApi + "api/users/getClearingCBUP",
  getClearingCBUO: urlExtApi + "api/users/getClearingCBUO",
};

export default urlWebServicesExterno;
