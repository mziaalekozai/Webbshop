import "../styles/HomePage.css";
import mainImage from "../assets/main-image.jpg";
const HomePage = () => {
  return (
    <div className="main-container">
      <div className="main-top">
        <img className="main-img" src={mainImage} alt="main-image" />
        <div className="main-top-right">
          <p>Välkommen till HappyHopperz. </p>
          <p> Där glädje och hälsa går hand i hand!</p>
          <button className="addItem-btn ">Visa våra kollektion</button>
        </div>
      </div>
      <div className="main-about-contact">
        <div className="about">
          <h1>Om oss</h1>
          <p>
            På HappyHopperz tror vi att glädje och hälsa går hand i hand. Därför
            erbjuder vi ett brett sortiment av högkvalitativa studsmattor och
            tillbehör som garanterar skoj för hela familjen. Vår mission är att
            göra aktiva lekar tillgängliga för alla, från små barn till vuxna
            som vill hålla sig i form på ett roligt sätt.
          </p>
        </div>
        <div className="contact">
          <h1>Kontakta oss</h1>
          <p>Telefon</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
