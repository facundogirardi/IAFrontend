import React from "react";
import { Link } from "react-router-dom";
import fotoDashboard from "../../imagenes/obelisco.png";
import Button from "@material-ui/core/Button";
import "./Registro.css";
import Grid from "@material-ui/core/Grid";
export default function () {
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

        <Grid item xs={6} sm={4} style={{ marginTop: "170px" }}>
          <center>
            <h1 style={{ fontSize: "90px", color: "#2913a2" }}>BAIRES BANK</h1>
            <h3>REGISTRO</h3>
            <br />
            {/*   <Link to="/RegistroOperador">
              <Button variant="contained" color="primary">OPERADOR</Button>
            </Link> */}
            <Link to="/RegistroFisica">
              <Button variant="contained" color="primary">
                PERSONA FÍSICA
              </Button>
            </Link>
            <br /> <br />
            <Link to="/RegistroJuridica">
              <Button variant="contained" color="primary">
                PERSONA NO FÍSICA
              </Button>
            </Link>
            <br />
            <br />
            <Link to="/Administracion">
              <Button color="secondary" style={{ color: "blue" }}>
                Volver
              </Button>
            </Link>
            <br /> <br />
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
