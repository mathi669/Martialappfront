import '../static/css/main.css'

function Home() {
  return (
    <div>
      <header
        className="full-width header-index"
        style={{
        //   backgroundImage: "url('assets/img/header-index 2.png')",
          backgroundImage: "url('./src/static/img/header-index 2.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="text-center" style={{ color: '#ebf2fa' }}>
                Somos la mejor aplicación
              </h1>
              <h2 className="text-center" style={{ color: '#ebf2fa' }}>
                Para la búsqueda de gimnasios de artes marciales…
              </h2>
            </div>
          </div>
        </div>
        <br /><br />
      </header>
      <section className="section" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <figure className="full-width">
                <img
                  src="assets/img/smartphone.png"
                  alt=""
                  className="img-responsive"
                  style={{ width: '40%', margin: '0 auto' }}
                />
              </figure>
            </div>
            <div className="col-xs-12 col-sm-8">
              <h2 className="text-center text-light">
                ¡Llévanos siempre contigo! Descárgate nuestra app
              </h2>
              <h3 className="text-center text-light">
                Dinos tu número y recibirás el enlace para descargar nuestra app
              </h3>
              <br />
              <form className="form-inline text-center">
                <div className="form-group">
                  <select className="form-control">
                    <option>Android</option>
                    <option>iPhone</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Escribe tu número móvil"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-danger">
                  DESCARGAR APP
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <i className="fa fa-flag-checkered icon-index" aria-hidden="true"></i>
              <p className="lead">
                Olvídate del miedo a equivocarte y lánzate a por lo que quieres.
                Ya no importa lo que tienes, sino lo que puedes llegar a hacer.
              </p>
            </div>
            <div className="col-xs-12 col-sm-4">
              <i className="fa fa-gamepad icon-index" aria-hidden="true"></i>
              <p className="lead">
                Disfruta hasta de tus cambios de opinión y vive todas las
                oportunidades que quieras, sin complejos.
              </p>
            </div>
            <div className="col-xs-12 col-sm-4">
              <i className="fa fa-money icon-index" aria-hidden="true"></i>
              <p className="lead">
                Consigue los mejores gimnasios mas cerca de ti de la forma más
                rápida y cómoda que existe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
