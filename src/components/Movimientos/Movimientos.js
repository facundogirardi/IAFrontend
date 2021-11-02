import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./Movimientos.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "react-phone-input-2/lib/bootstrap.css";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import EditableTable from "./TableEncuesta";
import { useHistory } from "react-router";
//importo
import { getMovimientoUsuario, getUsuarioUsuario } from "../../controller/miApp.controller";

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
  const [movimientos, setMovimiento] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    getReporte(props.match.params.id);
  }, [props.match.params.id]);

  const getReporte = async (id) => {
    if (window.localStorage.getItem('name')!==''){
    const reportes = await getUsuarioUsuario(window.localStorage.getItem('name'));
    setReportes(reportes[0]);}else{
      history.push({
        pathname:
          "/IngresoHB"
      });
    }

  };

  useEffect(() => {
    getMovimiento(props.match.params.id);
  }, [props.match.params.id]);

  // Agregar IF para filtrar por tipo de usuario y estado de cuenta
  const getMovimiento = async () => {
    const movimientos = await getMovimientoUsuario(window.localStorage.getItem('name'));
    setMovimiento(movimientos);
    setLoading(false);
  };

  const columnas = [
    { title: "Tipo de movimiento", field: "tipomovimiento", filtering: false },
    { title: "Importe", field: "importe", filtering: false },
    { title: "Saldo Caja de Ahorro", field: "importeCA", filtering: false },
    { title: "Saldo Cta. Corriente", field: "importeCC", filtering: false },
    { title: "Fecha de movimiento", field: "date", filtering: false },
  ];
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
        <div className="App">
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
                <Button variant="outlined" color="primary">
                  MOVIMIENTOS
                </Button>
                {reportes.usuariotipo !== 2 ? (
                  <Link to={{ pathname: "/ResumenTarjeta" }}>
                  <Button color="primary">RESUMEN DE TARJETA</Button>
                  </Link>  ) : (<></>  )}
                {reportes.usuariotipo!==2 ?
                  <Link to={{ pathname: "/PagosHB" }}>
                    <Button color="primary">PAGO DE SERVICIOS</Button>
                  </Link>
                 : 
                <Link to={{ pathname: "/CargaCupon" }}>
                    <Button color="primary">CARGAR CUPÓN DE PAGO</Button>
                  </Link>
               } {reportes.usuariotipo === 2 ? (  <Link to={{ pathname: "/PagoSueldos" }}>
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
              </ButtonGroup>{" "}
            </center>
            <br /><br />
          </Grid>
          <br></br>
          <center>
            <h3 className={clase5.paper}>MOVIMIENTOS DE CUENTA</h3>
            <div style={{ padding: 38, width: "100%" }}>
              <EditableTable
                title={" "}
                data={movimientos}
                columns={columnas}
                setData={setMovimiento}
                isLoading={loading}
              />
            </div>
          </center>
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
