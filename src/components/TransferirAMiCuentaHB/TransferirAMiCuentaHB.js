import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./Transferir.css";
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
import ButtonGroup from "@material-ui/core/ButtonGroup";
import swal from "sweetalert";
import {
  updateUsuario,
  getUsuarioUsuario,
  getUsuarioCBU,
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
  const [reportes1, setReportes1] = useState([]);

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

  const [destino, setDestino] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [tipomovimiento, setTipomovimiento] = React.useState(
    "Transferencia por nivelacion de cuenta"
  );

  const handleValor = (event) => {
    setValor(event.target.value);
  };

  const handleDestino = (event) => {
    setDestino(event.target.value);
  };
  const numerico = parseFloat(valor);
var descubierto = 0;
  //Ejecuto el endopoint para validar el CBU & guardar el monto
  const validarLogin = async function () {
    getUsuarioUsuario(window.localStorage.getItem("name")).then((value) => {
      if (numerico < 1) {
        swal(" ", "NO SE PUEDE TRANSFERIR UN MONTO MENOR A $ 1", "error");
      } else if ((value[0].balanceca = parseFloat(value[0].balanceca) - numerico) < 0) {
        swal(
          " ",
          "NO SE PUEDE TRANSFERIR, USTED SUPERA EL MONTO DISPONIBLE",
          "error"
        );
      } else {
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
          getUsuarioUsuario(window.localStorage.getItem("name")).then(
            (value) => {
              if (value !== 201) {
                const numerico = parseFloat(valor);
                value[0].balancecc = numerico + parseFloat(value[0].balancecc);
                const importeCA = value[0].balanceca;
                const importeCC = value[0].balancecc;
                updateUsuario(value[0]).then((value) => {});
                GeneroMovimiento(
                  value[0].usuario,
                  tipomovimiento,
                  numerico,
                  importeCA,
                  importeCC
                );
              }
            }
          );
          swal(" ", "TRANSFERENCIA REALIZADA CON ÉXITO", "success");

          setTimeout(() => {
            history.push({
              pathname: "/HomeHB", //paso el usuario temporalmente
            });
          }, 1000);
        });
      }
    });
  };

  const validarLoginDos = async function () {

    const reportes1 = await getMantenimientoClave("1");
        setReportes1(reportes1[0]);

    getUsuarioUsuario(window.localStorage.getItem("name")).then((value) => {

      if(value[0].usuariotipo === 1){
        descubierto=reportes1[0].descubiertoF;
       }else{
         descubierto=reportes1[0].descubiertoJ;
       }
  
      if (numerico < 1) {
        swal(" ", "NO SE PUEDE TRANSFERIR UN MONTO MENOR A $ 1", "error");
      } else if ((value[0].balancecc = parseFloat(value[0].balancecc) - numerico) < descubierto) {
        swal(
          " ",
          "NO SE PUEDE TRANSFERIR, USTED SUPERA EL DESCUBIERTO DE $ " + descubierto,
          "error"
        );
      } else {
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
          getUsuarioUsuario(window.localStorage.getItem("name")).then(
            (value) => {
              if (value !== 201) {
                const numerico = parseFloat(valor);
                value[0].balanceca = numerico + parseFloat(value[0].balanceca);
                const importeCA = value[0].balanceca;
                const importeCC = value[0].balancecc;
                updateUsuario(value[0]).then((value) => {});
                GeneroMovimiento(
                  value[0].usuario,
                  tipomovimiento,
                  numerico,
                  importeCA,
                  importeCC
                );
              }
            }
          );
          swal(" ", "TRANSFERENCIA REALIZADA CON ÉXITO", "success");
          setTimeout(() => {
            history.push({
              pathname: "/HomeHB", //paso el usuario temporalmente
            });
          }, 1500);
        });
      }
    });
  };

  const BuscoUsuario = () => {
    if (valor !== "") {
      if (destino === "CAACTACTE") {
        validarLogin();
      }
      if (destino === "CTACTEACA") {
        validarLoginDos();
      }
    } else {
      swal(" ", "DEBE COMPLETAR ORIGEN E IMPORTE", "warning");
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
              <h2>BAIRES BANK | HOME BANKING</h2>
            </Paper>
            <br />
            <br />
            <br />
            <center>
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="text primary button group"
                size="large"
              >
                <Link
                  to={{
                    pathname: "/HomeHB",
                  }}
                >
                  <Button color="primary">CUENTAS</Button>
                </Link>
                <Button variant="outlined" color="primary">
                  TRANSFERENCIAS
                </Button>
                <Link
                  to={{
                    pathname: "/Movimientos",
                  }}
                >
                  {" "}
                  <Button color="primary">MOVIMIENTOS</Button>{" "}
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
                  <Link to={{ pathname: "/CargaCupon" }}>
                    <Button color="primary">CARGAR CUPÓN DE PAGO</Button>
                  </Link>
                )}  {reportes.usuariotipo === 2 ? (  <Link to={{ pathname: "/PagoSueldos" }}>
                    <Button color="primary">PAGO DE SUELDOS</Button>
                  </Link>  ): (<></>)}
                <Link
                  to={{
                    pathname: "/Perfil",
                  }}
                >
                  {" "}
                  <Button color="primary">EDITAR DATOS</Button>
                </Link>
              </ButtonGroup>
            </center>{" "}
          </Grid>
        </Grid>
        <div className="App">
          <Grid item xs={12} sm={12} style={{ marginTop: "30px" }}>
            <center>
              <h3 className={clase5.paper}>TRANSFERENCIAS</h3>

              <form autoComplete="off">
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Destino</InputLabel>
                  <Select
                    style={{ width: "190px" }}
                    labelId="Destino"
                    id="Destino"
                    label="Destino"
                    onChange={handleDestino}
                  >
                    <MenuItem value={"CAACTACTE"}>
                      Caja de Ahorro a Cuenta Corriente
                    </MenuItem>
                    <MenuItem value={"CTACTEACA"}>
                      Cuenta Corriente a Caja de Ahorro
                    </MenuItem>
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
          <Link to={{ pathname: "/TransferenciasHB" }}>
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
