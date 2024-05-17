import { Link } from "react-router-dom";
import "../static/css/main.css";

const Register = () => {
  return (
    <section className="full-width section">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6 hidden-xs">
            <h2 className="text-center text-danger text-semi-bold">
              Tu cuenta
            </h2>
            <p className="lead text-center">
              Bienvenido a MartialApps, tu acceso directo a una comunidad de
              gimnasios locales. Descubre, entrena y alcanza tus metas con
              nosotros.
            </p>
            <figure className="full-width">
              <img
                src="./src/static/img/Devices.png"
                alt=""
                className="img-responsive"
              />
            </figure>
          </div>
          <div className="col-xs-12 col-sm-6">
            <div className="full-width container-login">
              <i
                className="fa fa-user container-login-icon"
                aria-hidden="true"
              ></i>
              <h4 className="text-center text-light">CREA UNA CUENTA</h4>
              <br />
              <form action="">
                <div className="form-group">
                  <label htmlFor="tipoRegistro">Registrarse como:</label>
                  <select
                    id="tipoRegistro"
                    name="tipoRegistro"
                    className="form-control input-lg"
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Gimnasio">Gimnasio</option>
                    <option value="Usuario">Usuario</option>
                  </select>
                </div>
                <div id="camposRegistro" style={{ display: "none" }}>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                      type="text"
                      id="nombre"
                      className="form-control input-lg"
                      placeholder="Juan"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
                    <input
                      type="text"
                      id="apellidoPaterno"
                      className="form-control input-lg"
                      placeholder="Rodriguez"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apellidoMaterno">Apellido Materno:</label>
                    <input
                      type="text"
                      id="apellidoMaterno"
                      className="form-control input-lg"
                      placeholder="Perez"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="genero">Género:</label>
                    <select
                      id="genero"
                      className="form-control input-lg"
                      required
                    >
                      <option value="">Selecciona tu género</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="fechaNacimiento">
                      Fecha de nacimiento:
                    </label>
                    <input
                      type="date"
                      id="fechaNacimiento"
                      className="form-control input-lg"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="correo">Correo:</label>
                    <input
                      type="email"
                      id="correo"
                      className="form-control input-lg"
                      placeholder="ejemplo@ejemplo.cl"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contraseña">Contraseña:</label>
                    <input
                      type="password"
                      id="contraseña"
                      className="form-control input-lg"
                      placeholder="Contraseña"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="repetirContraseña">
                      Repetir contraseña:
                    </label>
                    <input
                      type="password"
                      id="repetirContraseña"
                      className="form-control input-lg"
                      placeholder="Repetir contraseña"
                      required
                    />
                  </div>
                  <div id="camposGimnasio" style={{ display: "none" }}>
                    <div className="form-group">
                      <label htmlFor="nombreGimnasio">
                        Nombre del Gimnasio:
                      </label>
                      <input
                        type="text"
                        id="nombreGimnasio"
                        className="form-control input-lg"
                        placeholder="Nombre del Gimnasio"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="telefonoGimnasio">
                        Teléfono del Gimnasio:
                      </label>
                      <input
                        type="text"
                        id="telefonoGimnasio"
                        className="form-control input-lg"
                        placeholder="Teléfono del Gimnasio"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ubicacionGimnasio">
                        Ubicación del Gimnasio:
                      </label>
                      <input
                        type="text"
                        id="ubicacionGimnasio"
                        className="form-control input-lg"
                        placeholder="Ubicación del Gimnasio"
                        required
                      />
                    </div>
                  </div>
                </div>
                <p>
                  Al registrarte aceptas las
                  <a href="#!" style={{ display: "inline-block" }}>
                    condiciones de uso y la Política de Privacidad
                  </a>
                </p>
                <button
                  id="btnRegistro"
                  className="btn btn-danger btn-lg"
                  type="submit"
                >
                  CREAR CUENTA
                </button>
                <a className="text-center">
                    <Link to="/login">
                        Ya tengo una cuenta
                    
                    </Link>
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
