import "../static/css/main.css";

const CreateClass = () => {
  return (
    <section className="full-width section">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="text-center position-relative">
              <div className="banner-overlay">
                <img
                  src="./src/static/img/banner ejemplo.jpg"
                  alt="Banner del Gimnasio"
                  className="img-responsive"
                />
                <div className="banner-text">
                  <h2 id="claseNombre">Banner del Gimnasio</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary btn-lg btn-crear-clase"
        data-toggle="modal"
        data-target="#crearClaseModal"
      >
        <i className="fa fa-plus"></i> Crear Clase
      </button>

      <div
        className="modal fade"
        id="crearClaseModal"
        // tabIndex="-1"
        role="dialog"
        aria-labelledby="crearClaseModalLabel"
      >
        {/* Modal de creación de clase */}
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="rectangleclass">
              <div className="class-info1">
                <h3>Información de la Clase 1</h3>
                <p>
                  Esta es la información de la clase que proviene de
                  perfilgimnasio.html.
                </p>
              </div>
              <div className="small-rectangle1">
                <h4>Cantidad de participantes: 20</h4>
                <button className="btn btn-primary">Editar</button>
                <button className="btn btn-danger">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="rectangleclass">
              <div className="class-info1">
                <h3>Información de la Clase 2</h3>
                <p>
                  Esta es la información de la clase que proviene de
                  perfilgimnasio.html.
                </p>
              </div>
              <div className="small-rectangle1">
                <h4>Cantidad de participantes: 15</h4>
                <button className="btn btn-primary">Editar</button>
                <button className="btn btn-danger">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="rectangleclass">
              <div className="class-info1">
                <h3>Información de la Clase 3</h3>
                <p>
                  Esta es la información de la clase que proviene de
                  perfilgimnasio.html.
                </p>
              </div>
              <div className="small-rectangle1">
                <h4>Cantidad de participantes: 25</h4>
                <button className="btn btn-primary">Editar</button>
                <button className="btn btn-danger">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateClass;
