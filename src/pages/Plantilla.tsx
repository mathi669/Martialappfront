import "../static/css/main.css";

const Plantilla = () => {
  return (
    <section className="full-width section">
      {/* Banner del gimnasio */}
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="text-center position-relative">
              {/* Imagen del gimnasio con degradado y texto */}
              <div className="banner-overlay">
                <img
                  src="assets/img/banner ejemplo.jpg"
                  alt="Imagen del Gimnasio"
                  className="img-responsive"
                />
                <div className="banner-text">
                  <h2 id="claseNombre">Clase</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contenedor para los dos rectángulos grandes */}
      <div className="container">
        <div className="row">
          {/* Primer rectángulo grande */}
          <div className="col-md-6">
            <div className="rectangle">
              {/* Modal */}
              <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                  {/* Contenido del modal */}
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        &times;
                      </button>
                      <h4 className="modal-title">Perfil del Profesor</h4>
                    </div>
                    <div className="modal-body">
                      <div className="text-center">
                        <img
                          src="./src/static/img/user.png"
                          className="img-circle"
                          alt="Imagen del Profesor"
                          style={{ width: "100px", height: "100px" }}
                        />
                        <h4>Nombre del Profesor</h4>
                        <p>Descripción del Profesor</p>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-default"
                        data-dismiss="modal"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rectangle">
                <h3>Descripción del Gimnasio</h3>
                <p>
                  Esta es la descripción del gimnasio que proviene de
                  perfilgimnasio.html.
                </p>
                <div className="class-item">
                  <a href="#" data-toggle="modal" data-target="#myModal">
                    Profesor
                  </a>
                </div>
                <div className="class-item">
                  <p>Cupos Disponibles: 20</p>
                </div>
              </div>
            </div>
          </div>
          {/* Segundo rectángulo grande */}
          <div className="col-md-6">
            <div className="rectangle">
              <h2>Tomar clase</h2>
              <div id="calendar">{/* Aquí irá el calendario */}</div>
              <div className="time-slots">
                {/* Aquí irán los cuadros de selección de horas */}
              </div>
              <button id="btnTomarClase">Tomar clase</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plantilla;
