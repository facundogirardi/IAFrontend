import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./Empresa.css";

import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import "react-phone-input-2/lib/bootstrap.css";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import swal from "sweetalert";
import {
  altasueldo,
  getUsuarioUsuario,
  updateUsuario,
  updateSueldo,
  getSueldo,
  getUsuarioCBU,
  GeneroMovimiento,
} from "../../controller/miApp.controller";
const useStylesButton = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    width: "98%",
  },
  number: {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));

//importo

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
  const clase4 = useStylesButton();
  const history = useHistory();
  const [imgAux, setImgAux] = React.useState("");
  const Input = styled("input")({
    display: "none",
  });
  const [CBUDestino, setCBUDestino] = React.useState("");
  const [importe, setImporte] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [FechaPago, setFechaPago] = React.useState("");
  const [pagado, setFechaPagado] = React.useState("0");
  const [reportes, setReportes] = useState([]);
  const [usuarioclave, setUsuarioclave] = useState([]);

  const handleImporte = (event) => {
    setImporte(event.target.value);
  };

  const handleDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const handleFechaPago = (event) => {
    setFechaPago(event.target.value);
  };

  const handleCBUDestino = (event) => {
    setCBUDestino(event.target.value);
  };

  const isEmpty = (stringToValidate) => {
    if (stringToValidate !== undefined && stringToValidate !== null) {
      return stringToValidate.length === 0;
    }
    return true;
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
        pathname: "/IngresoHB",
      });
    }
  };

  //Ejecuto el endopoint para validar el CBU & guardar el monto
  const validarLogin = async function () {
    const reportes = await getSueldo();

    const cantidad = reportes.length;

    for (let step = 0; step < cantidad; step++) {
      if (reportes[step].pagado == "0") {
        const usuarioB = await getUsuarioCBU(reportes[step].cbu);
        const usuarioA = await getUsuarioCBU(reportes[step].cbuEmpresa);

        if (usuarioB !== 201 && usuarioA !== 201) {
          reportes[step].pagado = "1";

          updateSueldo(reportes[step]);
          usuarioA[0].balanceca =
            parseFloat(usuarioA[0].balanceca) -
            parseFloat(reportes[step].importe);

          const importeM = -reportes[step].importe;
          const usuarioM = usuarioA[0].usuario;
          const importeCAM = usuarioA[0].balanceca;

          const tipomovimientoM =
            "Pago de sueldos - " + reportes[step].descripcion;
          const importeCCM = usuarioA[0].balancecc;
          GeneroMovimiento(
            usuarioM,
            tipomovimientoM,
            importeM,
            importeCAM,
            importeCCM
          );
          updateUsuario(usuarioA[0]);

          // Grabo usuario

          usuarioB[0].balanceca =
            parseFloat(usuarioB[0].balanceca) +
            parseFloat(reportes[step].importe);

          const importeM1 = +reportes[step].importe;
          const usuarioM1 = usuarioB[0].usuario;
          const importeCAM1 = usuarioB[0].balanceca;

          const tipomovimientoM1 =
            "Pago de sueldos - " + reportes[step].descripcion;
          const importeCCM1 = usuarioB[0].balancecc;
          GeneroMovimiento(
            usuarioM1,
            tipomovimientoM1,
            importeM1,
            importeCAM1,
            importeCCM1
          );
          updateUsuario(usuarioB[0]);
        }
      } else {
        console.log("Hay errores en algunos campos");
      }
    }
    swal(" ", "Sueldos pagados", "success");
  };

  const subirDatos = async function () {
    let archivoDatos = false;
    if (
      !isEmpty(CBUDestino) &&
      !isEmpty(importe) &&
      !isEmpty(descripcion) &&
      !isEmpty(FechaPago)
    ) {
      const reportes = await getUsuarioUsuario(
        window.localStorage.getItem("name")
      );
      archivoDatos = await altasueldo(
        CBUDestino,
        importe,
        FechaPago,
        pagado,
        reportes[0].cbu,
        descripcion
      );
    } else {
      swal(
        " ",
        "VERIFICAR QUE LOS DATOS ESTÉN CARGADOS CORRECTAMENTE",
        "warning"
      );
    }
    return archivoDatos;
  };

  const redirect = async () => {
    const ok = await subirDatos();
    if (ok) {
      swal(" ", "SUELDO CARGADO CON ÉXITO", "success");
      setTimeout(() => {
        window.location.reload(true);
      }, 1500);
    }
  };

  const BuscoCBU = () => {
    validarLogin();
  };

  return (
    <Page pageTitle={"Hola, " + window.localStorage.getItem("name")}>
      <Scrollbar>
        <br />
        <Grid item xs={12}>
          <Paper className={clase5.paper}>
            <h2>BAIRES BANK | HOME BANKING</h2>
          </Paper>
          <br /> <br />
          <Grid item xs={12} sm={12} style={{ marginTop: "30px" }}>
            <center>
              {" "}
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
                  {" "}
                  <Button color="primary">CUENTAS</Button>
                </Link>
                <Link
                  to={{
                    pathname: "/TransferenciasHB",
                  }}
                >
                  {" "}
                  <Button color="primary">TRANSFERENCIAS</Button>{" "}
                </Link>
                <Link to={{ pathname: "/Movimientos" }}>
                  <Button color="primary">MOVIMIENTOS</Button>
                </Link>
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
                  <Button variant="outlined" color="primary">
                    PAGO DE SUELDOS
                  </Button>
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
              </ButtonGroup>{" "}
            </center>
          </Grid>
        </Grid>
        <br />
        <div className="App">
          <Grid item xs={12} sm={12} style={{ marginTop: "30px" }}>
            <center>
              <h3 className={clase5.paper}>CARGA DE PAGO</h3>
              <form autoComplete="off">
                <TextField
                  required
                  id="CBUOrigen"
                  value={reportes.cbu}
                  type="text"
                  disabled
                />{" "}
                <br></br>
                <TextField
                  required
                  id="CBUDestino"
                  label="CBU Destino"
                  type="number"
                  inputProps={{
                    onChange: (event) => handleCBUDestino(event),
                  }}
                  className={clase5.number}
                />{" "}
                <br></br>
                <TextField
                  required
                  id="Importe"
                  label="Importe"
                  type="number"
                  inputProps={{
                    onChange: (event) => handleImporte(event),
                  }}
                  className={clase5.number}
                />{" "}
                <br></br>
                <TextField
                  required
                  id="Descripcion"
                  label="Descripción"
                  type="text"
                  inputProps={{
                    onChange: (event) => handleDescripcion(event),
                  }}
                />
                <br /> <br /> Fecha a Efectuar <br />
                <TextField
                  required
                  id="FechaPago"
                  type="date"
                  inputProps={{
                    onChange: (event) => handleFechaPago(event),
                  }}
                />
                <br></br>
              </form>{" "}
              <br></br>
              <Button
                variant="contained"
                color="Primary"
                className={clase5.button}
                onClick={() => {
                  redirect();
                }}
              >
                CONFIRMAR
              </Button>
              <br />
              <br></br>
              <Button variant="contained" color="Primary" onClick={BuscoCBU}>
                EFECTUAR PAGO DE SUELDOS
              </Button>
              <br />
            </center>
          </Grid>
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
