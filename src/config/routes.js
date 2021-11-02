import React, { lazy } from "react";
import PublicRoute from "base-shell/lib/components/PublicRoute/PublicRoute";
const IngresoHB = lazy(() => import("../components/IngresoHB/IngresoHB"));
const ServicioDetalle = lazy(() =>
  import("../components/ServicioDetalle/ServicioDetalle")
);
const CambioPass = lazy(() =>
  import("../components/CambioPass/CambioPass")
);
const Administracion = lazy(() =>
  import("../components/Administracion/Administracion")
);
const Mantenimiento = lazy(() =>
  import("../components/Mantenimiento/Mantenimiento")
);
const Empresa = lazy(() =>
  import("../components/Empresa/Empresa")
);
const CargaCupon = lazy(() =>
  import("../components/CargaCupon/CargaCupon")
);
const PagoSueldos = lazy(() =>
  import("../components/PagoSueldos/PagoSueldos")
);
const PagoSueldosOP = lazy(() =>
  import("../components/PagoSueldosOP/PagoSueldosOP")
);   
const ServicioDetalleHB = lazy(() =>
  import("../components/ServicioDetalleHB/ServicioDetalleHB")
);
const ServicioDetalleOP = lazy(() =>
  import("../components/ServicioDetalleOP/ServicioDetalleOP")
);
const IngresoCA = lazy(() => import("../components/IngresoCA/IngresoCA"));
const IngresoOP = lazy(() => import("../components/IngresoOP/IngresoOP"));
const Registro = lazy(() => import("../components/Registro/Registro"));
const RegistroFisica = lazy(() =>
  import("../components/RegistroFisica/RegistroFisica")
);
const RegistroJuridica = lazy(() =>
  import("../components/RegistroJuridica/RegistroJuridica")
);
const Extracciones = lazy(() =>
  import("../components/Extracciones/Extracciones")
);
const Depositos = lazy(() => import("../components/Depositos/Depositos"));
const Pagos = lazy(() => import("../components/Pagos/Pagos"));
const Depositar = lazy(() => import("../components/Depositar/Depositar"));
const DepositarAMiCuenta = lazy(() =>
  import("../components/DepositarAMiCuenta/DepositarAMiCuenta")
);
const DepositarExterno = lazy(() =>
  import("../components/DepositarExterno/DepositarExterno")
);
const HomeCA = lazy(() => import("../components/HomeCA/HomeCA"));
const Consultar = lazy(() => import("../components/Consultar/Consultar"));
const Transferir = lazy(() => import("../components/Transferir/Transferir"));
const TransferirAMiCuenta = lazy(() =>
  import("../components/TransferirAMiCuenta/TransferirAMiCuenta")
);
const TransferirAMiCuentaHB = lazy(() =>
  import("../components/TransferirAMiCuentaHB/TransferirAMiCuentaHB")
);
const Extraer = lazy(() => import("../components/Extraer/Extraer"));
const Pagar = lazy(() => import("../components/Pagar/Pagar"));
const HomeHB = lazy(() => import("../components/HomeHB/HomeHB"));
const TransferenciasHB = lazy(() =>
  import("../components/TransferenciasHB/TransferenciasHB")
);
const Movimientos = lazy(() => import("../components/Movimientos/Movimientos"));
const ResumenTarjeta = lazy(() => import("../components/ResumenTarjeta/ResumenTarjeta"));
const PagosHB = lazy(() => import("../components/PagosHB/PagosHB"));
const Perfil = lazy(() => import("../components/Perfil/Perfil"));
const PagoTarjeta = lazy(() =>
  import("../components/PagoTarjeta/PagoTarjeta")
);
const routes = [
  <PublicRoute path="/IngresoHB/" exact component={IngresoHB} />,
  <PublicRoute path="/ServicioDetalle/:id" exact component={ServicioDetalle} />,
  <PublicRoute
    path="/ServicioDetalleHB/:id"
    exact
    component={ServicioDetalleHB}
  />,
  <PublicRoute
    path="/ServicioDetalleOP/:id"
    exact
    component={ServicioDetalleOP}
  />,
  <PublicRoute path="/IngresoCA/" exact component={IngresoCA} />,
  <PublicRoute path="/CambioPass/" exact component={CambioPass} />,
  <PublicRoute path="/IngresoOP/" exact component={IngresoOP} />,
  <PublicRoute path="/Registro/" exact component={Registro} />,
  <PublicRoute path="/Empresa/" exact component={Empresa} />,
  <PublicRoute path="/Administracion/" exact component={Administracion} />,
  <PublicRoute path="/Mantenimiento/" exact component={Mantenimiento} />,
  <PublicRoute path="/RegistroFisica/" exact component={RegistroFisica} />,
  <PublicRoute path="/RegistroJuridica/" exact component={RegistroJuridica} />,
  <PublicRoute path="/Extracciones/" exact component={Extracciones} />,
  <PublicRoute
    path="/DepositarAMiCuenta/:id"
    exact
    component={DepositarAMiCuenta}
  />,
  
  <PublicRoute path="/Depositos" exact component={Depositos} />,
  <PublicRoute path="/Pagos" exact component={Pagos} />,
  <PublicRoute path="/Depositar" exact component={Depositar} />,
  <PublicRoute path="/DepositarExterno" exact component={DepositarExterno} />,
  <PublicRoute
    path="/DepositarAMiCuenta"
    exact
    component={DepositarAMiCuenta}
  />,
  <PublicRoute path="/HomeCA" exact component={HomeCA} />,
  <PublicRoute path="/Consultar" exact component={Consultar} />,
  <PublicRoute path="/Transferir" exact component={Transferir} />,
  <PublicRoute
    path="/TransferirAMiCuenta"
    exact
    component={TransferirAMiCuenta}
  />,
  <PublicRoute
    path="/TransferirAMiCuentaHB"
    exact
    component={TransferirAMiCuentaHB}
  />,
  <PublicRoute path="/Extraer" exact component={Extraer} />,
  <PublicRoute path="/Pagar" exact component={Pagar} />,
  <PublicRoute path="/HomeHB" exact component={HomeHB} />,
  <PublicRoute path="/TransferenciasHB" exact component={TransferenciasHB} />,
  <PublicRoute path="/Movimientos" exact component={Movimientos} />,
  <PublicRoute path="/PagosHB" exact component={PagosHB} />,
  <PublicRoute path="/Perfil" exact component={Perfil} />,
  <PublicRoute path="/CargaCupon" exact component={CargaCupon} />,
  <PublicRoute path="/PagoSueldos" exact component={PagoSueldos} />,
  <PublicRoute path="/PagoSueldosOP" exact component={PagoSueldosOP} />,
  <PublicRoute path="/ResumenTarjeta" exact component={ResumenTarjeta} />,
  <PublicRoute path="/PagoTarjeta/:id" exact component={PagoTarjeta} />,
];

export default routes;
