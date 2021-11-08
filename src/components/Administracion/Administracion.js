import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./Administracion.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "react-phone-input-2/lib/bootstrap.css";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import swal from "sweetalert";

//importo
import {
  updateUsuario,
  updateSueldo,
  getSueldo,
  getUsuarioCBU,
  getEmpresa,
  GeneroMovimiento,
  updateEmpresa,
  getUsuarioCuit,
  getComercios,
  updateComercio,
  updateClearing,
  getClearings,
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

  const Sueldo = () => {
    validarSueldo();
  };

  //Ejecuto el endopoint para validar el CBU & guardar el monto
  const validarSueldo = async function () {
    const reportes = await getSueldo();
    let date = new Date();
    const cantidad = reportes.length;

    for (let step = 0; step < cantidad; step++) {
      if (
        reportes[step].pagado == "0" &&
        Date.parse(reportes[step].fechaPago) < date
      ) {
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

  const PagoTarjetaComercio = () => {
    validarPagoTarjetaComercio();
  };

  //Ejecuto el endopoint para validar el CBU & guardar el monto
  const validarPagoTarjetaComercio = async function () {
    const reportes = await getComercios();

    const cantidad = reportes.length;

    for (let step = 0; step < cantidad; step++) {
      if (reportes[step].pagado === "0") {
        const usuarioB = await getUsuarioCuit(reportes[step].cuitEmpresa);
        const usuarioA = await getUsuarioCuit(reportes[step].cuit);

        if (usuarioB !== 201 && usuarioA !== 201) {
          reportes[step].pagado = "1";

          updateComercio(reportes[step]);
          usuarioB[0].balanceca =
            parseFloat(usuarioB[0].balanceca) -
            parseFloat(reportes[step].importe);

          const importeM = -reportes[step].importe;
          const usuarioM = usuarioB[0].usuario;
          const importeCAM = usuarioB[0].balanceca;

          const tipomovimientoM =
            "Pago de Tarjetas a Comercios - " + reportes[step].descripcion;
          const importeCCM = usuarioB[0].balancecc;
          GeneroMovimiento(
            usuarioM,
            tipomovimientoM,
            importeM,
            importeCAM,
            importeCCM
          );
          updateUsuario(usuarioB[0]);

          // Grabo usuario

          usuarioA[0].balanceca =
            parseFloat(usuarioA[0].balanceca) +
            parseFloat(reportes[step].importe);

          const importeM1 = +reportes[step].importe;
          const usuarioM1 = usuarioA[0].usuario;
          const importeCAM1 = usuarioA[0].balanceca;

          const tipomovimientoM1 =
            "Pago a comercios - " + reportes[step].descripcion;
          const importeCCM1 = usuarioA[0].balancecc;
          GeneroMovimiento(
            usuarioM1,
            tipomovimientoM1,
            importeM1,
            importeCAM1,
            importeCCM1
          );
          updateUsuario(usuarioA[0]);
        }
      } else {
        console.log("Hay errores en algunos campos");
      }
    }
    swal(" ", "Pagos de Tarjeta a Comercios Efectuados", "success");
  };

  const Dau = () => {
    validarDau();
  };

  //Debitos Automaticos
  const validarDau = async function () {
    const reportes = await getEmpresa();
    const cantidad = reportes.length;
    let date = new Date();
    for (let step = 0; step < cantidad; step++) {
      if (
        reportes[step].estado !== "Pago total" &&
        reportes[step].estado !== "Pago parcial" &&
        reportes[step].debito == "1" &&
        Date.parse(reportes[step].fechaVencimiento) >= date
      ) {
        let usuarioB = await getUsuarioCuit(reportes[step].cuitEmpresa);
        let usuarioA = await getUsuarioCuit(reportes[step].cuit);

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

          usuarioA[0].balanceca =
            parseFloat(usuarioA[0].balanceca) -
            parseFloat(reportes[step].importe);
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

  // CLearing Bancario
  const Clearing = () => {
    validarClearing();
  };

  const validarClearing = async function () {
    const reportes = await getClearings();

    const cantidad = reportes.length;

    for (let step = 0; step < cantidad; step++) {
      if (reportes[step].pagado == "0") {
        const usuarioB = await getUsuarioCBU(reportes[step].cbuUsuarioD);
        const usuarioA = await getUsuarioCBU(reportes[step].cbuUsuarioO);

        if (usuarioB !== 201 && usuarioA !== 201) {
          reportes[step].pagado = "1";

          console.log("update clearing", reportes[step]);
          updateClearing(reportes[step]);
          usuarioA[0].balanceca =
            parseFloat(usuarioA[0].balanceca) -
            parseFloat(reportes[step].importe);

          const importeM = -reportes[step].importe;
          const usuarioM = usuarioA[0].usuario;
          const importeCAM = usuarioA[0].balanceca;

          const tipomovimientoM =
            "Transferencia Externa - " + reportes[step].descripcion;
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
            "Trasnferencia Externa - " + reportes[step].descripcion;
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
    swal(" ", "Clearing realizado", "success");
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
                <Button variant="outlined" color="primary">
                  ADMINISTRACION
                </Button>
                <Link to={{ pathname: "/Empresa" }}>
                  {" "}
                  <Button color="primary">ALTA DE CUPON</Button>
                </Link>
              </ButtonGroup>
            </center>
          </Grid>
        </Grid>
        <div className="App">
          <Grid item xs={12} sm={12} style={{ marginTop: "70px" }}>
            <center>
              <h3 className={clase5.paper}>ADMINISTRACION</h3>

              <form autoComplete="off">
                <Link to="/Registro">
                  <Button variant="contained" color="primary">
                    REGISTRO USUARIOS
                  </Button>
                </Link>
                <br />
                <br />
                <Link to="/Mantenimiento">
                  <Button variant="contained" color="primary">
                    MANTENIMIENTO DE CUENTA
                  </Button>
                </Link>
                <br />
                <br />
                <Button variant="contained" color="Primary" onClick={Sueldo}>
                  EFECTUAR PAGO DE SUELDOS
                </Button>
                <br />
                <br />
                <Button variant="contained" color="Primary" onClick={Dau}>
                  EFECTUAR DEBITOS AUTOMATICOS
                </Button>
                <br />
                <br />
                <Button variant="contained" color="Primary" onClick={Clearing}>
                  EFECTUAR CLEARING BANCARIO
                </Button>
                <br />
                <br />
                <Button
                  variant="contained"
                  color="Primary"
                  onClick={PagoTarjetaComercio}
                >
                  EFECTUAR PAGO DE TARJETAS A COMERCIOS
                </Button>
              </form>
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
