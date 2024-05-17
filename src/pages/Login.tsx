import { Link } from "react-router-dom";
import "../static/css/main.css";

const Login = () => {
  return (
    <section className="full-width section">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-sm-offset-3">
            <div className="full-width container-login">
              <i
                className="fa fa-user container-login-icon"
                aria-hidden="true"
              ></i>
              <h4 className="text-center text-light">INICIAR SESIÓN</h4>
              <br />
              <form id="loginForm" action="" method="post">
                {/* Contenedor para seleccionar el tipo de inicio de sesión */}
                <div className="form-group">
                  <select
                    className="form-control input-lg"
                    id="userType"
                    name="userType"
                  >
                    <option value="">
                      Seleccione tipo de inicio de sesión
                    </option>
                    <option value="usuario">Iniciar sesión como usuario</option>
                    <option value="gimnasio">
                      Iniciar sesión como gimnasio
                    </option>
                  </select>
                </div>

                {/* Formulario para iniciar sesión como usuario */}
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

                {/* Formulario para iniciar sesión como gimnasio */}
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

                <button className="btn btn-danger btn-lg" type="submit">
                  INICIAR SESIÓN
                </button>
              </form>

              {/* Enlaces adicionales */}
              <div className="text-left text-light">
                <a href="#!">No recuerdo mi contraseña</a>
              </div>

              <div className="checkbox full-width" style={{ margin: "20px 0" }}>
                <label>
                  {" "}
                  <input type="checkbox" /> No cerrar sesión{" "}
                </label>
              </div>

              <div className="text-center">
                <a>
                    <Link to="registro">
                        Si eres nuevo ¡Crea una cuenta!
                    </Link>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
