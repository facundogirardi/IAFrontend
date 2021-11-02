import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./CambioPass.css";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";
import "react-phone-input-2/lib/bootstrap.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import swal from "sweetalert";

//importo
import {
  updateUserP,
  getUsuarioUsuario,
} from "../../controller/miApp.controller";

const useStylesGrid = makeStyles((theme) => ({
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

export default function Encuesta(props) {
  const clase5 = useStylesGrid();
  const [usuarios, setUsuarios] = useState([]);
  const [reportes, setReportes] = useState([]);
  const [telefono, setTelefono] = useState([]);
  const [email, setEmail] = useState([]);
  const [calle, setCalle] = useState([]);
  const [altura, setAltura] = useState([]);
  const [piso, setPiso] = useState([]);
  const [depto, setDepto] = useState([]);
  const [ciudad, setCiudad] = useState([]);
  const [provincia, setProvincia] = useState([]);
  const [password, setPassword] = useState([]);

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleTelefono = (event) => {
    setTelefono(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleCalle = (event) => {
    setCalle(event.target.value);
  };
  const handleAltura = (event) => {
    setAltura(event.target.value);
  };
  const handlePiso = (event) => {
    setPiso(event.target.value);
  };
  const handleDepto = (event) => {
    setDepto(event.target.value);
  };
  const handleCiudad = (event) => {
    setCiudad(event.target.value);
  };
  const handleProvincia = (event) => {
    setProvincia(event.target.value);
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

  useEffect(() => {
    getEncuesta(props.match.params.id);
  }, [props.match.params.id]);

  const getEncuesta = async (id) => {
    const usuarios = await getUsuarioUsuario(
      window.localStorage.getItem("name")
    );
    setUsuarios(usuarios[0]);
  };

  const validarLogin = async function () {
    const reportes = await getUsuarioUsuario(
      window.localStorage.getItem("name")
    );
    setReportes(reportes[0]);

    if (password.length === 0) {
      reportes[0].password = reportes[0].password;
    } else {
      reportes[0].password = password;
      reportes[0].estadocuenta = 1;
    }
    updateUserP(reportes[0]);
    swal(" ", "CONTRASEÑA ACTUALIZADA", "success");
    window.localStorage.setItem('name', "")
    setTimeout(() => {
      history.push({
        pathname: "/",
      });
    }, 1300);
  };

 
  const BuscoUsuario = () => {
    if (password.length !== 0) {
      validarLogin();
    } else {
      swal(" ", "DEBE INGRESAR UNA CONTRASEÑA", "warning");
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
              <h2>BAIRES BANK | CAMBIO DE CONTRASEÑA</h2>
            </Paper>
            <br />
            <br />
          </Grid>
        </Grid>
        <div className="App">
          <Grid item xs={12} sm={12} style={{ marginTop: "30px" }}>
            <center>
              <form autoComplete="off">
                <TextField
                  required
                  id="Pass"
                  type="password"
                  label="Nueva contraseña"
                  inputProps={{
                    onChange: (event) => handlePassword(event),
                  }}
                  className={clase5.number}
                />
                <br />
                <br />
              </form>
              <br />
              <br />
              <Button variant="contained" color="Primary" onClick={BuscoUsuario}>
                Modificar
              </Button>
            </center>
          </Grid>
        </div>
        <center>
          <br></br>
          <br></br>
          <Link to="/">
            <Button color="secondary">VOLVER</Button>
          </Link>{" "}
          <br></br>
          <br></br>
        </center>{" "}
        <br></br>
      </Scrollbar>
    </Page>
  );
}
