import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./PagosHB.css";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
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
  getEmpresaPAGO,
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
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Encuesta(props) {
  const clase5 = useStylesGrid();
  const [codigopago, setCodigopago] = React.useState("");
  const [importe, setImporte] = React.useState("");
  const [tipomovimiento, setTipomovimiento] =
    React.useState("Depósito por Caja");

  const handlesetCodigopago = (event) => {
    setCodigopago(event.target.value);
  };
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

  //Ejecuto el endopoint para validar el codigo de pago y voy a pagar serivicio
  const validarLogin = async function () {
    const reporte = await getEmpresaPAGO(codigopago);
    if (reporte !== 201) {
  
        if (reporte[0].importe === "0") {
          swal(
            " ",
            "CUPÓN YA PAGADO - " +
              reporte[0].nombre +
              " " +
              reporte[0].descripcion,
            "success"
          );
        } else {
          if (reporte !== 201) {
            history.push({
              pathname: "/ServicioDetalleHB/" + reporte[0]._id,
              reporte: reporte,
            });
          } else {
            swal(" ", "CÓDIGO DE PAGO INEXISTENTE", "error");
          }
        }
    
    } else {
      swal(" ", "CÓDIGO DE PAGO INEXISTENTE", "error");
    }
  };

  const BuscoCBU = () => {
    if (codigopago !== "") {
      validarLogin();
    } else {
      swal(" ", "DEBE INGRESAR UN CÓDIGO DE PAGO", "warning");
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
        <Grid container spacing={6}>
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
                <Link
                  to={{
                    pathname: "/Movimientos",
                  }}
                >
                  {" "}
                  <Button color="primary">MOVIMIENTOS</Button>{" "}
                </Link>
                 <Link to={{ pathname: "/ResumenTarjeta" }}>
                  <Button color="primary">RESUMEN DE TARJETA</Button>
                  </Link>
                <Button variant="outlined">PAGO DE SERVICIOS</Button>
                
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
          <br></br>
        </Grid>
        <div className="App">
          <Grid item xs={12} sm={12} style={{ marginTop: "70px" }}>
            <center>
              <h3 className={clase5.paper}>PAGO DE SERVICIOS</h3>
              <TextField
                required
                id="Codigopago"
                label="Ingrese Codigo de Pago"
                inputProps={{
                  onChange: (event) => handlesetCodigopago(event),
                }}
              />
              <br></br>
              <br></br>
              <br></br>
              <Button variant="contained" color="Primary" onClick={BuscoCBU}>
                BUSCAR
              </Button>
            </center>
          </Grid>
        </div>
        <center>
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
