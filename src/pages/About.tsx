import "../static/css/main.css";

const About = () => {
  return (
    <section className="section">
      <h2 className="text-center text-light">
        <i className="fa fa-info-circle" aria-hidden="true"></i> Acerca de
        Nosotros
      </h2>
      <br />
      <div
        className="full-width"
        style={{
          borderBottom: "5px solid #00a9e2",
          height: 0,
          margin: "25px 0",
        }}
      ></div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <p>
              Bienvenido a MartialApps, tu plataforma para encontrar gimnasios
              locales y realizar inscripciones de forma sencilla y rápida. Nos
              dedicamos a proporcionarte la mejor experiencia para que puedas
              alcanzar tus objetivos de salud y bienestar.
            </p>
            <p>
              Nuestra aplicación te ofrece una amplia gama de gimnasios locales
              para que puedas elegir el que mejor se adapte a tus necesidades.
              Desde gimnasios tradicionales hasta centros especializados,
              estamos aquí para ayudarte a encontrar el lugar perfecto para tu
              rutina de ejercicios.
            </p>
            <p>
              Además, nuestra plataforma simplifica el proceso de inscripción,
              permitiéndote reservar clases, consultar horarios y obtener
              información sobre tarifas con tan solo unos pocos clics. Con
              MartialApps, estarás un paso más cerca de alcanzar tus metas de
              fitness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
