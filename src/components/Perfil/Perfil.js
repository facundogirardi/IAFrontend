import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import Page from "material-ui-shell/lib/containers/Page/Page";
import "./Perfil.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import "react-phone-input-2/lib/bootstrap.css";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { useHistory } from "react-router";
import swal from "sweetalert";
//importo
import {
  updateUserP,
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
    }
    if (telefono.length === 0) {
      reportes[0].telefono = reportes[0].telefono;
    } else {
      reportes[0].telefono = telefono;
    }
    if (email.length === 0) {
      reportes[0].email = reportes[0].email;
    } else {
      reportes[0].email = email;
    }
    if (calle.length === 0) {
      reportes[0].calle = reportes[0].calle;
    } else {
      reportes[0].calle = calle;
    }
    if (altura.length === 0) {
      reportes[0].altura = reportes[0].altura;
    } else {
      reportes[0].altura = altura;
    }
    if (piso.length === 0) {
      reportes[0].piso = reportes[0].piso;
    } else {
      reportes[0].piso = piso;
    }
    if (depto.length === 0) {
      reportes[0].depto = reportes[0].depto;
    } else {
      reportes[0].depto = depto;
    }
    if (ciudad.length === 0) {
      reportes[0].ciudad = reportes[0].ciudad;
    } else {
      reportes[0].ciudad = ciudad;
    }
    if (provincia.length === 0) {
      reportes[0].provincia = reportes[0].provincia;
    } else {
      reportes[0].provincia = provincia;
    }
    updateUserP(reportes[0]);
    swal(" ", "PERFIL EDITADO CON ÉXITO", "success");
    setTimeout(() => {
      window.location.reload(true);
    }, 1300);
  };

  let encabezado = "";
  if (usuarios.usuariotipo === 2) {
    encabezado = "PERSONA JURÍDICA";
  } else {
    encabezado = "PERSONA FÍSICA";
  }

  const BuscoUsuario = () => {
    validarLogin();
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
                {reportes.usuariotipo !== 2 ? (
                  <Link to={{ pathname: "/ResumenTarjeta" }}>
                  <Button color="primary">RESUMEN DE TARJETA</Button>
                  </Link>  ) : (<></>  )}
                {reportes.usuariotipo !== 2 ? (
                  <Link to={{ pathname: "/PagosHB" }}>
                    <Button color="primary">PAGO DE SERVICIOS</Button>
                  </Link>
                ) : (
                  <Link to={{ pathname: "/CargaCupon" }}>
                    <Button color="primary">CARGAR CUPÓN DE PAGO</Button>
                  </Link>
                )}  {reportes.usuariotipo === 2 ? (  <Link to={{ pathname: "/PagoSueldos" }}>
                    <Button color="primary">PAGO DE SUELDOS</Button>
                  </Link>  ): (<></>)}
                <Button variant="outlined">EDITAR DATOS</Button>
              </ButtonGroup>{" "}
            </center>
          </Grid>
          <br></br>
          <center>
            <Grid item xs={6} sm={4} style={{ marginTop: "20px" }}>
              <center>
                <h3 style={{ fontSize: "50px", color: "#2913a2" }}>
                  BAIRES BANK
                </h3>
                <h3>REGISTRO {encabezado}</h3>
                <br />
                <br />
                <form autoComplete="off">
                  <TextField
                    id="outlined-helperText"
                    label="Usuario"
                    defaultValue="Default Value"
                    disabled
                    variant="outlined"
                    value={usuarios.usuario}
                  />
                  <TextField
                    id="outlined-helperText"
                    variant="outlined"
                    inputProps={{
                      onChange: (event) => handlePassword(event),
                    }}
                    placeholder="Contraseña: *****"
                    type="password"
                  />
                  {reportes.usuariotipo !== 2 ? (
                    <>
                      <br />
                      <br />
                      <TextField
                        id="outlined-helperText"
                        label="Nombre"
                        defaultValue="Default Value"
                        disabled
                        variant="outlined"
                        value={usuarios.nombre}
                      />{" "}
                    </>
                  ) : (
                    <div></div>
                  )}
                  {reportes.usuariotipo !== 2 ? (
                    <TextField
                      id="outlined-helperText"
                      label="Apellido"
                      defaultValue="Default Value"
                      disabled
                      variant="outlined"
                      value={usuarios.apellido}
                    />
                  ) : (
                    <div></div>
                  )}
                  {reportes.usuariotipo !== 2 ? (
                    <>
                      <br />
                      <br />{" "}
                      <TextField
                        id="outlined-helperText"
                        label="Tipo DNI"
                        defaultValue="Default Value"
                        disabled
                        variant="outlined"
                        value={usuarios.tipodni}
                      />{" "}
                    </>
                  ) : (
                    <br />
                  )}
                  {reportes.usuariotipo !== 2 ? (
                    <>
                      {" "}
                      <TextField
                        id="outlined-helperText"
                        label="DNI"
                        defaultValue="Default Value"
                        disabled
                        variant="outlined"
                        value={usuarios.dni}
                      />{" "}
                      <br />
                      <br />
                    </>
                  ) : (
                    <br />
                  )}
                  {reportes.usuariotipo !== 2 ? (
                    <TextField
                      id="outlined-helperText"
                      label="Fecha de nacimiento"
                      defaultValue="Default Value"
                      disabled
                      variant="outlined"
                      value={usuarios.nacimiento}
                    />
                  ) : (
                    <TextField
                      id="outlined-helperText"
                      label="Fecha de Inicio de Actividades"
                      defaultValue="Default Value"
                      disabled
                      variant="outlined"
                      value={usuarios.nacimiento}
                    />
                  )}
                  <TextField
                    id="outlined-helperText"
                    label="CUIT/CUIL"
                    defaultValue="Default Value"
                    disabled
                    variant="outlined"
                    value={usuarios.cuit}
                  />
                  <br />
                  <br />
                  <TextField
                    id="outlined-helperText"
                    variant="outlined"
                    type="number"
                    inputProps={{
                      onChange: (event) => handleTelefono(event),
                    }}
                    placeholder={"Teléfono: " + usuarios.telefono}
                  />
                  <TextField
                    id="outlined-helperText"
                    variant="outlined"
                    inputProps={{
                      onChange: (event) => handleEmail(event),
                    }}
                    placeholder={"Email: " + usuarios.email}
                  />
                  <br />
                  <br />
                  <TextField
                    id="outlined-helperText"
                    variant="outlined"
                    inputProps={{
                      onChange: (event) => handleCalle(event),
                    }}
                    placeholder={"Calle: " + usuarios.calle}
                  />
                  <TextField
                    id="outlined-helperText"
                    variant="outlined"
                    type="number"
                    inputProps={{
                      onChange: (event) => handleAltura(event),
                    }}
                    placeholder={"Altura: " + usuarios.altura}
                  />
                  <br />
                  <br />
                  <TextField
                    id="outlined-helperText"
                    variant="outlined"
                    type="number"
                    inputProps={{
                      onChange: (event) => handlePiso(event),
                    }}
                    placeholder={"Piso: " + usuarios.piso}
                  />
                  <TextField
                    id="outlined-helperText"
                    variant="outlined"
                    inputProps={{
                      onChange: (event) => handleDepto(event),
                    }}
                    placeholder={"Departamento: " + usuarios.depto}
                  />
                  <br />
                  <br />
                  <TextField
                    id="outlined-helperText"
                    variant="outlined"
                    inputProps={{
                      onChange: (event) => handleCiudad(event),
                    }}
                    placeholder={"Ciudad: " + usuarios.ciudad}
                  />
                  <br />
                  <br />
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                      {"Provincia: " + usuarios.provincia}
                    </InputLabel>
                    <Select
                      style={{ width: "350px" }}
                      labelId="Provincia"
                      id="Provincia"
                      label="Provincia"
                      value={provincia}
                      onChange={handleProvincia}
                    >
                      <MenuItem value={"Buenos Aires"}>Buenos Aires</MenuItem>
                      <MenuItem value={"Ciudad Autonoma de Buenos Aires"}>
                        Ciudad Autonoma de Buenos Aires
                      </MenuItem>
                      <MenuItem value={"Catamarca"}>Catamarca</MenuItem>
                      <MenuItem value={"Chaco"}>Chaco</MenuItem>
                      <MenuItem value={"Chubut"}>Chubut</MenuItem>
                      <MenuItem value={"Córdoba"}>Córdoba</MenuItem>
                      <MenuItem value={"Corrientes"}>Corrientes</MenuItem>
                      <MenuItem value={"Entre Ríos"}>Entre Ríos</MenuItem>
                      <MenuItem value={"Formosa"}>Formosa</MenuItem>
                      <MenuItem value={"Jujuy"}>Jujuy</MenuItem>
                      <MenuItem value={"La Pampa"}>La Pampa</MenuItem>
                      <MenuItem value={"La Rioja"}>La Rioja</MenuItem>
                      <MenuItem value={"Mendoza"}>Mendoza</MenuItem>
                      <MenuItem value={"Misiones"}>Misiones</MenuItem>
                      <MenuItem value={"Neuquén"}>Río Negro</MenuItem>
                      <MenuItem value={"Río Negro"}>Río Negro</MenuItem>
                      <MenuItem value={"Salta"}>Salta</MenuItem>
                      <MenuItem value={"San Juan"}>San Juan</MenuItem>
                      <MenuItem value={"San Luis"}>San Luis</MenuItem>
                      <MenuItem value={"Santa Cruz"}>Santa Cruz</MenuItem>
                      <MenuItem value={"Santa Fe"}>Santa Fe</MenuItem>
                      <MenuItem value={"Santiago del Estero"}>
                        Santiago del Estero
                      </MenuItem>
                      <MenuItem
                        value={
                          "Tierra del Fuego, Antártida e Isla del Atlántico Sur"
                        }
                      >
                        Tierra del Fuego, Antártida e Isla del Atlántico Sur
                      </MenuItem>
                      <MenuItem value={"Tucumán"}>Tucumán</MenuItem>
                    </Select>
                  </FormControl>
                  <br /> <br />
                </form>
                <br />

                <Button
                  variant="contained"
                  color="Primary"
                  onClick={BuscoUsuario}
                >
                  ACTUALIZAR
                </Button>
              </center>
            </Grid>
          </center>
        </div>
        <center>
          <br></br>
          <br></br>
          <Link to="/IngresoHB">
            <Button color="secondary" style={{ color: "red" }}>
              CERRAR SESIÓN
            </Button>
          </Link>
        </center>
        <br></br>
      </Scrollbar>
    </Page>
  );
}
