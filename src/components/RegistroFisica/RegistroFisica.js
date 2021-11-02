import React from "react";
import { Link } from "react-router-dom";
import fotoDashboard from "../../imagenes/obelisco.png";
import Button from "@material-ui/core/Button";
import "./RegistroFisica.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import Scrollbar from "material-ui-shell/lib/components/Scrollbar/Scrollbar";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
//importo llamada a endpoint
import { CrearUsuario } from "../../controller/miApp.controller";
import swal from "sweetalert";
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

export default function () {
  const clase4 = useStylesButton();
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [usuario, setUsuario] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usuariotipo, setUsuariotipo] = React.useState(1);
  const [tipodni, setTipodni] = React.useState("");
  const [dni, setDni] = React.useState("");
  const [nacimiento, setNacimiento] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [cuit, setCuit] = React.useState("");
  const [calle, setCalle] = React.useState("");
  const [altura, setAltura] = React.useState("");
  const [ciudad, setCiudad] = React.useState("");
  const [provincia, setProvincia] = React.useState("");
  const [piso, setPiso] = React.useState("");
  const [depto, setDepto] = React.useState("");
  const history = useHistory();

  const handleNombre = (event) => {
    setNombre(event.target.value);
  };
  const handleApellido = (event) => {
    setApellido(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleUsuario = (event) => {
    setUsuario(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleUsuariotipo = (event) => {
    setUsuariotipo(event.target.value);
  };
  const handleTipodni = (event) => {
    setTipodni(event.target.value);
  };
  const handleDni = (event) => {
    setDni(event.target.value);
  };
  const handleNacimiento = (event) => {
    setNacimiento(event.target.value);
  };
  const handleTelefono = (event) => {
    setTelefono(event.target.value);
  };
  const handleCuit = (event) => {
    setCuit(event.target.value);
  };
  const handleCalle = (event) => {
    setCalle(event.target.value);
  };
  const handleAltura = (event) => {
    setAltura(event.target.value);
  };
  const handleCiudad = (event) => {
    setCiudad(event.target.value);
  };
  const handleProvincia = (event) => {
    setProvincia(event.target.value);
  };
  const handlePiso = (event) => {
    setPiso(event.target.value);
  };
  const handleDepto = (event) => {
    setDepto(event.target.value);
  };

  const isEmpty = (stringToValidate) => {
    if (stringToValidate !== undefined && stringToValidate !== null) {
      return stringToValidate.length === 0;
    }
    return true;
  };

  const subirDatos = async function () {
    let archivoDatos = false;

    const validateValidEmail = (stringToValidate) => {
      if (typeof stringToValidate !== undefined) {
        let lastAtPos = stringToValidate.lastIndexOf("@");
        let lastDotPos = stringToValidate.lastIndexOf(".");
        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            stringToValidate.indexOf("@@") === -1 &&
            lastDotPos > 2 &&
            stringToValidate.length - lastDotPos > 2
          )
        ) {
          return stringToValidate.length === 0;
        }
      }
      return true;
    };

    if (
      !isEmpty(nombre) &&
      !isEmpty(apellido) &&
      validateValidEmail(email) &&
      !isEmpty(usuario) &&
      !isEmpty(password) &&
      !isEmpty(usuariotipo) &&
      !isEmpty(tipodni) &&
      !isEmpty(dni) &&
      !isEmpty(nacimiento) &&
      !isEmpty(telefono) &&
      !isEmpty(cuit) &&
      !isEmpty(calle) &&
      !isEmpty(altura) &&
      !isEmpty(ciudad) &&
      !isEmpty(provincia)
    ) {
      archivoDatos = await CrearUsuario(
        nombre,
        apellido,
        email,
        usuario,
        password,
        usuariotipo,
        tipodni,
        dni,
        nacimiento,
        telefono,
        cuit,
        calle,
        altura,
        ciudad,
        provincia,
        piso,
        depto
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
      swal(" ", "USUARIO REGISTRADO CORRECTAMENTE", "success");
      setTimeout(() => {
        history.push({
          pathname: "/Registro", //paso el usuario temporalmente
        });
      }, 1500);
    }
  };

  return (
    <div class="container-fluid">
      <Scrollbar>
        <Grid container spacing={3}>
          <Grid item xs={3} sm={2}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </Grid>

          <Grid item xs={6} sm={4} style={{ marginTop: "20px" }}>
            <center>
              <h3 style={{ fontSize: "50px", color: "#2913a2" }}>
                BAIRES BANK
              </h3>
              <h3>REGISTRO PERSONA FÍSICA</h3>
              <form autoComplete="off">
                <TextField
                  required
                  id="Usuario"
                  label="Usuario"
                  type="text"
                  inputProps={{
                    onChange: (event) => handleUsuario(event),
                  }}
                />
                <br />
                <TextField
                  required
                  id="Password"
                  label="Password"
                  type="password"
                  inputProps={{
                    onChange: (event) => handlePassword(event),
                  }}
                />
                <br />
                <TextField
                  required
                  id="Nombre"
                  label="Nombre"
                  inputProps={{
                    onChange: (event) => handleNombre(event),
                  }}
                />
                <TextField
                  required
                  id="Apellido"
                  label="Apellido"
                  inputProps={{
                    onChange: (event) => handleApellido(event),
                  }}
                />
                <br /> <br /> Fecha de Nacimiento <br />
                <TextField
                  required
                  id="fecha"
                  type="date"
                  inputProps={{
                    onChange: (event) => handleNacimiento(event),
                  }}
                />
                <br />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Tipo de Documento
                  </InputLabel>
                  <Select
                    style={{ width: "159px" }}
                    labelId="TipoDocumento"
                    id="TipoDocumento"
                    label="TipoDocumento"
                    value={tipodni}
                    onChange={handleTipodni}
                  >
                    <MenuItem value={"LE"}>LE</MenuItem>
                    <MenuItem value={"LC"}>LC</MenuItem>
                    <MenuItem value={"DNI"}>DNI</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  required
                  id="DNI"
                  label="Número de Documento"
                  inputProps={{
                    onChange: (event) => handleDni(event),
                  }}
                  type="number"
                  className={clase4.number}
                />
                <br />
                <TextField
                  required
                  id="CUIL"
                  label="CUIT/CUIL"
                  inputProps={{
                    onChange: (event) => handleCuit(event),
                  }}
                  type="number"
                  className={clase4.number}
                />
                <br />
                <TextField
                  required
                  id="Telefono"
                  label="Telefono"
                  inputProps={{
                    onChange: (event) => handleTelefono(event),
                  }}
                  type="number"
                  className={clase4.number}
                />
                <TextField
                  required
                  id="Email"
                  label="Email"
                  inputProps={{
                    onChange: (event) => handleEmail(event),
                  }}
                />
                <br />
                <TextField
                  required
                  id="Calle"
                  label="Calle"
                  inputProps={{
                    onChange: (event) => handleCalle(event),
                  }}
                />
                <TextField
                  required
                  id="Altura"
                  label="Altura"
                  inputProps={{
                    onChange: (event) => handleAltura(event),
                  }}
                  type="number"
                  className={clase4.number}
                />
                <TextField
                  id="Piso"
                  label="Piso"
                  inputProps={{
                    onChange: (event) => handlePiso(event),
                  }}
                  type="number"
                  className={clase4.number}
                />
                <TextField
                  id="Depto"
                  label="Depto"
                  inputProps={{
                    onChange: (event) => handleDepto(event),
                  }}
                />
                <br />
                <TextField
                  required
                  id="Ciudad"
                  label="Ciudad"
                  inputProps={{
                    onChange: (event) => handleCiudad(event),
                  }}
                />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Provincia
                  </InputLabel>
                  <Select
                    style={{ width: "159px" }}
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
                <br />
                <TextField
                  required
                  id="Tipousuario"
                  style={{ display: "none" }}
                  label="Tipousuario"
                />
              </form>
              <br />
              <Button
                variant="contained"
                color="Primary"
                className={clase4.button}
                onClick={() => {
                  redirect();
                }}
              >
                REGISTRAR
              </Button>
              <br></br>
              <Link to="/Registro">
                <Button color="secondary">VOLVER</Button>
              </Link>{" "}
              <br></br>
            </center>
          </Grid>

          <center>
            <img
              src={fotoDashboard}
              alt="alternative"
              style={{ marginTop: "100px" }}
            />
          </center>
        </Grid>
        <br></br>
        <br></br>
      </Scrollbar>
    </div>
  );
}
