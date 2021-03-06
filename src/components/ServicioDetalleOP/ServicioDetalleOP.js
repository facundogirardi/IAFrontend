import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./ServicioDetalleOP.css";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import "react-phone-input-2/lib/bootstrap.css";
import { useHistory } from "react-router";
import swal from "sweetalert";
//importo
import {
  getEmpresasID,
  GeneroMovimiento,
  getUsuarioCuit,
  updateUsuario,
  updateEmpresa,
  getUsuarioUsuario,
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
  const [reportesDos, setReportesDos] = useState([]);
  const [usuarioB, setUsuarioB] = useState([]);
  const [valor, setValor] = React.useState("");
  const [tipomovimiento, setTipomovimiento] = React.useState(
    "Pago de Servicio - Por Caja - "
  );

  useEffect(() => {
    getReporte(props.match.params.id);
  }, [props.match.params.id]);

  const getReporte = async (id) => {
    const reportes = await getEmpresasID(id);
    setReportes(reportes[0]);
  };

  const handleValor = (event) => {
    setValor(event.target.value);
  };
  let estadoPago = "No pago";
  const numerico = parseFloat(valor);

  const validarLogin = async function () {
    getUsuarioUsuario(window.localStorage.getItem("name")).then((value) => {
      if (numerico < 1) {
        swal(" ", "NO SE PUEDE PAGAR CON UN MONTO MENOR A $ 1", "error");
      } else if (parseFloat(reportes.importe) - numerico < 0) {
        swal(" ", "EL MONTO INGRESADO ES SUPERIOR AL INDICADO", "error");
      } else {
        value[0].balanceca = parseFloat(value[0].balanceca);
        let importe = parseFloat(reportes.importe);
        let importePagado = numerico;
        if (reportes.importe - numerico > 0) {
          estadoPago = "Pago parcial";
          importe = parseFloat(reportes.importe) - parseFloat(numerico);
        } else {
          estadoPago = "Pago total";
          importe = parseFloat(reportes.importe) - parseFloat(numerico);
        }
        const usuario = value[0].usuario;
        const importeCA = value[0].balanceca;
        const importeCC = value[0].balancecc;

        GeneroMovimiento(
          usuario,
          tipomovimiento + estadoPago + "-" + reportes.nombre,
          -importePagado,
          importeCA,
          importeCC
        );

        const nombre = reportes.nombre;
        const codigopago = reportes.codigopago;
        const cuitEmpresa = reportes.cuitEmpresa;
        const descripcion = reportes.descripcion;

        const fechaVencimiento = reportes.fechaVencimiento;
        const estado = estadoPago;
        const cuit = reportes.cuit;
        updateEmpresa(
          nombre,
          codigopago,
          cuitEmpresa,
          importe,
          descripcion,
          fechaVencimiento,
          estado,
          cuit
        );

        getUsuarioCuit(reportes.cuitEmpresa).then((value2) => {
 
          value2[0].balanceca = parseFloat(importePagado) +  parseFloat(value2[0].balanceca);
          importe = importePagado;
          const importeCA = value2[0].balanceca;
          const importeCC = value2[0].balancecc;
          updateUsuario(value2[0]).then((value) => {});
          GeneroMovimiento(
            value2[0].usuario,
            tipomovimiento + estadoPago + "-" + codigopago,
            importe,
            importeCA,
            importeCC
          );
        });
        swal(" ", "PAGO DE SERVICIO EXITOSO", "success");
        setTimeout(() => {
          window.location.reload(true);
        }, 1300);
      }
    });
  };

  const BuscoUsuario = () => {
    if (valor !== "") {
      validarLogin();
    } else {
      swal(" ", "DEBE INGRESAR UN IMPORTE", "warning");
    }
  };
  const history = useHistory();
  return (
    <Page pageTitle={"Hola, " + window.localStorage.getItem("name")}>
      <Scrollbar
        style={{ height: "93.4%", width: "100%", display: "flex", flex: 1 }}
      >
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={clase5.paper}>
              <h2>Pago del servicio {reportes.nombre}</h2>
            </Paper>
          </Grid>
        </Grid>
        <center>
          <Grid item xs={6} sm={4} style={{ marginTop: "20px" }}>
            <form autoComplete="off">
              <br />
              <br />
              <br />

              <TextField
                id="outlined-helperText"
                label="Importe a pagar"
                defaultValue="Default Value"
                disabled
                variant="outlined"
                value={reportes.importe}
              />
              <TextField
                id="outlined-helperText"
                label="Fecha de vencimiento"
                defaultValue="Default Value"
                variant="outlined"
                value={reportes.fechaVencimiento}
                disabled
              />

              <br />
              <br />
              <TextField
                id="outlined-helperText"
                label="Codigo de Pago"
                defaultValue="Default Value"
                variant="outlined"
                value={reportes.codigopago}
                disabled
              />
              <br />
              <br />
              <TextField
                id="outlined-helperText"
                label="Descripcion"
                defaultValue="Default Value"
                variant="outlined"
                value={reportes.descripcion}
                disabled
              />
              <br />
              <br />
              <TextField
                required
                id="Valor"
                label="Monto"
                inputProps={{
                  onChange: (event) => handleValor(event),
                }}
                type="number"
              />
            </form>
            <br />
            <br />
            <Button variant="contained" color="Primary" onClick={BuscoUsuario}>
              PAGAR
            </Button>
          </Grid>
        </center>
        <center>
          {" "}
          <br></br>
          <br></br>
          <Link to={{ pathname: "/Pagos" }}>
            <Button color="secondary">VOLVER</Button>
          </Link>{" "}
          <br></br>
          <Link to={{ pathname: "/IngresoOP/" }}>
            <Button color="secondary" style={{ color: "red" }}>
              CERRAR SESI??N
            </Button>
          </Link>{" "}
          <br></br>
        </center>{" "}
        <div
          style={{ padding: 24, width: "100%", display: "block", flex: 1 }}
        ></div>
      </Scrollbar>
    </Page>
  );
}
