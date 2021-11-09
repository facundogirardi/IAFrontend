import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./Depositar.css";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";
import "react-phone-input-2/lib/bootstrap.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import swal from "sweetalert";

//importo
import {
  updateUsuario,
  getUsuarioCBU,
  GeneroMovimiento,
  getUsuarioUsuario,
  getUsuarioCBUCC
} from "../../controller/miApp.controller";

const useStylesGrid = makeStyles((theme) => ({
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
  number: {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));

export default function Usuario(props) {
  const clase5 = useStylesGrid();
  const [cbu, setCbu] = React.useState("");
  const [importe, setImporte] = React.useState("");
  const [tipomovimiento] = React.useState("Depósito por Cajero Automatico");
  const [reportes, setReportes] = useState([]);
  const handleCBU = (event) => {
    setCbu(event.target.value);
  };
  const handleImporte = (event) => {
    setImporte(event.target.value);
  };

  //Ejecuto el endopoint para validar el CBU & guardar el monto
  const validarLogin = async function () {
    getUsuarioCBU(cbu).then((value) => {
      const numerico = parseFloat(importe);
      if (numerico < 1) {
        swal(" ", "NO SE PUEDE DEPOSITAR UN MONTO MENOR A $ 1", "error");
      } else {
        if (value !== 201) {
          value[0].balanceca = numerico + parseFloat(value[0].balanceca);
          const usuario = value[0].usuario;
          const importeCA = value[0].balanceca;
          const importeCC = value[0].balancecc;
          updateUsuario(value[0]).then((value) => {
            GeneroMovimiento(
              usuario,
              tipomovimiento,
              importe,
              importeCA,
              importeCC
            );
            swal(" ", "MONTO DEPOSITADO CORRECTAMENTE", "success");
            history.push({
              pathname: "/HomeCA", //paso el usuario temporalmente
            });
          });
        } else {
          getUsuarioCBUCC(cbu).then((value) => {
            const numerico = parseFloat(importe);
            if (numerico < 1) {
              swal(" ", "NO SE PUEDE DEPOSITAR UN MONTO MENOR A $ 1", "error");
            } else {
              if (value !== 201) {
                value[0].balancecc = numerico + parseFloat(value[0].balancecc);
                const usuario = value[0].usuario;
                const importeCA = value[0].balanceca;
                const importeCC = value[0].balancecc;
                updateUsuario(value[0]).then((value) => {
                  GeneroMovimiento(
                    usuario,
                    tipomovimiento,
                    importe,
                    importeCA,
                    importeCC
                  );
                  swal(" ", "MONTO DEPOSITADO CORRECTAMENTE", "success");
                  history.push({
                    pathname: "/HomeCA", //paso el usuario temporalmente
                  });
                });
              } else {
                swal(" ", "NO EXISTE EL CBU INGRESADO", "error");
                history.push({
                  pathname: "/HomeCA", //paso el usuario temporalmente
                });
              }
            }
          });
        }
      }
    });
  };

  const BuscoCBU = () => {
    if (cbu !== "" && importe !== "") {
      validarLogin();
    } else {
      swal(" ", "DEBE COMPLETAR CBU CJA DE AHORRO E IMPORTE", "warning");
    }
  };

  let url = "interno";
  if (props.match.params.id === "Externo") {
    url = "/IngresoCA/";
  } else {
    url = "/HomeCA/";
  }

  useEffect(() => {
    getReporte(props.match.params.id);
  }, [props.match.params.id]);
  
  const getReporte = async (id) => {
    if(props.match.params.id !== "Externo"){
    if (window.localStorage.getItem('name')!=='' ){
    const reportes = await getUsuarioUsuario(window.localStorage.getItem('name'));
    setReportes(reportes[0]);}else{
      history.push({
        pathname:
          "/IngresoCA"
      });
    }}
  
  };

  const history = useHistory();
  return (
    <Page pageTitle={"Hola, " + window.localStorage.getItem("name")}>
      <Scrollbar>
        <br />
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Paper className={clase5.paper}>
              <h2>BAIRES BANK | CAJERO AUTOMÁTICO</h2>
            </Paper>
            <br />
            <br />
          </Grid>
        </Grid>
        <div className="App">
          <Grid item xs={12} sm={12} style={{ marginTop: "30px" }}>
            <center>
              <h3 className={clase5.paper}>DEPÓSITOS</h3>

              <form autoComplete="off">
                <TextField
                  required
                  id="CBU"
                  label="Ingrese CBU destino"
                  inputProps={{
                    onChange: (event) => handleCBU(event),
                  }}
                  type="number"
                  className={clase5.number}
                />
                <br />
                <br />
                <TextField
                  required
                  id="Importe"
                  label="Importe a depositar"
                  inputProps={{
                    onChange: (event) => handleImporte(event),
                  }}
                  type="number"
                  className={clase5.number}
                />
              </form>
              <br />
              <br />
              <Button variant="contained" color="Primary" onClick={BuscoCBU}>
                Depositar
              </Button>
            </center>
          </Grid>
        </div>
        <center>
          <br></br>
          <br></br>
          <Link to={{ pathname: url }}>
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
