import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fotoDashboard from "../../imagenes/obelisco.png";
import Button from "@material-ui/core/Button";
import "./LandingPage.css";
import Grid from "@material-ui/core/Grid";

export default function (props) {
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
          <h1 style={{ fontSize: "90px", color: "#2913a2" }}>BAIRES BANK</h1>
          <h3>Grupo 1 - Integracion de aplicaciones | UADE</h3>

          <br />
          <Link to="/IngresoHB">
            <Button variant="contained" color="primary">
              INGRESO HB
            </Button>
          </Link>
          <br />
          <br />

          <Link to="/IngresoCA">
            <Button variant="contained" color="primary">
              CAJERO
            </Button>
          </Link>
          <br />
          <br />
          <Link to="/IngresoOP">
            <Button variant="contained" color="primary">
              CAJERO OPERADOR
            </Button>
          </Link>
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
