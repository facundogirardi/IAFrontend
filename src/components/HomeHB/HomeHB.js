import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./HomeHB.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "react-phone-input-2/lib/bootstrap.css";
import ButtonGroup from "@material-ui/core/ButtonGroup";
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
    if (window.localStorage.getItem("name") !== "") {
      const reportes = await getUsuarioUsuario(
        window.localStorage.getItem("name")
      );
      setReportes(reportes[0]);
    } else {
      history.push({
        pathname: "/IngresoHB",
      });
    }
  };
  

  const history = useHistory();
  return (
    <Page pageTitle={"Hola, " + window.localStorage.getItem("name")}>
      <Scrollbar>
        <br />
        <Paper className={clase5.paper}>
          <h2>BAIRES BANK | HOME BANKING</h2>
        </Paper>
        <br />
        <br />
        <div className="App">
          <Grid item xs={12} sm={12} style={{ marginTop: "30px" }}>
            <center>
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="text primary button group"
                size="large"
              >
                <Button variant="outlined">CUENTAS</Button>
                <Link
                  to={{
                    pathname: "/TransferenciasHB",
                  }}
                >
                  <Button color="primary">TRANSFERENCIAS</Button>
                </Link>
                <Link to={{ pathname: "/Movimientos" }}>
                  <Button color="primary">MOVIMIENTOS</Button>
                </Link>
                {reportes.usuariotipo !== 2 ? (
                  <Link to={{ pathname: "/ResumenTarjeta" }}>
                  <Button color="primary">RESUMEN DE TARJETA</Button>
                  </Link>  ) : (<></>  )}
                {reportes.usuariotipo !== 2 ? (
       
                  <Link to={{ pathname: "/PagosHB" }}>
                    <Button color="primary">PAGO DE SERVICIOS</Button>
                  </Link>
                 
                ) : (
                  <Link to={{ pathname: "/CargaCupon" }} >
                    <Button color="primary" >CARGAR CUPÓN DE PAGO</Button>
                  </Link>
                )}
                {reportes.usuariotipo === 2 ? (  <Link to={{ pathname: "/PagoSueldos" }}>
                    <Button color="primary">PAGO DE SUELDOS</Button>
                  </Link>  ): (<></>)}
                <Link to={{ pathname: "/Perfil" }}>
                  <Button color="primary">EDITAR DATOS</Button>
                </Link>
              </ButtonGroup>
            </center>
            <br />
            <br />
          </Grid>
          <br></br>
          <center>
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
            <br></br>
          </center>
        </div>
        <center>
          <br></br>
          <br></br>
          <Link to="/IngresoHB">
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
