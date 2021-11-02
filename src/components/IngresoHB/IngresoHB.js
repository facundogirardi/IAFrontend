import React from "react";
import { Link } from "react-router-dom";
import fotoDashboard from "../../imagenes/obelisco.png";
import Button from "@material-ui/core/Button";
import "./IngresoHB.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
//importo llamada a endpoint

import { login, getUsuarioUsuario } from "../../controller/miApp.controller";

export default function () {
  window.localStorage.setItem('name', "");

  const [usuario, setUsuario] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usuarioValido, setUsuarioValido] = React.useState(false);
  const [usuarioRoot, setUsuarioRoot] = React.useState(false);

  const handleUsuario = (event) => {
    setUsuario(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  //Ejecuto el endopoint para validar login
  const validarLogin = async function () {
    let datos = {
      usuario: usuario,
      password: password,
    };

    let getLogin = await login(datos);
 
    if (getLogin.rdo === 11 || getLogin.rdo === 4) {
      if (getLogin.rdo === 4) {
        window.localStorage.setItem('name', usuario);
          history.push({
            pathname: "/CambioPass", //paso el usuario temporalmente
          });
      } else {
      setUsuarioValido(true);
      getUsuarioUsuario(usuario).then((value) => {
        if (value.length !== 0) {
          window.localStorage.setItem('name', usuario);
          history.push({
            pathname: "/HomeHB", //paso el usuario temporalmente
          });
        } else {
          swal(" ", "USUARIO INEXISTENTE", "error");
          history.push({
            pathname: "/IngresoHB/", //paso el usuario temporalmente
          });
        }
      })};
    }
    if (getLogin.rdo === 3) {
      swal(" ", "USUARIO NO HABILITADO", "error");
    } else {
      if (  getLogin.rdo > 11 ) {
        swal(" ", "USUARIO O CONTRASEÑA INCORRECTA", "error");
      }
    }
  };

  //Valido campos y llamo endpoint
  const loginUser = () => {
    if (usuario !== "" && password !== "") {
      validarLogin();
    } else {
      swal(" ", "DEBE COMPLETAR USUARIO Y PASSWORD", "warning");
    }
  };

  const history = useHistory();
  const redirect = () => {
    if (usuarioRoot) {
      return <Redirect to="/Root" />;
    } else if (usuarioValido) {
      //   return <Redirect to="/HomeHB" />;
    }
  };

  return (
    <div class="container-fluid">
      <Grid container spacing={3}>
        <Grid item xs={3} sm={2}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </Grid>
        {redirect()}
        <Grid item xs={6} sm={4} style={{ marginTop: "170px" }}>
          <center>
            <h1 style={{ fontSize: "90px", color: "#2913a2" }}>BAIRES BANK</h1>
            <h3>HOME BANKING</h3>

            <form autoComplete="off">
              <TextField
                required
                id="Usuario"
                label="Usuario"
                type="text"
                inputProps={{
                  onChange: (event) => handleUsuario(event),
                }}
              />

              <br />

              <TextField
                required
                id="Password"
                label="Password"
                type="password"
                inputProps={{
                  onChange: (event) => handlePassword(event),
                }}
              />
            </form>
            <br />

            <Button variant="contained" color="Primary" onClick={loginUser}>
              INGRESAR
            </Button>
            <br />
            <br />
            <Link to="/">
              <Button color="secondary" style={{ color: "green" }}>
                Inicio
              </Button>
            </Link>
          </center>
        </Grid>

        <center>
          <img
            src={fotoDashboard}
            alt="alternative"
            style={{ marginTop: "100px" }}
          />
        </center>
      </Grid>
    </div>
  );
}
