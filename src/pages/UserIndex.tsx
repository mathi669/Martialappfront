import { Link } from "react-router-dom";
import "../static/css/main.css";

const UserIndex = () => {
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
                  src="./src/static/img/banner ejemplo.jpg"
                  alt="Imagen del Gimnasio"
                  className="img-responsive"
                />
                <div className="banner-text">
                  <h2>Nombre del Gimnasio</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Círculo de imagen de perfil del gimnasio */}
      <div className="container text-center mt-4">
        <div className="row">
          <div className="col-xs-12">
            <div className="profile-picture">
              <img
                src="./src/static/img/user.png"
                alt="Imagen de Perfil del Gimnasio"
                className="img-circle"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Información del gimnasio */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-xs-12 text-center">
            {/* Nombre del gimnasio */}
            <h3>Nombre del Gimnasio</h3>
            {/* Ubicación */}
            <p>Ubicación</p>
            {/* Puntuación */}
            <div className="star-rating">
              <input type="radio" id="star5" name="rating" value="5" />
              <label htmlFor="star5"></label>
              <input type="radio" id="star4" name="rating" value="4" />
              <label htmlFor="star4"></label>
              <input type="radio" id="star3" name="rating" value="3" />
              <label htmlFor="star3"></label>
              <input type="radio" id="star2" name="rating" value="2" />
              <label htmlFor="star2"></label>
              <input type="radio" id="star1" name="rating" value="1" />
              <label htmlFor="star1"></label>
            </div>
          </div>
        </div>
      </div>
      {/* Cuadro grande con clases disponibles */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-xs-12 text-center">
            <h3>Clases Disponibles</h3>
            <div className="class-container">
              {/* Cuadros pequeños para cada clase */}
              <div className="class-item">
                <a><Link to="/gymbanner?clase=Yoga">Yoga</Link></a>
              </div>
              <div className="class-item">
                <a><Link to="/gymbanner?clase=Kickboxing">Kickboxing</Link></a>
              </div>
              <div className="class-item">
                <a><Link to="/gymbanner?clase=Jiu-Jitsu">Jiu-Jitsu</Link></a>

              </div>
              {/* Puedes agregar más clases aquí */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserIndex;
