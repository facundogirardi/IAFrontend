import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./Mantenimiento.css";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import "react-phone-input-2/lib/bootstrap.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import swal from "sweetalert";
import {
  updateUsuario,
  getUsuarioUsuario,
  getUsuario,
  updateMantenimiento,
  GeneroMovimiento,
  getMantenimientoClave,
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
  const [reportes, setReportes] = useState([]);
  const [reportes1, setReportes1] = useState([]);
  const [mantenimientoF, setMantenimientoF] = useState([]);
  const [interes, SetInteres] = useState([]);
  const [descubiertoF, setDescubiertoF] = useState([]);
  const [mantenimientoJ, setMantenimientoJ] = useState([]);
  const [descubiertoJ, setDescubiertoJ] = useState([]);

  const handleMantenimientoF = (event) => {
    setMantenimientoF(event.target.value);
  };
  const handleInteres = (event) => {
    SetInteres(event.target.value);
  };

  const handleMantenimientoJ = (event) => {
    setMantenimientoJ(event.target.value);
  };

  const handleDescubiertoF = (event) => {
    setDescubiertoF(event.target.value);
  };

  const handleDescubiertoJ = (event) => {
    setDescubiertoJ(event.target.value);
  };

  useEffect(() => {
    getReporte(props.match.params.id);
  }, [props.match.params.id]);

  const getReporte = async (id) => {
    if (window.localStorage.getItem("name") !== "") {
      const reportes1 = await getMantenimientoClave("1");
      setReportes1(reportes1[0]);

    } else {
      history.push({
        pathname: "/IngresoHB",
      });
    }
  };

  const validarLogin1 = async function () {
    const reportes1 = await getMantenimientoClave("1");
    setReportes1(reportes1[0]);

    if (mantenimientoF.length === 0) {
      reportes1[0].mantenimientoF = reportes1[0].mantenimientoF;
    } else {
      reportes1[0].mantenimientoF = mantenimientoF;
    }
    if (interes.length === 0) {
      reportes1[0].interes = reportes1[0].interes;
    } else {
      reportes1[0].interes = interes;
    }

    if (mantenimientoJ.length === 0) {
      reportes1[0].mantenimientoJ = reportes1[0].mantenimientoJ;
    } else {
      reportes1[0].mantenimientoJ = mantenimientoJ;
    }

    if (descubiertoF.length === 0) {
      reportes1[0].descubiertoF = reportes1[0].descubiertoF;
    } else {
      reportes1[0].descubiertoF = descubiertoF;
    }

    if (descubiertoJ.length === 0) {
      reportes1[0].descubiertoJ = reportes1[0].descubiertoJ;
    } else {
      reportes1[0].descubiertoJ = descubiertoJ;
    }

    updateMantenimiento(
      "1",
      reportes1[0].descubiertoF,
      reportes1[0].descubiertoJ,
      reportes1[0].mantenimientoF,
      reportes1[0].mantenimientoJ,
      reportes1[0].interes
    );
    swal(" ", "MANTENIMIENTO EDITADO CON ÉXITO", "success");
    setTimeout(() => {
      window.location.reload(true);
    }, 1300);
  };

  //Ejecuto el endopoint para validar el CBU & guardar el monto
  const validarLogin = async function () {
    const reportes = await getUsuario();
    const mantenimientos = await getMantenimientoClave("1");
    const usuarioB = await getUsuarioUsuario("BAIRESBANK");
    const cantidad = reportes.length;

    for (let step = 0; step < cantidad; step++) {
      if (
        reportes[step].estadocuenta === 1 &&
        reportes[step].usuario !== "BAIRESBANK"
      ) {
        if (reportes[step].balancecc < 0) {
          var mantenimientoF =
            (parseFloat(mantenimientos[0].mantenimientoF) *
              parseFloat(mantenimientos[0].interes)) /
            100;
          var mantenimientoJ =
            (parseFloat(mantenimientos[0].mantenimientoJ) *
              parseFloat(mantenimientos[0].interes)) /
            100;
        } else {
          var mantenimientoF = 0;
          var mantenimientoJ = 0;
        }
        if (reportes[step].usuariotipo === 1) {
          var mantenimientoF =
            parseFloat(mantenimientos[0].mantenimientoF) +
            parseFloat(mantenimientoF);
          var myInt = parseFloat(reportes[step].balancecc) - mantenimientoF;
          reportes[step].balancecc = myInt;
          usuarioB[0].balanceca =
            parseFloat(usuarioB[0].balanceca) + parseFloat(mantenimientoF);
          const importeM = +mantenimientoF;
          const usuarioM = usuarioB[0].usuario;
          const importeCAM = usuarioB[0].balanceca;
          const tipomovimientoM =
            "Mantenimiento de cuenta - " + reportes[step].cuit;
          const importeCCM = usuarioB[0].balancecc;
          updateUsuario(usuarioB[0]);
          GeneroMovimiento(
            usuarioM,
            tipomovimientoM,
            importeM,
            importeCAM,
            importeCCM
          );

          var fecha = new Date();
          var dia = fecha.getDate();
          var mes = fecha.getMonth() + 1;
          var año = fecha.getFullYear();

          updateUsuario(reportes[step]);
          const usuario = reportes[step].usuario;
          const tipomovimiento =
            "Mantenimiento de cuenta - " + dia + "/" + mes + "/" + año;
          const importe = -mantenimientoF;
          const importeCA = reportes[step].balanceca;
          const importeCC = reportes[step].balancecc;
          GeneroMovimiento(
            usuario,
            tipomovimiento,
            importe,
            importeCA,
            importeCC
          );
        } else {
          var mantenimientoJ =
            parseFloat(mantenimientos[0].mantenimientoJ) +
            parseFloat(mantenimientoJ);
          var myInt = parseFloat(reportes[step].balancecc) - mantenimientoJ;
          reportes[step].balancecc = myInt;
          usuarioB[0].balanceca =
            parseFloat(usuarioB[0].balanceca) + parseFloat(mantenimientoJ);
          const importeM = +mantenimientoJ;
          const usuarioM = usuarioB[0].usuario;
          const importeCAM = usuarioB[0].balanceca;
          const tipomovimientoM =
            "Mantenimiento de cuenta - " + reportes[step].cuit;
          const importeCCM = usuarioB[0].balancecc;
          updateUsuario(usuarioB[0]);
          GeneroMovimiento(
            usuarioM,
            tipomovimientoM,
            importeM,
            importeCAM,
            importeCCM
          );

          var fecha = new Date();
          var dia = fecha.getDate();
          var mes = fecha.getMonth() + 1;
          var año = fecha.getFullYear();

          updateUsuario(reportes[step]);
          const usuario = reportes[step].usuario;
          const tipomovimiento =
            "Mantenimiento de cuenta - " + dia + "/" + mes + "/" + año;
          const importe = -mantenimientoJ;
          const importeCA = reportes[step].balanceca;
          const importeCC = reportes[step].balancecc;
          GeneroMovimiento(
            usuario,
            tipomovimiento,
            importe,
            importeCA,
            importeCC
          );
        }
      }
    }
    swal(" ", "Mantenimiento ejecutado correctamente", "success");
  };

  const BuscoUsuario = () => {
    validarLogin();
  };

  const BuscoUsuario1 = () => {
    validarLogin1();
  };

  useEffect(() => {
    getReporte1(props.match.params.id);
  }, [props.match.params.id]);

  const getReporte1 = async (id) => {
    if (window.localStorage.getItem("name") !== "") {
      const reportes = await getUsuarioUsuario(
        window.localStorage.getItem("name")
      );
      setReportes(reportes[0]);
    } else {
      history.push({
        pathname: "/IngresoCA",
      });
    }
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
          </Grid>
        </Grid>
        <div className="App">
          <Grid item xs={12} sm={12} style={{ marginTop: "30px" }}>
            <center>
              <h3 className={clase5.paper}>MANTENIMIENTO DE CUENTAS</h3>
              <h5>
             
              <h6 className={clase5.paper}>INTERES POR DESCUBIERTO:</h6>
                <TextField
                  id="outlined-helperText"
                  inputProps={{
                    onChange: (event) => handleInteres(event),
                  }}
                  placeholder={reportes1.interes + "%"}
                  variant="outlined"
                />
              </h5>

              <form autoComplete="off">
                <br />
                <h6 className={clase5.paper}>Cuentas Personas Fisicas</h6>
                <TextField
                  id="outlined-helperText"
                  inputProps={{
                    onChange: (event) => handleMantenimientoF(event),
                  }}
                  placeholder={"Mantenimiento: $" + reportes1.mantenimientoF}
                  variant="outlined"
                />
                <br />
                <TextField
                  id="outlined-helperText"
                  inputProps={{
                    onChange: (event) => handleDescubiertoF(event),
                  }}
                  placeholder={"Descubierto: $" + reportes1.descubiertoF}
                  variant="outlined"
                />
                <br />
                <br />
                <h6 className={clase5.paper}>Cuentas Personas Juridicas</h6>
                <TextField
                  id="outlined-helperText"
                  inputProps={{
                    onChange: (event) => handleMantenimientoJ(event),
                  }}
                  placeholder={"Mantenimiento: $" + reportes1.mantenimientoJ}
                  variant="outlined"
                />
                <br />
                <TextField
                  id="outlined-helperText"
                  inputProps={{
                    onChange: (event) => handleDescubiertoJ(event),
                  }}
                  placeholder={"Descubierto: $" + reportes1.descubiertoJ}
                  variant="outlined"
                />
              </form>
              <br />
              <br />

              <Button
                variant="contained"
                color="Primary"
                onClick={BuscoUsuario1}
              >
                ACTUALIZAR VALORES
              </Button>
              <br></br>
              <br></br>
              <Button
                variant="contained"
                color="Primary"
                onClick={BuscoUsuario}
              >
                EJECUTAR MANTENIMIENTO
              </Button>
            </center>
          </Grid>
        </div>
        <center>
          <br></br>
          <br></br>
          <Link to={{ pathname: "/Administracion" }}>
            <Button color="secondary">VOLVER</Button>
          </Link>{" "}
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
