import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./ServicioDetalleHB.css";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import "react-phone-input-2/lib/bootstrap.css";
import { useHistory } from "react-router";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import swal from "sweetalert";
//importo
import {
  getEmpresasID,
  GeneroMovimiento,
  getUsuarioCuit,
  updateUsuario,
  updateEmpresa,
  getUsuarioUsuario,
  getMantenimientoClave,
  getTarjetaCUIT,
  getTarjetaCodigo,
  updateTarjeta
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
  const [origen, setOrigen] = React.useState("");
  const [tipomovimiento, setTipomovimiento] = React.useState(
    "Pago de Tarjeta - "
  );
  const [reportes1, setReportes1] = useState([]);
  useEffect(() => {
    getReporte(props.match.params.id);
  }, [props.match.params.id]);

  const getReporte = async (id) => {
    const reportes = await getTarjetaCodigo(id);
    setReportes(reportes[0]);
  };
  const handleOrigen = (event) => {
    setOrigen(event.target.value);
  };

  const handleValor = (event) => {
    setValor(event.target.value);
  };
  let estadoPago = "No pago";
  let pagado = "0";
  const numerico = parseFloat(valor);
  var descubierto = 0;
  const validarLogin = async function () {
    if (origen === "CA") {
      //
      getUsuarioUsuario(window.localStorage.getItem("name")).then((value) => {
        if (numerico < 1) {
          swal(" ", "NO SE PUEDE PAGAR CON UN MONTO MENOR A $ 1", "error");
        } else if (parseFloat(reportes.importe) - numerico < 0) {
          swal(" ", "EL MONTO INGRESADO ES SUPERIOR AL INDICADO", "error");
        } else {
          if (parseFloat(value[0].balanceca) - numerico < 0) {
            swal(" ", "NO POSEE DINERO DISPONIBLE", "info");
          } else {
            value[0].balanceca = parseFloat(value[0].balanceca) - numerico;

            let importe = parseFloat(reportes.importe);
            let importePagado = numerico;
            if (parseFloat(reportes.importe) - parseFloat(numerico) > 0) {
              estadoPago = "Pago parcial";
              importe = parseFloat(reportes.importe) - numerico;
            } else {
              estadoPago = "Pago total";
              pagado= "1";
              importe = parseFloat(reportes.importe) - numerico;
            }
            const usuario = value[0].usuario;

            const importeCA = value[0].balanceca;
            const importeCC = value[0].balancecc;
            updateUsuario(value[0]).then((value) => {
              GeneroMovimiento(
                usuario,
                tipomovimiento + estadoPago,
                -importePagado,
                importeCA,
                importeCC
              );
            const codigotransaccion = reportes.codigotransaccion;
            const cuit = reportes.cuit;
            const cuitEmpresa = reportes.cuitEmpresa;
     

            const fechaVencimiento = reportes.fechaVencimiento;
            const descripcion = reportes.descripcion;
 
            updateTarjeta(
              codigotransaccion,
              cuitEmpresa,
              importe,
              descripcion,
              fechaVencimiento,
              pagado,
              cuit
            );

            getUsuarioCuit(reportes.cuitEmpresa).then((value2) => {
              value2[0].balanceca =
              parseFloat(importePagado) + parseFloat(value2[0].balanceca);
              importe = importePagado;
              const importeCA = value2[0].balanceca;
              const importeCC = value2[0].balancecc;
              updateUsuario(value2[0]).then((value) => {});
              GeneroMovimiento(
                value2[0].usuario,
                tipomovimiento + estadoPago + "-" + cuit,
                importe,
                importeCA,
                importeCC
              );
            });
   
              swal(" ", "PAGO DE TARJETA EXITOSO", "success");
              setTimeout(() => {
                window.location.reload(true);
              }, 1300);
            });
          }
        }
      });
    } else {

      const reportes1 = await getMantenimientoClave("1");
        setReportes1(reportes1[0]);

      getUsuarioUsuario(window.localStorage.getItem("name")).then((value) => {


        if(value[0].usuariotipo === 1){
          descubierto=reportes1[0].descubiertoF;
         }else{
           descubierto=reportes1[0].descubiertoJ;
         }

        if (numerico < 1) {
          swal(" ", "NO SE PUEDE PAGAR CON UN MONTO MENOR A $ 1", "error");
        } else if ( parseFloat(reportes.importe) -  parseFloat(numerico) < 0) {
          swal(" ", "EL MONTO INGRESADO ES SUPERIOR AL INDICADO", "error");
        } else if ( parseFloat(value[0].balancecc) -  parseFloat(numerico) < -descubierto) {
          swal(" ", "NO POSEE DINERO DISPONIBLE", "info");
        } else {
          value[0].balancecc = parseFloat(value[0].balancecc) -  parseFloat(numerico);

          let importe =  parseFloat(reportes.importe);
          let importePagado =  parseFloat(numerico);
          if (parseFloat(reportes.importe) -  parseFloat(numerico) > 0) {
            estadoPago = "Pago parcial";
            importe =  parseFloat(reportes.importe) -  parseFloat(numerico);
          } else {
            estadoPago = "Pago total";
            pagado= "1";
            importe =  parseFloat(reportes.importe) -  parseFloat(numerico);
          }
          const usuario = value[0].usuario;

          const importeCA = value[0].balanceca;
          const importeCC = value[0].balancecc;


          updateUsuario(value[0]).then((value) => {
            GeneroMovimiento(
              usuario,
              tipomovimiento + estadoPago,
              -importePagado,
              importeCA,
              importeCC
            );

            const codigotransaccion = reportes.codigotransaccion;
            const cuit = reportes.cuit;
            const cuitEmpresa = reportes.cuitEmpresa;
    
            const descripcion = reportes.descripcion;
          

            const fechaVencimiento = reportes.fechaVencimiento;
            updateTarjeta(
              codigotransaccion,
              cuitEmpresa,
              importe,
              descripcion,
              fechaVencimiento,
              pagado,
              cuit
            ); 

            getUsuarioCuit(reportes.cuitEmpresa).then((value2) => {
              value2[0].balanceca =
              parseFloat(importePagado) + parseFloat(value2[0].balanceca);
              importe = importePagado;
              const importeCA = value2[0].balanceca;
              const importeCC = value2[0].balancecc;
              updateUsuario(value2[0]).then((value) => {});
              GeneroMovimiento(
                value2[0].usuario,
                tipomovimiento + estadoPago + "-" + cuit,
                importe,
                importeCA,
                importeCC
              );
            });

  
            swal(" ", "PAGO DE TARJETA EXITOSO", "success");
            setTimeout(() => {
              window.location.reload(true);
            }, 1300);
          });
        }
      });
    } //
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
              <h2>Pago de Tarjeta </h2>
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
                label="CUIT del Dueño de la Tarjeta"
                defaultValue="Default Value"
                disabled
                variant="outlined"
                value={reportes.cuit}
              /> <br /><br />
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
                label="Importe"
                defaultValue="Default Value"
                variant="outlined"
                value={reportes.importe}
                disabled
              />
              <br />
              <br />
              <TextField
               style={{ width: "300px" }}
                id="outlined-helperText"
                label="Descripcion"
                defaultValue="Default Value"
                variant="outlined"
                value={reportes.descripcion}
                disabled
              />
              <br />
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
              </FormControl>{" "}
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
          <Link to={{ pathname: "/ResumenTarjeta" }}>
            <Button color="secondary">VOLVER</Button>
          </Link>{" "}
          <br></br>
          <Link to={{ pathname: "/IngresoHB/" }}>
            <Button color="secondary" style={{ color: "red" }}>
              CERRAR SESIÓN
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
