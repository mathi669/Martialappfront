import { Link } from "react-router-dom";
import "../static/css/main.css";

const GymProfile = () => {
  return (
    <section className="full-width section">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-3">
            <button
              className="btn btn-default btn-block visible-xs btn-dropdown-container"
              data-drop-cont=".user-menu-xs"
            >
              <i className="fa fa-user fa-fw" aria-hidden="true"></i> MOSTRAR
              MENÚ <i className="fa fa-sort pull-right" aria-hidden="true"></i>
            </button>
            <div className="full-width post-user-info">
              <img
                src="./src/static/img/user.png"
                className="NavBar-Nav-icon"
                alt="User"
              />
              <p className="full-width">
                <small id="nombreGimnasio"></small>
              </p>
              <div className="full-width div-table">
                <div className="full-width div-table-row">
                  <div
                    className="div-table-cell div-table-cell-xs"
                    id="ubicacionGimnasio"
                  >
                    Ubicación <br />
                    <small>Ciudad, País</small>
                  </div>
                  <div
                    className="div-table-cell div-table-cell-xs"
                    id="telefonoGimnasio"
                  >
                    Teléfono <br />
                    <small>Número de contacto</small>
                  </div>
                </div>
              </div>
              <div
                className="full-width list-group"
                style={{ borderRadius: "0" }}
              >
                <div className="list-group-item text-center">
                  <small>Desde Fecha de Registro</small>
                </div>
                <a className="list-group-item active">
                    <Link to="/profile">
                        <i className="fa fa-user fa-fw" aria-hidden="true"></i> TU
                        PERFIL
                    
                    </Link>
                </a>
                <a className="list-group-item">
                    <Link to="/adminPage">
                        <i className="fa fa-cogs fa-fw" aria-hidden="true"></i>{" "}
                        CONFIGURACIÓN
                    </Link>
                </a>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-8 col-md-9">
            <div className="full-width bar-info-user">
              <i className="fa fa-user fa-fw" aria-hidden="true"></i>
              <div>TU PERFIL</div>
            </div>
            {/* Contenido*/}
            <div
              className="full-width"
              style={{ padding: "15px", border: "1px solid #E1E1E1" }}
            >
              <form action="">
                <p className="text-muted text-center">Seleccione una imagen</p>
                <div className="form-group">
                  <div className="custom-input-file">
                    <input type="file"  className="input-file" />
                    <i className="fa fa-picture-o" aria-hidden="true"></i>
                  </div>
                  <br />
                  <p className="text-muted text-center archivo">Archivo...</p>
                </div>
                <br />
                <br />
                <br />
                <div className="form-group">
                  <label>Nombre del Gimnasio</label>
                  <input
                    type="text"
                    placeholder="Nombre del Gimnasio"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Teléfono <small></small>
                  </label>
                  <input
                    type="text"
                    placeholder="¿Cuál es tu teléfono?"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>
                    Ubicación <small>¿Cuál es tu ubicación?</small>
                  </label>
                  <input
                    type="text"
                    placeholder="Ubicación"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Correo electrónico</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <a
                    href="#!"
                    className="btn btn-default btn-xs pull-right btn-dropdown-container"
                    data-drop-cont=".perfil-password"
                  >
                    Mostrar/Ocultar{" "}
                    <i className="fa fa-sort" aria-hidden="true"></i>
                  </a>
                  <div className="full-width perfil-password">
                    <input
                      type="password"
                      placeholder="Contraseña"
                      className="form-control"
                    />
                    <br />
                    <input
                      type="password"
                      placeholder="Nueva Contraseña"
                      className="form-control"
                    />
                    <br />
                    <input
                      type="password"
                      placeholder="Confirmar Contraseña"
                      className="form-control"
                    />
                  </div>
                </div>
                <p className="text-center">
                  <button className="btn btn-danger">GUARDAR</button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GymProfile;
