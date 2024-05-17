import "../static/css/main.css";

const Footer = () => {
  return (
    <footer className="full-width footer">
      <div className="container">
        <p className="text-semi-bold">
          Descubre, entrena y alcanza tus metas con MartialApps. Tu acceso
          directo a una comunidad de gimnasios locales.
        </p>
        <p>
          ¡Únete hoy y comienza tu viaje hacia una vida más saludable y activa!
        </p>
      </div>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <h4 className="text-light text-center">
              Síguenos en las redes sociales
            </h4>
            <ul className="list-unstyled fullwidth text-center footer-social">
              <li>
                <a href="#!">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fa fa-google-plus" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fa fa-youtube" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="col-xs-12">
          <ul className="list-unstyled text-center full-width footer-copyright">
            <li>&copy; 2024 MartialApps</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
