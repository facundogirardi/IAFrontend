import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./TransferenciasHB.css";
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
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import swal from "sweetalert";
//importo
import {
  updateUsuario,
  getUsuarioUsuario,
  getUsuarioCBU,
  GeneroMovimiento,
  getUsuarioCBUCC,
  getMantenimientoClave,
} from "../../controller/miApp.controller";
import {
  altaclearing,
  getUsuarioCBUExterno,
} from "../../controller/miAppExterno.controller";

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

  const [destino, setDestino] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [origen, setOrigen] = React.useState("");
  const [tipomovimiento] = React.useState("Transferencia por HB");
  const [reportes1, setReportes1] = useState([]);
  const handleValor = (event) => {
    setValor(event.target.value);
  };
  const handleDestino = (event) => {
    setDestino(event.target.value);
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
      if (value[0].usuariotipo === 1) {
        descubierto = reportes1[0].descubiertoF;
      } else {
        descubierto = reportes1[0].descubiertoJ;
      }

      if (origen === "CA") {
        if (numerico < 1) {
          swal(" ", "NO SE PUEDE TRANSFERIR UN MONTO MENOR A $ 1", "error");
        } else if (parseFloat(value[0].balanceca) - numerico < 0) {
          swal(
            " ",
            "NO SE PUEDE TRANSFERIR, USTED SUPERA EL MONTO DISPONIBLE",
            "error"
          );
        } else {
          getUsuarioCBU(destino).then((valueU) => {
            if (valueU !== 201) {
              const numerico = parseFloat(valor);
              valueU[0].balanceca = numerico + parseFloat(valueU[0].balanceca);
              const importeCA = valueU[0].balanceca;
              const importeCC = valueU[0].balancecc;
              updateUsuario(valueU[0]).then((value) => {});
              GeneroMovimiento(
                valueU[0].usuario,
                tipomovimiento,
                numerico,
                importeCA,
                importeCC
              );
              value[0].balanceca = parseFloat(value[0].balanceca) - numerico;
              updateUsuario(value[0]).then((value) => {});
              const importe = -numerico;
              const usuario = value[0].usuario;
              const importeCAB = value[0].balanceca;
              const importeCCB = value[0].balancecc;

              GeneroMovimiento(
                usuario,
                tipomovimiento,
                importe,
                importeCAB,
                importeCCB
              );
              swal(" ", "TRANSFERENCIA REALIZADA CON ÉXITO", "success");
            } else {
              getUsuarioCBUCC(destino).then((value) => {
                if (value !== 201) {
                  const numerico = parseFloat(valor);
                  value[0].balancecc =
                    numerico + parseFloat(value[0].balancecc);
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
                  swal(" ", "TRANSFERENCIA REALIZADA CON ÉXITO", "success");
                } else {
                  getUsuarioCBUExterno(destino).then((valueE) => {
                    if (valueE !== 201) {
                      const numerico = parseFloat(valor);
                      valueE[0].balancecc =
                        numerico + parseFloat(valueE[0].balancecc);
                      const importeCA = valueE[0].balanceca;
                      const importeCC = valueE[0].balancecc;
                      updateUsuario(valueE[0]).then((valueE) => {});
                      GeneroMovimiento(
                        valueE[0].usuario,
                        tipomovimiento,
                        numerico,
                        importeCA,
                        importeCC
                      );
                      const cbuPropio = "946677575890325000000";
                      const cbuUsuarioO = value[0].cbu;
                      const cbuUsuarioD = destino;
                      const importe = numerico;
                      const descripcion =
                        "Transferencia externa : " + value[0].usuario;
                      //   const pagado = 0;
                      altaclearing(
                        cbuPropio,
                        cbuUsuarioO,
                        cbuUsuarioD,
                        importe,
                        descripcion
                        //    pagado,
                      );
                      swal(" ", "TRANSFERENCIA REALIZADA CON ÉXITO", "success");
                    } else {
                      swal(" ", "USUARIO INEXISTENTE", "error");
                    }
                  });
                }
              });
            }
          });

          setTimeout(() => {
            history.push({
              pathname: "/HomeCA", //paso el usuario temporalmente
            });
          }, 1000);
        }
      } else {
        if (numerico < 1) {
          swal(" ", "NO SE PUEDE TRANSFERIR UN MONTO MENOR A $ 1", "error");
        } else if (
          parseFloat(value[0].balancecc) - parseFloat(numerico) <
          parseFloat(descubierto)
        ) {
          swal(
            " ",
            "NO SE PUEDE TRANSFERIR, USTED SUPERA EL MONTO DISPONIBLE",
            "error"
          );
        } else {
          getUsuarioCBU(destino).then((valueU) => {
            if (valueU !== 201) {
              const numerico = parseFloat(valor);
              valueU[0].balancecc = numerico + parseFloat(valueU[0].balancecc);
              const importeCA = valueU[0].balanceca;
              const importeCC = valueU[0].balancecc;
              updateUsuario(valueU[0]).then((value) => {});
              GeneroMovimiento(
                valueU[0].usuario,
                tipomovimiento,
                numerico,
                importeCA,
                importeCC
              );
              value[0].balancecc =
                parseFloat(value[0].balancecc) - parseFloat(numerico);
              updateUsuario(value[0]).then((value) => {});
              const importe = -numerico;
              const usuario = value[0].usuario;
              const importeCAB = value[0].balanceca;
              const importeCCB = value[0].balancecc;

              GeneroMovimiento(
                usuario,
                tipomovimiento,
                importe,
                importeCAB,
                importeCCB
              );
              swal(" ", "TRANSFERENCIA REALIZADA CON ÉXITO", "success");
            } else {
              getUsuarioCBUCC(destino).then((value) => {
                if (value !== 201) {
                  const numerico = parseFloat(valor);
                  value[0].balancecc =
                    numerico + parseFloat(value[0].balancecc);
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
                  swal(" ", "TRANSFERENCIA REALIZADA CON ÉXITO", "success");
                } else {
                  getUsuarioCBUExterno(destino).then((valueE) => {
                    if (valueE !== 201) {
                      const numerico = parseFloat(valor);
                      valueE[0].balancecc =
                        numerico + parseFloat(valueE[0].balancecc);
                      const importeCA = valueE[0].balanceca;
                      const importeCC = valueE[0].balancecc;
                      updateUsuario(valueE[0]).then((valueE) => {});
                      GeneroMovimiento(
                        valueE[0].usuario,
                        tipomovimiento,
                        numerico,
                        importeCA,
                        importeCC
                      );
                      const cbuPropio = "946677575890325000000";
                      const cbuUsuarioO = value[0].cbu;
                      const cbuUsuarioD = destino;
                      const importe = numerico;
                      const descripcion =
                        "Transferencia externa : " + value[0].usuario;
                      //   const pagado = 0;
                      altaclearing(
                        cbuPropio,
                        cbuUsuarioO,
                        cbuUsuarioD,
                        importe,
                        descripcion
                        //    pagado,
                      );
                      swal(" ", "TRANSFERENCIA REALIZADA CON ÉXITO", "success");
                    } else {
                      swal(" ", "USUARIO INEXISTENTE", "error");
                    }
                  });
                }
              });
            }
          });

          setTimeout(() => {
            history.push({
              pathname: "/HomeCA", //paso el usuario temporalmente
            });
          }, 1000);
        }
      }
    });
    //
  };

  const BuscoUsuario = () => {
    if (valor !== "") {
      validarLogin();
    } else {
      swal(" ", "DEBE COMPLETAR CBU DE CJA AHORRO E IMPORTE", "warning");
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
        <Grid item xs={12} sm={12} style={{ marginTop: "30px" }}>
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
                </Link>
              ) : (
                <></>
              )}
              {reportes.usuariotipo !== 2 ? (
                <Link to={{ pathname: "/PagosHB" }}>
                  <Button color="primary">PAGO DE SERVICIOS</Button>
                </Link>
              ) : (
                <Link to={{ pathname: "/CargaCupon" }}>
                  <Button color="primary">CARGAR CUPÓN DE PAGO</Button>
                </Link>
              )}{" "}
              {reportes.usuariotipo === 2 ? (
                <Link to={{ pathname: "/PagoSueldos" }}>
                  <Button color="primary">PAGO DE SUELDOS</Button>
                </Link>
              ) : (
                <></>
              )}
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
          <br />
        </Grid>
        <div className="App">
          <Grid item xs={12} sm={12} style={{ marginTop: "30px" }}>
            <center>
              <h3 className={clase5.paper}>TRANSFERENCIAS</h3>

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
                  id="Destino"
                  label="Destino"
                  inputProps={{
                    onChange: (event) => handleDestino(event),
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
              <br></br>
              <br></br>
              <Link
                to={{
                  pathname: "/TransferirAMiCuentaHB",
                }}
              >
                <Button variant="contained" color="Primary">
                  TRANSFERIR EN MIS CUENTAS
                </Button>
              </Link>
            </center>
          </Grid>
        </div>
        <center>
          <br></br>
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
