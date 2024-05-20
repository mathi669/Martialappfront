import { Link, useNavigate } from "react-router-dom";
import "../static/css/main.css";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const Register: React.FC = () => {
  const [userType, setUserType] = useState<string>("");
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleUserTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserType(event.target.value);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); // Clear error message before trying to register

    const registrationData = {
      dc_correo_electronico: formData.correo,
      contrasena: formData.contrasena,
      nombre: formData.nombre,
      apellido: formData.apellidoPaterno + " " + formData.apellidoMaterno,
      telefono: formData.telefono || "",
      nivel_artes_marciales_id: formData.nivel_artes_marciales_id || "1",
      tipo_usuario_id: userType === "Usuario" ? "2" : "3",
      usuario_estado_id: "1",
      nivel_id: formData.nivel_id || "1",
      contacto_emergencia_id: formData.contacto_emergencia_id || "1",
      es_gimnasio: userType === "Gimnasio"
    };

    axios
      .post("http://127.0.0.1:5000/register", registrationData)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.");
        }
      });
  };

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
              {error && <p className="text-center text-danger">{error}</p>}
              <form id="registerForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="tipoRegistro">Registrarse como:</label>
                  <select
                    id="tipoRegistro"
                    name="tipoRegistro"
                    className="form-control input-lg"
                    value={userType}
                    onChange={handleUserTypeChange}
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Gimnasio">Gimnasio</option>
                    <option value="Usuario">Usuario</option>
                  </select>
                </div>
                <div id="camposRegistro" style={{ display: userType ? "block" : "none" }}>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                      type="text"
                      id="nombre"
                      className="form-control input-lg"
                      placeholder="Juan"
                      value={formData.nombre || ""}
                      onChange={handleInputChange}
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
                      value={formData.apellidoPaterno || ""}
                      onChange={handleInputChange}
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
                      value={formData.apellidoMaterno || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="genero">Género:</label>
                    <select
                      id="genero"
                      className="form-control input-lg"
                      value={formData.genero || ""}
                      onChange={handleInputChange}
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
                      value={formData.fechaNacimiento || ""}
                      onChange={handleInputChange}
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
                      value={formData.correo || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contrasena">Contraseña:</label>
                    <input
                      type="password"
                      id="contrasena"
                      className="form-control input-lg"
                      placeholder="Contraseña"
                      value={formData.contrasena || ""}
                      onChange={handleInputChange}
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
                      value={formData.repetirContraseña || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {userType === "Gimnasio" && (
                    <div id="camposGimnasio">
                      <div className="form-group">
                        <label htmlFor="nombreGimnasio">
                          Nombre del Gimnasio:
                        </label>
                        <input
                          type="text"
                          id="nombreGimnasio"
                          className="form-control input-lg"
                          placeholder="Nombre del Gimnasio"
                          value={formData.nombreGimnasio || ""}
                          onChange={handleInputChange}
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
                          value={formData.telefonoGimnasio || ""}
                          onChange={handleInputChange}
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
                          value={formData.ubicacionGimnasio || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}
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
                <div className="text-center">
                  <Link to="/login">Ya tengo una cuenta</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
