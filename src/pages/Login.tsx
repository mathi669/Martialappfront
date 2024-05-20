import { Link, useNavigate } from "react-router-dom";
import "../static/css/main.css";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const [userType, setUserType] = useState<string>("");
  const [dc_correo_electronico, setEmail] = useState<string>("");
  const [dc_contrasena, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleUserTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); // Limpiar el mensaje de error al intentar iniciar sesión

    axios
      .post("http://127.0.0.1:5000/login", { dc_correo_electronico, dc_contrasena })
      .then((res) => {
        console.log(res);
        if(res.data.success){
          navigate("/")
        }else {
          setError("Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setError("Credenciales inválidas. Por favor, inténtelo de nuevo.");
        } else {
          setError("Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.");
        }
      });
  };

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
              {error && <p className="text-center text-danger">{error}</p>}
              <form id="loginForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <select
                    className="form-control input-lg"
                    id="userType"
                    name="userType"
                    value={userType}
                    onChange={handleUserTypeChange}
                  >
                    <option value="">Seleccione tipo de inicio de sesión</option>
                    <option value="usuario">Iniciar sesión como usuario</option>
                    <option value="gimnasio">Iniciar sesión como gimnasio</option>
                  </select>
                </div>

                {userType === "usuario" && (
                  <div id="usuarioForm">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control input-lg"
                        name="emailUsuario"
                        placeholder="Correo electrónico"
                        value={dc_correo_electronico}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control input-lg"
                        name="passwordUsuario"
                        placeholder="Contraseña"
                        value={dc_contrasena}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                {userType === "gimnasio" && (
                  <div id="gimnasioForm">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control input-lg"
                        name="emailGimnasio"
                        placeholder="Correo electrónico"
                        value={dc_correo_electronico}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control input-lg"
                        name="passwordGimnasio"
                        placeholder="Contraseña"
                        value={dc_contrasena}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <button className="btn btn-danger btn-lg" type="submit">
                  INICIAR SESIÓN
                </button>
              </form>

              <div className="text-left text-light">
                <a href="#!">No recuerdo mi contraseña</a>
              </div>

              <div className="checkbox full-width" style={{ margin: "20px 0" }}>
                <label>
                  <input type="checkbox" /> No cerrar sesión
                </label>
              </div>

              <div className="text-center">
                <Link to="registro">Si eres nuevo ¡Crea una cuenta!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
