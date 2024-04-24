import "../styles/Footer.css";
import { RiFacebookCircleFill } from "react-icons/ri";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { AiFillTwitterCircle } from "react-icons/ai";
import { RiLinkedinBoxFill } from "react-icons/ri";
const Footer = () => {
  return (
    <footer>
      <p className="footer-text">Följ oss och håll dig informerad</p>
      <div className="social-icons">
        <RiLinkedinBoxFill className="linkedin" />
        <RiFacebookCircleFill className="facebook" />
        <BiLogoInstagramAlt className="instagram" />
        <AiFillTwitterCircle className="twitter" />
      </div>
      <p className="admin">Admin</p>
    </footer>
  );
};

export default Footer;
