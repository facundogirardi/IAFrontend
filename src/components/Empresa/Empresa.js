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
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import swal from "sweetalert";
import { altaEmpresa } from "../../controller/miApp.controller";
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
  const [importe, setImporte] = React.useState("");
  const [cuit, setCuit] = React.useState("-");
  const [descripcion, setDescripcion] = React.useState("");
  const [vencimiento, setVencimiento] = React.useState("");
  const [debito, setDebito] = React.useState("");
  const [estado, setEstado] = React.useState("No Pagado");

  const handleNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleCodigoPago = (event) => {
    setCodigoPago(event.target.value);
  };

  const handleCuitEmpresa = (event) => {
    setCuitEmpresa(event.target.value);
  };

  const handleCuit = (event) => {
    setCuit(event.target.value);
  };

  const handleImporte = (event) => {
    setImporte(event.target.value);
  };

  const handleDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const handleDebito = (event) => {
    setDebito(event.target.value);
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

  const subirDatos = async function () {
    let archivoDatos = false;

    if (
      !isEmpty(nombre) &&
      !isEmpty(codigoPago) &&
      !isEmpty(cuitEmpresa) &&
      !isEmpty(importe) &&
      !isEmpty(descripcion) &&
      !isEmpty(vencimiento)
    ) {
      var vDebito = 0;
      if (cuit!=="-") {vDebito = 1} 
      archivoDatos = await altaEmpresa(
        nombre,
        codigoPago,
        cuitEmpresa,
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
              {" "}
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="text primary button group"
                size="large"
              >
           

                <Link to={{ pathname: "/Extracciones" }}>
                  {" "}
                  <Button color="primary">EXTRACCIONES</Button>{" "}
                </Link>
                <Link
                  to={{
                    pathname: "/Depositos",
                  }}
                >
                  {" "}
                  <Button color="primary">DEPÓSITOS</Button>{" "}
                </Link>
                <Link to={{ pathname: "/Pagos" }}>
                  {" "}
                  <Button color="primary">PAGO DE SERVICIOS</Button>
                </Link>
                <Link to={{ pathname: "/PagoSueldosOP" }}>
                  {" "}
                  <Button color="primary">PAGO DE SUELDOS</Button>
                </Link>
                <Link to={{ pathname: "/Administracion" }}>
                  {" "}
                  <Button color="primary">ADMINISTRACION</Button>
                </Link>

                <Button variant="outlined" color="primary">
                ALTA DE CUPON
                </Button>
              </ButtonGroup>
            </center>
          </Grid>
        </Grid>
        <div className="App">
          <Grid item xs={12} sm={12} style={{ marginTop: "70px" }}>
            <center>
              <h3 className={clase5.paper}>ALTA DE CUPON</h3>
              ALTA CUPÓN
              <br />
              <form autoComplete="off">
                <TextField
                  required
                  id="Nombre"
                  label="Nombre"
                  type="text"
                  inputProps={{
                    onChange: (event) => handleNombre(event),
                  }}
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
                <TextField
                  required
                  id="CuitEmpresa"
                  label="CUIT de Empresa"
                  type="text"
                  inputProps={{
                    onChange: (event) => handleCuitEmpresa(event),
                  }}
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
                <br /> <br /> Fecha de Vencimiento <br />
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
