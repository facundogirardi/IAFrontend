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
import { getTarjetaCUIT, getUsuarioUsuario } from "../../controller/miApp.controller";

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
  const [tarjetas, setTarjeta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportes, setReportes] = useState([]);
const [reportes1, setReportes1] = useState([]);
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
    getTarjeta(props.match.params.id);
  }, [props.match.params.id]);

  // Agregar IF para filtrar por tipo de usuario y estado de cuenta
  const getTarjeta = async () => {
     const reportes1 = await getUsuarioUsuario(window.localStorage.getItem('name'));
    setReportes1(reportes1[0]);

    const tarjetas = await getTarjetaCUIT(reportes1[0].cuit);
    setTarjeta(tarjetas);
    setLoading(false);
    
  };

var filtered = tarjetas.filter(item => {
  if (item.pagado === "0") {
    return item;
  }});

  const columnas = [
    { title: "Código", field: "codigotransaccion", filtering: false },
    { title: "Importe", field: "importe", filtering: false },
    { title: "Vencimiento", field: "fechaVencimiento", filtering: false },
    { title: "Descripción", field: "descripcion", filtering: false },
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
                 <Link to={{ pathname: "/Movimientos" }}>
                <Button  color="primary">
                  MOVIMIENTOS
                </Button>
                </Link>
                <Button variant="outlined" color="primary">RESUMEN DE TARJETA</Button>
                {reportes.usuariotipo!==2 ? <Link to={{ pathname: "/PagosHB" }}>
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
            <h3 className={clase5.paper}>RESUMEN DE TARJETA</h3>
            <div style={{ padding: 38, width: "100%" }}>
              <EditableTable
                title={" "}
                data={filtered}
                columns={columnas}
                setData={setTarjeta}
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
