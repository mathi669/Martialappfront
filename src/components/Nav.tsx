import { Link } from "react-router-dom";
import "../static/css/main.css";

function NavbarMartial() {
  return (
    <>
      <div className="full-width navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="full-width text-semi-bold navbar-brand">
            MartialApps
          </div>
          <button
            className="navbar-toggler btn-mobile-menu show-menu-mobile"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i
              className="fa fa-bars hidden-md hidden-lg"
              aria-hidden="true"
            ></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="list-unstyled full-width navbar-nav">
              <li className="nav-item">
                <a className="nav-link">
                  <Link to="/">
                    <i
                      className="fa fa-home fa-fw hidden-md hidden-lg"
                      aria-hidden="true"
                    ></i>
                    INICIO
                  </Link>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <Link to="/about">
                    <i
                      className="fa fa-life-ring fa-fw hidden-md hidden-lg"
                      aria-hidden="true"
                    ></i>
                    ACERCA DE NOSOTROS
                  </Link>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <Link to="/registro">
                    <i
                      className="fa fa-life-ring fa-fw hidden-md hidden-lg"
                      aria-hidden="true"
                    ></i>
                    REGISTRATE
                  </Link>
                </a>
              </li>
              <li className="nav-item hidden-xs hidden-sm">
                <a className="nav-link btn-PopUpLogin">
                  <Link to="/login">INICIAR SESIÓN</Link>
                </a>
              </li>
              <li className="nav-item hidden-xs hidden-sm">
                <i
                  className="fa fa-user NavBar-Nav-icon btn-PopUpLogin"
                  aria-hidden="true"
                ></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <section className="full-width PopUpLogin">
        <ul className="nav nav-tabs nav-justified" role="tablist">
          <li role="presentation" className="active">
            <a
              href="#LoginTab1"
              aria-controls="LoginTab1"
              role="tab"
              data-toggle="tab"
            >
              ¡Bienvenido!
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div
            role="tabpanel"
            className="tab-pane fade in active"
            id="LoginTab1"
          >
            <form action="login.html" style={{ paddingTop: "15px" }}>
              <div className="form-group">
                <select
                  className="form-control input-lg"
                  id="userType"
                  name="userType"
                >
                  <option value="">Seleccione tipo de inicio de sesión</option>
                  <option value="usuario">Iniciar sesión como usuario</option>
                  <option value="gimnasio">Iniciar sesión como gimnasio</option>
                </select>
              </div>
              <div id="usuarioForm" style={{ display: "none" }}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control input-lg"
                    name="emailUsuario"
                    placeholder="Correo electrónico"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control input-lg"
                    name="passwordUsuario"
                    placeholder="Contraseña"
                    required
                  />
                </div>
              </div>
              <div id="gimnasioForm" style={{ display: "none" }}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control input-lg"
                    name="emailGimnasio"
                    placeholder="Correo electrónico"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control input-lg"
                    name="passwordGimnasio"
                    placeholder="Contraseña"
                    required
                  />
                </div>
              </div>
              <a className="text-left text-light" href="#!">
                No recuerdo mi contraseña
              </a>
              <div className="checkbox full-width">
                <label>
                  {" "}
                  <input type="checkbox" /> No cerrar sesión{" "}
                </label>
              </div>
              <button className="btn btn-danger btn-lg" type="submit">
                INICIAR SESIÓN
              </button>
            </form>
            <div className="full-width divider"></div>
            <h4 className="text-center">¿Aún no tienes cuenta?</h4>
            <a className="text-light" href="newaccount.html">
              CRÉATE UNA GRATIS
            </a>
          </div>
        </div>
      </section>
      <section className="full-width hidden-md hidden-lg Search-mobile">
        <form action="commercial.html" style={{ paddingTop: "15px" }}>
          <div className="form-group">
            <input
              type="text"
              className="form-control input-lg"
              placeholder="Estoy buscando..."
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control input-lg"
              placeholder="Provincia, ciudad, distrito..."
              required
            />
          </div>
          <button className="btn btn-danger btn-lg" type="submit">
            BUSCAR
          </button>
        </form>
      </section>
    </>
  );
}

export default NavbarMartial;
