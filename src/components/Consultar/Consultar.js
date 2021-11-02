import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./Consultar.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "react-phone-input-2/lib/bootstrap.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
//importo
import { getUsuarioUsuario } from "../../controller/miApp.controller";

const useStylesGrid = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    width: "100%",
    color: theme.palette.text.secondary,
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Encuesta(props) {
  const clase5 = useStylesGrid();
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    getReporte(props.match.params.id);
  }, [props.match.params.id]);

  const getReporte = async (id) => {
    if (window.localStorage.getItem('name')!==''){
    const reportes = await getUsuarioUsuario(window.localStorage.getItem('name'));
    setReportes(reportes[0]);}else{
      history.push({
        pathname:
          "/IngresoCA"
      });
    }
  
  };
  const history = useHistory();
  return (
    <Page pageTitle={"Hola, " + window.localStorage.getItem("name")}>
      <Scrollbar>
        <br />
        <Paper className={clase5.paper}>
          <h2>BAIRES BANK | CAJERO AUTOMÁTICO</h2>
        </Paper>
        <div className="App">
          <center>
            <Grid item xs={12} sm={12} style={{ marginTop: "70px" }}>
              <h3 className={clase5.paper}>CONSULTA DE SALDO</h3>
              <Paper className={clase5.paper} style={{ width: "50%" }}>
                <h1>CAJA DE AHORRO</h1> <h2>SALDO EN PESOS</h2>
                <h3>ARS $ {reportes.balanceca}</h3>
                <h6>N° CUENTA: {reportes.nrocuenta}</h6>
                <h6>CBU: {reportes.cbu}</h6>
              </Paper>
              <br></br>
              <Paper className={clase5.paper} style={{ width: "50%" }}>
                <h1>CTA. CORRIENTE</h1> <h2>SALDO EN PESOS</h2>
                <h3>ARS $ {reportes.balancecc}</h3>
                <h6>N° CUENTA: {reportes.numerocajacc}</h6>
                <h6>CBU: {reportes.cbuCC}</h6>
              </Paper>
            </Grid>{" "}
          </center>
        </div>
        <center>
          <br></br>
          <br></br>
          <Link to={{ pathname: "/HomeCA" }}>
            <Button color="secondary">VOLVER</Button>
          </Link>{" "}
          <br></br>
          <Link to="/IngresoCA">
            <Button color="secondary" style={{ color: "red" }}>
              CERRAR SESIÓN
            </Button>
          </Link>{" "}
        </center>{" "}
        <br></br>
      </Scrollbar>
    </Page>
  );
}
