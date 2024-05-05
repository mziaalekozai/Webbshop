import "../styles/HomePage.css";
const HomePage = () => {
  return (
    <div className="main-container">
      <div className="main-top">
        <div className="main-top-text">
          <p>Välkommen till HappyHopperz. </p>
          <p> Där glädje och hälsa går hand i hand!</p>
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
          <h4>Producktinformation och support</h4>
          <p>0321-00 00 01</p>
          <h4>Hantera din order</h4>
          <p>0321-00 00 02</p>
          <h4>Retur och reklamation</h4>
          <p>0321-00 00 03</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
