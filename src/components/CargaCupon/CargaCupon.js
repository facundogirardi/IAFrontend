import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./CargaCupon.css";

import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import "react-phone-input-2/lib/bootstrap.css";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import swal from "sweetalert";
import {
  altaEmpresa,
  getUsuarioUsuario,
  getEmpresa,
  updateEmpresa,
  GeneroMovimiento,
  updateUsuario,
  getUsuarioCuit,
  getSueldo,
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
  const [nombre, setNombre] = React.useState("");
  const [codigoPago, setCodigoPago] = React.useState("");
  const [cuitEmpresa, setCuitEmpresa] = React.useState("");
  const [cuit, setCuit] = React.useState("-");
  const [importe, setImporte] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [usuarioclave, setUsuarioclave] = useState([]);
  const [debito, setDebito] = React.useState("");
  const [vencimiento, setVencimiento] = React.useState("");
  const [estado, setEstado] = React.useState("No Pagado");
  const [reportes, setReportes] = useState([]);
  const [reportesDos, setReportesDos] = useState([]);

  const handleNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleCodigoPago = (event) => {
    setCodigoPago(event.target.value);
  };

  const handleCuitEmpresa = (event) => {
    setCuitEmpresa(event.target.value);
  };

  const handleImporte = (event) => {
    setImporte(event.target.value);
  };

  const handleCuit = (event) => {
    setCuit(event.target.value);
  };

  const handleDebito = (event) => {
    setDebito(event.target.value);
  };

  const handleDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const handleVencimiento = (event) => {
    setVencimiento(event.target.value);
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

  const subirDatos = async function () {
    let archivoDatos = false;
    if (
      !isEmpty(codigoPago) &&
      !isEmpty(importe) &&
      !isEmpty(descripcion) &&
      !isEmpty(vencimiento)
    ) {
      const reportes = await getUsuarioUsuario(
        window.localStorage.getItem("name")
      );
      var vDebito = 0;
      if (cuit!=="-") {vDebito = 1} 
      archivoDatos = await altaEmpresa(
        window.localStorage.getItem("name"),
        codigoPago,
        reportes[0].cuit,
        importe,
        descripcion,
        vencimiento,
        estado,
        cuit,
        vDebito
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
      swal(" ", "CUPÓN DE PAGO CARGADO CON ÉXITO", "success");
      setTimeout(() => {
        window.location.reload(true);
      }, 1500);
    }
  };

  //Ejecuto el endopoint para validar el CBU & guardar el monto
  //Debitos Automaticos
  const validarLogin1 = async function () {
    const reportes = await getEmpresa();
    const cantidad = reportes.length;
    const usuarioclave = await getUsuarioUsuario(
      window.localStorage.getItem("name")
    );
    setUsuarioclave(usuarioclave[0]);
    
    

    for (let step = 0; step < cantidad; step++) {

      const reportesDos = await getUsuarioUsuario(
        window.localStorage.getItem("name")
      );
      setReportesDos(reportesDos[0]);
      if (
        reportes[step].estado !== "Pago total" &&
        reportes[step].estado !== "Pago parcial" &&
        reportes[step].debito == "1" && reportes[step].cuitEmpresa==reportesDos[0].cuit
      ) {

        const usuarioB = await getUsuarioCuit(reportes[step].cuitEmpresa);
        const usuarioA = await getUsuarioCuit(reportes[step].cuit);

        if (usuarioB !== 201 && usuarioA !== 201) {
          usuarioB[0].balanceca =
            parseFloat(usuarioB[0].balanceca) +
            parseFloat(reportes[step].importe);
          console.log("antes B", usuarioB[0].balanceca);
          updateUsuario(usuarioB[0]);
          console.log("metodo B", updateUsuario(usuarioB[0]));
          console.log("despues B", usuarioB[0].balanceca);

          const importeM1 = +reportes[step].importe;
          const usuarioM1 = usuarioB[0].usuario;
          const importeCAM1 = usuarioB[0].balanceca;

          const tipomovimientoM1 =
            "Debito Automatico - " + reportes[step].descripcion;
          const importeCCM1 = usuarioB[0].balancecc;
          GeneroMovimiento(
            usuarioM1,
            tipomovimientoM1,
            importeM1,
            importeCAM1,
            importeCCM1
          );
          if (parseFloat(usuarioA[0].balanceca) - parseFloat(reportes[step].importe) >= 0) {
          usuarioA[0].balanceca =
            parseFloat(usuarioA[0].balanceca) -
            parseFloat(reportes[step].importe); } else {
              usuarioA[0].balancecc =
            parseFloat(usuarioA[0].balancecc) -
            parseFloat(reportes[step].importe);
            }
          console.log("antes A", usuarioA[0].balanceca);
          updateUsuario(usuarioA[0]);
          console.log("metodo A", updateUsuario(usuarioA[0]));
          console.log("despues A", usuarioA[0].balanceca);

          const importeM = -reportes[step].importe;
          const usuarioM = usuarioA[0].usuario;
          const importeCAM = usuarioA[0].balanceca;

          const tipomovimientoM =
            "Debito Automatico - " + reportes[step].descripcion;
          const importeCCM = usuarioA[0].balancecc;
          GeneroMovimiento(
            usuarioM,
            tipomovimientoM,
            importeM,
            importeCAM,
            importeCCM
          );

          reportes[step].estado = "Pago total";
          updateEmpresa(reportes[step]);
        }
      } else {
        console.log("Hay errores en algunos campos");
      }
    }
    swal(" ", "Debitos automaticos efectuados", "success");
  };

  const BuscoCBU1 = () => {
    validarLogin1();
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
                  <Button variant="outlined" color="primary">
                    CARGAR CUPÓN DE PAGO
                  </Button>
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
              </ButtonGroup>{" "}
            </center>
          </Grid>
        </Grid>
        <br />
        <div className="App">
          <Grid item xs={12} sm={12} style={{ marginTop: "30px" }}>
            <center>
              <h3 className={clase5.paper}>CARGA CUPÓN</h3>
              <form autoComplete="off">
                <TextField
                  required
                  id="Nombre"
                  type="text"
                  value={reportes.usuario}
                  disabled
                />{" "}
                <br></br>
                <TextField
                  required
                  id="CodigoPago"
                  label="Código de Pago"
                  type="text"
                  inputProps={{
                    onChange: (event) => handleCodigoPago(event),
                  }}
                />{" "}
                <br></br>
                <br></br>
                <TextField
                  required
                  id="CuitEmpresa"
                  value={reportes.cuit}
                  type="text"
                  disabled
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
                  id="Cuit"
                  label="CUIT-Débito Automático"
                  type="number"
                  inputProps={{
                    onChange: (event) => handleCuit(event),
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
                <br /> <br /> Fecha de Vencimiento
                <br />
                <TextField
                  required
                  id="Vencimiento"
                  type="date"
                  inputProps={{
                    onChange: (event) => handleVencimiento(event),
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
