import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./HomeCA.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "react-phone-input-2/lib/bootstrap.css";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
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
        <br />
        <br />

        <div className="App">
          <Grid item xs={12} sm={12} style={{ marginTop: "70px" }}>
            <center>
              <Link to={{ pathname: "/Consultar" }}>
                {" "}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "600px", height: "50px" }}
                >
                  CONSULTAR
                </Button>
              </Link>
              <br />
              <br />
              <Link to={{ pathname: "/Transferir" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "600px", height: "50px" }}
                >
                  TRANSFERIR A UN TERCERO
                </Button>
              </Link>
              <br />
              <br />
              <Link to={{ pathname: "/TransferirAMiCuenta" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "600px", height: "50px" }}
                >
                  TRANSFERIR EN MIS CUENTAS
                </Button>
              </Link>
              <br />
              <br />

              <Link to={{ pathname: "/Extraer" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "600px", height: "50px" }}
                >
                  EXTRAER
                </Button>
              </Link>
              <br />
              <br />
              <Link to={{ pathname: "/Depositar" }}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "600px", height: "50px" }}
                >
                  DEPOSITAR A UN TERCERO
                </Button>
              </Link>
              <br />
              <br />
              <Link to={{ pathname: "/DepositarAMiCuenta"}}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "600px", height: "50px" }}
                >
                  DEPOSITAR A MI CUENTA
                </Button>
              </Link>
              <br />
              <br />
              <Link to={{ pathname: "/Pagar"}}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "600px", height: "50px" }}
                >
                  PAGAR SERVICIOS
                </Button>
              </Link>
            </center>
          </Grid>
        </div>
        <center><br></br><br></br>
        <Link to="/IngresoCA">
        <Button color="secondary" style={{color:"red"}}>
                CERRAR SESIÓN
              </Button></Link> </center> <br></br>
      </Scrollbar>
    </Page>
  );
}
