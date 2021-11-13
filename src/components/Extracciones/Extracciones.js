import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./Extracciones.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import "react-phone-input-2/lib/bootstrap.css";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import swal from "sweetalert";
//importo
import {
  updateUsuario,
  getUsuarioUsuario,
  GeneroMovimiento,
  getUsuarioCBU,
  getUsuarioCBUCC,
  getMantenimientoClave,
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
  const [origen, setOrigen] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [reportes, setReportes] = useState([]);
  const [reportesDos, setReportesDos] = useState([]);
  const [reportes1, setReportes1] = useState([]);
  const [tipomovimiento, setTipomovimiento] = React.useState(
    "Extracción por Caja"
  );
  const [descubiertoF, setDescubiertoF] = useState([]);
  const [descubiertoJ, setDescubiertoJ] = useState([]);

  const handleValor = (event) => {
    setValor(event.target.value);
  };
  const handleOrigen = (event) => {
    setOrigen(event.target.value);
  };

  const numerico = parseFloat(valor);
  var descubierto = 0;

  const validarLogin = async function () {
    const reportes1 = await getMantenimientoClave("1");
    setReportes1(reportes1[0]);
    getUsuarioCBU(origen).then((value) => {
      if (value !== 201) {
        if (value[0].usuariotipo === 1) {
          descubierto = reportes1[0].descubiertoF;
        } else {
          descubierto = reportes1[0].descubiertoJ;
        }

        if (numerico < 1) {
          swal(" ", "NO SE PUEDE EXTRAER UN MONTO MENOR A $ 1", "error");
        } else if (parseFloat(value[0].balanceca) - numerico < 0) {
          if (parseFloat(value[0].balancecc) - numerico < descubierto) {
            swal(
              " ",
              "NO SE PUEDE EXTRAER, USTED SUPERA EL DESCUBIERTO DE $ " +
                descubierto +
                " PERMITIDO",
              "error"
            );
          } else {
            const aux = parseFloat(value[0].balanceca) - numerico;
            value[0].balanceca =
              parseFloat(value[0].balanceca) + parseFloat(aux);
            if (aux < 0) {
              value[0].balanceca = 0;
            }
            const auxdos = -aux;
            value[0].balancecc =
              parseFloat(value[0].balancecc) - parseFloat(auxdos);
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
              setTimeout(() => {
                window.location.reload(true);
              }, 1300);
            });
          }
        } else {
          value[0].balanceca = parseFloat(value[0].balanceca) - numerico;
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
            setTimeout(() => {
              window.location.reload(true);
            }, 1300);
          });
        }
      } else {
        getUsuarioCBUCC(origen).then((value) => {
          if (value !== 201) {
            if (value[0].usuariotipo === 1) {
              descubierto = reportes1[0].descubiertoF;
            } else {
              descubierto = reportes1[0].descubiertoJ;
            }

            if (value[0].balancecc - numerico < descubierto) {
              swal(
                " ",
                "NO SE PUEDE EXTRAER, USTED SUPERA EL DESCUBIERTO DE $ " +
                  descubierto +
                  " PERMITIDO",
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
                setTimeout(() => {
                  window.location.reload(true);
                }, 1300);
              });
            }
          } else {
            swal(" ", "NO SE PUDO EXTRAER, USUARIO INEXISTENTE", "error");
          }
        });
      }
    });
  };

  const BuscoUsuario = () => {
    if (valor !== "") {
      validarLogin();
    } else {
      swal(" ", "DEBE COMPLETAR CBU CJA DE AHORRO E IMPORTE", "warning");
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
        pathname: "/IngresoOP",
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
              <h2>BAIRES BANK | OPERADOR</h2>
            </Paper>
            <br />
            <br />
            <center>
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="text primary button group"
                size="large"
              >
                <Button variant="outlined" color="primary">
                  EXTRACCIONES
                </Button>
                <Link to={{ pathname: "/Depositos" }}>
                  {" "}
                  <Button color="primary">DEPÓSITOS</Button>
                </Link>
                <Link to={{ pathname: "/Pagos" }}>
                  {" "}
                  <Button color="primary">PAGO DE SERVICIOS</Button>
                </Link>
                <Link to={{ pathname: "/PagoSueldosOP" }}>
                  {" "}
                  <Button color="primary">PAGO DE SUELDOS</Button>
                </Link>
                
                <Link to={{ pathname: "/Empresa" }}>
                  {" "}
                  <Button color="primary">ALTA DE CUPON</Button>
                </Link>
                <Link to={{ pathname: "/Administracion" }}>
                  {" "}
                  <Button color="primary">ADMINISTRACION</Button>
                </Link>
              </ButtonGroup>
            </center>{" "}
          </Grid>
        </Grid>
        <div className="App">
          <Grid item xs={12} sm={12} style={{ marginTop: "70px" }}>
            <center>
              <h3 className={clase5.paper}>EXTRACCIONES</h3>

              <form autoComplete="off">
                <TextField
                  required
                  id="Origen"
                  label="CBU Origen"
                  inputProps={{
                    onChange: (event) => handleOrigen(event),
                  }}
                  type="number"
                  className={clase5.number}
                />

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
          <Link to="/IngresoOP">
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
