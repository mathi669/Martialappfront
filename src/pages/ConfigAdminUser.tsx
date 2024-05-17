import { Link } from "react-router-dom";
import "../static/css/main.css";

const configAdminUser = () => {
  return (
    <section className="full-width section">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-3">
            <button
              className="btn btn-default btn-block visible-xs btn-dropdown-conatiner"
              data-drop-cont=".user-menu-xs"
            >
              <i className="fa fa-user fa-fw" aria-hidden="true"></i> MOSTRAR
              MENÚ
              <i className="fa fa-sort pull-right" aria-hidden="true"></i>
            </button>
            <div className="full-width user-menu-xs">
              <div
                className="full-width post-user-info"
                style={{ margin: "0 !important" }}
              >
                <img
                  src="./src/static/img/user.png"
                  className="NavBar-Nav-icon"
                  alt="User"
                />
                <p className="full-width">
                  <small>Nombre de usuario</small>
                </p>
                <div className="full-width div-table">
                  <div className="full-width div-table-row">
                    <div
                      className="div-table-cell div-table-cell-xs"
                      style={{
                        height: "auto !important",
                        lineHeight: "inherit",
                        border: "none",
                      }}
                    >
                      0 <br />
                      <small>En venta</small>
                    </div>
                    <div
                      className="div-table-cell div-table-cell-xs"
                      style={{
                        height: "auto !important",
                        lineHeight: "inherit",
                        border: "none",
                      }}
                    >
                      0 <br />
                      <small>Vendidos</small>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="full-width list-group"
                style={{ borderRadius: "0" }}
              >
                <div className="list-group-item text-center">
                  <small>Desde Junio 2016</small>
                </div>
                <a className="list-group-item">
                    <Link to="/profile">
                        <i className="fa fa-user fa-fw" aria-hidden="true"></i> TU
                        PERFIL
                    
                    </Link>
                </a>
                <a className="list-group-item active">
                    <Link to="/adminPage">
                        <i className="fa fa-cogs fa-fw" aria-hidden="true"></i>
                        CONFIGURACIÓN
                    
                    </Link>
                </a>
                <a href="yourcommercial.html" className="list-group-item">
                  <i
                    className="fa fa-object-group fa-fw"
                    aria-hidden="true"
                  ></i>
                  TUS ANUNCIOS
                </a>
                <a href="messages.html" className="list-group-item">
                  <i
                    className="fa fa-commenting-o fa-fw"
                    aria-hidden="true"
                  ></i>
                  MENSAJES
                </a>
                <a href="favorites.html" className="list-group-item">
                  <i className="fa fa-heart-o fa-fw" aria-hidden="true"></i>
                  FAVORITOS
                </a>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-8 col-md-9">
            <div className="full-width bar-info-user">
              <i className="fa fa-cogs fa-fw" aria-hidden="true"></i>
              <div>CONFIGURACIÓN</div>
            </div>
            <div
              className="full-width"
              style={{ padding: "15px", border: "1px solid #e1e1e1" }}
            >
              <p>
                Ésta es la información que quieres recibir a través de tu correo
                electrónico
              </p>
              <form action="">
                <div className="checkbox">
                  <label>
                    <input type="checkbox" value="" />
                    Recibir mensajes del chat por E-mail
                  </label>
                </div>
                <hr />
                <div className="checkbox">
                  <label>
                    <input type="checkbox" value="" />
                    Recibir estadísticas de tus anuncios
                  </label>
                </div>
                <hr />
                <div className="checkbox">
                  <label>
                    <input type="checkbox" value="" />
                    Recibir boletines y promociones
                  </label>
                </div>
                <button className="btn btn-danger">GUARDAR</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default configAdminUser;
