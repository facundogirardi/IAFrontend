import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./Extraer.css";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import "react-phone-input-2/lib/bootstrap.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import swal from "sweetalert";
//importo
import {
  updateUsuario,
  getUsuarioUsuario,
  GeneroMovimiento,
  getMantenimientoClave
} from "../../controller/miApp.controller";

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
  number: {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
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
  const [usuario, setUsuario] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [origen, setOrigen] = React.useState("");
  const [tipomovimiento, setTipomovimiento] = React.useState(
    "Extracción por Cajero Automatico"
  );
  const [reportes, setReportes] = useState([]);
  const [reportes1, setReportes1] = useState([]);
  const handleValor = (event) => {
    setValor(event.target.value);
  };
  const handleUsuario = (event) => {
    setUsuario(event.target.value);
  };
  const handleOrigen = (event) => {
    setOrigen(event.target.value);
  };
  const numerico = parseFloat(valor);
  var descubierto = 0;
  //Ejecuto el endopoint para validar el CBU & guardar el monto
  const validarLogin = async function () {

    const reportes1 = await getMantenimientoClave("1");
    setReportes1(reportes1[0]);

    getUsuarioUsuario(window.localStorage.getItem("name")).then((value) => {
      //

      if(value[0].usuariotipo === 1){
        descubierto=reportes1[0].descubiertoF;
       }else{
         descubierto=reportes1[0].descubiertoJ;
       }

      if (origen === "CA") {
        if (numerico < 1) {
          swal(" ", "NO SE PUEDE EXTRAER UN MONTO MENOR A $ 1", "error");
        } else if (parseFloat(value[0].balanceca) - numerico < 0) {
          if (parseFloat(value[0].balancecc) - numerico < -descubierto) {
            swal(
              " ",
              "NO SE PUEDE EXTRAER, USTED SUPERA EL DESCUBIERTO DE $ " + descubierto,
              "error"
            );
          } else {
            const aux = parseFloat(value[0].balanceca) - numerico;
            value[0].balanceca = parseFloat(value[0].balanceca) + parseFloat(aux);
            if (aux < 0) {
              value[0].balanceca = 0;
            }
            const auxdos = -aux;
            value[0].balancecc = parseFloat(value[0].balancecc) - parseFloat(auxdos);
            const importe = -auxdos;
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
              swal(" ", "MONTO EXTRAÍDO CORRECTAMENTE", "success");
              history.push({
                pathname: "/HomeCA", //paso el usuario temporalmente
              });
            });
          }
        } else {
          value[0].balanceca = parseFloat(value[0].balanceca) - parseFloat(numerico);
          const importe = -numerico;
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
            swal(" ", "MONTO EXTRAÍDO CORRECTAMENTE", "success");
            history.push({
              pathname: "/HomeCA", //paso el usuario temporalmente
            });
          });
        }
        //
      } else {
        if (numerico < 1) {
          swal(" ", "NO SE PUEDE EXTRAER UN MONTO MENOR A $ 1", "error");
        } else if (parseFloat(value[0].balancecc) - numerico < descubierto) {
          swal(
            " ",
            "NO SE PUEDE EXTRAER, USTED SUPERA EL DESCUBIERTO DE $ " + descubierto,
            "error"
          );
        } else {
          value[0].balancecc = parseFloat(value[0].balancecc) - numerico;
          const importe = -numerico;
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
            swal(" ", "MONTO EXTRAÍDO CORRECTAMENTE", "success");
            history.push({
              pathname: "/HomeCA", //paso el usuario temporalmente
            });
          });
        }
      }
    });
  };

  const BuscoUsuario = () => {
    if (valor !== "") {
      validarLogin();
    } else {
      swal(" ", "DEBE INGRESAR UN MONTO A EXTRAER", "warning");
    }
  };

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
        pathname: "/IngresoCA",
      });
    }
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
          <Grid item xs={12} sm={12} style={{ marginTop: "70px" }}>
            <center>
              <h3 className={clase5.paper}>EXTRACCIONES</h3>

              <form autoComplete="off">
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Origen</InputLabel>
                  <Select
                    style={{ width: "190px" }}
                    labelId="Origen"
                    id="Origen"
                    label="Origen"
                    onChange={handleOrigen}
                  >
                    <MenuItem value={"CA"}>Caja de Ahorro</MenuItem>
                    <MenuItem value={"CTACTE"}>Cuenta Corriente</MenuItem>
                  </Select>
                </FormControl>
                <br />
                <TextField
                  required
                  id="Valor"
                  label="Valor"
                  inputProps={{
                    onChange: (event) => handleValor(event),
                  }}
                  type="number"
                  className={clase5.number}
                />
                <TextField
                  required
                  type="Hidden"
                  inputProps={{
                    onChange: (event) => handleUsuario(event),
                  }}
                />
              </form>
              <br />
              <br />

              <Button
                variant="contained"
                color="Primary"
                onClick={BuscoUsuario}
              >
                ACEPTAR
              </Button>
            </center>
          </Grid>
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
